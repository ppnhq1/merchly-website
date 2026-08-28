import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Payments insights, industry guides, and news from the Merchly team.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-20">
      <h1 className="text-4xl font-heading font-bold">Merchly Blog</h1>
      <p className="mt-4 text-base-content/70 max-w-2xl">
        Payments insights, industry guides, and news for modern businesses.
      </p>

      {posts.length === 0 && (
        <p className="mt-12 text-base-content/60">
          No posts yet — check back soon.
        </p>
      )}

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
          >
            <div className="card-body">
              <Link
                href={`/blog/category/${post.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="badge badge-secondary badge-sm w-fit"
              >
                {post.category}
              </Link>
              <h2 className="card-title text-lg font-heading mt-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-base-content/70">{post.excerpt}</p>
              <p className="text-xs text-base-content/50 mt-2">
                {post.author} &middot;{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
