"""Read-only verification clients for exchange-based USDT payments."""

from __future__ import annotations

import asyncio
import hashlib
import hmac
import json
import re
import time
from collections.abc import Callable
from dataclasses import dataclass
from decimal import ROUND_CEILING, Decimal, DecimalException, InvalidOperation
from typing import Any, Protocol
from urllib.parse import urlencode

import httpx


class CryptoVerificationError(RuntimeError):
    """Base class for safe crypto verification failures."""


class CryptoProviderUnavailable(CryptoVerificationError):
    """The provider could not be queried safely."""


class CryptoTransferNotFound(CryptoVerificationError):
    """No transaction with the submitted identifier exists yet."""


class CryptoTransferPending(CryptoVerificationError):
    """The transfer exists but is not final yet."""


class CryptoTransferRejected(CryptoVerificationError):
    """The transfer cannot pay the requested order."""

    def __init__(self, reason: str) -> None:
        super().__init__(reason)
        self.reason = reason


@dataclass(frozen=True, slots=True)
class CryptoTransferRecord:
    """Provider-neutral proof of an incoming transfer."""

    provider: str
    transaction_id: str
    amount: Decimal
    currency: str
    recipient_id: str
    sender_id: str
    status: str
    occurred_at_ms: int
    incoming: bool
    timestamp_precision_ms: int = 1
    claim_id: str | None = None
    provider_transaction_id: str | None = None


class CryptoTransferClient(Protocol):
    """Injectable transaction lookup contract used by the API."""

    async def lookup(
        self, transaction_id: str, *, created_after_ms: int
    ) -> CryptoTransferRecord: ...


def convert_iqd_to_usdt(
    amount_iqd: int, *, iqd_per_usdt: Decimal, decimals: int = 2
) -> str:
    """Convert IQD to a fixed USDT amount, always rounding up."""
    if (
        amount_iqd <= 0
        or not iqd_per_usdt.is_finite()
        or not Decimal(100) <= iqd_per_usdt <= Decimal(10_000)
        or iqd_per_usdt.as_tuple().exponent < -4
        or len(iqd_per_usdt.as_tuple().digits) > 12
    ):
        raise ValueError("Invalid conversion inputs")
    if not 2 <= decimals <= 8:
        raise ValueError("USDT decimals must be between 2 and 8")
    try:
        quantum = Decimal(1).scaleb(-decimals)
        result = (Decimal(amount_iqd) / iqd_per_usdt).quantize(
            quantum, rounding=ROUND_CEILING
        )
    except DecimalException as exc:
        raise ValueError("Invalid conversion inputs") from exc
    return format(result, f".{decimals}f")


def parse_binance_amount(value: Any) -> Decimal:
    """Parse Binance Pay's documented fixed-point string amount."""
    if not isinstance(value, str) or not re.fullmatch(
        r"(?:0|[1-9][0-9]*)(?:\.[0-9]{1,8})?", value
    ):
        raise CryptoProviderUnavailable("invalid Binance amount")
    return parse_positive_decimal(value)


def parse_positive_decimal(value: Any) -> Decimal:
    """Parse one bounded provider amount without binary floating-point conversion."""
    if isinstance(value, bool) or value is None:
        raise CryptoProviderUnavailable("invalid provider amount")
    raw = str(value)
    if not raw or len(raw) > 64:
        raise CryptoProviderUnavailable("invalid provider amount")
    try:
        result = Decimal(raw)
    except (InvalidOperation, ValueError) as exc:
        raise CryptoProviderUnavailable("invalid provider amount") from exc
    parts = result.as_tuple()
    if (
        not result.is_finite()
        or parts.exponent < -8
        or parts.exponent > 8
        or len(parts.digits) > 24
    ):
        raise CryptoProviderUnavailable("invalid provider amount")
    try:
        if result <= 0 or result > Decimal(1_000_000_000):
            raise CryptoProviderUnavailable("invalid provider amount")
    except DecimalException as exc:
        raise CryptoProviderUnavailable("invalid provider amount") from exc
    return result


def validate_transfer(
    record: CryptoTransferRecord,
    *,
    provider: str,
    transaction_id: str,
    expected_usdt: Decimal,
    recipient_id: str,
    order_created_at_ms: int,
    order_expires_at_ms: int,
) -> None:
    """Fail closed unless one record proves the exact incoming payment."""
    if record.provider != provider or record.transaction_id != transaction_id:
        raise CryptoTransferRejected("transaction_mismatch")
    if record.currency.upper() != "USDT":
        raise CryptoTransferRejected("wrong_asset")
    if not record.incoming or record.recipient_id != recipient_id:
        raise CryptoTransferRejected("wrong_recipient")
    if record.timestamp_precision_ms >= 1000:
        earliest_valid_ms = ((order_created_at_ms // 1000) + 1) * 1000
    else:
        earliest_valid_ms = order_created_at_ms + 1
    if record.occurred_at_ms < earliest_valid_ms:
        raise CryptoTransferRejected("transfer_too_old")
    if record.occurred_at_ms > order_expires_at_ms:
        raise CryptoTransferRejected("transfer_too_late")
    if record.status == "pending":
        raise CryptoTransferPending("transfer pending")
    if record.status != "success":
        raise CryptoTransferRejected("transfer_failed")
    if record.amount != expected_usdt:
        raise CryptoTransferRejected("amount_mismatch")


class _SignedClient:
    def __init__(
        self,
        *,
        api_key: str,
        api_secret: str,
        recipient_id: str,
        base_url: str,
        timeout_seconds: float = 10.0,
        proxy_url: str = "",
        client: httpx.AsyncClient | None = None,
        clock_ms: Callable[[], int] | None = None,
    ) -> None:
        self.api_key = api_key
        self.api_secret = api_secret
        self.recipient_id = recipient_id
        self.base_url = base_url.rstrip("/")
        self.timeout_seconds = timeout_seconds
        self.proxy_url = proxy_url
        self.client = client
        self.clock_ms = clock_ms or (lambda: int(time.time() * 1000))

    async def _get_json(
        self, url: str, headers: dict[str, str], *, method: str = "GET"
    ) -> dict[str, Any]:
        last_error: httpx.HTTPError | None = None
        for attempt in range(3):
            try:
                if self.client is not None:
                    status_code, response_headers, content = await self._read_response(
                        self.client, url, headers, method=method
                    )
                else:
                    async with httpx.AsyncClient(
                        timeout=self.timeout_seconds,
                        follow_redirects=False,
                        proxy=self.proxy_url or None,
                        trust_env=False,
                    ) as client:
                        (
                            status_code,
                            response_headers,
                            content,
                        ) = await self._read_response(client, url, headers, method=method)
            except httpx.HTTPError as exc:
                last_error = exc
                if attempt == 2:
                    raise CryptoProviderUnavailable("provider request failed") from exc
                await asyncio.sleep(0.2 * (2**attempt))
                continue
            if status_code in {401, 403}:
                raise CryptoProviderUnavailable("provider authentication failed")
            if status_code == 429 or status_code >= 500:
                if attempt == 2:
                    raise CryptoProviderUnavailable("provider temporarily unavailable")
                retry_after = response_headers.get("Retry-After", "")
                try:
                    delay = min(2.0, max(0.2, float(retry_after)))
                except ValueError:
                    delay = 0.2 * (2**attempt)
                await asyncio.sleep(delay)
                continue
            if status_code >= 400:
                raise CryptoProviderUnavailable("provider rejected verification")
            content_type = response_headers.get("Content-Type", "").lower()
            if not content_type.startswith("application/json"):
                raise CryptoProviderUnavailable("invalid provider response")
            try:
                payload = json.loads(
                    content,
                    parse_float=Decimal,
                    parse_int=int,
                    parse_constant=self._reject_json_constant,
                )
            except (
                json.JSONDecodeError,
                UnicodeDecodeError,
                ValueError,
                DecimalException,
                RecursionError,
            ) as exc:
                raise CryptoProviderUnavailable("invalid provider response") from exc
            if not isinstance(payload, dict):
                raise CryptoProviderUnavailable("invalid provider response")
            return payload
        raise CryptoProviderUnavailable("provider request failed") from last_error

    async def _read_response(
        self,
        client: httpx.AsyncClient,
        url: str,
        headers: dict[str, str],
        *,
        method: str = "GET",
    ) -> tuple[int, httpx.Headers, bytes]:
        max_bytes = 128 * 1024
        async with client.stream(
            method, url, headers=headers, follow_redirects=False
        ) as response:
            if response.status_code >= 400:
                return response.status_code, response.headers, b""
            content_length = response.headers.get("Content-Length")
            if content_length:
                try:
                    declared_length = int(content_length)
                except ValueError as exc:
                    raise CryptoProviderUnavailable(
                        "invalid provider response size"
                    ) from exc
                if declared_length < 0 or declared_length > max_bytes:
                    raise CryptoProviderUnavailable("provider response is too large")
            content = bytearray()
            async for chunk in response.aiter_bytes():
                content.extend(chunk)
                if len(content) > max_bytes:
                    raise CryptoProviderUnavailable("provider response is too large")
            return response.status_code, response.headers, bytes(content)

    @staticmethod
    def _reject_json_constant(value: str) -> Any:
        raise ValueError(f"invalid JSON constant: {value}")


BINANCE_C2C_REFERENCE = re.compile(
    r"^C2C-(?P<order_id>[0-9]{16,24})-(?P<sequence>[1-9][0-9]{0,3})$",
    re.IGNORECASE,
)
BINANCE_NUMERIC_ORDER_ID = re.compile(r"^[0-9]{16,24}$")
BINANCE_TRANSACTION_ID = re.compile(r"^[A-Za-z0-9_]{6,128}$")


def parse_binance_reference(reference: str) -> tuple[str, str]:
    """Map a Binance UI/API reference to its exact history lookup field."""
    candidate = reference.strip()
    display_match = BINANCE_C2C_REFERENCE.fullmatch(candidate)
    if display_match:
        return "orderId", display_match.group("order_id")
    if BINANCE_NUMERIC_ORDER_ID.fullmatch(candidate):
        return "orderId", candidate
    if BINANCE_TRANSACTION_ID.fullmatch(candidate):
        return "transactionId", candidate
    raise CryptoTransferNotFound("transaction not found")


class BinancePayClient(_SignedClient):
    """Verify one of the receiving account's latest ten C2C Pay trades."""

    async def verify_api_restrictions(self) -> None:
        """Compatibility no-op; credential policy is managed by the operator."""
        return

    async def lookup(
        self, transaction_id: str, *, created_after_ms: int
    ) -> CryptoTransferRecord:
        reference_field, reference_value = parse_binance_reference(transaction_id)
        now = self.clock_ms()
        params = {
            "startTime": max(0, created_after_ms - 1000),
            "endTime": now,
            "limit": 10,
            "recvWindow": 5000,
            "timestamp": now,
        }
        query = urlencode(params)
        signature = hmac.new(
            self.api_secret.encode(), query.encode(), hashlib.sha256
        ).hexdigest()
        payload = await self._get_json(
            f"{self.base_url}/sapi/v1/pay/transactions?{query}&signature={signature}",
            {"X-MBX-APIKEY": self.api_key},
        )
        if payload.get("success") is not True or str(payload.get("code")) != "000000":
            raise CryptoProviderUnavailable("Binance Pay history failed")
        data = payload.get("data")
        if not isinstance(data, list) or any(
            not isinstance(item, dict) for item in data
        ):
            raise CryptoProviderUnavailable("invalid Binance Pay history")
        latest = data[:10]
        matches = [
            item
            for item in latest
            if str(item.get(reference_field, "")) == reference_value
        ]
        if not matches:
            raise CryptoTransferNotFound("transaction not found")
        if len(matches) != 1:
            raise CryptoProviderUnavailable("ambiguous Binance transaction")
        item = matches[0]
        if str(item.get("orderType", "")) != "C2C":
            raise CryptoTransferRejected("wrong_transfer_type")

        receiver = item.get("receiverInfo")
        payer = item.get("payerInfo")
        if not isinstance(receiver, dict) or not isinstance(payer, dict):
            raise CryptoProviderUnavailable("missing Binance transfer parties")
        recipient_id = str(receiver.get("binanceId", ""))
        sender_id = str(payer.get("binanceId", ""))
        account_uid = str(item.get("uid", ""))
        if not recipient_id or not sender_id:
            raise CryptoProviderUnavailable("missing Binance transfer identities")
        if account_uid and account_uid != recipient_id:
            raise CryptoProviderUnavailable("inconsistent Binance receiver identity")

        order_id = str(item.get("orderId", ""))
        provider_transaction_id = str(item.get("transactionId", ""))
        if not BINANCE_NUMERIC_ORDER_ID.fullmatch(order_id) or not (
            BINANCE_TRANSACTION_ID.fullmatch(provider_transaction_id)
        ):
            raise CryptoProviderUnavailable("invalid Binance transaction identifiers")
        try:
            occurred_at = int(item["transactionTime"])
        except (KeyError, TypeError, ValueError) as exc:
            raise CryptoProviderUnavailable("invalid Binance timestamp") from exc
        if occurred_at <= 0:
            raise CryptoProviderUnavailable("invalid Binance timestamp")

        raw_amount = item.get("amount")
        if not isinstance(raw_amount, str):
            raise CryptoProviderUnavailable("invalid Binance amount")
        incoming = not raw_amount.startswith("-")
        amount = parse_binance_amount(raw_amount.removeprefix("-"))

        currency = str(item.get("currency", "")).upper()
        funds_detail = item.get("fundsDetail")
        if (
            not isinstance(funds_detail, list)
            or len(funds_detail) != 1
            or not isinstance(funds_detail[0], dict)
            or str(funds_detail[0].get("currency", "")).upper() != currency
            or parse_binance_amount(funds_detail[0].get("amount")) != amount
        ):
            raise CryptoProviderUnavailable("inconsistent Binance funds detail")

        return CryptoTransferRecord(
            provider="binance",
            transaction_id=transaction_id.strip(),
            amount=amount,
            currency=currency,
            recipient_id=recipient_id,
            sender_id=sender_id,
            # Binance returns completed Pay trade history without a status field.
            status="success",
            occurred_at_ms=occurred_at,
            incoming=incoming,
            claim_id=order_id,
            provider_transaction_id=provider_transaction_id,
        )


GIFT_CARD_REFERENCE_PATTERN = re.compile(r"^[A-Za-z0-9]{6,64}$")
GIFT_CARD_CODE_PATTERN = re.compile(r"^[A-Za-z0-9_-]{6,64}$")


@dataclass(frozen=True, slots=True)
class GiftCardInfo:
    """One verified Binance gift card awaiting redemption."""

    reference_no: str
    currency: str
    face_value: Decimal


class BinanceGiftCardClient(_SignedClient):
    """Verify and redeem Binance gift cards as storefront payments."""

    async def verify(self, reference_no: str) -> GiftCardInfo:
        """Check that a gift card is valid and report its face value."""
        candidate = reference_no.strip()
        if not GIFT_CARD_REFERENCE_PATTERN.fullmatch(candidate):
            raise CryptoTransferRejected("invalid_gift_card_number")
        now = self.clock_ms()
        params = {
            "referenceNo": candidate,
            "recvWindow": 5000,
            "timestamp": now,
        }
        query = urlencode(params)
        signature = hmac.new(
            self.api_secret.encode(), query.encode(), hashlib.sha256
        ).hexdigest()
        payload = await self._get_json(
            f"{self.base_url}/sapi/v1/giftcard/verify"
            f"?{query}&signature={signature}",
            {"X-MBX-APIKEY": self.api_key},
        )
        if str(payload.get("code")) != "000000":
            raise CryptoTransferNotFound("gift card not found or invalid")
        data = payload.get("data")
        if not isinstance(data, dict):
            raise CryptoProviderUnavailable("invalid gift card response")
        currency = str(data.get("currency", "")).upper()
        face_value = parse_positive_decimal(data.get("faceValue"))
        if currency != "USDT":
            raise CryptoTransferRejected("wrong_asset")
        return GiftCardInfo(
            reference_no=candidate,
            currency=currency,
            face_value=face_value,
        )

    async def usdt_balance(self) -> Decimal:
        """Return the store account's available USDT funding balance."""
        import httpx as _httpx
        now = self.clock_ms()
        params = {"recvWindow": 5000, "timestamp": now}
        query = urlencode(params)
        signature = hmac.new(
            self.api_secret.encode(), query.encode(), hashlib.sha256
        ).hexdigest()
        url = (
            f"{self.base_url}/sapi/v1/asset/get-funding-asset"
            f"?{query}&signature={signature}"
        )
        headers = {"X-MBX-APIKEY": self.api_key}
        if self.client is not None:
            response = await self.client.post(url, headers=headers)
        else:
            async with _httpx.AsyncClient(
                timeout=self.timeout_seconds,
                follow_redirects=False,
                proxy=self.proxy_url or None,
                trust_env=False,
            ) as client:
                response = await client.post(url, headers=headers)
        if response.status_code >= 400:
            raise CryptoProviderUnavailable("provider rejected balance request")
        try:
            payload = response.json()
        except Exception as exc:
            raise CryptoProviderUnavailable("invalid balance response") from exc
        if not isinstance(payload, list):
            raise CryptoProviderUnavailable("invalid balance response")
        for coin in payload:
            if isinstance(coin, dict) and str(coin.get("asset", "")).upper() == "USDT":
                free = coin.get("free")
                if free is None:
                    return Decimal("0")
                try:
                    balance = Decimal(str(free))
                except (InvalidOperation, ValueError) as exc:
                    raise CryptoProviderUnavailable(
                        "invalid balance amount"
                    ) from exc
                if not balance.is_finite() or balance < 0:
                    raise CryptoProviderUnavailable("invalid balance amount")
                return balance
        return Decimal("0")

    async def redeem(self, code: str) -> str:
        """Redeem one gift card into the store account and return its reference.

        Binance requires the redemption code to be RSA-encrypted using
        their public key fetched from the cryptography endpoint.
        """
        candidate = code.strip()
        if not GIFT_CARD_CODE_PATTERN.fullmatch(candidate):
            raise CryptoTransferRejected("invalid_gift_card_code")
        encrypted_code = await self._encrypt_with_rsa(candidate)
        now = self.clock_ms()
        params = {
            "code": encrypted_code,
            "recvWindow": 5000,
            "timestamp": now,
        }
        query = urlencode(params)
        signature = hmac.new(
            self.api_secret.encode(), query.encode(), hashlib.sha256
        ).hexdigest()
        try:
            payload = await self._get_json(
                f"{self.base_url}/sapi/v1/giftcard/redeemCode"
                f"?{query}&signature={signature}",
                {"X-MBX-APIKEY": self.api_key},
                method="POST",
            )
        except CryptoProviderUnavailable:
            # Binance returns HTTP 400 for invalid/expired gift card codes.
            # Treat it as "card not found" so the customer can retry,
            # not as a provider outage.
            raise CryptoTransferNotFound("gift card not found or invalid") from None
        if str(payload.get("code")) != "000000":
            raise CryptoTransferNotFound("gift card not found or invalid")
        data = payload.get("data")
        if not isinstance(data, dict):
            raise CryptoProviderUnavailable("invalid gift card redemption")
        redeemed_reference = str(data.get("referenceNo", ""))
        if not GIFT_CARD_REFERENCE_PATTERN.fullmatch(redeemed_reference):
            raise CryptoProviderUnavailable("invalid gift card redemption reference")
        return redeemed_reference

    async def _encrypt_with_rsa(self, plaintext: str) -> str:
        """Fetch Binance's RSA public key and encrypt the gift card code."""
        import base64
        import binascii

        from cryptography.hazmat.primitives import hashes, serialization
        from cryptography.hazmat.primitives.asymmetric import padding

        now = self.clock_ms()
        params = {"recvWindow": 5000, "timestamp": now}
        query = urlencode(params)
        signature = hmac.new(
            self.api_secret.encode(), query.encode(), hashlib.sha256
        ).hexdigest()
        key_payload = await self._get_json(
            f"{self.base_url}/sapi/v1/giftcard/cryptography/rsa-public-key"
            f"?{query}&signature={signature}",
            {"X-MBX-APIKEY": self.api_key},
        )
        if str(key_payload.get("code")) != "000000":
            raise CryptoProviderUnavailable("failed to fetch RSA public key")
        data = key_payload.get("data")
        if isinstance(data, dict):
            public_key_b64 = str(data.get("rsaPublic_key", ""))
        elif isinstance(data, str) and data:
            public_key_b64 = data
        else:
            raise CryptoProviderUnavailable("invalid RSA public key response")
        if not public_key_b64:
            raise CryptoProviderUnavailable("invalid RSA public key response")
        try:
            public_key_der = base64.b64decode(public_key_b64)
            public_key = serialization.load_der_public_key(public_key_der)
            encrypted = public_key.encrypt(
                plaintext.encode("utf-8"),
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None,
                ),
            )
            return base64.b64encode(encrypted).decode("ascii")
        except (ValueError, TypeError, binascii.Error) as exc:
            raise CryptoProviderUnavailable(
                "RSA encryption failed"
            ) from exc


def get_crypto_instructions(amount_usdt: float = 10.0) -> dict:
    """Return customer payment instructions for USDT / Binance."""
    return {
        "status": "ok",
        "currency": "USDT",
        "amount": amount_usdt,
        "binance_pay": {
            "name": "Binance Pay / UID",
            "recommended": True,
            "instructions": "قم بالتحويل الداخلي عبر معرف Binance UID لتفادي رسوم الشبكة والاستفادة من التأكيد الفوري"
        },
        "gift_card": {
            "name": "Binance Gift Card",
            "instructions": "أدخل رمز قسيمة باينانس المكون من 16 رقماً للاستبدال الفوري"
        }
    }
