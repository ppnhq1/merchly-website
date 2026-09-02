import { RichText } from "@payloadcms/richtext-lexical/react";
import { LeadModalTrigger } from "@/components/marketing/LeadModalTrigger";
import type { BodySection } from "@/lib/industries";
import { buildSectionAnchors } from "@/lib/slugify";

type BodySectionsWithTocProps = {
  bodySections?: BodySection[] | null;
  source: string;
};

export function BodySectionsWithToc({ bodySections, source }: BodySectionsWithTocProps) {
  // A row missing its heading is skipped rather than enforced as required at
  // the schema level, so it can't block saving the rest of the document.
  const sections = bodySections?.filter((section) => section.heading) ?? [];
  if (!sections.length) return null;

  const anchors = buildSectionAnchors(sections.map((section) => section.heading));

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-16 border-t border-base-300">
      <div className="lg:grid lg:grid-cols-[1fr_16rem] lg:gap-16">
        <div className="flex flex-col gap-14 min-w-0">
          {sections.map((section, index) => (
            <div key={anchors[index].anchor} id={anchors[index].anchor} className="scroll-mt-24">
              <h2 className="text-2xl font-heading font-bold">{section.heading}</h2>
              {Boolean(section.content) && (
                <div className="prose prose-neutral max-w-none mt-4 prose-headings:font-heading">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <RichText data={section.content as any} />
                </div>
              )}
            </div>
          ))}
        </div>

        <aside className="mt-12 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
          <nav className="card card-border bg-base-100 border-base-300">
            <div className="card-body gap-3">
              <span className="label text-xs uppercase tracking-wide text-base-content/50">
                On this page
              </span>
              <ul className="flex flex-col gap-1 text-sm -mx-2">
                {anchors.map(({ heading, anchor }) => (
                  <li key={anchor}>
                    <a
                      href={`#${anchor}`}
                      className="link link-hover block px-2 py-1 rounded-field text-base-content/70 hover:text-base-content hover:bg-base-200"
                    >
                      {heading}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="divider my-0" />
              <LeadModalTrigger source={source} className="btn btn-primary btn-sm w-full">
                Get My Free Quote
              </LeadModalTrigger>
            </div>
          </nav>
        </aside>
      </div>
    </section>
  );
}
