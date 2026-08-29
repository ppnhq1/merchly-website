import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronDown, ArrowRight } from "lucide-react";
import { highRiskNiches, industries } from "@/lib/industries";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="navbar bg-base-100/95 backdrop-blur border-b border-base-300 px-4 lg:px-8 sticky top-0 z-50">
      <div className="navbar-start gap-1">
        <div className="tooltip tooltip-bottom" data-tip="Menu">
          <button
            type="button"
            className="btn btn-ghost btn-square lg:hidden"
            popoverTarget="mobile-nav-menu"
            style={{ anchorName: "--mobile-nav-menu" } as React.CSSProperties}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <ul
          id="mobile-nav-menu"
          popover="auto"
          className="dropdown menu menu-sm bg-base-100 rounded-box z-50 mt-3 w-64 p-2 shadow-lg border border-base-300"
          style={{ positionAnchor: "--mobile-nav-menu" } as React.CSSProperties}
        >
          <li>
            <details>
              <summary>Industries</summary>
              <ul>
                <li>
                  <Link href="/industries">All Industries</Link>
                </li>
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <LeadModalTrigger source="nav-mobile-contact">
              Contact Us
            </LeadModalTrigger>
          </li>
        </ul>
        <Link href="/" className="flex items-center px-2 shrink-0">
          <Image
            src="/logo.png"
            alt="Merchly"
            width={5000}
            height={1775}
            priority
            className="h-8 lg:h-9 w-auto"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex items-center gap-1">
        <div className="megamenu" id="industries-megamenu" popover="auto">
          <span className="megamenu-active" />
          <button
            type="button"
            popoverTarget="industries-panel"
            className="btn btn-ghost btn-sm gap-1"
          >
            Industries
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <div
            id="industries-panel"
            popover="auto"
            className="dropdown bg-base-100 text-base-content rounded-box border border-base-300 shadow-lg w-[36rem]"
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              <ul className="menu w-full">
                <li className="menu-title">By industry</li>
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="menu w-full">
                <li className="menu-title">High-risk specialties</li>
                {highRiskNiches.map((niche) => (
                  <li key={niche.slug}>
                    <Link href={`/industries/high-risk/${niche.slug}`}>
                      {niche.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-base-300 pt-1">
                  <Link href="/industries" className="text-primary font-medium">
                    View all industries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <LeadModalTrigger source="nav-contact">Contact Us</LeadModalTrigger>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        <LeadModalTrigger source="header-cta" className="btn btn-primary btn-sm">
          Get Started
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LeadModalTrigger>
      </div>
    </header>
  );
}
