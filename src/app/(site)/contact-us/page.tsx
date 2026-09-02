import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";
import { LeadForm } from "@/components/marketing/LeadForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Merchly team for a custom merchant services quote.",
};

const contactDetails = [
  { label: "Email", value: "hello@merchly.io", icon: Mail },
  { label: "Phone", value: "(800) 555-0100", icon: Phone },
  { label: "Hours", value: "Mon–Fri, 8am–6pm ET", icon: Clock },
];

export default function ContactUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-heading font-bold">Contact Us</h1>
        <p className="mt-4 text-lg text-base-content/70">
          Have questions about pricing, onboarding, or whether we support
          your industry? Send us a few details and a Merchly specialist will
          reply within one business day.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 card bg-base-100 border border-base-300">
          <div className="card-body">
            <h2 className="card-title font-heading">Send us a message</h2>
            <div className="mt-2">
              <LeadForm source="contact-page" submitLabel="Send Message" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="card bg-base-200">
            <div className="card-body p-0">
              <h2 className="card-title font-heading text-lg p-4 pb-0">
                Reach us directly
              </h2>
              <ul className="list">
                {contactDetails.map((detail) => (
                  <li key={detail.label} className="list-row items-center">
                    <div className="h-9 w-9 mask mask-squircle bg-base-100 text-base-content/70 flex items-center justify-center shrink-0">
                      <detail.icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm text-base-content/60">{detail.label}</div>
                      <div className="font-medium">{detail.value}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
