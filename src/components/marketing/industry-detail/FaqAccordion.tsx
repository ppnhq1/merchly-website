import type { FaqEntry } from "@/lib/industries";

type FaqAccordionProps = {
  faqs?: FaqEntry[] | null;
  groupName: string;
};

// Matches daisyUI's canonical "Accordion + Join" pattern: one seamless
// bordered stack (join-vertical) instead of separately-rounded gapped boxes.
export function FaqAccordion({ faqs, groupName }: FaqAccordionProps) {
  // A row with only a question (or only an answer) is skipped rather than
  // enforced as required at the schema level, so it can't block saving the
  // rest of the document.
  const entries = faqs?.filter((faq) => faq.question && faq.answer) ?? [];
  if (!entries.length) return null;

  return (
    <section className="max-w-3xl mx-auto px-4 lg:px-8 py-16">
      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center">
        Frequently Asked Questions
      </h2>
      <div className="join join-vertical bg-base-100 w-full mt-10">
        {entries.map((faq, index) => (
          <div
            key={faq.question}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input
              type="radio"
              name={groupName}
              aria-label={faq.question}
              defaultChecked={index === 0}
            />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-sm text-base-content/70">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
