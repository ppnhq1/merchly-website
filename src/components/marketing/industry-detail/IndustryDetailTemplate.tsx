import type { IndustryDetailContent } from "@/lib/industries";
import { IndustryHero } from "@/components/marketing/industry-detail/IndustryHero";
import { CtaSection } from "@/components/marketing/industry-detail/CtaSection";
import { BusinessTypesGrid } from "@/components/marketing/industry-detail/BusinessTypesGrid";
import { BodySectionsWithToc } from "@/components/marketing/industry-detail/BodySectionsWithToc";
import { FaqAccordion } from "@/components/marketing/industry-detail/FaqAccordion";
import { IndustryFinalCta } from "@/components/marketing/industry-detail/IndustryFinalCta";
import { ReviewsSection } from "@/components/marketing/industry-detail/ReviewsSection";
import { SITE_URL } from "@/lib/site";

export type BreadcrumbItem = { label: string; href?: string };

type IndustryDetailTemplateProps = {
  content: IndustryDetailContent & {
    slug: string;
    name: string;
    tagline: string;
    summary: string;
  };
  breadcrumbItems: BreadcrumbItem[];
  leadSourcePrefix: string;
  // Rendered between the summary and the body sections — page-specific
  // content (e.g. the high-risk-niches grid on the Industries umbrella page)
  // that isn't part of the shared template.
  extraContent?: React.ReactNode;
};

function escapeJsonLd(json: string) {
  return json.replace(/</g, "\\u003c");
}

export function IndustryDetailTemplate({
  content,
  breadcrumbItems,
  leadSourcePrefix,
  extraContent,
}: IndustryDetailTemplateProps) {
  const { slug, name, tagline, summary } = content;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  const validFaqs = content.faqs?.filter((faq) => faq.question && faq.answer) ?? [];
  const faqJsonLd = validFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: validFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(breadcrumbJsonLd)) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(faqJsonLd)) }}
        />
      )}

      <IndustryHero
        name={name}
        tagline={tagline}
        breadcrumbItems={breadcrumbItems}
        source={`${leadSourcePrefix}-hero-${slug}`}
      />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-16">
        <p className="max-w-4xl text-base-content/80 leading-relaxed text-lg">
          {summary}
        </p>
      </div>

      {extraContent}

      <CtaSection
        ctaSection={content.ctaSection}
        source={`${leadSourcePrefix}-section2-${slug}`}
      />
      <BusinessTypesGrid businessTypes={content.businessTypes} />
      <BodySectionsWithToc
        bodySections={content.bodySections}
        source={`${leadSourcePrefix}-toc-${slug}`}
      />
      <FaqAccordion faqs={content.faqs} groupName={`faq-${slug}`} />
      <IndustryFinalCta
        finalCta={content.finalCta}
        source={`${leadSourcePrefix}-${slug}`}
      />
      <ReviewsSection reviews={content.reviews} />
    </div>
  );
}
