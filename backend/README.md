# Backend (FastAPI)

Standalone backend service for Pickleball MatchForge.

## What it does (current)
- Serves static configuration and seed users from `backend/static/staticData.json`

## Run (Windows / PowerShell)
From the repo root:
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
uvicorn app.main:app --reload --host 127.0.0.1 --port 8001 --app-dir backend
```

Then open:
- `http://127.0.0.1:8001/health`
- `http://127.0.0.1:8001/static`
- `http://127.0.0.1:8001/users`

