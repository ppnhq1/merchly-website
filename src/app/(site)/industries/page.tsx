import type { Metadata } from "next";
import Link from "next/link";
import { highRiskNiches, industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Merchly provides specialized merchant services across restaurants, retail, e-commerce, and high-risk industries.",
};

export default function IndustriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <h1 className="text-4xl font-heading font-bold">Industries We Serve</h1>
      <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
        Every industry processes payments differently. Here&apos;s how
        Merchly adapts to yours.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-heading">
                {industry.name}
              </h2>
              <p className="text-sm text-base-content/70">
                {industry.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-heading font-bold">
          High-Risk Specialties
        </h2>
        <p className="mt-3 text-base-content/70 max-w-2xl">
          A closer look at the high-risk categories we specialize in.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highRiskNiches.map((niche) => (
            <Link
              key={niche.slug}
              href={`/industries/high-risk/${niche.slug}`}
              className="card bg-base-200 hover:bg-base-300 transition-colors"
            >
              <div className="card-body">
                <h3 className="card-title text-base font-heading">
                  {niche.name}
                </h3>
                <p className="text-sm text-base-content/70">
                  {niche.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
