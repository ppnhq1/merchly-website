import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/AppIcon";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getComparisonBySlug } from "@/lib/compare";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) return {};
  return {
    title: `Merchly vs. ${comparison.competitor}`,
    description: comparison.summary,
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="breadcrumbs text-sm text-base-content/50">
            <ul>
              <li>
                <Link href="/compare">Compare</Link>
              </li>
              <li>{comparison.competitor}</li>
            </ul>
          </div>
          <h1 className="mt-2 text-4xl font-heading font-bold">
            Merchly vs. {comparison.competitor}
          </h1>
          <p className="mt-4 text-xl text-base-content/70">
            {comparison.tagline}
          </p>
          <div className="mt-6">
            <LeadModalTrigger
              source={`compare-hero-${slug}`}
              className="btn btn-primary btn-lg"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <p className="text-base-content/80 leading-relaxed text-lg">
          {comparison.summary}
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="table border border-base-300 rounded-box">
            <thead>
              <tr>
                <th className="bg-base-200">Category</th>
                <th className="bg-base-200 text-primary">Merchly</th>
                <th className="bg-base-200">{comparison.competitor}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.points.map((point) => (
                <tr key={point.category}>
                  <td className="font-medium">{point.category}</td>
                  <td>
                    <div className="flex items-start gap-2">
                      <Icon
                        icon="lucide:check"
                        className="h-4 w-4 text-primary shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point.merchly}</span>
                    </div>
                  </td>
                  <td className="text-base-content/70">
                    <div className="flex items-start gap-2">
                      <Icon
                        icon="lucide:x"
                        className="h-4 w-4 text-base-content/40 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point.competitor}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-base-content/50">
          This comparison reflects general, publicly documented policies as
          of the time of writing and is not exhaustive or a substitute for
          each provider&apos;s current terms. Confirm details directly with{" "}
          {comparison.competitor} before making a decision.
        </p>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Ready to see what Merchly costs for your business?
            </h2>
            <LeadModalTrigger
              source={`compare-${slug}`}
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Get My Free Quote
              <Icon icon="lucide:arrow-right" className="h-4 w-4" aria-hidden="true" />
            </LeadModalTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}
