import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-6 pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.2),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center sm:items-start sm:text-left">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-900/80 px-4 py-1 text-xs font-medium text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Houston&apos;s Premier Mobile Dispensary
        </div>

        <h1 className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
          Premium Cannabis
          <br />
          <span className="text-emerald-400">Delivered to You</span>
        </h1>

        <p className="mb-8 max-w-2xl text-base text-slate-300 sm:text-lg">
          Browse our curated selection of top-quality products, pre-order online, and
          pick up at your nearest location. Quality you can trust.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/40 transition hover:bg-emerald-400"
          >
            Shop Now
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center rounded-lg border border-emerald-500/60 bg-slate-950/60 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            Find a Location
          </Link>
        </div>
      </div>
    </section>
  );
}
