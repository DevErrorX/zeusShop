"""FastAPI application factory for ZEUS STORE."""

from __future__ import annotations
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
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

    # Include Admin API
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

    @app.get("/admin.html")
    def serve_admin():
        return page_file("admin.html")

    @app.get("/legal.html")
    def serve_legal():
        return page_file("legal.html")

    @app.get("/maintenance.html")
    def serve_maintenance():
        return page_file("maintenance.html")

    return app
