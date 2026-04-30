from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


BACKEND_DIR = Path(__file__).resolve().parents[1]
STATIC_DATA_PATH = BACKEND_DIR / "static" / "staticData.json"


def load_static_data() -> dict[str, Any]:
    with STATIC_DATA_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


app = FastAPI(title="Pickleball MatchForge Backend", version="0.0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/static")
def get_static() -> dict[str, Any]:
    return load_static_data()


@app.get("/users")
def get_users() -> dict[str, Any]:
    data = load_static_data()
    users = data.get("seedPlayers", [])
    return {"users": users}
