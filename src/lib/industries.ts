import type { DefaultDocumentIDType } from "payload";
import { findDocs } from "@/lib/payload";

export type BusinessTypeEntry = {
  name: string;
  icon?: string | null;
  link?: string | null;
};

export type BodySection = {
  heading: string;
  // Lexical richText JSON — cast at render time, same pattern as Post.content.
  content: unknown;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type ReviewEntry = {
  quote: string;
  name: string;
  role?: string | null;
};

export type IndustryDetailContent = {
  ctaSection?: {
    heading?: string | null;
    body?: string | null;
    ctaLabel?: string | null;
  } | null;
  businessTypes?: BusinessTypeEntry[] | null;
  bodySections?: BodySection[] | null;
  faqs?: FaqEntry[] | null;
  finalCta?: {
    heading?: string | null;
    ctaLabel?: string | null;
  } | null;
  reviews?: ReviewEntry[] | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
  } | null;
};

export type Industry = {
  id: DefaultDocumentIDType;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: string;
  updatedAt?: string;
} & IndustryDetailContent;

export type HighRiskNiche = {
  id: DefaultDocumentIDType;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: string;
  updatedAt?: string;
} & IndustryDetailContent;

export async function getIndustries(): Promise<Industry[]> {
  const result = await findDocs<Industry>("industries", {
    sort: "order",
    limit: 100,
  });
  return result.docs;
}

export async function getIndustryBySlug(
  slug: string,
): Promise<Industry | undefined> {
  const result = await findDocs<Industry>("industries", {
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}

export async function getHighRiskNiches(): Promise<HighRiskNiche[]> {
  const result = await findDocs<HighRiskNiche>("high-risk-niches", {
    sort: "order",
    limit: 100,
  });
  return result.docs;
}

export async function getHighRiskNicheBySlug(
  slug: string,
): Promise<HighRiskNiche | undefined> {
  const result = await findDocs<HighRiskNiche>("high-risk-niches", {
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}
