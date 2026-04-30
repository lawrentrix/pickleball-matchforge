import Link from "next/link";
import { listPlayers } from "@/lib/playerStore";

function labelSkill(value: string) {
  return value
    .split("-")
    .map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
    .join(" ");
}

export default async function PlayersPage() {
  const players = await listPlayers();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Players</h1>
        <div className="flex items-center gap-3 text-sm">
          <Link className="text-slate-700 hover:underline" href="/register">
            Register player
          </Link>
          <Link className="text-slate-700 hover:underline" href="/">
            Home
          </Link>
        </div>
      </div>

      <p className="mt-2 text-slate-600">Local player profiles created from the registration form.</p>

      {players.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-white p-8 text-slate-700">
          No players yet.{" "}
          <Link className="underline" href="/register">
            Create the first profile
          </Link>
          .
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
          <div className="grid grid-cols-12 gap-2 border-b bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <div className="col-span-4">Player</div>
            <div className="col-span-3">Skill</div>
            <div className="col-span-3">Play modes</div>
            <div className="col-span-2 text-right">Created</div>
          </div>
          <div className="divide-y">
            {players.map((p) => (
              <div key={p.id} className="grid grid-cols-12 gap-2 px-4 py-4 text-sm">
                <div className="col-span-4">
                  <div className="font-medium text-slate-900">{p.displayName}</div>
                  <div className="text-slate-600">{p.contact.email}</div>
                </div>
                <div className="col-span-3 text-slate-800">{labelSkill(p.skillLevel)}</div>
                <div className="col-span-3 text-slate-800">
                  {p.preferredPlayModes.length ? p.preferredPlayModes.join(", ") : "—"}
                </div>
                <div className="col-span-2 text-right text-slate-600">
                  {new Date(p.createdAt).toLocaleDateString()}
                </div>
                <div className="col-span-12 mt-2 text-xs text-slate-600">
                  Availability: {p.availability.days.length ? p.availability.days.join(", ") : "—"};{" "}
                  {p.availability.windows.length ? p.availability.windows.join(", ") : "—"}
                  {p.tournament.interested ? (
                    <>
                      {" "}
                      • Tournament: yes
                      {p.tournament.divisions?.length ? ` (${p.tournament.divisions.join(", ")})` : ""}
                    </>
                  ) : (
                    <> • Tournament: no</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

