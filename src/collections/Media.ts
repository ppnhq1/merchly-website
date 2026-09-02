import type { CollectionConfig } from "payload";
import { adminOnly, publicRead } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: publicRead,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    // SVG is deliberately excluded: it can carry embedded <script>/event-handler
    // content and would be a stored-XSS vector if ever rendered inline.
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
  },
};
