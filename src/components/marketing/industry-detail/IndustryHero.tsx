import Link from "next/link";
import { HeroLeadForm } from "@/components/marketing/HeroLeadForm";

type BreadcrumbItem = { label: string; href?: string };

type IndustryHeroProps = {
  name: string;
  tagline: string;
  breadcrumbItems: BreadcrumbItem[];
  source: string;
};

export function IndustryHero({ name, tagline, breadcrumbItems, source }: IndustryHeroProps) {
  return (
    <section className="bg-base-200 border-b border-base-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="breadcrumbs text-sm text-base-content/50">
          <ul>
            {breadcrumbItems.map((item) => (
              <li key={item.label}>
                {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 grid lg:grid-cols-[1fr_22rem] gap-10 lg:gap-14 items-start">
          <div className="min-w-0">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-balance">
              {name}
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-base-content/70 max-w-xl text-balance">
              {tagline}
            </p>
          </div>
          <HeroLeadForm source={source} />
        </div>
      </div>
    </section>
  );
}
