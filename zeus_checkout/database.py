"""SQLite Database management for ZEUS STORE."""

import sqlite3
import os
import json
import secrets
from decimal import Decimal
from datetime import datetime, timezone
from .config import settings

_on_order_paid_callbacks = []

def register_order_paid_callback(fn):
    if fn not in _on_order_paid_callbacks:
        _on_order_paid_callbacks.append(fn)

def generate_confirmation_code(cursor_or_conn=None) -> str:
    alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    for _ in range(30):
        code = "ZEUS-" + "".join(secrets.choice(alphabet) for _ in range(8))
        if cursor_or_conn:
            try:
                exists = cursor_or_conn.execute("SELECT 1 FROM orders WHERE confirmation_code = ?", (code,)).fetchone()
                if not exists:
                    return code
            except Exception:
                return code
        else:
            return code
    return f"ZEUS-{secrets.token_hex(4).upper()}"

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
                payment_id TEXT,
                expected_usdt TEXT,
                amount_egp REAL,
                amount_iqd INTEGER,
                delivered_key TEXT,
                payment_proof TEXT,
                notes TEXT,
                paid_at TEXT,
                confirmation_code TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Migration helper for existing databases
        existing_cols = [c[1] for c in cursor.execute("PRAGMA table_info(orders)").fetchall()]
        cols_to_add = {
            "payment_id": "TEXT",
            "expected_usdt": "TEXT",
            "amount_egp": "REAL",
            "amount_iqd": "INTEGER",
            "delivered_key": "TEXT",
            "payment_proof": "TEXT",
            "notes": "TEXT",
            "paid_at": "TEXT",
            "confirmation_code": "TEXT",
        }
        for col, col_type in cols_to_add.items():
            if col not in existing_cols:
                cursor.execute(f"ALTER TABLE orders ADD COLUMN {col} {col_type}")

        cursor.execute("CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id)")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)")

        # Webhook Events Table (Replay Attack Prevention)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS webhook_events (
                event_hash TEXT PRIMARY KEY,
                payment_id TEXT NOT NULL,
                normalized_status TEXT NOT NULL,
                received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_webhook_events_payment_id ON webhook_events(payment_id)")
        
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
                price_iqd INTEGER DEFAULT 0,
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
        
        existing_prod_cols = [c[1] for c in cursor.execute("PRAGMA table_info(products)").fetchall()]
        if "price_iqd" not in existing_prod_cols:
            cursor.execute("ALTER TABLE products ADD COLUMN price_iqd INTEGER DEFAULT 0")
        
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
                    "callback_url": "https://deverrorx.github.io/zeusShop/checkout.html?kashier_return=1"
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

def apply_webhook(
    *,
    event_hash: str,
    payment_id: str,
    normalized_status: str,
    supplied_amount: int | float | Decimal | None,
    supplied_currency: str | None,
) -> str:
    """
    Apply a verified webhook event once and return a processing result.
    Enforces:
    1. Replay attack prevention via webhook_events (event_hash)
    2. Existence check: SELECT FROM orders WHERE payment_id = ? OR id = ?
    3. Mandatory supplied_amount and supplied_currency for paid status
    4. Strict amount matching: supplied_amount > 0 and abs(expected - actual) <= 0.01
    5. Currency matching: supplied_currency must be USD or USDT
    6. Digital key assignment & order update to 'paid'
    """
    now = datetime.now(timezone.utc).isoformat()
    conn = sqlite3.connect(settings.database_path)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("BEGIN IMMEDIATE")
        cursor = conn.cursor()

        # Step 1: Find order
        order_row = cursor.execute(
            "SELECT * FROM orders WHERE payment_id = ? OR id = ?",
            (payment_id, payment_id),
        ).fetchone()
        if order_row is None:
            conn.rollback()
            return "unknown_payment"

        # Step 2: Replay attack prevention
        inserted = cursor.execute(
            """
            INSERT OR IGNORE INTO webhook_events (
                event_hash, payment_id, normalized_status, received_at
            ) VALUES (?, ?, ?, ?)
            """,
            (event_hash, payment_id, normalized_status, now),
        )
        if inserted.rowcount == 0:
            conn.commit()
            return "duplicate"

        order = dict(order_row)

        # Step 3: Hardened status processing
        if normalized_status == "paid":
            # Mandatory amount and currency check
            if supplied_amount is None or not supplied_currency or not order.get("expected_usdt"):
                conn.commit()
                return "amount_mismatch"

            try:
                exp = Decimal(str(order["expected_usdt"]))
                act = Decimal(str(supplied_amount))
                # Strict amount matching: positive amount and tolerance <= 0.01
                if act <= 0 or abs(exp - act) > Decimal("0.01"):
                    conn.commit()
                    return "amount_mismatch"
            except Exception:
                conn.commit()
                return "amount_mismatch"

            # Strict currency matching: USD or USDT
            curr = str(supplied_currency).strip().upper()
            if curr not in {"USD", "USDT"}:
                conn.commit()
                return "currency_mismatch"

            # Assign available digital key
            delivered_key = order.get("delivered_key")
            if not delivered_key:
                try:
                    items = json.loads(order.get("items_json") or "[]")
                    product_id = items[0].get("id") if items and isinstance(items, list) else None
                    if product_id:
                        key_row = cursor.execute(
                            "SELECT id, serial_key FROM digital_keys WHERE product_id = ? AND is_used = 0 LIMIT 1",
                            (product_id,),
                        ).fetchone()
                        if key_row:
                            delivered_key = key_row["serial_key"]
                            cursor.execute(
                                "UPDATE digital_keys SET is_used = 1, order_id = ? WHERE id = ?",
                                (order["id"], key_row["id"]),
                            )
                except Exception:
                    pass
                if not delivered_key:
                    delivered_key = f"ZEUS-KEY-{order['id'][:8].upper()}"

            conf_code = order.get("confirmation_code")
            if not conf_code:
                conf_code = generate_confirmation_code(cursor)

            cursor.execute(
                """
                UPDATE orders
                SET status = 'paid', delivered_key = ?, paid_at = ?, confirmation_code = COALESCE(confirmation_code, ?)
                WHERE id = ?
                """,
                (delivered_key, now, conf_code, order["id"]),
            )
            conn.commit()

            # Trigger notification callbacks
            for cb in _on_order_paid_callbacks:
                try:
                    cb(order["id"])
                except Exception as cb_err:
                    print(f"Warning: Order paid callback failed: {cb_err}")

            return "updated"
        else:
            # Other statuses (failed, cancelled, refunded)
            if normalized_status in {"failed", "cancelled", "refunded"}:
                cursor.execute(
                    "UPDATE orders SET status = ? WHERE id = ?",
                    (normalized_status, order["id"]),
                )
            conn.commit()
            return "updated"
    finally:
        conn.close()

