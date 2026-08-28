import { getPayloadClient } from "@/lib/payload";
import type { DefaultDocumentIDType } from "payload";

// Minimal shape of the "posts" collection (see src/collections/Posts.ts).
// Generate src/payload-types.ts with `npm run generate:types` for full
// type safety once the tsx/Node ESM CLI incompatibility is resolved
// upstream, then swap these casts for the generated `Post` type.
export type Post = {
  id: DefaultDocumentIDType;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  content: unknown;
  featuredImage?: unknown;
};

type PostsResult = { docs: Post[] };

// Bypasses Payload's generated-types generics (untyped `find` call) since
// src/payload-types.ts doesn't exist yet — see the note above.
async function findPosts(query: Record<string, unknown>): Promise<PostsResult> {
  const payload = await getPayloadClient();
  const find = payload.find.bind(payload) as unknown as (
    args: Record<string, unknown>,
  ) => Promise<PostsResult>;
  return find({ collection: "posts", ...query });
}

export async function getAllPosts(): Promise<Post[]> {
  const result = await findPosts({ sort: "-publishedAt", limit: 100 });
  return result.docs;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const result = await findPosts({
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const result = await findPosts({
    where: { category: { equals: category } },
    sort: "-publishedAt",
    limit: 100,
  });
  return result.docs;
}
