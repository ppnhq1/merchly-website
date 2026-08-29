import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getResources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides on high-risk merchant accounts, chargebacks, interchange rates, and PCI compliance, written in plain language.",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-heading font-bold">Resources</h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
            Plain-language guides to how payment processing actually works —
            no sales pitch required.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.slug}
              href={`/resources/${resource.slug}`}
              className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
            >
              <div className="card-body">
                <div className="h-11 w-11 mask mask-squircle bg-base-200 text-base-content/70 flex items-center justify-center">
                  <BookOpen
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <h2 className="card-title text-lg font-heading mt-2">
                  {resource.title}
                </h2>
                <p className="text-sm text-base-content/70">
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}

          <Link
            href="/blog"
            className="card bg-base-200 border border-transparent hover:border-primary hover:bg-base-100 transition-colors"
          >
            <div className="card-body justify-center">
              <h2 className="card-title text-lg font-heading">
                Read the Merchly Blog
              </h2>
              <p className="text-sm text-base-content/70">
                News, updates, and deeper dives — updated regularly.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-1">
                Visit the blog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
