import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-20 prose">
      <h1>Privacy Policy</h1>
      <p className="text-base-content/50 italic">
        Draft placeholder — needs review by legal counsel before launch.
      </p>
      <p>
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>
      <p>
        This Privacy Policy describes how Merchly (&ldquo;we,&rdquo;
        &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and shares
        information when you visit merchly.io or submit information through
        our contact forms.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We collect information you provide directly, such as your name,
        email address, phone number, and business details when you fill out
        a form on our site.
      </p>
      <h2>How We Use Information</h2>
      <p>
        We use this information to respond to your inquiries, provide
        quotes, and, where you&apos;ve consented, send you marketing
        communications via our email provider, Brevo.
      </p>
      <h2>Your Choices</h2>
      <p>
        You can unsubscribe from marketing emails at any time using the link
        included in those emails, or by contacting us directly.
      </p>
      <h2>Contact Us</h2>
      <p>Questions about this policy can be sent to hello@merchly.io.</p>
    </div>
  );
}
