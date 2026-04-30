"use client";

import { useEffect, useState } from "react";

type StaticData = {
  product: { name: string; version: string };
  skillLevels: { value: string; label: string }[];
  playModes: { value: string; label: string }[];
  availability: {
    days: { value: string; label: string }[];
    windows: { value: string; label: string }[];
  };
  seedPlayers: { displayName: string; skillLevel: string; preferredPlayModes: string[] }[];
};

export default function StaticDataPanel() {
  const [data, setData] = useState<StaticData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/static", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        const json = (await res.json()) as StaticData;
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-slate-900">Static backend data</div>
      <div className="mt-1 text-sm text-slate-600">Loaded from `GET /api/static`.</div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      ) : null}

      {!data ? (
        <div className="mt-4 text-sm text-slate-600">Loading…</div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Product</div>
            <div className="mt-2 text-sm text-slate-900">{data.product.name}</div>
            <div className="text-sm text-slate-600">v{data.product.version}</div>
          </div>
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Play modes</div>
            <div className="mt-2 text-sm text-slate-800">{data.playModes.map((m) => m.label).join(", ")}</div>
          </div>
          <div className="rounded-xl border bg-slate-50 p-4 sm:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600">Seed players</div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {data.seedPlayers.map((p) => (
                <div key={p.displayName} className="rounded-lg border bg-white p-3">
                  <div className="text-sm font-medium text-slate-900">{p.displayName}</div>
                  <div className="text-xs text-slate-600">
                    {p.skillLevel} • {p.preferredPlayModes.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

