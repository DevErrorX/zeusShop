"""Configuration loader for ZEUS STORE."""

from __future__ import annotations
import os
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    app_name: str = "ZEUS STORE"
    app_env: str = Field(default_factory=lambda: os.getenv("APP_ENV", "development"))
    host: str = Field(default_factory=lambda: os.getenv("HOST", "127.0.0.1"))
    port: int = Field(default_factory=lambda: int(os.getenv("PORT", "8000")))
    
    # Security & Admin
    admin_username: str = Field(default_factory=lambda: os.getenv("ADMIN_USERNAME", "admin"))
    admin_password: str = Field(default_factory=lambda: os.getenv("ADMIN_PASSWORD", "zeus2026"))
    jwt_secret: str = Field(default_factory=lambda: os.getenv("JWT_SECRET", "zeus_secret_key_change_me_99281"))
    
    # Storage
    database_path: str = Field(default_factory=lambda: os.getenv("DATABASE_PATH", "data/zeus.db"))
    
    # Currency rates (Base: SAR)
    usd_to_sar: float = 3.75
    iqd_to_sar: float = 0.00286
    egp_to_sar: float = 0.08
    
    # Telegram Bot Alerts
    telegram_bot_token: str | None = Field(default_factory=lambda: os.getenv("TELEGRAM_BOT_TOKEN"))
    telegram_chat_id: str | None = Field(default_factory=lambda: os.getenv("TELEGRAM_CHAT_ID"))
    
    # Crypto & Binance (Pay / UID / Gift Card)
    usdt_trc20_address: str = Field(default_factory=lambda: os.getenv("USDT_TRC20_ADDRESS", "TZeusOfficialStoreTRC20AddressHold"))
    binance_pay_id: str = Field(default_factory=lambda: os.getenv("BINANCE_PAY_ID", "987654321"))
    binance_uid: str = Field(default_factory=lambda: os.getenv("BINANCE_UID", "987654321"))
    binance_api_key: str = Field(default_factory=lambda: os.getenv("BINANCE_API_KEY", ""))
    binance_api_secret: str = Field(default_factory=lambda: os.getenv("BINANCE_API_SECRET", ""))
    
    # MegaPay
    megapay_api_url: str = Field(default_factory=lambda: os.getenv("MEGAPAY_API_URL", "https://api.mega-pay.cc/v1"))
    megapay_merchant_id: str = Field(default_factory=lambda: os.getenv("MEGAPAY_MERCHANT_ID", ""))
    megapay_secret: str = Field(default_factory=lambda: os.getenv("MEGAPAY_SECRET", ""))

    # Kashier (Payment Sessions v3)
    kashier_merchant_id: str = Field(default_factory=lambda: os.getenv("KASHIER_MERCHANT_ID", "MID-34056-532"))
    kashier_api_key: str = Field(default_factory=lambda: os.getenv("KASHIER_API_KEY", "60963e5a-e0fd-4ddc-be8f-1346168d21a3"))
    kashier_secret_key: str = Field(default_factory=lambda: os.getenv("KASHIER_SECRET_KEY", "bd2090fa8e6bdba2579a90ea440929e7$6a129b5ad4aa6a0bd0ad66ca5ab55df242664c957b44befdcc27e10468f31bb4a1231611bedfd39a8354fc72844d89f7"))
    kashier_mode: str = Field(default_factory=lambda: os.getenv("KASHIER_MODE", "live"))
    kashier_api_url: str = Field(default_factory=lambda: os.getenv("KASHIER_API_URL", "https://api.kashier.io"))

    # Telegram Admin Bot
    telegram_admin_bot_token: str = Field(default_factory=lambda: os.getenv("TELEGRAM_ADMIN_BOT_TOKEN", "8812148671:AAHOavmadji5u2-jXjlQHpC1AH8AkL8rc2g"))
    telegram_admin_user_ids: list[int] = Field(default_factory=lambda: [7565750369, 5794434215])
    telegram_admin_enabled: bool = Field(default_factory=lambda: os.getenv("TELEGRAM_ADMIN_ENABLED", "true").lower() in ("true", "1"))
    telegram_support_username: str = Field(default_factory=lambda: os.getenv("TELEGRAM_SUPPORT_USERNAME", "abxc18"))
    public_base_url: str = Field(default_factory=lambda: os.getenv("PUBLIC_BASE_URL", "https://zeus-store.site"))

settings = Settings()


