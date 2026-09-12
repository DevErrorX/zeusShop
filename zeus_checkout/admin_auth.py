"""Simple authentication utilities for Zeus Admin."""

import hmac
import hashlib
from .config import settings

def verify_admin(username: str, password: str) -> bool:
    user_match = hmac.compare_digest(username.strip(), settings.admin_username)
    pass_match = hmac.compare_digest(password.strip(), settings.admin_password)
    return user_match and pass_match

def generate_session_token(username: str) -> str:
    key = settings.jwt_secret.encode("utf-8")
    msg = f"{username}:zeus_session".encode("utf-8")
    return hmac.new(key, msg, hashlib.sha256).hexdigest()
