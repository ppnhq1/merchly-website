import type { CollectionConfig } from "payload";
import { adminOnly } from "@/lib/access";

// Every quote request submitted through any form on the site. Written first,
// before any notification email/SMS is attempted — see src/app/api/leads/
// route.ts. That way a Brevo/BulkVS outage never loses a lead, it just
// delays the team's notification of it.
export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "phone", "source", "createdAt"],
    description:
      "Quote requests submitted through the site. Created by the server (Local API) — never accepts a public write.",
  },
  access: {
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "email", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "timeInBusiness", type: "text" },
    { name: "message", type: "textarea" },
    { name: "source", type: "text", required: true },
    { name: "consent", type: "checkbox", defaultValue: false },
  ],
};
