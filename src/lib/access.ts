import type { Access } from "payload";

// This app has exactly one authenticated principal: an operator with a
// session in the `users` collection (Payload's own admin panel account).
// There is no lower-privileged authenticated tier today, so "authenticated"
// and "admin" are the same thing here — that's why these helpers are safe to
// use as a blanket authenticated-check for write access on content
// collections. If a lower-privileged tier (e.g. a customer account, or an
// editor vs. admin split) is introduced later, these must be revisited so
// that authentication alone no longer implies admin privileges, and any new
// privilege field (e.g. `role`) needs its own field-level `access` so a
// non-admin can't grant themselves elevated rights via mass assignment.

// Public read, admin-only write — the shape every marketing content
// collection/global in this app needs.
export const adminOnly: Access = ({ req }) => Boolean(req.user);

export const publicRead: Access = () => true;

// Users collection: only an existing operator may act on user records, and
// only on their own record for single-document operations (bulk operations
// are scoped to the requester's own document via the returned `where`).
export const isSelf: Access = ({ req, id }) => {
  if (!req.user) return false;
  if (id) return req.user.id === id;
  return { id: { equals: req.user.id } };
};
