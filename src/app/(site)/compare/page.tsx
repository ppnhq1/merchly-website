import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows } from "lucide-react";
import { getComparisons } from "@/lib/compare";

export const metadata: Metadata = {
  title: "Compare Merchly",
  description:
    "See how Merchly compares to Square, Stripe, PayPal, and Clover on high-risk support, pricing model, and contract terms.",
};

export default async function ComparePage() {
  const comparisons = await getComparisons();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-heading font-bold">Compare Merchly</h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
            See how Merchly stacks up against the processors most merchants
            consider first.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
            >
              <div className="card-body">
                <div className="h-11 w-11 mask mask-squircle bg-base-200 text-base-content/70 flex items-center justify-center">
                  <GitCompareArrows
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <h2 className="card-title text-lg font-heading mt-2">
                  Merchly vs. {comparison.competitor}
                </h2>
                <p className="text-sm text-base-content/70">
                  {comparison.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-base-content/50 max-w-2xl">
          Comparisons reflect general, publicly documented policies and are
          not exhaustive. Pricing and terms change — confirm current details
          directly with each provider before making a decision.
        </p>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              See what switching actually saves
            </h2>
            <Link
              href="/#rate-calculator"
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Calculate your savings
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
