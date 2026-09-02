import type { DefaultDocumentIDType } from "payload";
import { findDocs } from "@/lib/payload";

export type IntegrationCategory =
  | "Ecommerce Platform"
  | "Accounting"
  | "Payment Gateway";

export type Integration = {
  id: DefaultDocumentIDType;
  slug: string;
  name: string;
  category: IntegrationCategory;
  tagline: string;
  summary: string;
  icon: string;
  updatedAt?: string;
};

export async function getIntegrations(): Promise<Integration[]> {
  const result = await findDocs<Integration>("integrations", {
    sort: "order",
    limit: 100,
  });
  return result.docs;
}

export async function getIntegrationBySlug(
  slug: string,
): Promise<Integration | undefined> {
  const result = await findDocs<Integration>("integrations", {
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}

export async function getIntegrationsByCategory(
  category: IntegrationCategory,
): Promise<Integration[]> {
  const result = await findDocs<Integration>("integrations", {
    where: { category: { equals: category } },
    sort: "order",
    limit: 100,
  });
  return result.docs;
}
