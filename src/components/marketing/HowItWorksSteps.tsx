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
const RESET_SNAP_MS = 50;

// Pre-built, complete class strings — never assembled from fragments — so
// Tailwind can always see every class it needs to generate, and so the
// Blueprint linter can verify each one (same convention as Hero.tsx). The
// track fill is a real CSS width transition driven by the browser's
// compositor, not a per-frame JS update — that's what makes it glide
// instead of jitter. trackFillInstantClass skips the transition for the one
// moment the loop wraps back to step 1, so it resets instead of sweeping
// backwards.
const trackFillStep0AnimatedClass =
  "absolute inset-y-0 left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary transition-[width] ease-linear duration-[3200ms] w-0";
const trackFillStep0InstantClass =
  "absolute inset-y-0 left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary transition-none w-0";
const trackFillStep1Class =
  "absolute inset-y-0 left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary transition-[width] ease-linear duration-[3200ms] w-1/2";
const trackFillStep2Class =
  "absolute inset-y-0 left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary transition-[width] ease-linear duration-[3200ms] w-full";

const nodeActiveClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content font-heading font-semibold text-sm tabular-nums ring-2 ring-primary/30 ring-offset-2 ring-offset-base-200 scale-110 shadow-md transition motion-safe:duration-500";
const nodePendingClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base-100 text-base-content/50 font-heading font-semibold text-sm tabular-nums ring-2 ring-transparent ring-offset-2 ring-offset-base-200 scale-100 shadow-none transition motion-safe:duration-500";

const cardActiveClass =
  "card border border-primary bg-primary/5 shadow-md scale-[1.02] transition motion-safe:duration-500";
const cardInactiveClass =
  "card border border-base-300 bg-base-100 scale-100 shadow-none transition motion-safe:duration-500";
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
  const [instantReset, setInstantReset] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % onboardingSteps.length;
        if (next === 0) {
          setInstantReset(true);
          setTimeout(() => setInstantReset(false), RESET_SNAP_MS);
        }
        return next;
      });
    }, STEP_DURATION_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-12">
      {/* Track with numbered nodes sitting on it, and a fill that glides
          between them via a native CSS width transition. */}
      <div className="relative h-9">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-base-300" />
        <div
          className={
            activeIndex === 0
              ? instantReset
                ? trackFillStep0InstantClass
                : trackFillStep0AnimatedClass
              : activeIndex === 1
                ? trackFillStep1Class
                : trackFillStep2Class
          }
        />
        <div className="absolute inset-0 flex items-center justify-between">
          {onboardingSteps.map((step, index) => (
            <div
              key={step.label}
              className={index <= activeIndex ? nodeActiveClass : nodePendingClass}
            >
              <span className="tabular-nums">{index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {onboardingSteps.map((step, index) => (
          <div
            key={step.label}
            className={index === activeIndex ? cardActiveClass : cardInactiveClass}
          >
            <div className="p-5 sm:p-6 sm:text-center">
              <div className={index === activeIndex ? labelActiveClass : labelInactiveClass}>
                {step.label}
              </div>
              <div className="mt-1 text-sm text-base-content/60">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
