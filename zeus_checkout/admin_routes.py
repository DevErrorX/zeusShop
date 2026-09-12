"""Admin routes for ZEUS STORE."""

from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from .admin_auth import verify_admin, generate_session_token
from .store_repository import StoreRepository

admin_router = APIRouter(prefix="/api/v1/admin", tags=["admin"])

class LoginRequest(BaseModel):
    username: str
    password: str

@admin_router.post("/login")
def admin_login(req: LoginRequest):
    if verify_admin(req.username, req.password):
        token = generate_session_token(req.username)
        return {"status": "ok", "token": token, "username": req.username}
    raise HTTPException(status_code=401, detail="اسم المستخدم أو كلمة المرور غير صحيحة")

@admin_router.get("/orders")
def get_orders():
    return StoreRepository.list_orders(100)

@admin_router.post("/orders/{order_id}/status")
def set_status(order_id: str, status: str):
    StoreRepository.update_order_status(order_id, status)
    return {"status": "updated", "order_id": order_id, "new_status": status}
