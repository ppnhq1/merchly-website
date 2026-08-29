import type { CollectionConfig } from "payload";
import { ICON_OPTIONS } from "@/lib/icon-options";

export const Integrations: CollectionConfig = {
  slug: "integrations",
  labels: {
    singular: "Integration",
    plural: "Integrations",
  },
  admin: {
    group: "Solutions & Integrations",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "slug", "order"],
    description:
      "Platforms shown in the header's Integrations menu and on /integrations — Shopify, QuickBooks, etc.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
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
        description: "URL path segment, e.g. shopify",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "Ecommerce Platform",
      options: ["Ecommerce Platform", "Accounting", "Payment Gateway"],
      admin: {
        description: "Groups integrations into sections on /integrations.",
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
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "Plug",
      options: [...ICON_OPTIONS],
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
