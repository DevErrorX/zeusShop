"""
Script to set base USD prices and update catalog.json and database.
New Pricing:
iPhone:
- 30 days: $35.00
- 7 days: $18.00

Android:
- 30 days: $26.00
- 7 days: $12.00
"""
import sqlite3
import json
import os
import sys

SAR_PEG = 3.75
EGP_RATE = 51.5
IQD_RATE = 1310.0
SYP_RATE = 14000.0
LBP_RATE = 89500.0

products_update = [
    {
        'id': 'zeus-mu39a7sk',
        'price_usd': 35.0,
        'price_usdt': 35.0,
        'price_sar': round(35.0 * SAR_PEG, 2),
        'price_egp': round(35.0 * EGP_RATE, 2),
        'price_iqd': round(35.0 * IQD_RATE),
        'price_syp': round(35.0 * SYP_RATE),
        'price_lbp': round(35.0 * LBP_RATE),
    },
    {
        'id': 'zeus-mu39mnea',
        'price_usd': 18.0,
        'price_usdt': 18.0,
        'price_sar': round(18.0 * SAR_PEG, 2),
        'price_egp': round(18.0 * EGP_RATE, 2),
        'price_iqd': round(18.0 * IQD_RATE),
        'price_syp': round(18.0 * SYP_RATE),
        'price_lbp': round(18.0 * LBP_RATE),
    },
    {
        'id': 'zeus-mu3a2fxr',
        'price_usd': 26.0,
        'price_usdt': 26.0,
        'price_sar': round(26.0 * SAR_PEG, 2),
        'price_egp': round(26.0 * EGP_RATE, 2),
        'price_iqd': round(26.0 * IQD_RATE),
        'price_syp': round(26.0 * SYP_RATE),
        'price_lbp': round(26.0 * LBP_RATE),
    },
    {
        'id': 'zeus-mu3a4woj',
        'price_usd': 12.0,
        'price_usdt': 12.0,
        'price_sar': round(12.0 * SAR_PEG, 2),
        'price_egp': round(12.0 * EGP_RATE, 2),
        'price_iqd': round(12.0 * IQD_RATE),
        'price_syp': round(12.0 * SYP_RATE),
        'price_lbp': round(12.0 * LBP_RATE),
    }
]

db_paths = ['data/zeus.db', '/home/ubuntu/zeus_store/data/zeus.db']
target_db = next((p for p in db_paths if os.path.exists(p)), None)

if target_db:
    print(f"Updating database: {target_db}")
    conn = sqlite3.connect(target_db)
    c = conn.cursor()
    for p in products_update:
        c.execute("""
            UPDATE products 
            SET price_usd = ?, price_usdt = ?, price_sar = ?, price_egp = ?, price_iqd = ?
            WHERE id = ?
        """, (p['price_usd'], p['price_usdt'], p['price_sar'], p['price_egp'], p['price_iqd'], p['id']))
        print(f"Updated {p['id']} -> USD ${p['price_usd']} | SAR {p['price_sar']} | EGP {p['price_egp']}")

    custom_rates = {
        "USD": 1.0,
        "USDT": 1.0,
        "SAR": SAR_PEG,
        "EGP": EGP_RATE,
        "AED": 3.6725,
        "KWD": 0.308,
        "IQD": IQD_RATE,
        "SYP": SYP_RATE,
        "LBP": LBP_RATE
    }
    c.execute("""
        INSERT OR REPLACE INTO store_settings (key, value)
        VALUES ('custom_rates', ?)
    """, (json.dumps(custom_rates),))
    c.execute("""
        INSERT OR REPLACE INTO store_settings (key, value)
        VALUES ('kashier_usd_to_egp_rate', ?)
    """, (str(EGP_RATE),))
    conn.commit()
    conn.close()
    print("Database updated successfully.")

# Update catalog.json
cat_path = 'catalog.json'
if os.path.exists(cat_path):
    with open(cat_path, 'r', encoding='utf-8') as f:
        catalog = json.load(f)
    
    prod_map = {p['id']: p for p in products_update}
    for item in catalog:
        if item['id'] in prod_map:
            p = prod_map[item['id']]
            item['price_usd'] = p['price_usd']
            item['price_usdt'] = p['price_usdt']
            item['price_sar'] = p['price_sar']
            item['price_egp'] = p['price_egp']
            item['price_iqd'] = p['price_iqd']
            item['price_syp'] = p['price_syp']
            item['price_lbp'] = p['price_lbp']
            print(f"Updated catalog item: {item['id']} -> ${p['price_usd']}")
    
    with open(cat_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    print("catalog.json updated successfully.")
