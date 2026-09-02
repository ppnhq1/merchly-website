import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const isDev = process.env.NODE_ENV === "development";

// Origin the S3-compatible object storage bucket serves media from (Media
// collection images render straight from here) — derived from the same env
// var the storage plugin uses, so it can't drift out of sync.
const s3Origin = (() => {
  try {
    return process.env.AWS_ENDPOINT_URL_S3
      ? new URL(process.env.AWS_ENDPOINT_URL_S3).origin
      : "";
  } catch {
    return "";
  }
})();

// No nonces: this keeps the marketing pages statically generated/ISR'd
// instead of forcing dynamic rendering on every request (see Next's CSP
// guide). 'unsafe-inline' on script/style is the tradeoff — third-party
// script origins are still an explicit allowlist, which is the part CSP is
// mainly defending here.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://www.google-analytics.com${s3Origin ? ` ${s3Origin}` : ""}`,
  "font-src 'self' data:",
  "connect-src 'self' https://www.google.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src https://www.google.com https://recaptcha.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
