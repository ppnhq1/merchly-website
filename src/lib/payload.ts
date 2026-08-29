import { getPayload } from "payload";
import config from "@payload-config";

export const getPayloadClient = () => getPayload({ config });

// Generic helpers used by the lib/*.ts wrappers for the CMS-backed
// collections. Bypasses Payload's generated-types generics (same reason as
// posts.ts: src/payload-types.ts doesn't exist yet), so callers supply their
// own doc shape and cast accordingly.
export async function findDocs<T>(
  collection: string,
  query: Record<string, unknown> = {},
): Promise<{ docs: T[] }> {
  const payload = await getPayloadClient();
  const find = payload.find.bind(payload) as unknown as (
    args: Record<string, unknown>,
  ) => Promise<{ docs: T[] }>;
  return find({ collection, ...query });
}

export async function findGlobal<T>(slug: string): Promise<T> {
  const payload = await getPayloadClient();
  const findGlobalFn = payload.findGlobal.bind(payload) as unknown as (
    args: Record<string, unknown>,
  ) => Promise<T>;
  return findGlobalFn({ slug });
}
