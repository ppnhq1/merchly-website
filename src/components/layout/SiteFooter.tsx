import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { highRiskNiches, industries } from "@/lib/industries";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";

export function SiteFooter() {
  return (
    <footer className="bg-neutral text-neutral-content mt-24">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="footer sm:footer-horizontal">
          <nav className="col-span-2 sm:col-span-1">
            <Image
              src="/logo.png"
              alt="Merchly"
              width={5000}
              height={1775}
              className="h-8 w-auto"
            />
            <p className="text-sm text-neutral-content/70 mt-3 max-w-[22ch]">
              Financial tools for modern business.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-neutral-content/60">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              PCI DSS compliant processing
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-xs text-neutral-content/60">
              <span className="status status-success" aria-hidden="true" />
              Support online now
            </div>
          </nav>

          <nav>
            <h6 className="footer-title text-neutral-content/50">Company</h6>
            <Link href="/about-us" className="link link-hover">
              About Us
            </Link>
            <Link href="/blog" className="link link-hover">
              Blog
            </Link>
            <LeadModalTrigger source="footer-contact" className="link link-hover">
              Contact Us
            </LeadModalTrigger>
          </nav>

          <nav>
            <h6 className="footer-title text-neutral-content/50">Industries</h6>
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="link link-hover"
              >
                {industry.name}
              </Link>
            ))}
          </nav>

          <nav>
            <h6 className="footer-title text-neutral-content/50">High-Risk</h6>
            {highRiskNiches.map((niche) => (
              <Link
                key={niche.slug}
                href={`/industries/high-risk/${niche.slug}`}
                className="link link-hover"
              >
                {niche.name}
              </Link>
            ))}
          </nav>
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
