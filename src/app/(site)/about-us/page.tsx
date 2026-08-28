import type { Metadata } from "next";

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
  },
  {
    title: "Built for every business",
    description:
      "From your neighborhood restaurant to high-risk e-commerce, we design processing around your industry's real needs.",
  },
  {
    title: "Support that answers the phone",
    description:
      "Real people, US-based, available when a payment issue can't wait.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-20">
      <h1 className="text-4xl font-heading font-bold">About Merchly</h1>
      <p className="mt-6 text-lg text-base-content/70">
        {/* Placeholder copy — replace with the real company story. */}
        Merchly was founded to fix what&apos;s broken about merchant
        services: opaque pricing, slow approvals, and processors that walk
        away the moment a business doesn&apos;t fit a narrow mold. We built
        the payment partner we wished existed — transparent, fast, and
        willing to work with the industries other processors won&apos;t.
      </p>

      <div className="mt-16 grid sm:grid-cols-3 gap-8">
        {values.map((value) => (
          <div key={value.title}>
            <h3 className="font-heading font-semibold text-lg">
              {value.title}
            </h3>
            <p className="mt-2 text-sm text-base-content/70">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-heading font-bold">Our Team</h2>
        <p className="mt-3 text-base-content/70">
          {/* Placeholder — add real team bios/photos here. */}
          Team bios and photos coming soon.
        </p>
      </div>
    </div>
  );
}
