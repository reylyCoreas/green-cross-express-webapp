"use client";

import { locations } from "../../lib/locations";
import { LocationMap } from "../../components/LocationMap";

export default function LocationsPage() {
  return (
    <div className="bg-slate-950 px-6 pb-24 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">
            Find a Location
          </h1>
          <p className="text-sm text-slate-400">
            Visit one of our Houston-area locations for pickup.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-slate-900/70 p-4 text-sm text-slate-200 md:flex-row md:items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/40 transition hover:bg-emerald-400"
            >
              Use My Location
            </button>
            <span className="hidden text-slate-500 md:inline">or</span>
            <div className="flex flex-1 flex-col gap-2 md:flex-row">
              <input
                type="text"
                placeholder="Enter ZIP code"
                className="field-input md:max-w-xs"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-emerald-400 hover:text-emerald-200"
              >
                Search
              </button>
            </div>
          </div>

          <LocationMap locations={locations} />
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-50">All Locations</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="rounded-2xl border border-white/5 bg-slate-900/80 p-4 text-sm text-slate-200"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-semibold">{loc.name}</div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-300">
                    {loc.status === "open" ? "Open Now" : "Closed"}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  {loc.addressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                  <div>{loc.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
