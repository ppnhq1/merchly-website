import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plug } from "lucide-react";
import {
  getIntegrationsByCategory,
  type IntegrationCategory,
} from "@/lib/integrations";
import { resolveIcon } from "@/lib/resolve-icon";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Merchly connects to the ecommerce platforms, accounting software, and payment gateways merchants already use — Shopify, WooCommerce, QuickBooks, and more.",
};

const categories: IntegrationCategory[] = [
  "Ecommerce Platform",
  "Accounting",
  "Payment Gateway",
];

export default async function IntegrationsPage() {
  const categoryGroups = await Promise.all(
    categories.map((category) => getIntegrationsByCategory(category)),
  );

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-heading font-bold">Integrations</h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
            Merchly connects to the platforms, accounting tools, and gateways
            you already run your business on.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
        {categories.map((category, index) => {
          const items = categoryGroups[index];
          if (items.length === 0) return null;
          return (
            <div key={category} className={index > 0 ? "mt-16" : ""}>
              <h2 className="text-2xl font-heading font-bold">{category}</h2>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((integration) => {
                  const Icon = resolveIcon(integration.icon) ?? Plug;
                  return (
                    <Link
                      key={integration.slug}
                      href={`/integrations/${integration.slug}`}
                      className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
                    >
                      <div className="card-body">
                        <div className="h-11 w-11 mask mask-squircle bg-base-200 text-base-content/70 flex items-center justify-center">
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="card-title text-lg font-heading mt-2">
                          {integration.name}
                        </h3>
                        <p className="text-sm text-base-content/70">
                          {integration.tagline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body items-center text-center sm:items-start sm:text-left sm:flex-row sm:justify-between gap-4">
            <h2 className="card-title font-heading">
              Don&apos;t see your platform listed?
            </h2>
            <Link
              href="/contact-us"
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Ask us directly
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
