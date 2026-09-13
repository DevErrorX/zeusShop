"""Admin routes for ZEUS STORE."""

from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from .admin_auth import verify_admin, generate_session_token
from .store_repository import StoreRepository

admin_router = APIRouter(prefix="/api/v1/admin", tags=["admin"])

class LoginRequest(BaseModel):
    username: str
    password: str

class OrderStatusRequest(BaseModel):
    status: str
    delivered_key: Optional[str] = None

class ProductUpsertRequest(BaseModel):
    id: Optional[str] = None
    title: str
    slug: Optional[str] = None
    category_slug: Optional[str] = "gaming"
    price_sar: float = 0.0
    price_usd: float = 0.0
    price_egp: float = 0.0
    price_usdt: float = 0.0
    original_price_sar: float = 0.0
    image: Optional[str] = "assets/logo-ar.webp"
    badge: Optional[str] = ""
    duration: Optional[str] = "30 يوماً"
    platform: Optional[str] = "الكل"
    in_stock: bool = True
    featured: bool = False
    description: Optional[str] = ""
    features: Optional[List[str]] = []

class CategoryUpsertRequest(BaseModel):
    id: Optional[str] = None
    name: str
    slug: Optional[str] = None
    icon: Optional[str] = "fa-solid fa-gamepad"
    count: Optional[int] = 0

class AddKeysRequest(BaseModel):
    product_id: str
    keys: List[str]

class SettingUpdateRequest(BaseModel):
    key: str
    value: str

class PaymentGatewayUpdateRequest(BaseModel):
    id: str
    name: str
    is_active: bool
    config: Dict[str, Any]

@admin_router.post("/login")
def admin_login(req: LoginRequest):
    if verify_admin(req.username, req.password):
        token = generate_session_token(req.username)
        return {"status": "ok", "token": token, "username": req.username}
    raise HTTPException(status_code=401, detail="اسم المستخدم أو كلمة المرور غير صحيحة")

# STATS
@admin_router.get("/stats")
def get_admin_stats():
    return StoreRepository.get_stats()

# ORDERS
@admin_router.get("/orders")
def get_orders(status: Optional[str] = None, limit: int = 100):
    return StoreRepository.list_orders(limit=limit, status_filter=status)

@admin_router.get("/orders/{order_id}")
def get_order_details(order_id: str):
    order = StoreRepository.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    return order

@admin_router.post("/orders/{order_id}/status")
def set_status(order_id: str, req: OrderStatusRequest):
    StoreRepository.update_order_status(order_id, req.status, req.delivered_key)
    return {"status": "updated", "order_id": order_id, "new_status": req.status}

# PRODUCTS
@admin_router.get("/products")
def get_products():
    return StoreRepository.list_products(200)

@admin_router.post("/products")
def save_product(req: ProductUpsertRequest):
    pid = StoreRepository.upsert_product(req.dict())
    return {"status": "ok", "id": pid}

@admin_router.delete("/products/{product_id}")
def remove_product(product_id: str):
    StoreRepository.delete_product(product_id)
    return {"status": "deleted", "id": product_id}

# CATEGORIES
@admin_router.get("/categories")
def get_categories():
    return StoreRepository.list_categories()

@admin_router.post("/categories")
def save_category(req: CategoryUpsertRequest):
    cid = StoreRepository.upsert_category(req.dict())
    return {"status": "ok", "id": cid}

@admin_router.delete("/categories/{category_id}")
def remove_category(category_id: str):
    StoreRepository.delete_category(category_id)
    return {"status": "deleted", "id": category_id}

# DIGITAL KEYS
@admin_router.get("/keys")
def get_keys(product_id: Optional[str] = None):
    return StoreRepository.list_digital_keys(product_id)

@admin_router.post("/keys")
def add_keys(req: AddKeysRequest):
    count = StoreRepository.add_digital_keys(req.product_id, req.keys)
    return {"status": "ok", "added": count}

# SETTINGS
@admin_router.get("/settings")
def get_settings():
    return StoreRepository.get_settings()

@admin_router.post("/settings")
def update_setting(req: SettingUpdateRequest):
    StoreRepository.update_setting(req.key, req.value)
    return {"status": "ok"}

# PAYMENT GATEWAYS
@admin_router.get("/payment-gateways")
def get_payment_gateways():
    return StoreRepository.get_payment_gateways()

@admin_router.post("/payment-gateways")
def save_payment_gateway(req: PaymentGatewayUpdateRequest):
    StoreRepository.update_payment_gateway(req.id, req.name, req.is_active, req.config)
    return {"status": "ok"}

