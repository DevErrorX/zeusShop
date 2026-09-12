"""Catalog and Categories loader for ZEUS STORE."""

import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def get_catalog():
    path = os.path.join(BASE_DIR, "catalog.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def get_categories():
    path = os.path.join(BASE_DIR, "categories.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []
