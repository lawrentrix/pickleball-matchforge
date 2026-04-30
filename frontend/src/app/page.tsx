import Link from "next/link";
import StaticDataPanel from "./_components/StaticDataPanel";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Pickleball MatchForge</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Player registration, matchmaking preferences, availability capture, and tournament participation — the foundation for
        smart pairing and event management.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/register"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="text-sm font-semibold text-slate-900">Register a player</div>
          <div className="mt-2 text-sm text-slate-600">
            Create profiles with contact details, skill level, availability, play mode, and tournament preferences.
          </div>
        </Link>
        <Link
          href="/players"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="text-sm font-semibold text-slate-900">View players</div>
          <div className="mt-2 text-sm text-slate-600">See the current player pool and key preferences at a glance.</div>
        </Link>
      </div>

      <div className="mt-10 rounded-2xl border bg-slate-50 p-6 text-sm text-slate-700">
        Data persistence is currently local-only (file-backed) for development. A real database/auth layer will come later.
      </div>

      <div className="mt-6">
        <StaticDataPanel />
      </div>
    </div>
  );
}
