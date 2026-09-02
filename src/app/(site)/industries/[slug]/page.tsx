import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndustryDetailTemplate } from "@/components/marketing/industry-detail/IndustryDetailTemplate";
import { getHighRiskNiches, getIndustries, getIndustryBySlug } from "@/lib/industries";

type Params = { slug: string };

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.seo?.metaTitle || industry.name,
    description: industry.seo?.metaDescription || industry.summary,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const isHighRisk = slug === "high-risk";
  const highRiskNiches = isHighRisk ? await getHighRiskNiches() : [];

  return (
    <IndustryDetailTemplate
      content={industry}
      breadcrumbItems={[
        { label: "Industries", href: "/industries" },
        { label: industry.name },
      ]}
      leadSourcePrefix="industry"
      extraContent={
        isHighRisk && highRiskNiches.length > 0 ? (
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
            <h2 className="text-2xl font-heading font-bold">
              High-Risk Specialties
            </h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {highRiskNiches.map((niche) => (
                <Link
                  key={niche.slug}
                  href={`/industries/high-risk/${niche.slug}`}
                  className="card bg-base-200 hover:bg-base-300 transition-colors"
                >
                  <div className="card-body">
                    <h3 className="card-title text-base font-heading">
                      {niche.name}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      {niche.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : undefined
      }
    />
  );
}
