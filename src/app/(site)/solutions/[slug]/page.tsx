import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/AppIcon";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getSolutionBySlug } from "@/lib/solutions";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: solution.summary,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) notFound();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="breadcrumbs text-sm text-base-content/50">
            <ul>
              <li>
                <Link href="/solutions">Solutions</Link>
              </li>
              <li>{solution.name}</li>
            </ul>
          </div>
          <h1 className="mt-2 text-4xl font-heading font-bold">{solution.name}</h1>
          <p className="mt-4 text-xl text-base-content/70">{solution.tagline}</p>
          <div className="mt-6">
            <LeadModalTrigger
              source={`solution-hero-${slug}`}
              className="btn btn-primary btn-lg"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <p className="text-base-content/80 leading-relaxed text-lg">
          {solution.summary}
        </p>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Set up {solution.name.toLowerCase()} for your business
            </h2>
            <LeadModalTrigger
              source={`solution-${slug}`}
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
