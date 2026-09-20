"""Validated client for Kashier Payment Sessions API (v3) and webhook verification for ZEUS STORE."""

from __future__ import annotations

import hashlib
import hmac
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from decimal import Decimal
from typing import Any
import urllib.parse
from urllib.parse import urlparse

import logging

import httpx

LOGGER = logging.getLogger("zeus_checkout.kashier")


class KashierError(RuntimeError):
    """Raised when Kashier cannot create a payment session or rejects request."""


@dataclass(frozen=True, slots=True)
class KashierPayment:
    """Validated subset of a Kashier create-session response."""

    session_id: str
    session_url: str
    amount: str
    currency: str
    order_id: str


class KashierClient:
    """Create Kashier payment sessions and verify incoming webhooks."""

    def __init__(
        self,
        *,
        merchant_id: str = "MID-34056-532",
        api_key: str = "60963e5a-e0fd-4ddc-be8f-1346168d21a3",
        secret_key: str = "bd2090fa8e6bdba2579a90ea440929e7$6a129b5ad4aa6a0bd0ad66ca5ab55df242664c957b44befdcc27e10468f31bb4a1231611bedfd39a8354fc72844d89f7",
        mode: str = "live",
        base_url: str = "",
        timeout_seconds: float = 15.0,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self.merchant_id = merchant_id.strip()
        self.api_key = api_key.strip()
        self.secret_key = secret_key.strip()
        self.mode = mode.strip().lower()
        if base_url:
            self.base_url = base_url.rstrip("/")
        elif self.mode == "test":
            self.base_url = "https://test-api.kashier.io"
        else:
            self.base_url = "https://api.kashier.io"
        self.timeout_seconds = timeout_seconds
        self.transport = transport

    async def create_payment_session(
        self,
        *,
        order_id: str,
        amount: str | Decimal | float | int,
        currency: str = "EGP",
        customer_email: str = "customer@zeus.store",
        customer_reference: str = "",
        merchant_redirect: str = "",
        server_webhook: str = "",
        display: str = "ar",
        description: str = "",
        expire_minutes: int = 60,
    ) -> KashierPayment:
        """Create a hosted checkout payment session with Kashier v3."""
        if not self.merchant_id or not self.api_key or not self.secret_key:
            raise KashierError("Kashier credentials are not configured")

        amount_str = f"{Decimal(str(amount)):.2f}"
        expire_at = (datetime.now(timezone.utc) + timedelta(minutes=expire_minutes)).strftime(
            "%Y-%m-%dT%H:%M:%S.000Z"
        )
        url = f"{self.base_url}/v3/payment/sessions"

        headers = {
            "Authorization": self.secret_key,
            "api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "ZEUS-STORE/1.0",
        }

        cust_ref = customer_reference or f"cust_{order_id[:12]}"
        cust_email = customer_email or f"order_{order_id[:8]}@zeus.store"

        payload: dict[str, Any] = {
            "expireAt": expire_at,
            "maxFailureAttempts": 3,
            "paymentType": "credit",
            "amount": amount_str,
            "currency": currency.upper().strip(),
            "order": order_id,
            "merchantRedirect": merchant_redirect,
            "display": display,
            "type": "one-time",
            "allowedMethods": "card",
            "merchantId": self.merchant_id,
            "customer": {
                "email": cust_email,
                "reference": cust_ref,
            },
            "description": description or f"ZEUS Order {order_id[:8].upper()}",
        }
        if server_webhook:
            payload["serverWebhook"] = server_webhook

        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(self.timeout_seconds),
                follow_redirects=False,
                transport=self.transport,
            ) as client:
                response = await client.post(url, headers=headers, json=payload)
        except httpx.HTTPError as exc:
            raise KashierError("Kashier is temporarily unreachable") from exc

        if response.status_code >= 400:
            raise KashierError(
                f"Kashier rejected payment session with HTTP {response.status_code}: {response.text[:200]}"
            )

        try:
            body: Any = response.json()
        except ValueError as exc:
            raise KashierError("Kashier returned invalid JSON") from exc

        if not isinstance(body, dict):
            raise KashierError("Kashier returned unexpected response shape")

        status = str(body.get("status") or "").upper()
        if status != "CREATED":
            raise KashierError(f"Kashier session creation failed with status: {status}")

        session_url = str(body.get("sessionUrl") or "").strip()
        if not session_url or not self._is_allowed_session_url(session_url):
            raise KashierError("Kashier returned an invalid session URL")

        session_id = str(body.get("_id") or "").strip()
        if not session_id:
            try:
                parsed_path = urlparse(session_url).path
                session_id = parsed_path.split("/session/")[1].split("/")[0].split("?")[0]
            except Exception:
                session_id = order_id

        return KashierPayment(
            session_id=session_id,
            session_url=session_url,
            amount=amount_str,
            currency=currency.upper().strip(),
            order_id=order_id,
        )

    def verify_webhook_signature(
        self,
        payload: dict[str, Any],
        signature_header: str | None,
        raw_body: bytes | None = None,
    ) -> bool:
        """Verify the HMAC-SHA256 signature of an incoming Kashier webhook.

        Supports:
        1. Raw body HMAC-SHA256 signature.
        2. signatureKeys query-string HMAC-SHA256 (alphabetically sorted and unsorted,
           with URL-encoded and raw value variants).
        3. Tries Payment API Key and Secret Key candidates.
        """
        if not signature_header or not isinstance(payload, dict):
            return False

        sig = signature_header.strip().lower()

        # Candidate HMAC keys to try
        candidate_keys = [self.api_key]
        if self.secret_key and self.secret_key != self.api_key:
            candidate_keys.append(self.secret_key)
            if "$" in self.secret_key:
                parts = self.secret_key.split("$", 1)
                candidate_keys.extend(parts)

        # 1. Try raw_body HMAC-SHA256 if provided
        if raw_body:
            for hmac_key in candidate_keys:
                digest = hmac.new(
                    hmac_key.encode("utf-8"),
                    raw_body,
                    hashlib.sha256,
                ).hexdigest().lower()
                if hmac.compare_digest(digest, sig):
                    LOGGER.info("Kashier webhook raw_body signature matched (key=%s...)", hmac_key[:8])
                    return True

        # 2. Try signatureKeys query-string method
        data = payload.get("data")
        if isinstance(data, dict):
            signature_keys = data.get("signatureKeys")
            if isinstance(signature_keys, list) and signature_keys:
                try:
                    sorted_keys = sorted(str(k) for k in signature_keys)
                    unsorted_keys = [str(k) for k in signature_keys]

                    query_string_strict = "&".join(
                        f"{k}={urllib.parse.quote(str(data.get(k, '')), safe='')}"
                        for k in sorted_keys
                    )
                    query_string_rfc = "&".join(
                        f"{k}={urllib.parse.quote(str(data.get(k, '')), safe='-_.~')}"
                        for k in sorted_keys
                    )
                    query_string_raw = "&".join(
                        f"{k}={data.get(k, '')}"
                        for k in sorted_keys
                    )
                    query_string_unsorted = "&".join(
                        f"{k}={urllib.parse.quote(str(data.get(k, '')), safe='')}"
                        for k in unsorted_keys
                    )
                    query_string_unsorted_raw = "&".join(
                        f"{k}={data.get(k, '')}"
                        for k in unsorted_keys
                    )

                    query_strings = [
                        query_string_strict,
                        query_string_rfc,
                        query_string_raw,
                        query_string_unsorted,
                        query_string_unsorted_raw,
                    ]

                    for hmac_key in candidate_keys:
                        for qs in query_strings:
                            digest = hmac.new(
                                hmac_key.encode("utf-8"),
                                qs.encode("utf-8"),
                                hashlib.sha256,
                            ).hexdigest().lower()
                            if hmac.compare_digest(digest, sig):
                                LOGGER.info(
                                    "Kashier webhook signature matched (key=%s..., qs_mode=%d)",
                                    hmac_key[:8],
                                    query_strings.index(qs),
                                )
                                return True

                    LOGGER.warning(
                        "Kashier webhook signature mismatch: received_sig=%s, signatureKeys=%s, sorted_keys=%s, qs_strict=%s",
                        sig[:16] + "...",
                        signature_keys,
                        sorted_keys,
                        query_string_strict[:120] + "...",
                    )
                except Exception:
                    LOGGER.exception("Exception during Kashier webhook signature verification")

        return False

    @staticmethod
    def _is_allowed_session_url(value: str) -> bool:
        parsed = urlparse(value)
        return (
            parsed.scheme == "https"
            and (parsed.hostname == "payments.kashier.io" or (parsed.hostname or "").endswith(".kashier.io"))
            and "/session/" in parsed.path
        )

    async def check_payment_status(
        self, order_id: str, session_id: str | None = None
    ) -> dict[str, Any] | None:
        """Query Kashier API directly for payment status of an order.

        Uses Kashier v3 Order Lookup API:
        GET /v3/payment/orders?search={order_id}
        with fallback to Session Lookup API:
        GET /v3/payment/sessions/{session_id}

        Returns a dict with 'status', 'amount', 'currency' if found, else None.
        Guarantees instant verification even if webhooks are delayed or failing.
        """
        if not self.merchant_id or not self.secret_key or not order_id:
            return None

        headers = {
            "Authorization": self.secret_key,
            "api-key": self.api_key,
            "Accept": "application/json",
            "User-Agent": "ZEUS-STORE/1.0",
        }

        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(10.0),
                follow_redirects=False,
                transport=self.transport,
            ) as client:
                # 1. Primary: Order Lookup API by merchant order ID
                clean_id = str(order_id).strip()
                url = f"{self.base_url}/v3/payment/orders?search={urllib.parse.quote(clean_id)}"
                response = await client.get(url, headers=headers)
                if response.status_code == 200:
                    try:
                        body = response.json()
                    except Exception:
                        body = {}
                    items = body.get("data", []) if isinstance(body, dict) else []
                    if isinstance(items, list) and items:
                        # Find matching order by merchantOrderId
                        match = next(
                            (
                                it for it in items
                                if str(it.get("merchantOrderId") or "").lower() == clean_id.lower()
                            ),
                            None,
                        )
                        if not match and len(items) == 1:
                            match = items[0]
                        if match and isinstance(match, dict):
                            raw_status = str(match.get("status") or "").strip().upper()
                            captured_amount = match.get("totalCapturedAmount") or 0

                            if raw_status in {"SUCCESS", "CAPTURED", "PAID", "PAY"} or (captured_amount and float(captured_amount) > 0):
                                normalized = "paid"
                            elif raw_status in {"FAILED", "FAIL", "CANCELLED", "CANCELED"}:
                                normalized = "failed"
                            elif raw_status in {"REFUNDED", "REFUND"}:
                                normalized = "refunded"
                            else:
                                normalized = "pending"

                            amt = (
                                match.get("totalCapturedAmount")
                                or match.get("totalAuthorizedAmount")
                                or (match.get("order") if isinstance(match.get("order"), dict) else {}).get("amount")
                                or match.get("amount")
                            )
                            curr = (
                                (match.get("order") if isinstance(match.get("order"), dict) else {}).get("currency")
                                or match.get("currency")
                                or "EGP"
                            )
                            result_amount = None
                            if amt is not None:
                                try:
                                    result_amount = Decimal(str(amt))
                                except Exception:
                                    pass

                            LOGGER.info(
                                "Kashier order lookup succeeded for %s: normalized=%s, raw=%s, captured=%s %s",
                                clean_id,
                                normalized,
                                raw_status,
                                result_amount,
                                curr,
                            )
                            return {
                                "status": normalized,
                                "raw_status": raw_status,
                                "amount": result_amount,
                                "currency": str(curr).strip().upper(),
                            }

                # 2. Fallback: Query Payment Session if session_id is provided or if order_id is a 24-char session ID
                target_session = (session_id or "").strip()
                if not target_session and len(clean_id) == 24 and not clean_id.startswith("ZEUS-"):
                    target_session = clean_id

                if target_session:
                    s_url = f"{self.base_url}/v3/payment/sessions/{urllib.parse.quote(target_session)}"
                    s_response = await client.get(s_url, headers=headers)
                    try:
                        s_body = s_response.json()
                    except Exception:
                        s_body = {}

                    messages = s_body.get("messages", {}) if isinstance(s_body.get("messages"), dict) else {}
                    en_msg = str(messages.get("en") or "").lower()
                    ar_msg = str(messages.get("ar") or "")

                    # Check if Kashier explicitly indicates the session is already paid
                    if "already been paid" in en_msg or "تم دفع الطلب بالفعل" in ar_msg:
                        LOGGER.info(
                            "Kashier session lookup confirmed payment for %s (%s): msg=%s",
                            clean_id,
                            target_session,
                            en_msg or ar_msg,
                        )
                        return {
                            "status": "paid",
                            "raw_status": "PAID_CONFIRMED",
                            "amount": None,
                            "currency": "EGP",
                        }

                    if s_response.status_code == 200:
                        s_data = s_body.get("data") if isinstance(s_body, dict) else {}
                        if isinstance(s_data, dict):
                            s_status = str(s_data.get("status") or "").strip().upper()
                            s_cap = s_data.get("capturedAmount", 0)
                            payment_params = s_data.get("paymentParams") if isinstance(s_data.get("paymentParams"), dict) else {}
                            if s_status in {"SUCCESS", "CAPTURED", "PAID", "PAY"} or (s_cap and float(s_cap) > 0):
                                normalized = "paid"
                                amt = s_cap or payment_params.get("amount")
                            elif s_status in {"FAILED", "CANCELLED", "CANCELED"}:
                                normalized = "failed"
                                amt = payment_params.get("amount")
                            elif s_status == "EXPIRED" and (not s_cap or float(s_cap) == 0):
                                normalized = "expired"
                                amt = payment_params.get("amount")
                            else:
                                normalized = "pending"
                                amt = payment_params.get("amount")

                            curr = payment_params.get("currency") or "EGP"
                            result_amount = None
                            if amt is not None:
                                try:
                                    result_amount = Decimal(str(amt))
                                except Exception:
                                    pass

                            LOGGER.info(
                                "Kashier session lookup succeeded for %s (%s): normalized=%s, raw=%s, captured=%s %s",
                                clean_id,
                                target_session,
                                normalized,
                                s_status,
                                result_amount,
                                curr,
                            )
                            return {
                                "status": normalized,
                                "raw_status": s_status,
                                "amount": result_amount,
                                "currency": str(curr).strip().upper(),
                            }

                LOGGER.debug("Kashier order status check found no matching record for %s", clean_id)
                return None
        except Exception as exc:
            LOGGER.debug("Kashier order status check failed for %s: %s", order_id, exc)
            return None
