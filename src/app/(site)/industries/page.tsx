import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/AppIcon";
import { getHighRiskNiches, getIndustries } from "@/lib/industries";
import { resolveIcon } from "@/lib/resolve-icon";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Merchly provides specialized merchant services across restaurants, retail, e-commerce, and dozens of standard and high-risk industries.",
};

export default async function IndustriesPage() {
  const [industries, highRiskNiches] = await Promise.all([
    getIndustries(),
    getHighRiskNiches(),
  ]);

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-heading font-bold">Industries We Serve</h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
            Every industry processes payments differently. Here&apos;s how
            Merchly adapts to yours.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry) => {
            const icon = resolveIcon(industry.icon);
            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
              >
                <div className="card-body">
                  <div className="h-11 w-11 mask mask-squircle bg-base-200 text-base-content/70 flex items-center justify-center">
                    <Icon icon={icon} className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h2 className="card-title text-lg font-heading mt-2">
                    {industry.name}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    {industry.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-20">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-heading font-bold">
                High-Risk Specialties
              </h2>
              <p className="mt-3 text-base-content/70 max-w-2xl">
                A closer look at the high-risk categories we specialize in.
              </p>
            </div>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highRiskNiches.map((niche) => {
              const icon = resolveIcon(niche.icon);
              return (
                <Link
                  key={niche.slug}
                  href={`/industries/high-risk/${niche.slug}`}
                  className="card bg-base-200 border border-transparent hover:border-primary hover:bg-base-100 transition-colors"
                >
                  <div className="card-body">
                    <div className="h-10 w-10 mask mask-squircle bg-base-300 text-base-content flex items-center justify-center">
                      <Icon icon={icon} className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="card-title text-base font-heading mt-2">
                      {niche.name}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      {niche.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-16 card bg-neutral text-neutral-content">
          <div className="card-body sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
            <h2 className="card-title font-heading">
              Don&apos;t see your industry listed?
            </h2>
            <Link
              href="/contact-us"
              className="btn btn-primary shrink-0 inline-flex items-center gap-1"
            >
              Ask us directly
              <Icon icon="lucide:arrow-right" className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
