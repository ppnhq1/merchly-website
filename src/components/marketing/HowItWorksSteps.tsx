"use client";

import { useEffect, useState } from "react";

const onboardingSteps = [
  { label: "Apply", detail: "5-minute application, no cost to submit" },
  { label: "Get approved", detail: "Underwriting in as little as 24 hours" },
  {
    label: "Start accepting payments",
    detail: "Terminal or gateway shipped and configured",
  },
];

const STEP_DURATION_MS = 3200;
const TOTAL_DURATION_MS = STEP_DURATION_MS * onboardingSteps.length;

// Pre-built, complete class strings — never assembled from fragments — so
// Tailwind can always see every class it needs to generate (same convention
// as Hero.tsx).
const cardActiveClass =
  "card border border-primary bg-primary/5 shadow-md scale-[1.02] transition motion-safe:duration-500";
const cardInactiveClass =
  "card border border-base-300 bg-base-200 scale-100 shadow-none transition motion-safe:duration-500";
const circleActiveClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content font-heading font-semibold transition motion-safe:duration-500";
const circlePendingClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-base-300 text-base-content/50 font-heading font-semibold transition motion-safe:duration-500";
const labelActiveClass = "font-heading font-semibold text-primary";
const labelInactiveClass = "font-heading font-semibold";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function HowItWorksSteps() {
  const [activeIndex, setActiveIndex] = useState(() =>
    prefersReducedMotion() ? onboardingSteps.length - 1 : 0,
  );
  const [overallProgress, setOverallProgress] = useState(() =>
    prefersReducedMotion() ? 100 : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let raf: number;
    const cycleStart = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - cycleStart) % TOTAL_DURATION_MS;
      setOverallProgress((elapsed / TOTAL_DURATION_MS) * 100);
      setActiveIndex(
        Math.min(
          Math.floor(elapsed / STEP_DURATION_MS),
          onboardingSteps.length - 1,
        ),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mt-12">
      {/* One continuous bar for the whole cycle — updated every animation
          frame so it reads as a smooth sweep instead of jumping per step. */}
      <progress
        className="progress progress-primary w-full"
        value={overallProgress}
        max={100}
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {onboardingSteps.map((step, index) => (
          <div
            key={step.label}
            className={index === activeIndex ? cardActiveClass : cardInactiveClass}
          >
            <div className="flex flex-row items-center gap-3 p-5 sm:flex-col sm:p-6 sm:text-center">
              <div className={index <= activeIndex ? circleActiveClass : circlePendingClass}>
                {index + 1}
              </div>
              <div>
                <div className={index === activeIndex ? labelActiveClass : labelInactiveClass}>
                  {step.label}
                </div>
                <div className="mt-1 text-sm text-base-content/60">
                  {step.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
