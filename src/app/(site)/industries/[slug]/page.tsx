import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="breadcrumbs text-sm text-base-content/50">
            <ul>
              <li>
                <Link href="/industries">Industries</Link>
              </li>
              <li>{industry.name}</li>
            </ul>
          </div>
          <h1 className="mt-2 text-4xl font-heading font-bold">{industry.name}</h1>
          <p className="mt-4 text-xl text-base-content/70">{industry.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <LeadModalTrigger
              source={`industry-hero-${slug}`}
              className="btn btn-primary btn-lg"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <p className="text-base-content/80 leading-relaxed text-lg">
          {industry.summary}
        </p>

        {isHighRisk && (
          <div className="mt-16">
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

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Get a quote for your {industry.name.toLowerCase()} business
            </h2>
            <LeadModalTrigger
              source={`industry-${slug}`}
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Get My Free Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LeadModalTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}
