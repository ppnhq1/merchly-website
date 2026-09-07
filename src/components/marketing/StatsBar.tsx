"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/AppIcon";

// TODO: replace placeholder figures with real company stats before launch.
type Stat =
  | {
      type: "count";
      target: number;
      decimals?: number;
      prefix?: string;
      suffix?: string;
      label: string;
      icon: string;
    }
  | { type: "static"; value: string; label: string; icon: string };

const stats: Stat[] = [
  { type: "count", target: 10000, suffix: "+", label: "Merchants served", icon: "lucide:store" },
  {
    type: "count",
    target: 2,
    prefix: "$",
    suffix: "B+",
    label: "Processed annually",
    icon: "lucide:landmark",
  },
  {
    type: "count",
    target: 99.99,
    decimals: 2,
    suffix: "%",
    label: "Platform uptime",
    icon: "lucide:activity-square",
  },
  { type: "static", value: "24/7", label: "US-based support", icon: "lucide:headset" },
];

const COUNT_DURATION_MS = 1800;

function formatCount(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function CountUpValue({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const runCount = () => {
      if (started.current) return;
      started.current = true;

      if (prefersReducedMotion) {
        setDisplay(target);
        return;
      }

      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / COUNT_DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) runCount();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="stat-value font-heading text-3xl sm:text-4xl tabular-nums">
      {prefix}
      {formatCount(display, decimals)}
      {suffix}
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="bg-neutral text-neutral-content">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
        <div className="stats stats-vertical sm:stats-horizontal w-full bg-transparent divide-neutral-content/10">
          {stats.map((stat) => (
            <div key={stat.label} className="stat place-items-center text-center">
              <div className="stat-figure text-primary">
                <Icon icon={stat.icon} className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              {stat.type === "count" ? (
                <CountUpValue
                  target={stat.target}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              ) : (
                <div className="stat-value font-heading text-3xl sm:text-4xl tabular-nums">
                  {stat.value}
                </div>
              )}
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
