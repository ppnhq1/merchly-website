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

// Explicit trusted-origin allowlist for CSRF and CORS — no wildcard. Includes
// the production domain, its www variant, local dev, and (when present) the
// current Vercel deployment URL for preview builds.
const trustedOrigins = [
  "https://merchly.io",
  "https://www.merchly.io",
  "http://localhost:3000",
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
].filter((origin): origin is string => Boolean(origin));

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  csrf: trustedOrigins,
  cors: trustedOrigins,
  upload: {
    limits: {
      // Global cap on any single uploaded file (Media is the only upload
      // collection today) to prevent storage/cost abuse via oversized files.
      fileSize: 8 * 1024 * 1024, // 8MB
    },
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
    // Dev mode otherwise auto-pushes schema diffs on every `next dev` start.
    // That mechanism only knows about Payload-declared tables, so it treats
    // rate_limit_hits (a plain table used by src/lib/rate-limit.ts, outside
    // Payload's schema) as an orphan to drop — it will prompt to delete it
    // (with real data loss) on every single dev boot. Schema changes go
    // through explicit, reviewed SQL/migrations instead (see project notes).
    push: false,
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
