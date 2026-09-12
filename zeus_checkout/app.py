"""FastAPI application factory for ZEUS STORE."""

from __future__ import annotations
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from .config import settings
from .database import init_db
from .catalog import get_catalog, get_categories
from .rates import get_all_rates
from .store_repository import StoreRepository
from .crypto import get_crypto_instructions
from .admin_routes import admin_router

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class OrderCreateRequest(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: str | None = None
    payment_method: str
    items: list
    currency: str = "SAR"

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

    # Include Admin API
    app.include_router(admin_router)

    # Mount Static Assets & Pages
    assets_dir = os.path.join(BASE_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
        
    @app.get("/")
    def serve_home():
        return FileResponse(os.path.join(BASE_DIR, "index.html"))
        
    @app.get("/checkout.html")
    def serve_checkout():
        return FileResponse(os.path.join(BASE_DIR, "checkout.html"))
        
    @app.get("/admin.html")
    def serve_admin():
        return FileResponse(os.path.join(BASE_DIR, "admin.html"))
        
    @app.get("/legal.html")
    def serve_legal():
        return FileResponse(os.path.join(BASE_DIR, "legal.html"))
        
    @app.get("/maintenance.html")
    def serve_maintenance():
        return FileResponse(os.path.join(BASE_DIR, "maintenance.html"))

    return app
