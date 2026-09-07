import type { Metadata } from "next";
import { Icon } from "@/components/ui/AppIcon";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Merchly builds transparent, modern payment processing for businesses of every kind — including industries traditional processors won't touch.",
};

const values = [
  {
    title: "Transparency first",
    description:
      "No surprise fees, no fine print games. You'll always know exactly what you're paying and why.",
    icon: "lucide:eye-off",
  },
  {
    title: "Built for every business",
    description:
      "From your neighborhood restaurant to high-risk e-commerce, we design processing around your industry's real needs.",
    icon: "lucide:building-2",
  },
  {
    title: "Support that answers the phone",
    description:
      "Real people, US-based, available when a payment issue can't wait.",
    icon: "lucide:phone-call",
  },
];

export default function AboutUsPage() {
  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <h1 className="text-4xl font-heading font-bold">About Merchly</h1>
          <p className="mt-6 text-lg text-base-content/70">
            {/* Placeholder copy — replace with the real company story. */}
            Merchly was founded to fix what&apos;s broken about merchant
            services: opaque pricing, slow approvals, and processors that
            walk away the moment a business doesn&apos;t fit a narrow mold.
            We built the payment partner we wished existed — transparent,
            fast, and willing to work with the industries other processors
            won&apos;t.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-3">
              <div className="h-11 w-11 rounded-box bg-primary/10 text-primary flex items-center justify-center">
                <Icon icon={value.icon} className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="font-heading font-semibold text-lg">
                {value.title}
              </h3>
              <p className="text-sm text-base-content/70">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 card bg-base-200 border border-base-300 border-dashed">
          <div className="card-body items-center text-center gap-3">
            <Icon icon="lucide:users" className="h-8 w-8 text-base-content/40" aria-hidden="true" />
            <h2 className="text-xl font-heading font-bold">Our Team</h2>
            <p className="text-base-content/60 max-w-md">
              {/* Placeholder — add real team bios/photos here. */}
              Team bios and photos are coming soon. In the meantime, reach
              out and you&apos;ll talk to a real person.
            </p>
            <LeadModalTrigger source="about-team-cta" className="btn btn-outline btn-sm mt-2">
              Contact Merchly
            </LeadModalTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}
