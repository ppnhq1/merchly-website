import type { GlobalConfig } from "payload";
import { adminOnly, publicRead } from "@/lib/access";

export const Pricing: GlobalConfig = {
  slug: "pricing",
  admin: {
    group: "Pricing",
    description: "Content for the single /pricing page.",
  },
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    {
      name: "heroTitle",
      type: "text",
      required: true,
      defaultValue: "Simple, transparent pricing",
    },
    {
      name: "heroDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "interchangeSummary",
      type: "textarea",
      required: true,
      admin: {
        description: '"Interchange-plus pricing" card body.',
      },
    },
    {
      name: "contractsSummary",
      type: "textarea",
      required: true,
      admin: {
        description: '"No long-term contracts" card body.',
      },
    },
    {
      name: "merchantPaysSummary",
      type: "textarea",
      required: true,
      admin: {
        description: '"Merchant-pays" fee model card body.',
      },
    },
    {
      name: "customerPaysSummary",
      type: "textarea",
      required: true,
      admin: {
        description: '"Customer-pays" fee model card body.',
      },
    },
    {
      name: "rateFactors",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Rate factor",
        plural: "Rate factors",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "ctaDescription",
      type: "textarea",
      required: true,
      admin: {
        description: "Text under the final \"See your actual rate\" CTA.",
      },
    },
  ],
};
