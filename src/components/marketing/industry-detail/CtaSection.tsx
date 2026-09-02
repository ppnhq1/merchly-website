import { ArrowRight } from "lucide-react";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

type CtaSectionProps = {
  ctaSection?: {
    heading?: string | null;
    body?: string | null;
    ctaLabel?: string | null;
  } | null;
  source: string;
};

export function CtaSection({ ctaSection, source }: CtaSectionProps) {
  if (!ctaSection?.heading) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
      <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center border-t border-b border-base-300 py-10">
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-balance">
            {ctaSection.heading}
          </h2>
          {ctaSection.body && (
            <p className="mt-3 text-base-content/70 max-w-2xl text-balance">
              {ctaSection.body}
            </p>
          )}
        </div>
        <LeadModalTrigger
          source={source}
          className="btn btn-primary shrink-0 inline-flex items-center gap-1.5"
        >
          {ctaSection.ctaLabel || "Get My Free Quote"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LeadModalTrigger>
      </div>
    </section>
  );
}
