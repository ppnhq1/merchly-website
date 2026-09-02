import type { CollectionConfig } from "payload";
import { ICON_OPTIONS } from "@/lib/icon-options";
import { adminOnly, publicRead } from "@/lib/access";
import { industryDetailFields } from "@/collections/shared/industryDetailFields";

export const Industries: CollectionConfig = {
  slug: "industries",
  labels: {
    singular: "Industry",
    plural: "Industries",
  },
  admin: {
    group: "Industries",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "order"],
    description:
      "Standard business verticals shown in the header's Industries menu and on /industries. The entry with slug \"high-risk\" is the umbrella page that links out to High-Risk Specialties.",
  },
  access: {
    read: publicRead,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
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
        description: "URL path segment, e.g. restaurants",
      },
    },
    {
      name: "tagline",
      type: "text",
      required: true,
      admin: {
        description: "Short one-line hook shown under the heading.",
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: {
        description: "Paragraph shown on the individual industry page.",
      },
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "Globe",
      options: [...ICON_OPTIONS],
      admin: {
        description: "Lucide icon name shown on the industries hub cards.",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first in menus and grids.",
      },
    },
    ...industryDetailFields(),
  ],
};
