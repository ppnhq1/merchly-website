import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Cost/abuse-sensitive endpoints: each fires an email/SMS (leads) or is an
// auth primitive worth throttling against brute-force / enumeration.
// Method-scoped so unrelated GETs (e.g. /api/users/me) aren't limited here.
const RATE_LIMITS: {
  method: string;
  match: (pathname: string) => boolean;
  key: string;
  limit: number;
  windowMs: number;
}[] = [
  {
    method: "POST",
    match: (p) => p === "/api/leads",
    key: "leads",
    limit: 5,
    windowMs: 10 * 60 * 1000, // 10 min
  },
  {
    method: "POST",
    match: (p) => p === "/api/users/login",
    key: "login",
    limit: 10,
    windowMs: 15 * 60 * 1000, // 15 min
  },
  {
    method: "POST",
    match: (p) => p === "/api/users/forgot-password",
    key: "forgot-password",
    limit: 5,
    windowMs: 60 * 60 * 1000, // 1 hr
  },
  {
    method: "POST",
    match: (p) => p === "/api/users/reset-password",
    key: "reset-password",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  },
  {
    method: "POST",
    match: (p) => p === "/api/users/unlock",
    key: "unlock",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  },
  {
    method: "POST",
    match: (p) => p === "/api/users/first-register",
    key: "first-register",
    limit: 5,
    windowMs: 60 * 60 * 1000,
  },
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rule = RATE_LIMITS.find(
    (r) => r.method === request.method && r.match(pathname),
  );

  if (rule) {
    const ip = getClientIp(request.headers);
    try {
      const result = await checkRateLimit(
        `${rule.key}:${ip}`,
        rule.limit,
        rule.windowMs,
      );
      if (!result.allowed) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 },
        );
      }
    } catch (error) {
      // Fail open: a rate-limit store outage shouldn't take down login or
      // lead submission, but it's worth knowing about.
      console.error("Rate limit check failed", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/leads", "/api/users/:path*"],
};
