import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Icon } from "@/components/ui/AppIcon";
import { getPostBySlug } from "@/lib/posts";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const initials = post.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="max-w-3xl mx-auto px-4 lg:px-8 py-16 sm:py-20">
      <div className="breadcrumbs text-sm text-base-content/50">
        <ul>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link
              href={`/blog/category/${post.category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {post.category}
            </Link>
          </li>
        </ul>
      </div>

      <h1 className="mt-2 text-4xl font-heading font-bold leading-tight">
        {post.title}
      </h1>

      <div className="mt-6 flex items-center gap-3">
        <div className="avatar avatar-placeholder">
          <div className="bg-base-300 text-base-content w-10 rounded-full">
            <span className="text-sm font-semibold">{initials}</span>
          </div>
        </div>
        <div>
          <div className="font-medium text-sm">{post.author}</div>
          <div className="text-xs text-base-content/50">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="prose max-w-none">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <RichText data={post.content as any} />
      </div>

      <div className="mt-12">
        <Link href="/blog" className="link link-primary inline-flex items-center gap-1">
          <Icon icon="lucide:arrow-left" className="h-4 w-4" aria-hidden="true" />
          Back to all posts
        </Link>
      </div>
    </article>
  );
}
