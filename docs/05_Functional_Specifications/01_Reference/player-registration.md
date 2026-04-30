# Player Registration (Functional Spec)

## Goal
Allow players to create profiles that capture contact details, skill level, availability, preferred play mode, and tournament participation preferences.

## Primary flows

### 1) Register a player
- User opens `frontend/src/app/register/page.tsx`
- User fills out the form and submits
- System creates a new player profile and stores it locally
- UI confirms success and offers navigation to the Players list

### 2) View registered players
- User opens `frontend/src/app/players/page.tsx`
- System displays the current player pool with key attributes at a glance

## Profile fields

### Identity
- Display name (required)

### Contact
- Email (required)
- Phone (optional)

### Skill level (required)
Supported values:
- `beginner`
- `lower-intermediate`
- `intermediate`
- `upper-intermediate`
- `advanced`
- `open`

### Availability
- Days of week (multi-select)
- Time windows (multi-select): `morning`, `afternoon`, `evening`
- Notes (optional free-text)

### Preferred play mode (multi-select)
Supported values:
- `casual`
- `ranked`
- `rotation`

### Tournament participation preferences
- Interested (boolean)
- Preferred divisions (optional list; captured via comma-separated input)
- Notes (optional)

## Non-goals (current)
- Authentication / user accounts
- Editing or deleting profiles
- Duplicate detection
- Real database persistence

