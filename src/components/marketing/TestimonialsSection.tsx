"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const AUTO_SCROLL_INTERVAL_MS = 4500;

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const advance = () => {
      if (pausedRef.current) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + track.clientWidth * 0.9,
        behavior: "instant",
      });
    };

    const interval = setInterval(advance, AUTO_SCROLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const scrollByStep = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-heading font-bold">
            Trusted by businesses like yours
          </h2>
          <p className="mt-3 text-base-content/70">
            Illustrative feedback — final testimonials will be sourced from
            verified Merchly merchants before launch.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="btn btn-circle btn-outline btn-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="btn btn-circle btn-outline btn-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onBlur={() => (pausedRef.current = false)}
        className="carousel carousel-start w-full mt-10 gap-6"
      >
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="carousel-item card bg-base-100 border border-base-300 w-[19rem] sm:w-[22rem]"
          >
            <blockquote className="card-body">
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
