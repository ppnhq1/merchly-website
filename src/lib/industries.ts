import type { DefaultDocumentIDType } from "payload";
import { findDocs } from "@/lib/payload";

export type Industry = {
  id: DefaultDocumentIDType;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: string;
};

export type HighRiskNiche = {
  id: DefaultDocumentIDType;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: string;
};

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
