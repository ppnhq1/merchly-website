import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getHighRiskNicheBySlug, highRiskNiches } from "@/lib/industries";

type Params = { slug: string };

export function generateStaticParams() {
  return highRiskNiches.map((niche) => ({ slug: niche.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const niche = getHighRiskNicheBySlug(slug);
  if (!niche) return {};
  return {
    title: niche.name,
    description: niche.summary,
  };
}

export default async function HighRiskNichePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const niche = getHighRiskNicheBySlug(slug);
  if (!niche) notFound();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="breadcrumbs text-sm text-base-content/50">
            <ul>
              <li>
                <Link href="/industries">Industries</Link>
              </li>
              <li>
                <Link href="/industries/high-risk">High-Risk Merchants</Link>
              </li>
              <li>{niche.name}</li>
            </ul>
          </div>
          <h1 className="mt-2 text-4xl font-heading font-bold">{niche.name}</h1>
          <p className="mt-4 text-xl text-base-content/70">{niche.tagline}</p>
          <div className="mt-6">
            <LeadModalTrigger
              source={`high-risk-hero-${slug}`}
              className="btn btn-primary btn-lg"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <p className="text-base-content/80 leading-relaxed text-lg">
          {niche.summary}
        </p>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Get a quote for your business
            </h2>
            <LeadModalTrigger
              source={`high-risk-${slug}`}
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
