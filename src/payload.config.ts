import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { Posts } from "@/collections/Posts";
import { Industries } from "@/collections/Industries";
import { HighRiskNiches } from "@/collections/HighRiskNiches";
import { Solutions } from "@/collections/Solutions";
import { Integrations } from "@/collections/Integrations";
import { Comparisons } from "@/collections/Comparisons";
import { Resources } from "@/collections/Resources";
import { Pricing } from "@/globals/Pricing";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Posts,
    Industries,
    HighRiskNiches,
    Solutions,
    Integrations,
    Comparisons,
    Resources,
  ],
  globals: [Pricing],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: "uploads",
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT_URL_S3,
        forcePathStyle: true,
        requestChecksumCalculation: "WHEN_REQUIRED",
      },
    }),
  ],
});
