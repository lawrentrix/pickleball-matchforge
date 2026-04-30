# Players API

Base path: `/api/players`

This API currently supports listing player profiles and creating new profiles.

## GET `/api/players`

Returns the current player profiles.

Response body:
```json
{
  "players": [ /* PlayerProfile[] */ ]
}
```

## POST `/api/players`

Creates a new player profile.

Request body:
```json
{
  "displayName": "Alex Chen",
  "email": "alex@example.com",
  "phone": "+1 555 0100",
  "skillLevel": "intermediate",
  "availabilityDays": ["monday", "wednesday"],
  "availabilityWindows": ["evening"],
  "availabilityNotes": "Weekdays after 6pm",
  "preferredPlayModes": ["casual", "rotation"],
  "tournamentInterested": true,
  "tournamentDivisions": ["Mixed Doubles 3.5"],
  "tournamentNotes": "Weekends only"
}
```

Success response: `201`
```json
{
  "player": { /* PlayerProfile */ }
}
```

Validation notes:
- `displayName` and `email` are required.
- `skillLevel` must be one of the supported values.
- `availabilityDays`, `availabilityWindows`, and `preferredPlayModes` are filtered to supported values.

## Data shape

Canonical types live in:
- `frontend/src/lib/playerTypes.ts`

API implementation lives in:
- `frontend/src/app/api/players/route.ts`

