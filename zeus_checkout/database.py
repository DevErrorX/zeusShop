"""SQLite Database management for ZEUS STORE."""

import sqlite3
import os
import json
from .config import settings

def init_db():
    db_path = settings.database_path
    os.makedirs(os.path.dirname(db_path) or ".", exist_ok=True)
    
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        
        # Orders Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id TEXT PRIMARY KEY,
                customer_name TEXT NOT NULL,
                customer_phone TEXT NOT NULL,
                customer_email TEXT,
                payment_method TEXT NOT NULL,
                total_amount REAL NOT NULL,
                currency TEXT NOT NULL,
                items_json TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                delivered_key TEXT,
                payment_proof TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Products Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT NOT NULL,
                category_slug TEXT,
                price_sar REAL DEFAULT 0,
                price_usd REAL DEFAULT 0,
                price_egp REAL DEFAULT 0,
                price_usdt REAL DEFAULT 0,
                original_price_sar REAL DEFAULT 0,
                image TEXT,
                badge TEXT,
                duration TEXT,
                platform TEXT,
                in_stock INTEGER DEFAULT 1,
                featured INTEGER DEFAULT 0,
                description TEXT,
                features_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Categories Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                slug TEXT NOT NULL,
                icon TEXT,
                count INTEGER DEFAULT 0
            )
        """)

        # Digital Keys Vault
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS digital_keys (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id TEXT NOT NULL,
                serial_key TEXT NOT NULL,
                is_used INTEGER DEFAULT 0,
                order_id TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Store Settings Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS store_settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
        """)

        # Payment Gateways Configuration Table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS payment_gateways (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                is_active INTEGER DEFAULT 1,
                config_json TEXT NOT NULL
            )
        """)
        
        # Audit logs table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS audit_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action TEXT NOT NULL,
                details TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

        # Populate default Kashier payment gateway
        cursor.execute("SELECT COUNT(*) FROM payment_gateways WHERE id = 'kashier'")
        if cursor.fetchone()[0] == 0:
            cursor.execute("""
                INSERT OR REPLACE INTO payment_gateways (id, name, is_active, config_json)
                VALUES (?, ?, 1, ?)
            """, (
                "kashier",
                "Kashier (Visa / Mastercard / Meeza)",
                json.dumps({
                    "merchant_id": settings.kashier_merchant_id,
                    "api_key": settings.kashier_api_key,
                    "secret_key": settings.kashier_secret_key,
                    "mode": settings.kashier_mode,
                    "currency": "EGP",
                    "api_url": settings.kashier_api_url,
                    "callback_url": "https://deverrorx.github.io/zeusShop/checkout.html?payment=kashier&status=success"
                }, ensure_ascii=False)
            ))
            conn.commit()

        # Populate products from catalog.json if table is empty
        cursor.execute("SELECT COUNT(*) FROM products")
        if cursor.fetchone()[0] == 0:
            catalog_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "catalog.json")
            if os.path.exists(catalog_file):
                try:
                    with open(catalog_file, "r", encoding="utf-8") as f:
                        items = json.load(f)
                    for item in items:
                        cursor.execute("""
                            INSERT OR IGNORE INTO products (
                                id, title, slug, category_slug, price_sar, price_usd, price_egp,
                                price_usdt, original_price_sar, image, badge, duration, platform,
                                in_stock, featured, description, features_json
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            item.get("id"),
                            item.get("title"),
                            item.get("slug", item.get("id")),
                            item.get("category_slug", "gaming"),
                            float(item.get("price_sar", 0)),
                            float(item.get("price_usd", 0)),
                            float(item.get("price_egp", 0)),
                            float(item.get("price_usdt", 0)),
                            float(item.get("original_price_sar", 0)),
                            item.get("image", "assets/logo-ar.webp"),
                            item.get("badge", ""),
                            item.get("duration", "30 يوماً"),
                            item.get("platform", "الكل"),
                            1 if item.get("in_stock", True) else 0,
                            1 if item.get("featured", False) else 0,
                            item.get("description", ""),
                            json.dumps(item.get("features", []), ensure_ascii=False)
                        ))
                    conn.commit()
                except Exception as e:
                    print(f"Warning: Could not seed catalog.json: {e}")

        # Populate categories from categories.json if table is empty
        cursor.execute("SELECT COUNT(*) FROM categories")
        if cursor.fetchone()[0] == 0:
            cat_file = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "categories.json")
            if os.path.exists(cat_file):
                try:
                    with open(cat_file, "r", encoding="utf-8") as f:
                        cats = json.load(f)
                    for c in cats:
                        cursor.execute("""
                            INSERT OR IGNORE INTO categories (id, name, slug, icon, count)
                            VALUES (?, ?, ?, ?, ?)
                        """, (
                            c.get("id", c.get("slug")),
                            c.get("name"),
                            c.get("slug"),
                            c.get("icon", "fa-solid fa-gamepad"),
                            c.get("count", 0)
                        ))
                    conn.commit()
                except Exception as e:
                    print(f"Warning: Could not seed categories.json: {e}")

def get_db_connection():
    conn = sqlite3.connect(settings.database_path)
    conn.row_factory = sqlite3.Row
    return conn
