import { createNeonAuth } from "@neondatabase/auth/next/server";

// Wired to the "Merchly Site" Neon project's Auth service. Not yet the
// gatekeeper for /admin (Payload's own auth handles that today) — see
// project notes on magic-link support before using this to protect routes.
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});
