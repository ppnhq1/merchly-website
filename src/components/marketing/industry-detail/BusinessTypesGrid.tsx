import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BusinessTypeEntry } from "@/lib/industries";
import { resolveIcon } from "@/lib/resolve-icon";

type BusinessTypesGridProps = {
  businessTypes?: BusinessTypeEntry[] | null;
};

export function BusinessTypesGrid({ businessTypes }: BusinessTypesGridProps) {
  // Filter out incomplete rows: a required-but-blank field on one row would
  // otherwise block saving the whole document (see industryDetailFields.ts),
  // so requirements are enforced here instead.
  const entries = businessTypes?.filter((type) => type.name) ?? [];
  if (!entries.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold">
          Types of Businesses We Support
        </h2>
        <p className="mt-2 text-base-content/60">
          A closer look at the business models we tailor pricing and equipment for.
        </p>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {entries.map((type) => {
          const Icon = type.icon ? resolveIcon(type.icon) : null;
          const content = (
            <>
              {Icon && (
                <div className="h-9 w-9 rounded-lg bg-base-200 text-base-content/70 flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:text-primary transition-colors">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                </div>
              )}
              <span className="font-medium text-sm min-w-0">{type.name}</span>
            </>
          );

          if (type.link) {
            const isInternal = type.link.startsWith("/");
            const linkClassName =
              "group card card-sm card-border card-side items-center gap-3 px-4 py-3 bg-base-100 border-base-300 hover:border-primary/40 hover:shadow-sm transition-all";
            const arrow = (
              <ArrowUpRight
                className="h-4 w-4 ml-auto text-base-content/30 group-hover:text-primary transition-colors shrink-0"
                aria-hidden="true"
              />
            );
            return isInternal ? (
              <Link key={type.name} href={type.link} className={linkClassName}>
                {content}
                {arrow}
              </Link>
            ) : (
              <a
                key={type.name}
                href={type.link}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {content}
                {arrow}
              </a>
            );
          }

          return (
            <div
              key={type.name}
              className="card card-sm card-side items-center gap-3 px-4 py-3 bg-base-200/60"
            >
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
