import { Quote } from "lucide-react";
import type { ReviewEntry } from "@/lib/industries";

type ReviewsSectionProps = {
  reviews?: ReviewEntry[] | null;
};

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// A simple static grid rather than the sitewide animated marquee
// (TestimonialsSection) — curated per-industry review sets are typically
// small (2-4 entries), where an infinite-scroll loop would look sparse.
export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  // A row with only a quote (or only a name) is skipped rather than enforced
  // as required at the schema level, so it can't block saving the rest of
  // the document.
  const entries = reviews?.filter((review) => review.quote && review.name) ?? [];
  if (!entries.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 bg-base-200/60">
      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center">
        What businesses like yours are saying
      </h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((review) => (
          <figure
            key={review.name}
            className="card card-border bg-base-100 border-base-300"
          >
            <div className="card-body gap-3">
              <Quote className="h-5 w-5 text-primary/40" aria-hidden="true" strokeWidth={2.5} />
              <blockquote className="text-base-content/80 text-sm leading-relaxed -mt-1">
                {review.quote}
              </blockquote>
              <figcaption className="mt-1 flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="bg-base-300 text-base-content w-9 rounded-full">
                    <span className="text-xs font-semibold">
                      {initialsFor(review.name)}
                    </span>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{review.name}</div>
                  {review.role && (
                    <div className="text-xs text-base-content/50 truncate">{review.role}</div>
                  )}
                </div>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
