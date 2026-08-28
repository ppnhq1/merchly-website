import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
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

  return (
    <article className="max-w-3xl mx-auto px-4 lg:px-8 py-20">
      <p className="text-sm text-base-content/50">
        <Link href="/blog" className="link link-hover">
          Blog
        </Link>{" "}
        / {post.category}
      </p>
      <h1 className="mt-2 text-4xl font-heading font-bold">{post.title}</h1>
      <p className="mt-4 text-sm text-base-content/50">
        {post.author} &middot;{" "}
        {new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-10 prose max-w-none">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <RichText data={post.content as any} />
      </div>
    </article>
  );
}
