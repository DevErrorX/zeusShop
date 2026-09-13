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

settings = Settings()

