"""Argon2id admin authentication, opaque session management, and brute-force protection for Zeus Admin."""

from __future__ import annotations

import hashlib
import hmac
import secrets
import threading
import time
from collections import deque
from dataclasses import dataclass
from typing import Optional

from fastapi import HTTPException, Request, Response, status

from .config import settings

try:
    from argon2 import PasswordHasher
    from argon2.exceptions import InvalidHashError, VerificationError, VerifyMismatchError
    _HAS_ARGON2 = True
    _PH = PasswordHasher(
        time_cost=3,
        memory_cost=65_536,
        parallelism=2,
        hash_len=32,
        salt_len=16,
    )
except ImportError:
    _HAS_ARGON2 = False
    _PH = None


SESSION_COOKIE_NAME = "zeus_admin_session"


@dataclass
class AdminSession:
    token_hash: str
    username: str
    created_at: float
    last_active: float
    expires_at: float


class AdminAuthService:
    """Manages secure password verification, rate-limiting, and server-side sessions."""

    def __init__(self) -> None:
        self._sessions: dict[str, AdminSession] = {}
        self._lock = threading.Lock()
        
        # Rate limiting: IP -> list of failed attempt timestamps
        self._failed_attempts: dict[str, deque[float]] = {}
        self._rate_lock = threading.Lock()
        self._max_failures = 5
        self._window_seconds = 60
        self._ban_duration_seconds = 120

    @staticmethod
    def _hash_token(token: str) -> str:
        return hashlib.sha256(token.encode("utf-8")).hexdigest()

    def check_rate_limit(self, client_ip: str) -> None:
        now = time.monotonic()
        with self._rate_lock:
            attempts = self._failed_attempts.setdefault(client_ip, deque())
            cutoff = now - self._ban_duration_seconds
            while attempts and attempts[0] < cutoff:
                attempts.popleft()

            if len(attempts) >= self._max_failures:
                oldest_in_ban = attempts[0]
                remaining = int(self._ban_duration_seconds - (now - oldest_in_ban))
                remaining = max(1, remaining)
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"تم حظر محاولات الدخول مؤقتاً لتكرار الفشل. يرجى الانتظار {remaining} ثانية والمحاولة مجدداً."
                )

    def record_failed_attempt(self, client_ip: str) -> None:
        now = time.monotonic()
        with self._rate_lock:
            attempts = self._failed_attempts.setdefault(client_ip, deque())
            attempts.append(now)

    def reset_failed_attempts(self, client_ip: str) -> None:
        with self._rate_lock:
            self._failed_attempts.pop(client_ip, None)

    def verify_credentials(self, username: str, password: str) -> bool:
        """Verifies username and password using constant-time comparison and Argon2id."""
        clean_user = username.strip()
        expected_user = (settings.admin_username or "").strip()
        if not hmac.compare_digest(clean_user, expected_user):
            return False

        clean_pass = password.strip()

        # 1. Try Argon2id if hash configured
        if settings.admin_password_hash and _HAS_ARGON2 and _PH:
            try:
                if _PH.verify(settings.admin_password_hash, clean_pass):
                    return True
            except (InvalidHashError, VerificationError, VerifyMismatchError):
                pass
            except Exception:
                pass

        # 2. Fallback to constant-time comparison against plain password
        if settings.admin_password:
            expected_pass = settings.admin_password.strip()
            if hmac.compare_digest(clean_pass, expected_pass):
                return True

        return False

    def create_session(self, username: str) -> tuple[str, AdminSession]:
        """Creates a cryptographically secure opaque session token."""
        raw_token = secrets.token_hex(32)
        thash = self._hash_token(raw_token)
        now = time.time()
        session = AdminSession(
            token_hash=thash,
            username=username,
            created_at=now,
            last_active=now,
            expires_at=now + settings.admin_session_absolute_seconds
        )
        with self._lock:
            # Purge expired
            expired = [k for k, v in self._sessions.items() if v.expires_at < now]
            for k in expired:
                self._sessions.pop(k, None)

            self._sessions[thash] = session

        return raw_token, session

    def validate_token(self, raw_token: str) -> Optional[AdminSession]:
        if not raw_token or len(raw_token) < 32:
            return None
        thash = self._hash_token(raw_token)
        now = time.time()
        with self._lock:
            session = self._sessions.get(thash)
            if not session:
                return None
            if session.expires_at < now:
                self._sessions.pop(thash, None)
                return None
            # Idle timeout check
            if now - session.last_active > settings.admin_session_idle_seconds:
                self._sessions.pop(thash, None)
                return None

            session.last_active = now
            return session

    def revoke_session(self, raw_token: str) -> bool:
        if not raw_token:
            return False
        thash = self._hash_token(raw_token)
        with self._lock:
            return bool(self._sessions.pop(thash, None))


# Singleton instance
auth_service = AdminAuthService()


def get_client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for")
    if xff:
        return xff.split(",")[0].strip()
    return request.client.host if request.client else "127.0.0.1"


def extract_token_from_request(request: Request) -> Optional[str]:
    # 1. Cookie
    token = request.cookies.get(SESSION_COOKIE_NAME)
    if token:
        return token
    # 2. Authorization Header
    auth_header = request.headers.get("authorization", "")
    if auth_header.lower().startswith("bearer "):
        return auth_header[7:].strip()
    # 3. X-Admin-Token Header
    x_token = request.headers.get("x-admin-token")
    if x_token:
        return x_token.strip()
    return None


def require_admin(request: Request) -> str:
    """FastAPI Dependency: Ensures request is from an authenticated admin session."""
    token = extract_token_from_request(request)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="غير مصرح: يلزم تسجيل الدخول للوصول إلى لوحة التحكم",
            headers={"WWW-Authenticate": "Bearer"}
        )

    session = auth_service.validate_token(token)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="جلسة الإدارة منتهية أو غير صالحة. يرجى تسجيل الدخول مجدداً.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    return session.username


def set_admin_session_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        max_age=settings.admin_session_absolute_seconds,
        httponly=True,
        samesite="lax",
        secure=False if settings.app_env == "development" else True,
        path="/"
    )


def clear_admin_session_cookie(response: Response) -> None:
    response.delete_cookie(
        key=SESSION_COOKIE_NAME,
        path="/"
    )
