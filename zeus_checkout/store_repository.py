"""Store repository for orders, products, digital keys, settings, and analytics."""

import json
import uuid
from .database import get_db_connection

class StoreRepository:
    # ------------------ ORDERS ------------------
    @staticmethod
    def create_order(
        customer_name: str,
        customer_phone: str,
        customer_email: str | None,
        payment_method: str,
        total_amount: float,
        currency: str,
        items: list,
        order_id: str | None = None,
        payment_id: str | None = None,
        expected_usdt: str | float | None = None,
        amount_egp: float | None = None,
        payment_proof: str | None = None,
        notes: str | None = None
    ) -> str:
        oid = order_id or f"ZEUS-{uuid.uuid4().hex[:6].upper()}"
        usdt_str = str(expected_usdt) if expected_usdt is not None else None
        with get_db_connection() as conn:
            conn.execute(
                """INSERT INTO orders (id, customer_name, customer_phone, customer_email,
                                       payment_method, total_amount, currency, items_json,
                                       status, payment_id, expected_usdt, amount_egp,
                                       payment_proof, notes)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)
                   ON CONFLICT(id) DO UPDATE SET
                       payment_id=COALESCE(excluded.payment_id, orders.payment_id),
                       expected_usdt=COALESCE(excluded.expected_usdt, orders.expected_usdt),
                       amount_egp=COALESCE(excluded.amount_egp, orders.amount_egp),
                       notes=COALESCE(excluded.notes, orders.notes)
                """,
                (oid, customer_name, customer_phone, customer_email,
                 payment_method, total_amount, currency, json.dumps(items, ensure_ascii=False),
                 payment_id, usdt_str, amount_egp,
                 payment_proof, notes)
            )
            conn.commit()
        return oid

    @staticmethod
    def get_order(order_id: str) -> dict | None:
        with get_db_connection() as conn:
            row = conn.execute("SELECT * FROM orders WHERE id = ? OR payment_id = ?", (order_id, order_id)).fetchone()
            if row:
                d = dict(row)
                d["items"] = json.loads(d["items_json"]) if d.get("items_json") else []
                return d
        return None

    @staticmethod
    def get_order_by_payment_id(payment_id: str) -> dict | None:
        return StoreRepository.get_order(payment_id)

    @staticmethod
    def apply_webhook(
        *,
        event_hash: str,
        payment_id: str,
        normalized_status: str,
        supplied_amount,
        supplied_currency,
    ) -> str:
        from .database import apply_webhook as db_apply_webhook
        return db_apply_webhook(
            event_hash=event_hash,
            payment_id=payment_id,
            normalized_status=normalized_status,
            supplied_amount=supplied_amount,
            supplied_currency=supplied_currency,
        )

    @staticmethod
    def list_orders(limit: int = 100, status_filter: str | None = None) -> list[dict]:
        with get_db_connection() as conn:
            query = "SELECT * FROM orders"
            params = []
            if status_filter and status_filter != "all":
                query += " WHERE status = ?"
                params.append(status_filter)
            query += " ORDER BY created_at DESC LIMIT ?"
            params.append(limit)
            
            rows = conn.execute(query, tuple(params)).fetchall()
            results = []
            for r in rows:
                d = dict(r)
                d["items"] = json.loads(d["items_json"]) if d.get("items_json") else []
                results.append(d)
            return results

    @staticmethod
    def update_order_status(order_id: str, new_status: str, delivered_key: str | None = None):
        with get_db_connection() as conn:
            if delivered_key:
                conn.execute("UPDATE orders SET status = ?, delivered_key = ? WHERE id = ?", (new_status, delivered_key, order_id))
            else:
                conn.execute("UPDATE orders SET status = ? WHERE id = ?", (new_status, order_id))
            conn.commit()

    # ------------------ PRODUCTS ------------------
    @staticmethod
    def list_products(limit: int = 200) -> list[dict]:
        with get_db_connection() as conn:
            rows = conn.execute("SELECT * FROM products ORDER BY featured DESC, created_at DESC LIMIT ?", (limit,)).fetchall()
            res = []
            for r in rows:
                d = dict(r)
                d["features"] = json.loads(d["features_json"]) if d.get("features_json") else []
                res.append(d)
            return res

    @staticmethod
    def get_product(product_id: str) -> dict | None:
        with get_db_connection() as conn:
            row = conn.execute("SELECT * FROM products WHERE id = ? OR slug = ?", (product_id, product_id)).fetchone()
            if row:
                d = dict(row)
                d["features"] = json.loads(d["features_json"]) if d.get("features_json") else []
                return d
        return None

    @staticmethod
    def upsert_product(p: dict):
        pid = p.get("id") or f"zeus-{uuid.uuid4().hex[:8]}"
        features_json = json.dumps(p.get("features", []), ensure_ascii=False)
        with get_db_connection() as conn:
            conn.execute("""
                INSERT INTO products (
                    id, title, slug, category_slug, price_sar, price_usd, price_egp,
                    price_usdt, original_price_sar, image, badge, duration, platform,
                    in_stock, featured, description, features_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    title=excluded.title,
                    slug=excluded.slug,
                    category_slug=excluded.category_slug,
                    price_sar=excluded.price_sar,
                    price_usd=excluded.price_usd,
                    price_egp=excluded.price_egp,
                    price_usdt=excluded.price_usdt,
                    original_price_sar=excluded.original_price_sar,
                    image=excluded.image,
                    badge=excluded.badge,
                    duration=excluded.duration,
                    platform=excluded.platform,
                    in_stock=excluded.in_stock,
                    featured=excluded.featured,
                    description=excluded.description,
                    features_json=excluded.features_json
            """, (
                pid,
                p.get("title", "منتج جديد"),
                p.get("slug") or pid,
                p.get("category_slug", "gaming"),
                float(p.get("price_sar", 0)),
                float(p.get("price_usd", 0)),
                float(p.get("price_egp", 0)),
                float(p.get("price_usdt", 0)),
                float(p.get("original_price_sar", 0)),
                p.get("image", "assets/logo-ar.webp"),
                p.get("badge", ""),
                p.get("duration", "30 يوماً"),
                p.get("platform", "الكل"),
                1 if p.get("in_stock", True) else 0,
                1 if p.get("featured", False) else 0,
                p.get("description", ""),
                features_json
            ))
            conn.commit()
        return pid

    @staticmethod
    def delete_product(product_id: str):
        with get_db_connection() as conn:
            conn.execute("DELETE FROM products WHERE id = ?", (product_id,))
            conn.commit()

    # ------------------ CATEGORIES ------------------
    @staticmethod
    def list_categories() -> list[dict]:
        with get_db_connection() as conn:
            rows = conn.execute("SELECT * FROM categories ORDER BY count DESC").fetchall()
            return [dict(r) for r in rows]

    @staticmethod
    def upsert_category(c: dict):
        cid = c.get("id") or c.get("slug") or f"cat-{uuid.uuid4().hex[:6]}"
        with get_db_connection() as conn:
            conn.execute("""
                INSERT INTO categories (id, name, slug, icon, count)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name=excluded.name,
                    slug=excluded.slug,
                    icon=excluded.icon,
                    count=excluded.count
            """, (
                cid,
                c.get("name", "تصنيف جديد"),
                c.get("slug", cid),
                c.get("icon", "fa-solid fa-gamepad"),
                int(c.get("count", 0))
            ))
            conn.commit()
        return cid

    @staticmethod
    def delete_category(category_id: str):
        with get_db_connection() as conn:
            conn.execute("DELETE FROM categories WHERE id = ?", (category_id,))
            conn.commit()

    # ------------------ DIGITAL KEYS VAULT ------------------
    @staticmethod
    def add_digital_keys(product_id: str, keys: list[str]) -> int:
        added = 0
        with get_db_connection() as conn:
            for k in keys:
                cleaned = k.strip()
                if cleaned:
                    conn.execute("INSERT INTO digital_keys (product_id, serial_key) VALUES (?, ?)", (product_id, cleaned))
                    added += 1
            conn.commit()
        return added

    @staticmethod
    def list_digital_keys(product_id: str | None = None) -> list[dict]:
        with get_db_connection() as conn:
            if product_id:
                rows = conn.execute("SELECT * FROM digital_keys WHERE product_id = ? ORDER BY is_used ASC, created_at DESC", (product_id,)).fetchall()
            else:
                rows = conn.execute("SELECT * FROM digital_keys ORDER BY is_used ASC, created_at DESC").fetchall()
            return [dict(r) for r in rows]

    @staticmethod
    def count_available_keys(product_id: str) -> int:
        with get_db_connection() as conn:
            row = conn.execute("SELECT COUNT(*) FROM digital_keys WHERE product_id = ? AND is_used = 0", (product_id,)).fetchone()
            return row[0] if row else 0

    # ------------------ STATS & KPI ------------------
    @staticmethod
    def get_stats() -> dict:
        with get_db_connection() as conn:
            total_orders = conn.execute("SELECT COUNT(*) FROM orders").fetchone()[0]
            paid_orders = conn.execute("SELECT COUNT(*) FROM orders WHERE status IN ('paid', 'completed', 'delivered')").fetchone()[0]
            pending_orders = conn.execute("SELECT COUNT(*) FROM orders WHERE status = 'pending'").fetchone()[0]
            
            revenue_row = conn.execute("SELECT SUM(total_amount) FROM orders WHERE status IN ('paid', 'completed', 'delivered')").fetchone()
            total_revenue_sar = revenue_row[0] or 0.0

            total_products = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
            available_keys = conn.execute("SELECT COUNT(*) FROM digital_keys WHERE is_used = 0").fetchone()[0]

            # Recent orders for mini-table
            recent_rows = conn.execute("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5").fetchall()
            recent_orders = []
            for r in recent_rows:
                d = dict(r)
                d["items"] = json.loads(d["items_json"]) if d.get("items_json") else []
                recent_orders.append(d)

            return {
                "total_orders": total_orders,
                "paid_orders": paid_orders,
                "pending_orders": pending_orders,
                "total_revenue_sar": round(total_revenue_sar, 2),
                "total_products": total_products,
                "available_keys": available_keys,
                "recent_orders": recent_orders
            }

    # ------------------ STORE SETTINGS ------------------
    @staticmethod
    def get_settings() -> dict:
        with get_db_connection() as conn:
            rows = conn.execute("SELECT key, value FROM store_settings").fetchall()
            return {r["key"]: r["value"] for r in rows}

    @staticmethod
    def update_setting(key: str, value: str):
        with get_db_connection() as conn:
            conn.execute("INSERT INTO store_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (key, value))
            conn.commit()

    # ------------------ PAYMENT GATEWAYS ------------------
    @staticmethod
    def get_payment_gateways() -> list[dict]:
        with get_db_connection() as conn:
            rows = conn.execute("SELECT * FROM payment_gateways").fetchall()
            res = []
            for r in rows:
                d = dict(r)
                d["config"] = json.loads(d["config_json"]) if d.get("config_json") else {}
                res.append(d)
            return res

    @staticmethod
    def update_payment_gateway(gateway_id: str, name: str, is_active: bool, config: dict):
        with get_db_connection() as conn:
            conn.execute("""
                INSERT INTO payment_gateways (id, name, is_active, config_json)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name=excluded.name,
                    is_active=excluded.is_active,
                    config_json=excluded.config_json
            """, (gateway_id, name, 1 if is_active else 0, json.dumps(config, ensure_ascii=False)))
            conn.commit()
