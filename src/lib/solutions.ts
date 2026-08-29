import type { DefaultDocumentIDType } from "payload";
import { findDocs } from "@/lib/payload";

export type Solution = {
  id: DefaultDocumentIDType;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: string;
};

export async function getSolutions(): Promise<Solution[]> {
  const result = await findDocs<Solution>("solutions", {
    sort: "order",
    limit: 100,
  });
  return result.docs;
}

export async function getSolutionBySlug(
  slug: string,
): Promise<Solution | undefined> {
  const result = await findDocs<Solution>("solutions", {
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0];
}
