import type { CollectionConfig } from "payload";

export const Resources: CollectionConfig = {
  slug: "resources",
  labels: {
    singular: "Resource",
    plural: "Resources",
  },
  admin: {
    group: "Resources",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order"],
    description:
      "Evergreen guides shown in the header's Resources menu and on /resources — distinct from the dated Blog posts.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL path segment, e.g. what-is-a-high-risk-merchant-account",
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      admin: {
        description: "One-line summary shown on the resources hub card.",
      },
    },
    {
      name: "intro",
      type: "textarea",
      required: true,
      admin: {
        description: "Opening paragraph shown above the sections.",
      },
    },
    {
      name: "sections",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
        },
        {
          name: "body",
          type: "textarea",
          required: true,
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
