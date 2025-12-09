"use client";

import { Category, Strain } from "../lib/products";

const categoryFilters: { label: string; value: Category | "all" }[] = [
  { label: "All Products", value: "all" },
  { label: "Flower", value: "flower" },
  { label: "Edibles", value: "edibles" },
  { label: "Concentrates", value: "concentrates" },
  { label: "Vapes", value: "vapes" },
  { label: "Pre-Rolls", value: "pre-rolls" },
  { label: "Topicals", value: "topicals" },
  { label: "Accessories", value: "accessories" },
];

const strainFilters: { label: string; value: Strain | "all" }[] = [
  { label: "All Strains", value: "all" },
  { label: "Indica", value: "indica" },
  { label: "Sativa", value: "sativa" },
  { label: "Hybrid", value: "hybrid" },
  { label: "CBD", value: "cbd" },
];

export type ProductFiltersState = {
  search: string;
  category: Category | "all";
  strain: Strain | "all";
};

export function ProductFilters({
  value,
  onChange,
}: {
  value: ProductFiltersState;
  onChange: (value: ProductFiltersState) => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={value.search}
        onChange={(e) => onChange({ ...value, search: e.target.value })}
        className="w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
      />

      <div className="space-y-2 text-xs text-slate-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-slate-500">Category:</span>
          {categoryFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onChange({ ...value, category: filter.value })}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                value.category === filter.value
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                  : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-emerald-300 hover:text-emerald-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-slate-500">Strain:</span>
          {strainFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => onChange({ ...value, strain: filter.value })}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                value.strain === filter.value
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                  : "border-white/10 bg-slate-900/80 text-slate-300 hover:border-emerald-300 hover:text-emerald-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
