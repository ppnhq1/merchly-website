import type { Field } from "payload";
import { ICON_OPTIONS } from "@/lib/icon-options";

// Shared field set spread into both Industries and HighRiskNiches — the two
// collections have an identical shape and both need the same full-page
// content model. Every field here is optional (and array/group fields have
// no minRows) so existing documents with none of this filled in keep
// rendering exactly as they do today; the frontend conditionally renders
// each section only when it has content.
//
// Deliberately no `required: true` on any in-row sub-field: Payload
// validates a whole document as one atomic operation, so a single required
// field left blank in one row of one array blocks saving the ENTIRE
// document — including every other section that was filled in correctly.
// Instead, rows missing their essential content are simply skipped at
// render time (see src/components/marketing/industry-detail/*).
export function industryDetailFields(): Field[] {
  return [
    {
      name: "ctaSection",
      type: "group",
      label: "Secondary CTA Section",
      admin: {
        description:
          "Title, paragraph, and button (opens the site's contact modal) shown just below the hero.",
      },
      fields: [
        { name: "heading", type: "text" },
        { name: "body", type: "textarea" },
        {
          name: "ctaLabel",
          type: "text",
          defaultValue: "Get My Free Quote",
        },
      ],
    },
    {
      name: "businessTypes",
      type: "array",
      label: "Types of Businesses We Support",
      labels: { singular: "Business Type", plural: "Business Types" },
      fields: [
        {
          name: "name",
          type: "text",
          admin: { description: "Required for this entry to display." },
        },
        {
          name: "icon",
          type: "select",
          options: [...ICON_OPTIONS],
          admin: {
            description: "Optional — leave blank to show no icon.",
          },
        },
        {
          name: "link",
          type: "text",
          admin: {
            description:
              "Optional. Internal path (e.g. /solutions/pos) or external URL. Leave blank to render as plain text instead of a link.",
          },
        },
      ],
    },
    {
      name: "bodySections",
      type: "array",
      label: "Main Content Sections",
      labels: { singular: "Section", plural: "Sections" },
      admin: {
        description:
          "Long-form body content, rendered like a blog post with a table of contents built from each section's heading.",
      },
      fields: [
        {
          name: "heading",
          type: "text",
          admin: { description: "Required for this section to display." },
        },
        { name: "content", type: "richText" },
      ],
    },
    {
      name: "faqs",
      type: "array",
      label: "Frequently Asked Questions",
      labels: { singular: "FAQ", plural: "FAQs" },
      fields: [
        {
          name: "question",
          type: "text",
          admin: { description: "Both question and answer are required for this FAQ to display." },
        },
        { name: "answer", type: "textarea" },
      ],
    },
    {
      name: "finalCta",
      type: "group",
      label: "Final CTA Section",
      fields: [
        {
          name: "heading",
          type: "text",
          admin: {
            description: 'Defaults to "Ready to get started?" if left blank.',
          },
        },
        {
          name: "ctaLabel",
          type: "text",
          defaultValue: "Get My Free Quote",
        },
      ],
    },
    {
      name: "reviews",
      type: "array",
      label: "Reviews",
      labels: { singular: "Review", plural: "Reviews" },
      fields: [
        {
          name: "quote",
          type: "textarea",
          admin: { description: "Both quote and name are required for this review to display." },
        },
        { name: "name", type: "text" },
        {
          name: "role",
          type: "text",
          admin: { description: 'e.g. "Owner, Joe\'s Diner"' },
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          admin: {
            description:
              'Falls back to the industry name if blank. Do not include "| Merchly" — the site adds that automatically.',
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          admin: {
            description: "Falls back to the summary if blank. Aim for ~160 characters.",
          },
        },
      ],
    },
  ];
}
