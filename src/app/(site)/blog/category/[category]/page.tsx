import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/lib/posts";

type Params = { category: string };

function slugToCategory(slug: string) {
  return slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  return { title: `${slugToCategory(category)} Articles` };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const categoryName = slugToCategory(category);
  const posts = await getPostsByCategory(categoryName);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
      <div className="breadcrumbs text-sm text-base-content/50">
        <ul>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>{categoryName}</li>
        </ul>
      </div>
      <h1 className="mt-2 text-4xl font-heading font-bold">{categoryName}</h1>

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card bg-base-100 border border-base-300 hover:border-primary transition-colors"
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-heading">
                {post.title}
              </h2>
              <p className="text-sm text-base-content/70">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
