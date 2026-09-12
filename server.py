"""Uvicorn entry point for ZEUS STORE."""

from zeus_checkout import create_app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)
