import { NextResponse } from "next/server";
import { createPlayer, listPlayers } from "@/lib/playerStore";
import { AvailabilityDay, PlayMode, SkillLevel, TimeWindow } from "@/lib/playerTypes";

type CreatePlayerBody = {
  displayName?: unknown;
  email?: unknown;
  phone?: unknown;
  skillLevel?: unknown;
  availabilityDays?: unknown;
  availabilityWindows?: unknown;
  availabilityNotes?: unknown;
  preferredPlayModes?: unknown;
  tournamentInterested?: unknown;
  tournamentDivisions?: unknown;
  tournamentNotes?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string").map((s) => s.trim()).filter(Boolean);
}

function isSkillLevel(value: string): value is SkillLevel {
  return [
    "beginner",
    "lower-intermediate",
    "intermediate",
    "upper-intermediate",
    "advanced",
    "open",
  ].includes(value);
}

function isPlayMode(value: string): value is PlayMode {
  return ["casual", "ranked", "rotation"].includes(value);
}

function isAvailabilityDay(value: string): value is AvailabilityDay {
  return ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(value);
}

function isTimeWindow(value: string): value is TimeWindow {
  return ["morning", "afternoon", "evening"].includes(value);
}

export async function GET() {
  const players = await listPlayers();
  return NextResponse.json({ players });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CreatePlayerBody;

  if (!isNonEmptyString(body.displayName)) {
    return NextResponse.json({ error: "displayName is required" }, { status: 400 });
  }
  if (!isNonEmptyString(body.email)) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const email = body.email.trim();
  if (!email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "email is invalid" }, { status: 400 });
  }

  const rawSkill = isNonEmptyString(body.skillLevel) ? body.skillLevel : "beginner";
  if (!isSkillLevel(rawSkill)) {
    return NextResponse.json({ error: "skillLevel is invalid" }, { status: 400 });
  }

  const days = asStringArray(body.availabilityDays).filter(isAvailabilityDay);
  const windows = asStringArray(body.availabilityWindows).filter(isTimeWindow);
  const preferredPlayModes = asStringArray(body.preferredPlayModes).filter(isPlayMode);

  const tournamentInterested = body.tournamentInterested === true;
  const tournamentDivisions = asStringArray(body.tournamentDivisions);

  const player = await createPlayer({
    displayName: body.displayName.trim(),
    contact: {
      email,
      phone: isNonEmptyString(body.phone) ? body.phone.trim() : undefined,
    },
    skillLevel: rawSkill,
    availability: {
      days,
      windows,
      notes: isNonEmptyString(body.availabilityNotes) ? body.availabilityNotes.trim() : undefined,
    },
    preferredPlayModes,
    tournament: {
      interested: tournamentInterested,
      divisions: tournamentInterested && tournamentDivisions.length > 0 ? tournamentDivisions : undefined,
      notes: tournamentInterested && isNonEmptyString(body.tournamentNotes) ? body.tournamentNotes.trim() : undefined,
    },
  });

  return NextResponse.json({ player }, { status: 201 });
}

