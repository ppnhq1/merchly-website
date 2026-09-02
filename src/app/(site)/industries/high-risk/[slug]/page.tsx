import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetailTemplate } from "@/components/marketing/industry-detail/IndustryDetailTemplate";
import { getHighRiskNicheBySlug, getHighRiskNiches } from "@/lib/industries";

type Params = { slug: string };

export async function generateStaticParams() {
  const niches = await getHighRiskNiches();
  return niches.map((niche) => ({ slug: niche.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const niche = await getHighRiskNicheBySlug(slug);
  if (!niche) return {};
  return {
    title: niche.seo?.metaTitle || niche.name,
    description: niche.seo?.metaDescription || niche.summary,
  };
}

export default async function HighRiskNichePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const niche = await getHighRiskNicheBySlug(slug);
  if (!niche) notFound();

  return (
    <IndustryDetailTemplate
      content={niche}
      breadcrumbItems={[
        { label: "Industries", href: "/industries" },
        { label: "High-Risk Merchants", href: "/industries/high-risk" },
        { label: niche.name },
      ]}
      leadSourcePrefix="high-risk"
    />
  );
}
