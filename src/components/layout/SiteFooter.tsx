import Image from "next/image";
import Link from "next/link";
import { highRiskNiches, industries } from "@/lib/industries";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

export function SiteFooter() {
  return (
    <footer className="bg-neutral text-neutral-content mt-24">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Image
            src="/logo.png"
            alt="Merchly"
            width={5000}
            height={1775}
            className="h-8 w-auto"
          />
          <p className="text-sm text-neutral-content/70 mt-3">
            Financial tools for modern business.
          </p>
        </div>

        <div>
          <h4 className="footer-title text-neutral-content/60">Company</h4>
          <ul className="flex flex-col gap-2 mt-2 text-sm">
            <li>
              <Link href="/about-us" className="link link-hover">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="link link-hover">
                Blog
              </Link>
            </li>
            <li>
              <LeadModalTrigger
                source="footer-contact"
                className="link link-hover"
              >
                Contact Us
              </LeadModalTrigger>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title text-neutral-content/60">Industries</h4>
          <ul className="flex flex-col gap-2 mt-2 text-sm">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="link link-hover"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-title text-neutral-content/60">High-Risk</h4>
          <ul className="flex flex-col gap-2 mt-2 text-sm">
            {highRiskNiches.map((niche) => (
              <li key={niche.slug}>
                <Link
                  href={`/industries/high-risk/${niche.slug}`}
                  className="link link-hover"
                >
                  {niche.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-content/10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-neutral-content/60">
          <span>
            &copy; {new Date().getFullYear()} Merchly. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="link link-hover">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
