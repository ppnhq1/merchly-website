import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Receipt,
  Percent,
  SlidersHorizontal,
  CircleDollarSign,
} from "lucide-react";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { getPricingContent } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "How Merchly prices payment processing — interchange-plus pricing, merchant-pays and customer-pays fee models, and what affects your rate.",
};

export default async function PricingPage() {
  const pricing = await getPricingContent();

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-heading font-bold">
            {pricing.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
            {pricing.heroDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/#rate-calculator" className="btn btn-primary btn-lg">
              Estimate your rate
            </Link>
            <LeadModalTrigger
              source="pricing-hero"
              className="btn btn-outline btn-lg"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <Receipt className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="card-title font-heading mt-2">
                Interchange-plus pricing
              </h2>
              <p className="text-sm text-base-content/70">
                {pricing.interchangeSummary}{" "}
                <Link
                  href="/resources/interchange-rates-explained"
                  className="link link-primary"
                >
                  Read our interchange rates guide.
                </Link>
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <Percent className="h-8 w-8 text-primary" aria-hidden="true" />
              <h2 className="card-title font-heading mt-2">
                No long-term contracts
              </h2>
              <p className="text-sm text-base-content/70">
                {pricing.contractsSummary}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold">
            Choose how the fee is covered
          </h2>
          <p className="mt-3 text-base-content/70 max-w-2xl">
            Merchly supports two fee models — you can switch between them as
            your business changes.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg font-heading">
                  Merchant-pays
                </h3>
                <p className="text-sm text-base-content/70">
                  {pricing.merchantPaysSummary}
                </p>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg font-heading">
                  Customer-pays
                </h3>
                <p className="text-sm text-base-content/70">
                  {pricing.customerPaysSummary}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold">
            What affects your rate
          </h2>
          <p className="mt-3 text-base-content/70 max-w-2xl">
            Your exact rate depends on your business — here&apos;s what
            underwriting looks at.
          </p>
          <div className="mt-8 flex flex-col gap-1">
            {pricing.rateFactors.map((factor) => (
              <div
                key={factor.title}
                className="flex items-start gap-4 py-4 border-b border-base-300 last:border-b-0"
              >
                <SlidersHorizontal
                  className="h-5 w-5 text-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-heading font-semibold">
                    {factor.title}
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    {factor.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <div>
              <h2 className="card-title font-heading">
                <CircleDollarSign className="h-5 w-5" aria-hidden="true" />
                See your actual rate
              </h2>
              <p className="mt-1 text-sm text-neutral-content/70">
                {pricing.ctaDescription}
              </p>
            </div>
            <LeadModalTrigger
              source="pricing-cta"
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
