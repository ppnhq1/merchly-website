import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getIntegrationBySlug } from "@/lib/integrations";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const integration = await getIntegrationBySlug(slug);
  if (!integration) return {};
  return {
    title: integration.name,
    description: integration.summary,
  };
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const integration = await getIntegrationBySlug(slug);
  if (!integration) notFound();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="breadcrumbs text-sm text-base-content/50">
            <ul>
              <li>
                <Link href="/integrations">Integrations</Link>
              </li>
              <li>{integration.name}</li>
            </ul>
          </div>
          <span className="badge badge-soft badge-secondary badge-sm mt-2">
            {integration.category}
          </span>
          <h1 className="mt-2 text-4xl font-heading font-bold">
            {integration.name}
          </h1>
          <p className="mt-4 text-xl text-base-content/70">
            {integration.tagline}
          </p>
          <div className="mt-6">
            <LeadModalTrigger
              source={`integration-hero-${slug}`}
              className="btn btn-primary btn-lg"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <p className="text-base-content/80 leading-relaxed text-lg">
          {integration.summary}
        </p>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Connect {integration.name} to a Merchly account
            </h2>
            <LeadModalTrigger
              source={`integration-${slug}`}
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
