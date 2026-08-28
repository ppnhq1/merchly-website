import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-20 prose">
      <h1>Terms of Service</h1>
      <p className="text-base-content/50 italic">
        Draft placeholder — needs review by legal counsel before launch.
      </p>
      <p>
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
      <p>
        These Terms of Service govern your use of merchly.com. By using this
        site, you agree to these terms.
      </p>
      <h2>Use of This Site</h2>
      <p>
        This website provides information about Merchly&apos;s merchant
        services
        and allows you to request a quote. It does not constitute a binding
        offer of services; all processing agreements are subject to
        separate underwriting and contract terms.
      </p>
      <h2>No Financial Advice</h2>
      <p>
        Content on this site, including the rate calculator, is for
        informational purposes only and does not constitute financial or
        legal advice.
      </p>
      <h2>Contact Us</h2>
      <p>Questions about these terms can be sent to hello@merchly.com.</p>
    </div>
  );
}
