import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/industries";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="navbar bg-base-100 border-b border-base-300 px-4 lg:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost" aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow border border-base-300"
          >
            <li>
              <details>
                <summary>Industries</summary>
                <ul>
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
        </div>
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

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <details>
              <summary>Industries</summary>
              <ul className="w-64 p-2">
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
            <LeadModalTrigger source="nav-contact">Contact Us</LeadModalTrigger>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <ThemeToggle />
        <LeadModalTrigger source="header-cta" className="btn btn-primary">
          Get Started
        </LeadModalTrigger>
      </div>
    </header>
  );
}
