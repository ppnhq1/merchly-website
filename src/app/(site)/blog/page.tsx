import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/AppIcon";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Payments insights, industry guides, and news from the Merchly team.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div>
      <section className="bg-base-200">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <h1 className="text-4xl font-heading font-bold">Merchly Blog</h1>
          <p className="mt-4 text-base-content/70 max-w-2xl">
            Payments insights, industry guides, and news for modern
            businesses.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16">
        {posts.length === 0 && (
          <div className="card bg-base-200 border border-base-300 border-dashed">
            <div className="card-body items-center text-center gap-2 py-16">
              <Icon icon="lucide:newspaper" className="h-8 w-8 text-base-content/40" aria-hidden="true" />
              <p className="text-base-content/60">No posts yet — check back soon.</p>
            </div>
          </div>
        )}

        {featured && (
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-soft badge-primary badge-sm">
                  Latest
                </span>
                <Link
                  href={`/blog/category/${featured.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="badge badge-secondary badge-sm"
                >
                  {featured.category}
                </Link>
              </div>
              <h2 className="card-title text-2xl font-heading mt-2">
                <Link href={`/blog/${featured.slug}`} className="hover:text-primary">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-base-content/70">{featured.excerpt}</p>
              <p className="text-xs text-base-content/50 mt-2">
                {featured.author} &middot; {formatDate(featured.publishedAt)}
              </p>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {rest.map((post) => (
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
                  <h3 className="card-title text-lg font-heading mt-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-base-content/70">{post.excerpt}</p>
                  <p className="text-xs text-base-content/50 mt-2">
                    {post.author} &middot; {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
