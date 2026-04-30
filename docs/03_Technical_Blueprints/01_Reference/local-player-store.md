# Local Player Store (Technical Blueprint)

## Purpose
Provide simple, local-only persistence for player profiles during early development.

## Implementation
- Store module: `frontend/src/lib/playerStore.ts`
- Data file: `frontend/.data/players.json`

Notes:
- The store is file-backed and intended for local development only.
- The `.data/` folder is gitignored in `frontend/.gitignore`.

## Upgrade path
When the backend is introduced, replace the file store with a real persistence layer (database + migrations) and keep the API contract stable where possible.

