"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FormState = {
  displayName: string;
  email: string;
  phone: string;
  skillLevel: string;
  availabilityDays: string[];
  availabilityWindows: string[];
  availabilityNotes: string;
  preferredPlayModes: string[];
  tournamentInterested: boolean;
  tournamentDivisions: string;
  tournamentNotes: string;
};

const dayOptions = [
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
  { value: "sunday", label: "Sun" },
] as const;

const windowOptions = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
] as const;

const modeOptions = [
  { value: "casual", label: "Casual pairing" },
  { value: "ranked", label: "Ranked pairing" },
  { value: "rotation", label: "Rotation-based play" },
] as const;

const skillOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "lower-intermediate", label: "Lower-intermediate" },
  { value: "intermediate", label: "Intermediate" },
  { value: "upper-intermediate", label: "Upper-intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "open", label: "Open" },
] as const;

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    displayName: "",
    email: "",
    phone: "",
    skillLevel: "beginner",
    availabilityDays: [],
    availabilityWindows: [],
    availabilityNotes: "",
    preferredPlayModes: ["casual"],
    tournamentInterested: false,
    tournamentDivisions: "",
    tournamentNotes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  const divisions = useMemo(() => {
    return form.tournamentDivisions
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [form.tournamentDivisions]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setCreatedId(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          displayName: form.displayName,
          email: form.email,
          phone: form.phone || undefined,
          skillLevel: form.skillLevel,
          availabilityDays: form.availabilityDays,
          availabilityWindows: form.availabilityWindows,
          availabilityNotes: form.availabilityNotes || undefined,
          preferredPlayModes: form.preferredPlayModes,
          tournamentInterested: form.tournamentInterested,
          tournamentDivisions: form.tournamentInterested ? divisions : [],
          tournamentNotes: form.tournamentInterested ? form.tournamentNotes : "",
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as any;
      if (!response.ok) {
        setError(payload?.error ?? "Registration failed");
        return;
      }

      setCreatedId(payload?.player?.id ?? null);
      setForm((prev) => ({
        ...prev,
        displayName: "",
        email: "",
        phone: "",
        availabilityNotes: "",
        tournamentDivisions: "",
        tournamentNotes: "",
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Player registration</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link className="text-slate-700 hover:underline" href="/players">
            View players
          </Link>
          <Link className="text-slate-700 hover:underline" href="/">
            Home
          </Link>
        </div>
      </div>

      <p className="mt-2 text-slate-600">
        Create a profile with contact details, skill level, availability, play mode preferences, and tournament participation.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Display name</span>
            <input
              className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-300"
              value={form.displayName}
              onChange={(e) => setForm((p) => ({ ...p, displayName: e.target.value }))}
              placeholder="e.g., Alex Chen"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Skill level</span>
            <select
              className="h-11 rounded-xl border bg-white px-3 outline-none focus:ring-2 focus:ring-slate-300"
              value={form.skillLevel}
              onChange={(e) => setForm((p) => ({ ...p, skillLevel: e.target.value }))}
            >
              {skillOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Email</span>
            <input
              className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-300"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="name@example.com"
              type="email"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Phone (optional)</span>
            <input
              className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-300"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+1 555 0100"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Availability (days)</div>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, availabilityDays: toggle(p.availabilityDays, o.value) }))}
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm",
                    form.availabilityDays.includes(o.value) ? "bg-slate-900 text-white" : "bg-white text-slate-700",
                  ].join(" ")}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Availability (time windows)</div>
            <div className="flex flex-wrap gap-2">
              {windowOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, availabilityWindows: toggle(p.availabilityWindows, o.value) }))
                  }
                  className={[
                    "rounded-full border px-3 py-1.5 text-sm",
                    form.availabilityWindows.includes(o.value) ? "bg-slate-900 text-white" : "bg-white text-slate-700",
                  ].join(" ")}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Availability notes (optional)</span>
          <input
            className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-300"
            value={form.availabilityNotes}
            onChange={(e) => setForm((p) => ({ ...p, availabilityNotes: e.target.value }))}
            placeholder="e.g., Prefer outdoor courts; weekdays after 6pm"
          />
        </label>

        <div className="space-y-2">
          <div className="text-sm font-medium">Preferred play mode</div>
          <div className="flex flex-wrap gap-2">
            {modeOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setForm((p) => ({ ...p, preferredPlayModes: toggle(p.preferredPlayModes, o.value) }))}
                className={[
                  "rounded-full border px-3 py-1.5 text-sm",
                  form.preferredPlayModes.includes(o.value) ? "bg-slate-900 text-white" : "bg-white text-slate-700",
                ].join(" ")}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={form.tournamentInterested}
              onChange={(e) => setForm((p) => ({ ...p, tournamentInterested: e.target.checked }))}
            />
            <span className="text-sm font-medium">Interested in tournaments</span>
          </label>

          {form.tournamentInterested ? (
            <div className="mt-4 grid grid-cols-1 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Preferred divisions (comma separated)</span>
                <input
                  className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-300"
                  value={form.tournamentDivisions}
                  onChange={(e) => setForm((p) => ({ ...p, tournamentDivisions: e.target.value }))}
                  placeholder="e.g., Mixed Doubles 3.5, Mens Doubles 4.0"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Tournament notes (optional)</span>
                <input
                  className="h-11 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-slate-300"
                  value={form.tournamentNotes}
                  onChange={(e) => setForm((p) => ({ ...p, tournamentNotes: e.target.value }))}
                  placeholder="e.g., Available weekends only"
                />
              </label>
            </div>
          ) : null}
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
        ) : null}

        {createdId ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Profile created.{" "}
            <Link className="underline" href="/players">
              View players
            </Link>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/players"
            className="h-11 rounded-xl border bg-white px-4 inline-flex items-center text-sm text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

