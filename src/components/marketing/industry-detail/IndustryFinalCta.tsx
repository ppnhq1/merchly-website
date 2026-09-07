import { Icon } from "@/components/ui/AppIcon";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

type IndustryFinalCtaProps = {
  finalCta?: {
    heading?: string | null;
    ctaLabel?: string | null;
  } | null;
  source: string;
};

// Extraction of the card bg-neutral CTA banner pattern already duplicated in
// industries/page.tsx and resources/[slug]/page.tsx. Falls back to today's
// hardcoded copy when the industry's finalCta group is empty.
export function IndustryFinalCta({ finalCta, source }: IndustryFinalCtaProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left py-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-balance">
            {finalCta?.heading || "Ready to get started?"}
          </h2>
          <LeadModalTrigger
            source={source}
            className="btn btn-primary shrink-0 inline-flex items-center gap-1.5"
          >
            {finalCta?.ctaLabel || "Get My Free Quote"}
            <Icon icon="lucide:arrow-right" className="h-4 w-4" aria-hidden="true" />
          </LeadModalTrigger>
        </div>
      </div>
    </section>
  );
}
