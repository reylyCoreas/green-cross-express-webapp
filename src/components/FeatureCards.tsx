const features = [
  {
    title: "Premium Quality",
    description: "Lab-tested products from trusted growers.",
  },
  {
    title: "Easy Pre-Order",
    description: "Order online, skip the wait.",
  },
  {
    title: "Multiple Locations",
    description: "Convenient pickup points across Houston.",
  },
];

export function FeatureCards() {
  return (
    <section className="bg-slate-950 px-6 pb-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-white/5 bg-slate-900/70 px-6 py-5 shadow-lg shadow-black/40"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <span className="text-lg">●</span>
            </div>
            <h3 className="mb-1 text-sm font-semibold text-slate-50">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
