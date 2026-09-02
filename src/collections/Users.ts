import type { CollectionConfig } from "payload";
import { adminOnly, isSelf } from "@/lib/access";

// Every account in this collection is a trusted CMS operator (it backs the
// Payload /admin panel) — there is no separate, lower-privileged customer
// account type in this app. That's why "authenticated" (adminOnly) is an
// acceptable stand-in for "admin" below. If a privilege tier is ever added
// (e.g. a `role` field), give that field its own `access.update` so a
// non-admin can't grant themselves elevated rights by mass-assigning it, and
// stop treating every authenticated user as equally trusted here.
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Throttle brute-force login attempts against /admin.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
    cookies: {
      // Force HTTPS-only cookies in production; localhost dev still works
      // since browsers don't require Secure over http://localhost.
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  },
  admin: {
    useAsTitle: "email",
  },
  access: {
    // No public self-registration. Payload always allows creating the very
    // first user regardless of access control, so initial admin setup still
    // works even though this requires an existing session afterward.
    create: adminOnly,
    // Authenticated only — prevents anonymous enumeration of operator emails.
    read: adminOnly,
    // Self-only — one operator can't hijack another's account by editing
    // their email/password.
    update: isSelf,
    // Any authenticated operator can offboard another (all are equally
    // trusted); still requires an existing session, never anonymous.
    delete: adminOnly,
    // `unlock` is a distinct access key from the four above and defaults to
    // public if left unset — that would let anyone reset another account's
    // failed-login counter on demand, defeating maxLoginAttempts/lockTime
    // entirely. Restrict it the same as everything else here.
    unlock: adminOnly,
  },
  fields: [],
};
