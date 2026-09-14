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

import httpx


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
    ) -> bool:
        """Verify the HMAC-SHA256 signature of an incoming Kashier webhook."""
        if not signature_header or not isinstance(payload, dict):
            return False

        data = payload.get("data")
        if not isinstance(data, dict):
            return False

        signature_keys = data.get("signatureKeys")
        if not isinstance(signature_keys, list) or not signature_keys:
            return False

        try:
            sorted_keys = sorted(str(k) for k in signature_keys)
            query_string = "&".join(
                f"{k}={urllib.parse.quote(str(data.get(k, '')), safe='')}"
                for k in sorted_keys
            )
            expected_digest = hmac.new(
                self.api_key.encode("utf-8"),
                query_string.encode("utf-8"),
                hashlib.sha256,
            ).hexdigest()
            return hmac.compare_digest(expected_digest.lower(), signature_header.strip().lower())
        except Exception:
            return False

    @staticmethod
    def _is_allowed_session_url(value: str) -> bool:
        parsed = urlparse(value)
        return (
            parsed.scheme == "https"
            and (parsed.hostname == "payments.kashier.io" or (parsed.hostname or "").endswith(".kashier.io"))
            and "/session/" in parsed.path
        )
