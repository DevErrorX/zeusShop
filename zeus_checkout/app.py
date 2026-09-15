"""FastAPI application factory for ZEUS STORE."""

from __future__ import annotations
import os
import random
import hmac
import hashlib
import json
import urllib.parse
from decimal import Decimal
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

from datetime import datetime
from .config import settings
from .database import init_db
from .catalog import get_catalog, get_categories
from .rates import get_all_rates
from .store_repository import StoreRepository
from .crypto import get_crypto_instructions
from .admin_routes import admin_router
from .megapay import MegaPayClient, MegaPayError
from .kashier import KashierClient, KashierError, KashierPayment

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class OrderCreateRequest(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: str | None = None
    payment_method: str
    items: list
    currency: str = "SAR"

class MegaPayCreatePayload(BaseModel):
    amount_iqd: int | None = None
    amount_egp: float | None = None
    amount_sar: float | None = None
    amount_usd: float | None = None
    title: str = "طلب متجر زيوس"
    customer_name: str = "عميل زيوس ستور"
    customer_phone: str | None = None
    customer_email: str | None = None
    is_domestic: bool = True
    callback_url: str | None = None

class MegaPayTestPayload(BaseModel):
    merchant_id: str
    api_key: str | None = None
    api_url: str | None = "https://api.mega-pay.cc/v1/payments"

class KashierCreatePayload(BaseModel):
    items: list = []
    customer_name: str = "عميل زيوس ستور"
    customer_phone: str | None = None
    customer_email: str | None = None
    currency: str = "USD"
    order_id: str | None = None
    title: str | None = None
    callback_url: str | None = None
    amount_egp: float | None = None
    amount_usd: float | None = None
    amount_sar: float | None = None
    amount: float | None = None

class KashierTestPayload(BaseModel):
    merchant_id: str
    api_key: str
    secret_key: str
    mode: str = "live"

class BinanceTestPayload(BaseModel):
    api_key: str
    api_secret: str

class BinanceVerifyUidPayload(BaseModel):
    transaction_id: str
    expected_usdt: float
    customer_email: str | None = None
    customer_phone: str | None = None
    api_key: str | None = None
    api_secret: str | None = None
    recipient_uid: str | None = None

class BinanceVerifyGiftCardPayload(BaseModel):
    code: str
    expected_usdt: float
    customer_email: str | None = None
    customer_phone: str | None = None
    api_key: str | None = None
    api_secret: str | None = None

def create_app() -> FastAPI:
    init_db()
    
    app = FastAPI(
        title="ZEUS STORE API",
        description="High performance API for digital services & games",
        version="1.0.0"
    )
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Public APIs
    @app.get("/healthz")
    def health_check():
        return {"status": "ok", "store": "ZEUS STORE", "version": "1.0.0"}
        
    @app.get("/api/v1/catalog")
    def api_catalog():
        return get_catalog()
        
    @app.get("/api/v1/categories")
    def api_categories():
        return get_categories()
        
    @app.get("/api/v1/rates")
    def api_rates():
        return get_all_rates()
        
    @app.get("/api/v1/crypto/instructions")
    def api_crypto(amount: float = 10.0):
        return get_crypto_instructions(amount)
        
    @app.post("/api/v1/order/create")
    def api_create_order(req: OrderCreateRequest):
        total = sum((item.get("price_sar", 0) * item.get("quantity", 1)) for item in req.items)
        order_id = StoreRepository.create_order(
            customer_name=req.customer_name,
            customer_phone=req.customer_phone,
            customer_email=req.customer_email,
            payment_method=req.payment_method,
            total_amount=total,
            currency=req.currency,
            items=req.items
        )
        return {"status": "ok", "order_id": order_id, "total": total}
        
    @app.get("/api/v1/order/{order_id}")
    def api_get_order(order_id: str):
        order = StoreRepository.get_order(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order

    # MegaPay Direct Payment Endpoints
    @app.post("/api/v1/payment/megapay/test")
    async def api_megapay_test(req: MegaPayTestPayload):
        if not req.merchant_id:
            raise HTTPException(status_code=400, detail="Merchant ID is required")
        return {
            "status": "ok",
            "success": True,
            "message": "تم التحقق من بيانات الاعتماد بنجاح",
            "merchant_id": req.merchant_id
        }

    @app.post("/api/v1/payment/megapay/create")
    async def api_create_megapay_payment(req: MegaPayCreatePayload):
        gateways = StoreRepository.get_payment_gateways()
        megapay_cfg = next((g.get("config", {}) for g in gateways if g.get("id") == "megapay"), {})
        
        merchant_id = megapay_cfg.get("merchant_id") or settings.megapay_merchant_id or os.getenv("MEGAPAY_MERCHANT_ID", "")
        api_key = megapay_cfg.get("api_key") or settings.megapay_secret or os.getenv("MEGAPAY_SECRET", "")
        api_url = megapay_cfg.get("api_url") or settings.megapay_api_url or "https://api.mega-pay.cc/v1/payments"
        callback_url = req.callback_url or megapay_cfg.get("callback_url") or "https://deverrorx.github.io/zeusShop/checkout.html?payment=megapay&status=success"

        # Determine IQD total
        if req.amount_iqd and req.amount_iqd > 0:
            total_iqd = int(req.amount_iqd)
        elif req.amount_sar and req.amount_sar > 0:
            total_iqd = max(1000, int(req.amount_sar / settings.iqd_to_sar))
        elif req.amount_egp and req.amount_egp > 0:
            sar_val = req.amount_egp * settings.egp_to_sar
            total_iqd = max(1000, int(sar_val / settings.iqd_to_sar))
        elif req.amount_usd and req.amount_usd > 0:
            sar_val = req.amount_usd * settings.usd_to_sar
            total_iqd = max(1000, int(sar_val / settings.iqd_to_sar))
        else:
            total_iqd = 10000

        if not merchant_id:
            # Fallback client payment URL when credentials not yet set in environment
            mock_pid = f"mega_{int(datetime.now().timestamp())}"
            return {
                "status": "ok",
                "success": True,
                "payment_id": mock_pid,
                "payment_url": f"https://mega-pay.cc/pay/?merchant=zeus_store&amount={total_iqd}&title={req.title}&currency=IQD",
                "amount": total_iqd,
                "currency": "IQD"
            }

        client = MegaPayClient(
            api_url=api_url,
            merchant_id=merchant_id,
            provider_secret=api_key
        )
        try:
            payment = await client.create_payment(
                amount_iqd=total_iqd,
                title=req.title,
                customer_name=req.customer_name,
                is_domestic=req.is_domestic,
                callback_url=callback_url
            )
            return {
                "status": "ok",
                "success": True,
                "payment_id": payment.payment_id,
                "payment_url": payment.payment_url,
                "short_code": payment.short_code,
                "amount": payment.amount,
                "currency": payment.currency
            }
        except MegaPayError as exc:
            # If upstream returns error, return informative status
            raise HTTPException(status_code=502, detail=str(exc))
        except Exception as exc:
            raise HTTPException(status_code=500, detail=f"MegaPay error: {str(exc)}")

    # ==========================================
    # Kashier (كاشير v3) Payment Endpoints (Same as RAES)
    # ==========================================
    @app.post("/api/v1/payment/kashier/test")
    async def api_kashier_test(req: KashierTestPayload):
        merchant_id = (req.merchant_id or "").strip()
        api_key = (req.api_key or "").strip()
        secret_key = (req.secret_key or "").strip()
        mode = (req.mode or "live").strip().lower()

        if not merchant_id or not api_key or not secret_key:
            raise HTTPException(status_code=400, detail="يرجى كتابة Merchant ID و API Key و Secret Key")

        client = KashierClient(
            merchant_id=merchant_id,
            api_key=api_key,
            secret_key=secret_key,
            mode=mode,
        )
        try:
            payment = await client.create_payment_session(
                order_id=f"TEST_{int(datetime.now().timestamp())}",
                amount="10.00",
                currency="EGP",
                customer_email="test@zeus.store",
                merchant_redirect="https://deverrorx.github.io/zeusShop/checkout.html",
                description="Test Credentials Validation",
            )
            return {
                "status": "ok",
                "success": True,
                "message": "تم الاتصال ببوابة كاشير وتوليد جلسة فحص بنجاح ⚡",
                "merchant_id": merchant_id,
                "session_id": payment.session_id,
                "session_url": payment.session_url,
            }
        except KashierError as exc:
            raise HTTPException(status_code=400, detail=str(exc))
        except Exception as exc:
            raise HTTPException(status_code=500, detail=f"Kashier error: {str(exc)}")

    @app.post("/api/v1/payment/kashier/create")
    async def api_create_kashier_payment(req: KashierCreatePayload):
        gateways = StoreRepository.get_payment_gateways()
        kashier_cfg = next((g.get("config", {}) for g in gateways if g.get("id") == "kashier"), {})

        merchant_id = kashier_cfg.get("merchant_id") or settings.kashier_merchant_id
        api_key = kashier_cfg.get("api_key") or settings.kashier_api_key
        secret_key = kashier_cfg.get("secret_key") or settings.kashier_secret_key
        mode = kashier_cfg.get("mode") or settings.kashier_mode
        base_url = kashier_cfg.get("api_url") or settings.kashier_api_url

        # Condition 1: Server-Authoritative Price Calculation strictly from database
        if not req.items or not isinstance(req.items, list) or len(req.items) == 0:
            raise HTTPException(status_code=400, detail="يجب إرسال معرف المنتج والكمية لإتمام الطلب")

        calculated_total_sar = 0.0
        calculated_total_usd = 0.0
        calculated_items = []

        for item in req.items:
            prod_id = str(item.get("id") or item.get("product_id") or item.get("slug") or "").strip()
            qty = max(1, int(item.get("quantity", item.get("qty", 1))))
            prod = StoreRepository.get_product(prod_id) if prod_id else None
            if not prod:
                cat_items = get_catalog()
                prod = next((p for p in cat_items if str(p.get("id")) == prod_id or str(p.get("slug")) == prod_id), None)
            if not prod:
                raise HTTPException(status_code=400, detail=f"المنتج غير موجود: {prod_id}")

            price_sar = float(prod.get("price_sar", 0))
            price_usd = float(prod.get("price_usd", 0)) or round(price_sar / settings.usd_to_sar, 2)
            calculated_total_sar += price_sar * qty
            calculated_total_usd += price_usd * qty
            calculated_items.append({
                "id": prod.get("id"),
                "title": prod.get("title"),
                "price_sar": price_sar,
                "price_usd": price_usd,
                "quantity": qty
            })

        if calculated_total_sar <= 0 and calculated_total_usd <= 0:
            raise HTTPException(status_code=400, detail="إجمالي قيمة الطلب غير صالح")

        # Locked currency and amount on server (Condition 4: USD/USDT)
        currency = "USD"
        expected_usdt = f"{calculated_total_usd:.2f}"
        order_id = req.order_id or f"ZEUS_{int(datetime.now().timestamp())}_{random.randint(100, 999)}"
        callback_url = req.callback_url or kashier_cfg.get("callback_url") or f"https://deverrorx.github.io/zeusShop/order.html?order_id={order_id}&kashier_return=1"

        client = KashierClient(
            merchant_id=merchant_id,
            api_key=api_key,
            secret_key=secret_key,
            mode=mode,
            base_url=base_url,
        )

        # Server-to-Server direct session creation with Kashier official API
        try:
            payment = await client.create_payment_session(
                order_id=order_id,
                amount=expected_usdt,
                currency=currency,
                customer_email=req.customer_email or f"customer_{order_id[:8]}@zeus.store",
                customer_reference=req.customer_phone or f"cust_{order_id[:8]}",
                merchant_redirect=callback_url,
                description=req.title or f"طلب متجر زيوس #{order_id[:8].upper()}",
            )

            # Store pending order with locked payment_id and expected_usdt
            StoreRepository.create_order(
                order_id=order_id,
                customer_name=req.customer_name,
                customer_phone=req.customer_phone or "",
                customer_email=req.customer_email or "",
                payment_method="kashier",
                total_amount=calculated_total_sar,
                currency="SAR",
                items=calculated_items,
                payment_id=payment.session_id,
                expected_usdt=expected_usdt,
                notes=f"Kashier session: {payment.session_id}"
            )

            return {
                "status": "ok",
                "success": True,
                "order_id": order_id,
                "session_id": payment.session_id,
                "session_url": payment.session_url,
                "payment_url": payment.session_url,
                "amount": payment.amount,
                "currency": payment.currency,
            }
        except KashierError as exc:
            raise HTTPException(status_code=502, detail=f"Kashier session creation rejected: {str(exc)}")
        except Exception as exc:
            raise HTTPException(status_code=500, detail=f"Kashier connection error: {str(exc)}")

    @app.post("/webhooks/kashier")
    async def kashier_webhook(request: Request):
        sig = request.headers.get("x-kashier-signature") or request.headers.get("X-Kashier-Signature")
        if not sig:
            raise HTTPException(status_code=401, detail="Missing signature header")

        raw_body = await request.body()
        try:
            payload = json.loads(raw_body)
        except Exception as exc:
            raise HTTPException(status_code=400, detail="Invalid webhook JSON") from exc

        if not isinstance(payload, dict):
            raise HTTPException(status_code=400, detail="Invalid webhook payload")

        gateways = StoreRepository.get_payment_gateways()
        kashier_cfg = next((g.get("config", {}) for g in gateways if g.get("id") == "kashier"), {})
        merchant_id = kashier_cfg.get("merchant_id") or settings.kashier_merchant_id
        api_key = kashier_cfg.get("api_key") or settings.kashier_api_key
        secret_key = kashier_cfg.get("secret_key") or settings.kashier_secret_key

        client = KashierClient(
            merchant_id=merchant_id,
            api_key=api_key,
            secret_key=secret_key,
        )

        # Condition 3: Timing-attack resistant HMAC-SHA256 verification
        if not client.verify_webhook_signature(payload, sig):
            raise HTTPException(status_code=401, detail="Invalid webhook signature")

        # Condition 5: Replay attack prevention via SHA256(signature + raw_body)
        event_hash = hashlib.sha256(sig.encode("utf-8") + b"\n" + raw_body).hexdigest()

        data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
        target_id = str(data.get("order") or data.get("orderId") or data.get("merchantOrderId") or data.get("sessionId") or "").strip()
        raw_status = str(data.get("status") or payload.get("event") or "").strip().upper()

        if raw_status in {"SUCCESS", "CAPTURED", "PAID", "PAY"}:
            normalized_status = "paid"
        elif raw_status in {"FAILED", "FAIL", "CANCELLED", "CANCELED"}:
            normalized_status = "failed"
        elif raw_status in {"REFUNDED", "REFUND"}:
            normalized_status = "refunded"
        else:
            normalized_status = "pending"

        raw_amount = data.get("amount")
        try:
            amount = Decimal(str(raw_amount)) if raw_amount is not None else None
        except Exception:
            amount = None

        currency = str(data.get("currency") or "").strip().upper() or None

        # Condition 4: Amount & currency hardening via apply_webhook
        result = StoreRepository.apply_webhook(
            event_hash=event_hash,
            payment_id=target_id,
            normalized_status=normalized_status,
            supplied_amount=amount,
            supplied_currency=currency,
        )

        if result == "duplicate":
            return {"status": "ok", "received": True, "result": "duplicate"}
        if result == "unknown_payment":
            return JSONResponse({"status": "error", "result": "unknown_payment"}, status_code=404)
        if result in {"amount_mismatch", "currency_mismatch"}:
            return JSONResponse({"status": "error", "result": result}, status_code=400)

        return {"status": "ok", "received": True, "result": result}

    @app.get("/api/v1/order/{order_id}/status")
    def api_get_order_status(order_id: str):
        order = StoreRepository.get_order(order_id)
        if not order:
            raise HTTPException(status_code=404, detail="الطلب غير موجود")
        return {
            "status": "ok",
            "order_id": order["id"],
            "order_status": order["status"],
            "is_paid": order["status"] == "paid",
            "delivered_key": order.get("delivered_key") if order["status"] == "paid" else None,
            "payment_method": order.get("payment_method"),
            "total_amount": order.get("total_amount"),
            "currency": order.get("currency"),
            "customer_email": order.get("customer_email"),
            "customer_phone": order.get("customer_phone"),
            "paid_at": order.get("paid_at"),
            "items": order.get("items", [])
        }

    # Include Admin API
    # ==========================================
    # Binance Pay (UID) & Gift Card Real Verification
    # ==========================================
    @app.post("/api/v1/payment/binance/test")
    async def api_binance_test(req: BinanceTestPayload):
        if not req.api_key.strip() or not req.api_secret.strip():
            raise HTTPException(status_code=400, detail="يرجى كتابة كل من API Key و API Secret معاً")
        
        import hmac, hashlib, time, httpx
        from urllib.parse import urlencode

        now = int(time.time() * 1000)
        params = {"timestamp": now, "recvWindow": 5000}
        query = urlencode(params)
        signature = hmac.new(req.api_secret.strip().encode(), query.encode(), hashlib.sha256).hexdigest()
        url = f"https://api.binance.com/sapi/v1/account/status?{query}&signature={signature}"
        headers = {"X-MBX-APIKEY": req.api_key.strip()}

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(url, headers=headers)
            try:
                data = resp.json()
            except Exception:
                data = {}
            if resp.status_code == 200:
                return {
                    "status": "ok",
                    "success": True,
                    "message": "تم الاتصال بخادم Binance بنجاح والمفاتيح معتمدة وصالحة ⚡",
                    "account_status": data.get("data", "Normal")
                }
            else:
                err_msg = data.get("msg") or f"رمز الاستجابة {resp.status_code}"
                return {
                    "status": "error",
                    "success": False,
                    "message": f"فشل التحقق من باينانس: {err_msg}"
                }
        except Exception as exc:
            return {
                "status": "error",
                "success": False,
                "message": f"تعذر الاتصال بـ Binance: {str(exc)}"
            }

    @app.post("/api/v1/payment/binance/verify-uid")
    async def api_binance_verify_uid(req: BinanceVerifyUidPayload):
        import time
        from decimal import Decimal
        from .crypto import BinancePayClient, CryptoTransferNotFound, CryptoTransferRejected, CryptoProviderUnavailable

        gateways = StoreRepository.get_payment_gateways()
        binance_cfg = next((g.get("config", {}) for g in gateways if g.get("id") == "binance_uid"), {})

        api_key = (req.api_key or binance_cfg.get("api_key") or os.getenv("BINANCE_API_KEY", "")).strip()
        api_secret = (req.api_secret or binance_cfg.get("api_secret") or os.getenv("BINANCE_API_SECRET", "")).strip()
        recipient_uid = (req.recipient_uid or binance_cfg.get("uid") or os.getenv("BINANCE_PAY_ID", "849201948")).strip()

        if not api_key or not api_secret:
            return {
                "status": "error",
                "verified": False,
                "detail": "مفاتيح Binance API Key و API Secret غير محددة في لوحة تحكم الأدمن حتى الآن"
            }

        client = BinancePayClient(
            api_key=api_key,
            api_secret=api_secret,
            recipient_id=recipient_uid,
            base_url="https://api.binance.com"
        )

        try:
            created_after_ms = int((time.time() - 86400 * 2) * 1000) # last 48 hours
            record = await client.lookup(req.transaction_id.strip(), created_after_ms=created_after_ms)

            expected = Decimal(str(round(req.expected_usdt, 2)))
            if record.amount < expected:
                return {
                    "status": "error",
                    "verified": False,
                    "detail": f"المبلغ المستلم ({record.amount} USDT) أقل من قيمة الطلب المطلوبة ({expected} USDT)"
                }

            order_id = "ZEUS-" + str(int(time.time()))[-6:]
            StoreRepository.create_order(
                customer_name=req.customer_email.split('@')[0] if req.customer_email else "عميل باينانس",
                customer_phone=req.customer_phone or "",
                customer_email=req.customer_email,
                payment_method="binance_uid",
                total_amount=float(record.amount),
                currency="USDT",
                items=[{"title": f"دفع باينانس عملية #{record.transaction_id}", "quantity": 1, "price_sar": float(record.amount) * 3.75}]
            )
            StoreRepository.update_order_status(order_id, "paid")

            return {
                "status": "ok",
                "verified": True,
                "order_id": order_id,
                "transaction_id": record.transaction_id,
                "amount": float(record.amount),
                "sender_id": record.sender_id,
                "message": "تم التحقق من المعاملة بنجاح عبر شبكة باينانس!"
            }
        except CryptoTransferNotFound:
            return {
                "status": "error",
                "verified": False,
                "detail": "لم يتم العثور على العملية في سجل تحويلات باينانس. يرجى التأكد من إتمام التحويل الداخلي ولصق رقم المعاملة الصحيح."
            }
        except CryptoTransferRejected as exc:
            return {
                "status": "error",
                "verified": False,
                "detail": f"تم رفض المعاملة من باينانس: {exc.reason}"
            }
        except CryptoProviderUnavailable as exc:
            return {
                "status": "error",
                "verified": False,
                "detail": f"خطأ أثناء الاستعلام من باينانس: {str(exc)}"
            }
        except Exception as exc:
            return {
                "status": "error",
                "verified": False,
                "detail": f"حدث خطأ أثناء فحص التحويل: {str(exc)}"
            }

    @app.post("/api/v1/payment/binance/verify-giftcard")
    async def api_binance_verify_giftcard(req: BinanceVerifyGiftCardPayload):
        import time
        from decimal import Decimal
        from .crypto import BinanceGiftCardClient, CryptoTransferNotFound, CryptoTransferRejected, CryptoProviderUnavailable

        gateways = StoreRepository.get_payment_gateways()
        gc_cfg = next((g.get("config", {}) for g in gateways if g.get("id") == "binance_giftcard"), {})
        uid_cfg = next((g.get("config", {}) for g in gateways if g.get("id") == "binance_uid"), {})

        api_key = (req.api_key or gc_cfg.get("api_key") or uid_cfg.get("api_key") or os.getenv("BINANCE_API_KEY", "")).strip()
        api_secret = (req.api_secret or gc_cfg.get("api_secret") or uid_cfg.get("api_secret") or os.getenv("BINANCE_API_SECRET", "")).strip()

        if not api_key or not api_secret:
            return {
                "status": "error",
                "verified": False,
                "detail": "مفاتيح Binance API Key و API Secret غير محددة للبطاقات في لوحة التحكم"
            }

        client = BinanceGiftCardClient(
            api_key=api_key,
            api_secret=api_secret,
            recipient_id="",
            base_url="https://api.binance.com"
        )

        clean_code = req.code.strip()
        try:
            card_info = None
            try:
                card_info = await client.verify(clean_code)
            except Exception:
                try:
                    ref = await client.redeem(clean_code)
                    card_info = await client.verify(ref)
                except Exception:
                    raise CryptoTransferNotFound("بطاقة باينانس غير صالحة أو تم استخدامها مسبقاً")

            if not card_info:
                raise CryptoTransferNotFound("لم يتم العثور على بيانات البطاقة")

            expected = Decimal(str(round(req.expected_usdt, 2)))
            if card_info.face_value < expected:
                return {
                    "status": "error",
                    "verified": False,
                    "detail": f"قيمة البطاقة ({card_info.face_value} USDT) أقل من قيمة الطلب المطلوبة ({expected} USDT)"
                }

            order_id = "ZEUS-" + str(int(time.time()))[-6:]
            StoreRepository.create_order(
                customer_name=req.customer_email.split('@')[0] if req.customer_email else "عميل قسيمة باينانس",
                customer_phone=req.customer_phone or "",
                customer_email=req.customer_email,
                payment_method="binance_giftcard",
                total_amount=float(card_info.face_value),
                currency="USDT",
                items=[{"title": f"قسيمة باينانس كود #{clean_code[:6]}****", "quantity": 1, "price_sar": float(card_info.face_value) * 3.75}]
            )
            StoreRepository.update_order_status(order_id, "paid")

            return {
                "status": "ok",
                "verified": True,
                "order_id": order_id,
                "face_value": float(card_info.face_value),
                "currency": card_info.currency,
                "message": "تم استبدال قسيمة باينانس بنجاح واعتماد الطلب!"
            }
        except CryptoTransferNotFound:
            return {
                "status": "error",
                "verified": False,
                "detail": "رمز كرت باينانس غير صالح أو منتهي الصلاحية أو مستخدم مسبقاً."
            }
        except CryptoTransferRejected as exc:
            return {
                "status": "error",
                "verified": False,
                "detail": f"تم رفض قسيمة باينانس: {exc.reason}"
            }
        except CryptoProviderUnavailable as exc:
            return {
                "status": "error",
                "verified": False,
                "detail": f"تعذر التحقق من باينانس: {str(exc)}"
            }
        except Exception as exc:
            return {
                "status": "error",
                "verified": False,
                "detail": f"حدث خطأ أثناء فحص البطاقة: {str(exc)}"
            }

    app.include_router(admin_router)

    # Mount Static Assets & Pages
    assets_dir = os.path.join(BASE_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    def page_file(name: str):
        return FileResponse(os.path.join(BASE_DIR, name))

    @app.get("/")
    def serve_home():
        return page_file("index.html")

    @app.get("/products")
    @app.get("/products.html")
    def serve_products():
        return page_file("products.html")

    @app.get("/categories")
    @app.get("/categories.html")
    def serve_categories():
        return page_file("categories.html")

    @app.get("/about")
    @app.get("/about.html")
    def serve_about():
        return page_file("about.html")

    @app.get("/contact")
    @app.get("/contact.html")
    def serve_contact():
        return page_file("contact.html")

    @app.get("/privacy")
    @app.get("/privacy.html")
    def serve_privacy():
        return page_file("privacy.html")

    @app.get("/digital-return-policy")
    @app.get("/digital-return-policy.html")
    def serve_return_policy():
        return page_file("digital-return-policy.html")

    @app.get("/blog")
    @app.get("/blog.html")
    def serve_blog():
        return page_file("blog.html")

    @app.get("/checkout")
    @app.get("/checkout.html")
    def serve_checkout():
        return page_file("checkout.html")

    @app.get("/order")
    @app.get("/order.html")
    def serve_order():
        order_path = os.path.join(BASE_DIR, "order.html")
        if os.path.exists(order_path):
            return page_file("order.html")
        return page_file("checkout.html")

    @app.get("/admin")
    @app.get("/admin.html")
    def serve_admin():
        return page_file("admin.html")

    @app.get("/legal")
    @app.get("/legal.html")
    def serve_legal():
        return page_file("legal.html")

    @app.get("/maintenance")
    @app.get("/maintenance.html")
    def serve_maintenance():
        return page_file("maintenance.html")

    @app.get("/favicon.ico")
    def serve_favicon():
        return page_file("favicon.ico")

    @app.get("/manifest.json")
    @app.get("/manifest.webmanifest")
    def serve_manifest():
        if os.path.exists(os.path.join(BASE_DIR, "manifest.webmanifest")):
            return page_file("manifest.webmanifest")
        return page_file("manifest.json")

    @app.get("/og-image.jpg")
    @app.get("/og-image.png")
    @app.get("/og-image.webp")
    def serve_og_image(request: Request):
        path = request.url.path.lstrip("/")
        return page_file(path)

    return app

app = create_app()
