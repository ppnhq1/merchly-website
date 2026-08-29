import type { DefaultDocumentIDType } from "payload";
import { findDocs } from "@/lib/payload";

export type ComparePoint = {
  category: string;
  merchly: string;
  competitor: string;
};

export type Comparison = {
  id: DefaultDocumentIDType;
  slug: string;
  competitor: string;
  tagline: string;
  summary: string;
  points: ComparePoint[];
};

export async function getComparisons(): Promise<Comparison[]> {
  const result = await findDocs<Comparison>("comparisons", {
    sort: "order",
    limit: 100,
  });
  return result.docs;
}

export async function getComparisonBySlug(
  slug: string,
): Promise<Comparison | undefined> {
  const result = await findDocs<Comparison>("comparisons", {
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}
