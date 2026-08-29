import type { CollectionConfig } from "payload";

export const Comparisons: CollectionConfig = {
  slug: "comparisons",
  labels: {
    singular: "Comparison",
    plural: "Comparisons",
  },
  admin: {
    group: "Compare",
    useAsTitle: "competitor",
    defaultColumns: ["competitor", "slug", "order"],
    description:
      "Head-to-head pages shown in the header's Compare menu and on /compare. Keep claims about competitors general and verify them before publishing — see the disclaimer shown on every comparison page.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "competitor",
      type: "text",
      required: true,
      admin: {
        description: 'Name of the competitor, e.g. "Square"',
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL path segment, e.g. square",
      },
    },
    {
      name: "tagline",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "points",
      type: "array",
      required: true,
      minRows: 1,
      labels: {
        singular: "Comparison point",
        plural: "Comparison points",
      },
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
          admin: {
            description: 'e.g. "Pricing model"',
          },
        },
        {
          name: "merchly",
          type: "text",
          required: true,
          admin: {
            description: "How Merchly handles this.",
          },
        },
        {
          name: "competitor",
          type: "text",
          required: true,
          admin: {
            description: "How the competitor handles this.",
          },
        },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first in menus and grids.",
      },
    },
  ],
};
