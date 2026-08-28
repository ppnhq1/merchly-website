import type { Metadata } from "next";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Merchly team for a custom merchant services quote.",
};

export default function ContactUsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-20 text-center">
      <h1 className="text-4xl font-heading font-bold">Contact Us</h1>
      <p className="mt-4 text-base-content/70 max-w-xl mx-auto">
        Have questions about pricing, onboarding, or whether we support your
        industry? Reach out and a Merchly specialist will follow up within
        one business day.
      </p>

      <div className="mt-8">
        <LeadModalTrigger source="contact-page" className="btn btn-primary btn-lg">
          Get Your Free Quote
        </LeadModalTrigger>
      </div>

      <dl className="mt-16 grid sm:grid-cols-3 gap-8 text-left sm:text-center">
        <div>
          <dt className="font-semibold">Email</dt>
          {/* Placeholder contact info */}
          <dd className="text-base-content/70">hello@merchly.com</dd>
        </div>
        <div>
          <dt className="font-semibold">Phone</dt>
          <dd className="text-base-content/70">(800) 555-0100</dd>
        </div>
        <div>
          <dt className="font-semibold">Hours</dt>
          <dd className="text-base-content/70">Mon–Fri, 8am–6pm ET</dd>
        </div>
      </dl>
    </div>
  );
}
