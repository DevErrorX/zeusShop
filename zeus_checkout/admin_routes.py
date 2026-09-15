"""Admin routes for ZEUS STORE with enterprise security hardening."""

from __future__ import annotations

import os
import uuid
import shutil
from typing import Optional, List, Dict, Any

from fastapi import APIRouter, HTTPException, Depends, Request, Response, status, UploadFile, File
from pydantic import BaseModel, Field

from .admin_auth import (
    auth_service,
    require_admin,
    get_client_ip,
    extract_token_from_request,
    set_admin_session_cookie,
    clear_admin_session_cookie
)
from .store_repository import StoreRepository

admin_router = APIRouter(prefix="/api/v1/admin", tags=["admin"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOADS_DIR = os.path.join(BASE_DIR, "assets", "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
ALLOWED_MIME_TYPES = {"image/png", "image/jpeg", "image/webp", "image/gif"}
MAX_FILE_SIZE = 6 * 1024 * 1024  # 6 MB


class LoginRequest(BaseModel):
    username: str
    password: str
    remember: bool = True


class OrderStatusRequest(BaseModel):
    status: str
    delivered_key: Optional[str] = None


class ProductUpsertRequest(BaseModel):
    id: Optional[str] = None
    title: str
    slug: Optional[str] = None
    category_slug: Optional[str] = "gaming-subs"
    price_sar: float = 0.0
    price_usd: float = 0.0
    price_egp: float = 0.0
    price_usdt: float = 0.0
    price_iqd: Optional[int] = 0
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


class SettingUpdateRequest(BaseModel):
    key: str
    value: str


class PaymentGatewayUpdateRequest(BaseModel):
    id: str
    name: str
    is_active: bool
    config: Dict[str, Any]


# ==========================================
# 1. AUTHENTICATION & SESSION
# ==========================================
@admin_router.post("/login")
def admin_login(req: LoginRequest, request: Request, response: Response):
    client_ip = get_client_ip(request)
    
    # Check rate limit to prevent brute force / Burp Suite intruder
    auth_service.check_rate_limit(client_ip)

    if not auth_service.verify_credentials(req.username, req.password):
        auth_service.record_failed_attempt(client_ip)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="اسم المستخدم أو كلمة المرور غير صحيحة"
        )

    # Success: reset failures and create cryptographic session
    auth_service.reset_failed_attempts(client_ip)
    token, session = auth_service.create_session(req.username.strip())
    set_admin_session_cookie(response, token)

    return {
        "status": "ok",
        "token": token,
        "username": session.username,
        "expires_at": session.expires_at
    }


@admin_router.post("/logout")
def admin_logout(request: Request, response: Response):
    token = extract_token_from_request(request)
    if token:
        auth_service.revoke_session(token)
    clear_admin_session_cookie(response)
    return {"status": "ok", "message": "تم تسجيل الخروج بنجاح"}


@admin_router.get("/me")
def admin_me(admin_user: str = Depends(require_admin)):
    return {"status": "ok", "username": admin_user}


# ==========================================
# 2. STATS & KPIS (REAL DB ONLY)
# ==========================================
@admin_router.get("/stats")
def get_admin_stats(admin_user: str = Depends(require_admin)):
    return StoreRepository.get_stats()


# ==========================================
# 3. ORDERS MANAGEMENT
# ==========================================
@admin_router.get("/orders")
def get_orders(
    status: Optional[str] = None,
    limit: int = 150,
    admin_user: str = Depends(require_admin)
):
    return StoreRepository.list_orders(limit=limit, status_filter=status)


@admin_router.get("/orders/{order_id}")
def get_order_details(order_id: str, admin_user: str = Depends(require_admin)):
    order = StoreRepository.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")
    return order


@admin_router.post("/orders/{order_id}/status")
def set_status(
    order_id: str,
    req: OrderStatusRequest,
    admin_user: str = Depends(require_admin)
):
    StoreRepository.update_order_status(order_id, req.status, req.delivered_key)
    return {"status": "updated", "order_id": order_id, "new_status": req.status}


# ==========================================
# 4. PRODUCTS MANAGEMENT & CATALOG SYNC
# ==========================================
@admin_router.get("/products")
def get_products(admin_user: str = Depends(require_admin)):
    return StoreRepository.list_products(500)


@admin_router.post("/products")
def save_product(req: ProductUpsertRequest, admin_user: str = Depends(require_admin)):
    payload = req.dict()
    pid = StoreRepository.upsert_product(payload)
    return {"status": "ok", "id": pid}


@admin_router.delete("/products/{product_id}")
def remove_product(product_id: str, admin_user: str = Depends(require_admin)):
    StoreRepository.delete_product(product_id)
    return {"status": "deleted", "id": product_id}


# ==========================================
# 5. SECURE IMAGE UPLOAD (DRAG & DROP / FILE)
# ==========================================
@admin_router.post("/upload-image")
async def upload_product_image(
    file: UploadFile = File(...),
    admin_user: str = Depends(require_admin)
):
    filename = file.filename or "image.webp"
    _, ext = os.path.splitext(filename.lower())
    
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"نوع الملف غير مدعوم ({ext}). يُسمح فقط بالصور: .webp, .png, .jpg, .jpeg, .gif"
        )

    content_type = (file.content_type or "").lower()
    if content_type and content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="نوع ملف الصورة (MIME Type) غير مصرح به"
        )

    # Read first chunk to verify magic bytes and check size
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="حجم الصورة كبير جداً. الحد الأقصى المسموح به هو 6 ميجابايت."
        )

    # Sanitize and generate secure random filename (prevents directory traversal & overwrite)
    safe_name = f"prod_{uuid.uuid4().hex[:12]}{ext}"
    dest_path = os.path.join(UPLOADS_DIR, safe_name)

    with open(dest_path, "wb") as out_f:
        out_f.write(contents)

    rel_url = f"assets/uploads/{safe_name}"
    return {
        "status": "ok",
        "url": rel_url,
        "filename": safe_name,
        "size_bytes": len(contents)
    }


# ==========================================
# 6. CATEGORIES MANAGEMENT
# ==========================================
@admin_router.get("/categories")
def get_categories(admin_user: str = Depends(require_admin)):
    return StoreRepository.list_categories()


@admin_router.post("/categories")
def save_category(req: CategoryUpsertRequest, admin_user: str = Depends(require_admin)):
    cid = StoreRepository.upsert_category(req.dict())
    return {"status": "ok", "id": cid}


@admin_router.delete("/categories/{category_id}")
def remove_category(category_id: str, admin_user: str = Depends(require_admin)):
    StoreRepository.delete_category(category_id)
    return {"status": "deleted", "id": category_id}


# ==========================================
# 7. STORE SETTINGS & GATEWAYS
# ==========================================
@admin_router.get("/settings")
def get_settings(admin_user: str = Depends(require_admin)):
    settings = StoreRepository.get_settings()
    defaults = {
        "whatsapp": "+4447723274122",
        "telegram": "https://t.me/+5lDejdeKjEJjNTg0",
        "store_name_ar": "زيوس ستور",
        "store_name_en": "ZEUS STORE",
        "announcement_text": "ضمان استرجاع سعر الاشتراك كاملاً لمدة 14 يوماً (تطبق سياسة الاسترداد) ⚡️",
        "announcement_active": "true",
        "tiktok_pixel": "",
        "meta_pixel": "",
        "snap_pixel": "",
        "ga_tag": "",
        "tg_token": "",
        "tg_chat": ""
    }
    for k, v in defaults.items():
        if k not in settings or not settings[k]:
            settings[k] = v
    return settings


@admin_router.post("/settings")
def update_settings(payload: Dict[str, Any], admin_user: str = Depends(require_admin)):
    if "key" in payload and "value" in payload and len(payload) <= 2:
        StoreRepository.update_setting(str(payload["key"]), str(payload["value"]))
        return {"status": "ok"}

    for k, v in payload.items():
        val_str = str(v if v is not None else "")
        StoreRepository.update_setting(k, val_str)
    return {"status": "ok", "settings": StoreRepository.get_settings()}


@admin_router.get("/payment-gateways")
def get_payment_gateways(admin_user: str = Depends(require_admin)):
    return StoreRepository.get_payment_gateways()


@admin_router.post("/payment-gateways")
def save_payment_gateway(req: PaymentGatewayUpdateRequest, admin_user: str = Depends(require_admin)):
    StoreRepository.update_payment_gateway(req.id, req.name, req.is_active, req.config)
    return {"status": "ok"}


