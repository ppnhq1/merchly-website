"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/AppIcon";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import type { Industry } from "@/lib/industries";

const trustPoints = [
  "Transparent, interchange-level pricing",
  "Next-day funding available",
  "24/7 US-based support",
  "No long-term contracts",
];

const feeLines = [
  { label: "Statement Fee", amount: "$39/month" },
  { label: "PCI Fee", amount: "$29/month" },
  { label: "Gateway Fee", amount: "$19/month" },
  { label: "Account on File Fee", amount: "$19/month" },
  { label: "Batch Fees", amount: "$10/month" },
];

// Each entrance-animated element swaps between one of these two complete,
// pre-built class strings — never assembled from fragments at runtime, so
// Tailwind can always see every class it needs to generate. The hidden ->
// visible state itself is unconditional (so content never leaks early and
// the reveal sequence is still visible to prefers-reduced-motion users);
// only the smooth transition/delay is motion-safe-scoped, so those users
// get the same timed sequence as instant snaps instead of a full skip.
const headlineHiddenClass =
  "text-4xl sm:text-5xl xl:text-6xl font-heading font-bold leading-tight translate-y-3 opacity-0 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out";
const headlineRevealedClass =
  "text-4xl sm:text-5xl xl:text-6xl font-heading font-bold leading-tight translate-y-0 opacity-100 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out";

const paragraphHiddenClass =
  "mt-6 text-lg text-base-content/70 max-w-xl translate-y-3 opacity-0 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-150";
const paragraphRevealedClass =
  "mt-6 text-lg text-base-content/70 max-w-xl translate-y-0 opacity-100 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-150";

const industriesHiddenClass =
  "mt-6 flex flex-wrap items-center gap-2 translate-y-3 opacity-0 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-300";
const industriesRevealedClass =
  "mt-6 flex flex-wrap items-center gap-2 translate-y-0 opacity-100 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-300";

const ctaHiddenClass =
  "mt-8 flex flex-wrap gap-4 translate-y-3 opacity-0 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-500";
const ctaRevealedClass =
  "mt-8 flex flex-wrap gap-4 translate-y-0 opacity-100 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-500";

const trustHiddenClass =
  "mt-10 flex flex-wrap gap-x-6 gap-y-3 translate-y-3 opacity-0 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-700";
const trustRevealedClass =
  "mt-10 flex flex-wrap gap-x-6 gap-y-3 translate-y-0 opacity-100 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-700";

const previewHiddenClass =
  "lg:w-5/12 w-full translate-y-3 opacity-0 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-500";
const previewRevealedClass =
  "lg:w-5/12 w-full translate-y-0 opacity-100 motion-safe:transition motion-safe:duration-700 motion-safe:ease-out motion-safe:delay-500";

const feeRowNormalClass =
  "flex items-center justify-between gap-3 text-base text-base-content/80 motion-safe:transition-colors motion-safe:duration-500";
const feeRowStruckClass =
  "flex items-center justify-between gap-3 text-base text-base-content/35 line-through decoration-2 motion-safe:transition-colors motion-safe:duration-500";

// The badge label is two lines stacked in a flex-col track, clipped by the
// badge's own height (24px, daisyUI's default badge size). Shifting the
// track by -50% of its own (2-line) height moves exactly one line — a
// clean vertical scroll-swap instead of an instant text replacement.
const cardLabelTrackRestClass =
  "flex flex-col self-start translate-y-0 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-in-out";
const cardLabelTrackShiftedClass =
  "flex flex-col self-start -translate-y-1/2 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-in-out";

// Aura only shows as a thin ring where it isn't covered by an opaque
// surface — this needs its own bg-base-100 or the gold gradient fills the
// whole box behind the text instead of just glowing at the edges. The
// small scale change (95% -> 100%) gives the reveal a distinct settle-in
// feel and, since CSS transitions run in reverse automatically, the same
// pair also gives the exit a clean shrink-and-fade instead of an
// instant disappearance.
const rateHiddenClass =
  "flex items-center justify-between gap-3 rounded-box bg-base-100 px-3 py-2 translate-y-2 scale-95 opacity-0 motion-safe:transition motion-safe:duration-500 motion-safe:ease-out";
const rateRevealedClass =
  "flex items-center justify-between gap-3 rounded-box bg-base-100 px-3 py-2 translate-y-0 scale-100 opacity-100 motion-safe:transition motion-safe:duration-500 motion-safe:ease-out";

const rateWrapperInactiveClass = "mt-4 w-full";
const rateWrapperActiveClass = "mt-4 aura aura-gold w-full";

// Timing for the looping fee-breakdown animation: each fee crosses off in
// turn, the Merchly rate holds on screen for a while so it can be read,
// then the whole thing resets and replays. Loops only when motion is safe —
// reduced-motion users get one pass to the final state and it stays there.
const FEE_REVEAL_START_MS = 1200;
const FEE_REVEAL_STEP_MS = 900;
const RATE_REVEAL_DELAY_MS = 500;
const RATE_HOLD_MS = 4500;

export function Hero({ industries }: { industries: Industry[] }) {
  const [mounted, setMounted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showRate, setShowRate] = useState(false);

  useEffect(() => {
    const mountFrame = requestAnimationFrame(() => setMounted(true));

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const revealAtMs =
      FEE_REVEAL_START_MS +
      feeLines.length * FEE_REVEAL_STEP_MS +
      RATE_REVEAL_DELAY_MS;

    function playCycle() {
      setRevealedCount(0);
      setShowRate(false);

      feeLines.forEach((_, index) => {
        timers.push(
          setTimeout(
            () => setRevealedCount((count) => Math.max(count, index + 1)),
            FEE_REVEAL_START_MS + index * FEE_REVEAL_STEP_MS,
          ),
        );
      });

      timers.push(setTimeout(() => setShowRate(true), revealAtMs));

      if (!prefersReducedMotion) {
        timers.push(
          setTimeout(() => {
            if (!cancelled) playCycle();
          }, revealAtMs + RATE_HOLD_MS),
        );
      }
    }

    playCycle();

    return () => {
      cancelled = true;
      cancelAnimationFrame(mountFrame);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="hero bg-base-200">
      <div className="hero-content max-w-7xl w-full flex-col lg:flex-row gap-10 py-20 sm:py-28 items-center">
        <div className="lg:w-7/12">
          <h1 className={mounted ? headlineRevealedClass : headlineHiddenClass}>
            Payment processing that shows its work.
          </h1>

          <p
            className={mounted ? paragraphRevealedClass : paragraphHiddenClass}
          >
            We publish real interchange-plus rates instead of a teaser quote
            that changes later. See exactly what you&apos;d save by
            switching, in writing, before you sign anything.
          </p>

          <div
            className={mounted ? industriesRevealedClass : industriesHiddenClass}
          >
            <span className="text-xs font-medium text-base-content/50 uppercase tracking-wide">
              Built for
            </span>
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="badge badge-outline badge-sm hover:badge-primary"
              >
                {industry.name}
              </Link>
            ))}
          </div>

          <div className={mounted ? ctaRevealedClass : ctaHiddenClass}>
            <LeadModalTrigger
              source="hero-cta"
              className="btn btn-primary btn-lg transition-transform hover:-translate-y-0.5"
            >
              See Your Rate
              <Icon icon="lucide:arrow-right" className="h-5 w-5" aria-hidden="true" />
            </LeadModalTrigger>
            <Link href="/industries" className="btn btn-outline btn-lg">
              Explore Industries
            </Link>
          </div>

          <ul className={mounted ? trustRevealedClass : trustHiddenClass}>
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm">
                <Icon
                  icon="lucide:check-circle-2"
                  className="h-4 w-4 text-success shrink-0"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className={mounted ? previewRevealedClass : previewHiddenClass}>
          <div className="card card-lg bg-base-100 border border-base-300 shadow-xl">
            <div className="card-body">
              <span className="badge badge-soft badge-secondary w-fit h-6 overflow-hidden px-3">
                <span
                  className={
                    showRate ? cardLabelTrackShiftedClass : cardLabelTrackRestClass
                  }
                >
                  <span className="flex h-6 items-center whitespace-nowrap">
                    What you&apos;re currently paying
                  </span>
                  <span className="flex h-6 items-center whitespace-nowrap">
                    What you pay with Merchly
                  </span>
                </span>
              </span>

              <ul className="mt-4 flex flex-col gap-2.5">
                {feeLines.map((fee, index) => (
                  <li
                    key={fee.label}
                    className={
                      index < revealedCount
                        ? feeRowStruckClass
                        : feeRowNormalClass
                    }
                  >
                    <span>{fee.label}</span>
                    <span className="tabular-nums">{fee.amount}</span>
                  </li>
                ))}
              </ul>

              <div className="divider my-1" />

              <div
                className={
                  showRate ? rateWrapperActiveClass : rateWrapperInactiveClass
                }
              >
                <div
                  className={showRate ? rateRevealedClass : rateHiddenClass}
                >
                  <span className="font-semibold">Merchly starts at</span>
                  <span className="text-2xl font-bold text-primary tabular-nums">
                    $15/mo
                  </span>
                </div>
              </div>
              <p className="text-xs text-base-content/50 mt-1">
                A starting point, not your rate — it depends on your volume
                and business type.
              </p>

              <Link
                href="#rate-calculator"
                className="btn btn-secondary mt-4 justify-between"
              >
                See your exact rate and savings
                <Icon icon="lucide:arrow-right" className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
