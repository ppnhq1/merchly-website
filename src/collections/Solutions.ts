import type { CollectionConfig } from "payload";
import { ICON_OPTIONS } from "@/lib/icon-options";

export const Solutions: CollectionConfig = {
  slug: "solutions",
  labels: {
    singular: "Solution",
    plural: "Solutions",
  },
  admin: {
    group: "Solutions & Integrations",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
    description:
      "Payment types shown in the header's Solutions menu and on /solutions — in-person, online, ACH, etc.",
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
        description: "URL path segment, e.g. in-person",
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
      defaultValue: "Store",
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
