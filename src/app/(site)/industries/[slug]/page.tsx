import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getIndustryBySlug, highRiskNiches, industries } from "@/lib/industries";

type Params = { slug: string };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: industry.summary,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const isHighRisk = slug === "high-risk";

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
      <p className="text-sm text-base-content/50">
        <Link href="/industries" className="link link-hover">
          Industries
        </Link>{" "}
        / {industry.name}
      </p>
      <h1 className="mt-2 text-4xl font-heading font-bold">{industry.name}</h1>
      <p className="mt-4 text-xl text-base-content/70">{industry.tagline}</p>
      <p className="mt-6 text-base-content/80 leading-relaxed">
        {industry.summary}
      </p>

      {isHighRisk && (
        <div className="mt-12">
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
      )}

      <div className="mt-16 card bg-base-200">
        <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between">
          <h2 className="card-title font-heading">
            Get a quote for your {industry.name.toLowerCase()} business
          </h2>
          <LeadModalTrigger
            source={`industry-${slug}`}
            className="btn btn-primary shrink-0"
          >
            Get My Free Quote
          </LeadModalTrigger>
        </div>
      </div>
    </div>
  );
}
