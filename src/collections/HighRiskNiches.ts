import type { CollectionConfig } from "payload";
import { ICON_OPTIONS } from "@/lib/icon-options";

export const HighRiskNiches: CollectionConfig = {
  slug: "high-risk-niches",
  labels: {
    singular: "High-Risk Niche",
    plural: "High-Risk Niches",
  },
  admin: {
    group: "Industries",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
    description:
      "High-risk specialties shown in the header's Industries menu and on /industries/high-risk.",
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
        description: "URL path segment, e.g. cbd-hemp",
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
      defaultValue: "ShieldAlert",
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
