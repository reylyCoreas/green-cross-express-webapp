"use client";

import { useEffect, useState } from "react";
import type { Location } from "../lib/locations";
import { findNearestLocation } from "../lib/geo";

export function LocationMap({ locations }: { locations: Location[] }) {
  const [nearest, setNearest] = useState<Location | null>(null);
  const [hasGeo, setHasGeo] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setHasGeo(true);
        const point = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        const nearestLoc = findNearestLocation(locations, point);
        if (nearestLoc) {
          setNearest(nearestLoc);
        }
      },
      () => {
        setHasGeo(false);
      }
    );
  }, [locations]);

  return (
    <div className="space-y-3 rounded-2xl border border-white/5 bg-slate-900/80 p-4">
      <div className="flex h-80 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.35),transparent_55%),radial-gradient(circle_at_top_left,rgba(15,23,42,0.9),#020617)] text-xs text-slate-300">
        <div className="text-center">
          <div className="mb-1 text-[11px] uppercase tracking-[0.15em] text-emerald-300">
            Map Preview
          </div>
          <p className="max-w-sm text-xs text-slate-300">
            An interactive map will highlight the nearest GreenCross pickup point
            based on your location.
          </p>
        </div>
      </div>

      <div className="text-xs text-slate-300">
        {nearest ? (
          <p>
            Nearest location: <span className="font-semibold">{nearest.name}</span>
            {" "}
            at {nearest.addressLines[0]}.
          </p>
        ) : hasGeo ? (
          <p>Detecting your nearest GreenCross location…</p>
        ) : (
          <p>
            We&apos;ll use your browser location to highlight the closest pickup
            point once you grant permission.
          </p>
        )}
      </div>
    </div>
  );
}
