"""Script to update base SAR prices and regenerate catalog.json."""
import sqlite3
import json
import os
import sys

db_path = os.path.join(os.path.dirname(__file__), 'data', 'zeus.db')
if not os.path.exists(db_path):
    db_path = '/home/ubuntu/zeus_store/data/zeus.db'

print(f"Connecting to {db_path}...")
conn = sqlite3.connect(db_path)
c = conn.cursor()

# 1. Update Products with exact SAR base prices requested by user
products_update = [
    # iPhone 30 days: 140 SAR
    {
        'id': 'zeus-mu39a7sk',
        'price_sar': 140.0,
        'price_usd': 37.33,
        'price_usdt': 37.33,
        'price_egp': 1917.0,
        'price_iqd': 49000
    },
    # iPhone 7 days: 70 SAR
    {
        'id': 'zeus-mu39mnea',
        'price_sar': 70.0,
        'price_usd': 18.67,
        'price_usdt': 18.67,
        'price_egp': 958.0,
        'price_iqd': 24500
    },
    # Android 30 days: 100 SAR
    {
        'id': 'zeus-mu3a2fxr',
        'price_sar': 100.0,
        'price_usd': 26.67,
        'price_usdt': 26.67,
        'price_egp': 1369.0,
        'price_iqd': 35000
    },
    # Android 7 days: 50 SAR
    {
        'id': 'zeus-mu3a4woj',
        'price_sar': 50.0,
        'price_usd': 13.33,
        'price_usdt': 13.33,
        'price_egp': 685.0,
        'price_iqd': 17500
    }
]

for p in products_update:
    c.execute("""
        UPDATE products 
        SET price_sar = ?, price_usd = ?, price_usdt = ?, price_egp = ?, price_iqd = ?
        WHERE id = ?
    """, (p['price_sar'], p['price_usd'], p['price_usdt'], p['price_egp'], p['price_iqd'], p['id']))
    print(f"Updated product {p['id']}: SAR {p['price_sar']}")

# 2. Update custom_rates setting so SAR is 3.75 (official peg)
custom_rates = {
    "EGP": 51.34,
    "SAR": 3.75,
    "USD": 1.0,
    "USDT": 1.0,
    "AED": 3.67,
    "KWD": 0.31,
    "IQD": 1310.0
}
c.execute("""
    INSERT OR REPLACE INTO store_settings (key, value)
    VALUES ('custom_rates', ?)
""", (json.dumps(custom_rates),))
print("Updated custom_rates in store_settings.")

conn.commit()

# 3. Export catalog.json
conn.row_factory = sqlite3.Row
cur2 = conn.cursor()
cur2.execute("SELECT * FROM products ORDER BY price_sar DESC")
rows = cur2.fetchall()

catalog = []
for r in rows:
    features = []
    try:
        if r['features_json']:
            features = json.loads(r['features_json'])
    except Exception:
        features = []
    catalog.append({
        "id": r['id'],
        "title": r['title'],
        "slug": r['slug'],
        "category_slug": r['category_slug'],
        "price_sar": float(r['price_sar'] or 0.0),
        "price_usd": float(r['price_usd'] or 0.0),
        "price_iqd": int(r['price_iqd'] or 0),
        "price_egp": float(r['price_egp'] or 0.0),
        "price_usdt": float(r['price_usdt'] or 0.0),
        "original_price_sar": float(r['original_price_sar'] or 0.0),
        "image": r['image'] or "assets/logo-ar.webp",
        "badge": r['badge'] or "",
        "duration": r['duration'] or "30 يوماً",
        "platform": r['platform'] or "الكل",
        "in_stock": bool(r['in_stock']),
        "featured": bool(r['featured']),
        "description": r['description'] or "",
        "features": features
    })

catalog_path = os.path.join(os.path.dirname(__file__), 'catalog.json')
with open(catalog_path, 'w', encoding='utf-8') as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

print(f"Generated {catalog_path} with {len(catalog)} products.")
conn.close()
