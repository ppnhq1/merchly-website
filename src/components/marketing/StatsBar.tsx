import { Store, Landmark, ActivitySquare, Headset } from "lucide-react";

// TODO: replace placeholder figures with real company stats before launch.
const stats = [
  { value: "10,000+", label: "Merchants served", icon: Store },
  { value: "$2B+", label: "Processed annually", icon: Landmark },
  { value: "99.99%", label: "Platform uptime", icon: ActivitySquare },
  { value: "24/7", label: "US-based support", icon: Headset },
];

export function StatsBar() {
  return (
    <section className="bg-neutral text-neutral-content">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
        <div className="stats stats-vertical sm:stats-horizontal w-full bg-transparent divide-neutral-content/10">
          {stats.map((stat) => (
            <div key={stat.label} className="stat place-items-center text-center">
              <div className="stat-figure text-primary">
                <stat.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="stat-value font-heading text-3xl sm:text-4xl tabular-nums">
                {stat.value}
              </div>
              <div className="stat-desc text-neutral-content/70 text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
