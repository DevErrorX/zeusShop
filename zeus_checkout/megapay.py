"""Minimal validated client for MegaPay's direct-payment endpoint."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any
from urllib.parse import urlparse

import httpx


class MegaPayError(RuntimeError):
    """Raised when MegaPay cannot create a trustworthy payment URL."""


@dataclass(frozen=True, slots=True)
class MegaPayPayment:
    """Validated subset of a MegaPay create-payment response."""

    payment_id: str
    payment_url: str
    short_code: str | None
    amount: int
    currency: str


class MegaPayClient:
    """Create direct MegaPay transactions without exposing merchant data to JS."""

    def __init__(
        self,
        *,
        api_url: str,
        merchant_id: str,
        provider_secret: str = "",
        timeout_seconds: float = 15.0,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self.api_url = api_url
        self.merchant_id = merchant_id
        self.provider_secret = provider_secret
        self.timeout_seconds = timeout_seconds
        self.transport = transport

    async def create_payment(
        self,
        *,
        amount_iqd: int,
        title: str,
        customer_name: str,
        is_domestic: bool,
        callback_url: str,
    ) -> MegaPayPayment:
        """Request one direct-payment link and validate all critical fields."""
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Origin": "https://mega-pay.cc",
            "Referer": "https://mega-pay.cc/",
            "User-Agent": "ZEUS-STORE/1.0",
            "X-Merchant-Id": self.merchant_id,
        }
        if self.provider_secret:
            headers["X-Api-Key"] = self.provider_secret
        payload = {
            "amount": amount_iqd,
            "currency": "IQD",
            "title": title,
            "customer_name": customer_name,
            "type": "direct",
            "is_domestic": is_domestic,
            "callback_url": callback_url,
        }

        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(self.timeout_seconds),
                follow_redirects=False,
                transport=self.transport,
            ) as client:
                response = await client.post(
                    self.api_url, headers=headers, json=payload
                )
        except httpx.HTTPError as exc:
            raise MegaPayError("MegaPay is temporarily unreachable") from exc

        if response.status_code >= 400:
            raise MegaPayError(
                f"MegaPay rejected payment creation with HTTP {response.status_code}"
            )

        try:
            body: Any = response.json()
        except ValueError as exc:
            raise MegaPayError("MegaPay returned invalid JSON") from exc
        if not isinstance(body, dict) or body.get("success") is False:
            raise MegaPayError("MegaPay did not accept the payment")

        payment_id = str(body.get("payment_id") or "").strip()
        payment_url = str(
            body.get("payment_url") or body.get("megaPayUrl") or ""
        ).strip()
        short_code_raw = body.get("short_code")
        short_code = str(short_code_raw).strip() if short_code_raw else None

        if not payment_id or len(payment_id) > 128:
            raise MegaPayError("MegaPay returned an invalid payment ID")
        if not self._is_allowed_payment_url(payment_url):
            raise MegaPayError("MegaPay returned an invalid payment URL")

        returned_amount = body.get("amount", amount_iqd)
        returned_currency = str(body.get("currency", "IQD")).upper()
        try:
            returned_amount_int = int(returned_amount)
        except (TypeError, ValueError) as exc:
            raise MegaPayError("MegaPay returned an invalid amount") from exc
        if returned_amount_int != amount_iqd or returned_currency != "IQD":
            raise MegaPayError("MegaPay returned mismatched payment details")

        return MegaPayPayment(
            payment_id=payment_id,
            payment_url=payment_url,
            short_code=short_code,
            amount=returned_amount_int,
            currency=returned_currency,
        )

    @staticmethod
    def _is_allowed_payment_url(value: str) -> bool:
        parsed = urlparse(value)
        return (
            parsed.scheme == "https"
            and parsed.hostname == "mega-pay.cc"
            and parsed.path.startswith("/pay/")
        )
