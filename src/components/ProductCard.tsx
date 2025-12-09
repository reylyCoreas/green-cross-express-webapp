"use client";

import Image from "next/image";
import { Product } from "../lib/products";
import { useCart } from "../lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900/80 shadow-lg shadow-black/40">
      <div className="relative h-44 w-full overflow-hidden">
        {product.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
            Featured
          </span>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              {product.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
              {product.strain && (
                <span className="rounded-full bg-slate-800 px-2 py-0.5 capitalize text-emerald-200">
                  {product.strain}
                </span>
              )}
              {product.weightLabel && (
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-200">
                  {product.weightLabel}
                </span>
              )}
            </div>
          </div>
          <span className="text-sm font-semibold text-emerald-400">
            ${product.price}
          </span>
        </div>

        {(product.thcPercent || product.cbdPercent) && (
          <div className="flex gap-4 text-[11px] text-slate-400">
            {product.thcPercent != null && <span>THC: {product.thcPercent}%</span>}
            {product.cbdPercent != null && <span>CBD: {product.cbdPercent}%</span>}
          </div>
        )}

        <p className="line-clamp-3 text-xs text-slate-400">
          {product.description}
        </p>

        <button
          type="button"
          onClick={() => addItem(product.id)}
          className="mt-auto inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          + Add to Order
        </button>
      </div>
    </div>
  );
}
