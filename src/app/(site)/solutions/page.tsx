import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSolutions } from "@/lib/solutions";
import { resolveIcon } from "@/lib/resolve-icon";

export const metadata: Metadata = {
  title: "Payment Solutions",
  description:
    "In-person, online, mobile, MOTO, ACH, recurring billing, and invoicing — Merchly's payment solutions for however your business gets paid.",
};

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-heading font-bold">Payment Solutions</h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
            However your customers pay — in person, online, over the phone, or
            on a schedule — Merchly has a solution built for it.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => {
            const Icon = resolveIcon(solution.icon);
            return (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
              >
                <div className="card-body">
                  <div className="h-11 w-11 mask mask-squircle bg-base-200 text-base-content/70 flex items-center justify-center">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h2 className="card-title text-lg font-heading mt-2">
                    {solution.name}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    {solution.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Not sure which setup fits your business?
            </h2>
            <Link
              href="/contact-us"
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Talk to a specialist
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
