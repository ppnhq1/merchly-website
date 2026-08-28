import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
      <p className="text-sm text-base-content/50">
        <Link href="/industries" className="link link-hover">
          Industries
        </Link>{" "}
        /{" "}
        <Link href="/industries/high-risk" className="link link-hover">
          High-Risk Merchants
        </Link>{" "}
        / {niche.name}
      </p>
      <h1 className="mt-2 text-4xl font-heading font-bold">{niche.name}</h1>
      <p className="mt-4 text-xl text-base-content/70">{niche.tagline}</p>
      <p className="mt-6 text-base-content/80 leading-relaxed">
        {niche.summary}
      </p>

      <div className="mt-16 card bg-base-200">
        <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between">
          <h2 className="card-title font-heading">
            Get a quote for your business
          </h2>
          <LeadModalTrigger
            source={`high-risk-${slug}`}
            className="btn btn-primary shrink-0"
          >
            Get My Free Quote
          </LeadModalTrigger>
        </div>
      </div>
    </div>
  );
}
