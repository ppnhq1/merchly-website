// TODO: replace placeholder figures with real company stats before launch.
const stats = [
  { value: "10,000+", label: "Merchants served" },
  { value: "$2B+", label: "Processed annually" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "24/7", label: "US-based support" },
];

export function StatsBar() {
  return (
    <section className="bg-neutral text-neutral-content">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-primary">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-neutral-content/70">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
