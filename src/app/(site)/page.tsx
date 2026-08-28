import Link from "next/link";
import { RateCalculator } from "@/components/marketing/RateCalculator";
import { BenefitsSection } from "@/components/marketing/BenefitsSection";
import { StatsBar } from "@/components/marketing/StatsBar";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { industries } from "@/lib/industries";
import { getAllPosts } from "@/lib/posts";

const trustPoints = [
  { label: "Transparent, interchange-level pricing" },
  { label: "Next-day funding available" },
  { label: "24/7 US-based support" },
  { label: "High-risk industries welcome" },
];

export default async function HomePage() {
  const recentPosts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold leading-tight">
              Financial tools built for{" "}
              <span className="text-primary">modern business.</span>
            </h1>
            <p className="mt-6 text-lg text-base-content/70">
              Merchly gives growing businesses transparent payment processing,
              fast approvals, and dedicated support — including industries
              other processors turn away.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LeadModalTrigger source="hero-cta" className="btn btn-primary btn-lg">
                Get Your Free Quote
              </LeadModalTrigger>
              <Link href="/industries" className="btn btn-outline btn-lg">
                Explore Industries
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3">
              {trustPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2 text-sm">
                  <span className="badge badge-primary badge-sm" />
                  {point.label}
                </li>
              ))}
            </ul>
          </div>
          <RateCalculator />
        </div>
      </section>

      <StatsBar />

      {/* Benefits */}
      <BenefitsSection />

      {/* Industries preview */}
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold">
              Industries We Serve
            </h2>
            <p className="mt-3 text-base-content/70">
              Specialized processing built around how your business actually
              operates.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg font-heading">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {industry.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Blog preview */}
      {recentPosts.length > 0 && (
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-heading font-bold">From the Blog</h2>
            <Link href="/blog" className="link link-primary">
              View all posts
            </Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body">
                  <span className="badge badge-secondary badge-sm">
                    {post.category}
                  </span>
                  <h3 className="card-title text-lg font-heading mt-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-base-content/70">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
        <div className="card bg-neutral text-neutral-content">
          <div className="card-body sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-2xl font-heading font-bold">
                Ready to see what you could save?
              </h2>
              <p className="mt-2 text-neutral-content/70 max-w-md">
                Tell us a bit about your business and a Merchly specialist
                will follow up with a custom quote.
              </p>
            </div>
            <LeadModalTrigger
              source="homepage-final-cta"
              className="btn btn-primary btn-lg shrink-0"
            >
              Get My Free Quote
            </LeadModalTrigger>
          </div>
        </div>
      </section>
    </>
  );
}
