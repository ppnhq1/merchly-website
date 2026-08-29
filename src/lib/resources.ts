import type { DefaultDocumentIDType } from "payload";
import { findDocs } from "@/lib/payload";

export type ResourceSection = {
  heading: string;
  body: string;
};

export type Resource = {
  id: DefaultDocumentIDType;
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: ResourceSection[];
};

export async function getResources(): Promise<Resource[]> {
  const result = await findDocs<Resource>("resources", {
    sort: "order",
    limit: 100,
  });
  return result.docs;
}

export async function getResourceBySlug(
  slug: string,
): Promise<Resource | undefined> {
  const result = await findDocs<Resource>("resources", {
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}
