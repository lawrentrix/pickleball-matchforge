$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot ".." "..")
$backendDir = Join-Path $repoRoot "backend"
$venvDir = Join-Path $repoRoot ".venv"

if (-not (Test-Path $venvDir)) {
  python -m venv $venvDir
}

& (Join-Path $venvDir "Scripts\\Activate.ps1")
pip install -r (Join-Path $backendDir "requirements.txt")

uvicorn app.main:app --reload --host 127.0.0.1 --port 8001 --app-dir $backendDir

