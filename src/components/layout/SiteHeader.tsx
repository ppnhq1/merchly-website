import Image from "next/image";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { getHighRiskNiches, getIndustries } from "@/lib/industries";
import { getSolutions } from "@/lib/solutions";
import { getIntegrations } from "@/lib/integrations";
import { getComparisons } from "@/lib/compare";
import { getResources } from "@/lib/resources";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

const popularSearches = [
  { href: "/industries/high-risk", label: "High-Risk Merchant Account" },
  { href: "/industries/high-risk/cbd-hemp", label: "CBD & Hemp Merchant Account" },
  {
    href: "/industries/high-risk/firearms-ammunition",
    label: "Firearms Merchant Account",
  },
  { href: "/industries/restaurants", label: "Restaurant Payment Processing" },
  {
    href: "/industries/nonprofit-organizations",
    label: "Nonprofit Payment Processing",
  },
];

export async function SiteHeader() {
  const [industries, highRiskNiches, solutions, integrations, comparisons, resources] =
    await Promise.all([
      getIndustries(),
      getHighRiskNiches(),
      getSolutions(),
      getIntegrations(),
      getComparisons(),
      getResources(),
    ]);
  const standardIndustries = industries.filter(
    (industry) => industry.slug !== "high-risk",
  );

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
                {standardIndustries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>High-Risk Specialties</summary>
              <ul>
                <li>
                  <Link href="/industries/high-risk">
                    All High-Risk Specialties
                  </Link>
                </li>
                {highRiskNiches.map((niche) => (
                  <li key={niche.slug}>
                    <Link href={`/industries/high-risk/${niche.slug}`}>
                      {niche.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Solutions</summary>
              <ul>
                <li>
                  <Link href="/solutions">All Solutions</Link>
                </li>
                {solutions.map((solution) => (
                  <li key={solution.slug}>
                    <Link href={`/solutions/${solution.slug}`}>
                      {solution.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Integrations</summary>
              <ul>
                <li>
                  <Link href="/integrations">All Integrations</Link>
                </li>
                {integrations.map((integration) => (
                  <li key={integration.slug}>
                    <Link href={`/integrations/${integration.slug}`}>
                      {integration.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Compare</summary>
              <ul>
                <li>
                  <Link href="/compare">All Comparisons</Link>
                </li>
                {comparisons.map((comparison) => (
                  <li key={comparison.slug}>
                    <Link href={`/compare/${comparison.slug}`}>
                      vs. {comparison.competitor}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Resources</summary>
              <ul>
                <li>
                  <Link href="/resources">All Resources</Link>
                </li>
                {resources.map((resource) => (
                  <li key={resource.slug}>
                    <Link href={`/resources/${resource.slug}`}>
                      {resource.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
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
            className="btn btn-ghost btn-sm"
          >
            Industries
          </button>
          <div
            id="industries-panel"
            popover="auto"
            className="dropdown bg-base-100 text-base-content rounded-box border border-base-300 shadow-lg w-[54rem] max-w-[90vw]"
          >
            <div className="grid grid-cols-3 gap-2 p-2">
              <ul className="menu w-full">
                <li className="menu-title">By industry</li>
                {standardIndustries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-base-300 pt-1">
                  <Link href="/industries" className="text-primary font-medium">
                    Browse all industries
                  </Link>
                </li>
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
                  <Link
                    href="/industries/high-risk"
                    className="text-primary font-medium"
                  >
                    View all high-risk specialties
                  </Link>
                </li>
              </ul>
              <div className="w-full">
                <ul className="menu w-full">
                  <li className="menu-title">Popular searches</li>
                  {popularSearches.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 mx-2 rounded-box bg-base-200 p-3">
                  <p className="text-sm font-medium">
                    Don&apos;t see your industry?
                  </p>
                  <p className="mt-1 text-xs text-base-content/70">
                    We work with underwriters across dozens of niches — just
                    ask.
                  </p>
                  <Link
                    href="/contact-us"
                    className="btn btn-primary btn-xs mt-3"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="megamenu" id="solutions-megamenu" popover="auto">
          <span className="megamenu-active" />
          <button
            type="button"
            popoverTarget="solutions-panel"
            className="btn btn-ghost btn-sm"
          >
            Solutions
          </button>
          <div
            id="solutions-panel"
            popover="auto"
            className="dropdown bg-base-100 text-base-content rounded-box border border-base-300 shadow-lg w-64"
          >
            <ul className="menu w-full p-2">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link href={`/solutions/${solution.slug}`}>
                    {solution.name}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-base-300 pt-1">
                <Link href="/solutions" className="text-primary font-medium">
                  All solutions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="megamenu" id="integrations-megamenu" popover="auto">
          <span className="megamenu-active" />
          <button
            type="button"
            popoverTarget="integrations-panel"
            className="btn btn-ghost btn-sm"
          >
            Integrations
          </button>
          <div
            id="integrations-panel"
            popover="auto"
            className="dropdown bg-base-100 text-base-content rounded-box border border-base-300 shadow-lg w-64"
          >
            <ul className="menu w-full p-2">
              {integrations.map((integration) => (
                <li key={integration.slug}>
                  <Link href={`/integrations/${integration.slug}`}>
                    {integration.name}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-base-300 pt-1">
                <Link
                  href="/integrations"
                  className="text-primary font-medium"
                >
                  All integrations
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="megamenu" id="compare-megamenu" popover="auto">
          <span className="megamenu-active" />
          <button
            type="button"
            popoverTarget="compare-panel"
            className="btn btn-ghost btn-sm"
          >
            Compare
          </button>
          <div
            id="compare-panel"
            popover="auto"
            className="dropdown bg-base-100 text-base-content rounded-box border border-base-300 shadow-lg w-56"
          >
            <ul className="menu w-full p-2">
              {comparisons.map((comparison) => (
                <li key={comparison.slug}>
                  <Link href={`/compare/${comparison.slug}`}>
                    vs. {comparison.competitor}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-base-300 pt-1">
                <Link href="/compare" className="text-primary font-medium">
                  All comparisons
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="megamenu" id="resources-megamenu" popover="auto">
          <span className="megamenu-active" />
          <button
            type="button"
            popoverTarget="resources-panel"
            className="btn btn-ghost btn-sm"
          >
            Resources
          </button>
          <div
            id="resources-panel"
            popover="auto"
            className="dropdown bg-base-100 text-base-content rounded-box border border-base-300 shadow-lg w-72"
          >
            <ul className="menu w-full p-2">
              {resources.map((resource) => (
                <li key={resource.slug}>
                  <Link href={`/resources/${resource.slug}`}>
                    {resource.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li className="mt-1 border-t border-base-300 pt-1">
                <Link href="/resources" className="text-primary font-medium">
                  All resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Link href="/pricing" className="btn btn-ghost btn-sm">
          Pricing
        </Link>

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
