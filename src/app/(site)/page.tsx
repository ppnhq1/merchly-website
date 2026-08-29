import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { RateCalculator } from "@/components/marketing/RateCalculator";
import { BenefitsSection } from "@/components/marketing/BenefitsSection";
import { StatsBar } from "@/components/marketing/StatsBar";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { industries } from "@/lib/industries";
import { getAllPosts } from "@/lib/posts";

const trustPoints = [
  "Transparent, interchange-level pricing",
  "Next-day funding available",
  "24/7 US-based support",
  "No long-term contracts",
];

const onboardingSteps = [
  { label: "Apply", detail: "5-minute application, no cost to submit" },
  { label: "Get approved", detail: "Underwriting in as little as 24 hours" },
  { label: "Start accepting payments", detail: "Terminal or gateway shipped and configured" },
];

const faqs = [
  {
    question: "How fast is approval?",
    answer:
      "Most standard-risk applications are approved within 24 hours. High-risk categories typically take 2–5 business days for underwriting review.",
  },
  {
    question: "Is there a contract or early termination fee?",
    answer:
      "We offer month-to-month terms with no early termination fee. Your rate and terms are detailed before you sign anything.",
  },
  {
    question: "Do you support businesses other processors have declined?",
    answer:
      "Yes — we specialize in high-risk categories like CBD, adult entertainment, vape/tobacco/firearms, and subscription billing, working with underwriters who know those industries.",
  },
  {
    question: "How does funding speed work?",
    answer:
      "Standard funding lands in your account in 1–2 business days. Next-day and same-day funding are available for qualifying merchants.",
  },
];

export default async function HomePage() {
  const recentPosts = (await getAllPosts()).slice(0, 3);
  const [restaurants, retail, ecommerce, highRisk] = industries;

  return (
    <>
      {/* Hero */}
      <div className="hero bg-base-200">
        <div className="hero-content max-w-6xl w-full flex-col lg:flex-row gap-12 py-16 sm:py-20 items-center">
          <div className="lg:w-1/2">
            <span className="badge badge-soft badge-secondary badge-sm">
              Transparent pricing, no surprises
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-heading font-bold leading-tight">
              Transparent pricing.{" "}
              <span className="text-primary">No hidden markups.</span>
            </h1>
            <p className="mt-6 text-lg text-base-content/70">
              We publish real interchange-plus rates instead of a teaser quote
              that changes later. See exactly what you&apos;d save by
              switching, in writing, before you sign anything.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LeadModalTrigger source="hero-cta" className="btn btn-primary btn-lg">
                See Your Rate
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </LeadModalTrigger>
              <Link href="/industries" className="btn btn-outline btn-lg">
                Explore Industries
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm">
                  <CheckCircle2
                    className="h-4 w-4 text-primary shrink-0"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="aura aura-gold lg:w-1/2 w-full">
            <RateCalculator />
          </div>
        </div>
      </div>

      <StatsBar />

      {/* Benefits */}
      <BenefitsSection />

      {/* How it works */}
      <section className="bg-base-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold">How it works</h2>
            <p className="mt-3 text-base-content/70">
              From application to your first transaction, most merchants are
              live within a week.
            </p>
          </div>
          <ul className="steps steps-vertical lg:steps-horizontal w-full mt-12">
            {onboardingSteps.map((step, index) => (
              <li key={step.label} className="step" data-content={index + 1}>
                <div className="text-left ml-2 mt-2 lg:text-center lg:ml-0">
                  <div className="font-heading font-semibold">{step.label}</div>
                  <div className="text-sm text-base-content/60">{step.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries preview — bento grid */}
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
          <div className="mt-12 grid gap-6 lg:grid-cols-4 lg:grid-rows-2">
            <Link
              href={`/industries/${highRisk.slug}`}
              className="card bg-neutral text-neutral-content lg:col-span-2 lg:row-span-2 hover:brightness-110 transition-[filter]"
            >
              <div className="card-body justify-between">
                <div>
                  <span className="badge badge-soft badge-secondary badge-sm">
                    Specialty
                  </span>
                  <h3 className="card-title text-2xl font-heading mt-3">
                    {highRisk.name}
                  </h3>
                  <p className="mt-2 text-neutral-content/70">
                    {highRisk.summary}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 w-fit font-medium underline underline-offset-2">
                  See high-risk specialties
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>

            {[restaurants, retail, ecommerce].map((industry) => (
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

            <Link
              href="/industries"
              className="card bg-primary text-primary-content hover:brightness-110 transition-[filter]"
            >
              <div className="card-body justify-center items-start">
                <h3 className="card-title text-lg font-heading">
                  View all industries
                </h3>
                <span className="inline-flex items-center gap-1 text-sm">
                  Browse the full list
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
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
              <Link href="/blog" className="link link-hover">
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

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 lg:px-8 py-20">
        <h2 className="text-3xl font-heading font-bold text-center">
          Common questions
        </h2>
        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              <input
                type="radio"
                name="homepage-faq"
                aria-label={faq.question}
                defaultChecked={index === 0}
              />
              <div className="collapse-title font-semibold">{faq.question}</div>
              <div className="collapse-content text-sm text-base-content/70">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

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
