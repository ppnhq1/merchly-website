import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getResourceBySlug } from "@/lib/resources";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.description,
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="breadcrumbs text-sm text-base-content/50">
            <ul>
              <li>
                <Link href="/resources">Resources</Link>
              </li>
              <li>{resource.title}</li>
            </ul>
          </div>
          <h1 className="mt-2 text-4xl font-heading font-bold">
            {resource.title}
          </h1>
          <p className="mt-4 text-xl text-base-content/70">
            {resource.description}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
        <p className="text-base-content/80 leading-relaxed text-lg">
          {resource.intro}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {resource.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-heading font-bold">
                {section.heading}
              </h2>
              <p className="mt-2 text-base-content/80 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Have questions specific to your business?
            </h2>
            <LeadModalTrigger
              source={`resource-${slug}`}
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Talk to a specialist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LeadModalTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}
