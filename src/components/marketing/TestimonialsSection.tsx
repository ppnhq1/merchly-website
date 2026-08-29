"use client";

import { useEffect, useRef } from "react";

// TODO: replace with real customer quotes before launch.
const testimonials = [
  {
    quote:
      "Switching to Merchly cut our processing costs and the funding actually lands the next day like they said it would.",
    name: "Jordan M.",
    role: "Owner, quick-service restaurant",
    initials: "JM",
  },
  {
    quote:
      "We were rejected by three processors before Merchly. Their team understood our industry and got us approved in days.",
    name: "Priya S.",
    role: "Founder, e-commerce brand",
    initials: "PS",
  },
  {
    quote: "Support actually picks up the phone. That alone has been worth switching for.",
    name: "Dave R.",
    role: "Retail store manager",
    initials: "DR",
  },
  {
    quote:
      "Most processors wouldn't touch our category. Merchly got us a stable account and walked us through every compliance question.",
    name: "Alicia T.",
    role: "Founder, CBD brand",
    initials: "AT",
  },
  {
    quote:
      "Rolling out the same rates and hardware across five locations used to be a headache. Now it's one dashboard.",
    name: "Marcus L.",
    role: "Owner, multi-location gym",
    initials: "ML",
  },
];

// The track renders the list twice back-to-back. Scrolling exactly one set's
// width and wrapping scrollLeft by that same amount keeps the content
// visually identical across the seam, so the loop never "resets" visibly.
const PIXELS_PER_SECOND = 32;

const cardClass =
  "card bg-base-100 border border-base-300 shrink-0 w-[19rem] sm:w-[22rem] transition motion-safe:duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    let rafId: number;
    let lastTime: number | null = null;

    const tick = (now: number) => {
      if (lastTime === null) lastTime = now;
      const deltaSeconds = (now - lastTime) / 1000;
      lastTime = now;

      if (!pausedRef.current) {
        track.scrollLeft += PIXELS_PER_SECOND * deltaSeconds;
        const setWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= setWidth) {
          track.scrollLeft -= setWidth;
        }
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-heading font-bold">
          Trusted by businesses like yours
        </h2>
        <p className="mt-3 text-base-content/70">
          Illustrative feedback — final testimonials will be sourced from
          verified Merchly merchants before launch.
        </p>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="mt-10 flex gap-6 overflow-hidden"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <figure key={`${testimonial.name}-${index}`} className={cardClass}>
            <blockquote className="p-6">
              <p className="text-base-content/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="bg-base-300 text-base-content w-9 rounded-full">
                    <span className="text-xs font-semibold">
                      {testimonial.initials}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-base-content/60">{testimonial.role}</div>
                </div>
              </figcaption>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
