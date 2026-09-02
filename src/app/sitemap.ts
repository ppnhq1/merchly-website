import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getIndustries, getHighRiskNiches } from "@/lib/industries";
import { getSolutions } from "@/lib/solutions";
import { getIntegrations } from "@/lib/integrations";
import { getComparisons } from "@/lib/compare";
import { getResources } from "@/lib/resources";
import { getAllPosts } from "@/lib/posts";

// Regenerated periodically (rather than frozen at build time) so newly
// published Payload content shows up without needing a redeploy — this is
// the "update as new pages are added" requirement: every collection this
// site has a detail page for is queried here, so adding a doc in Payload is
// enough; adding a whole new route type just needs one more entry below.
export const revalidate = 3600; // 1 hour

function toDate(value: string | undefined): Date | undefined {
  return value ? new Date(value) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [industries, highRiskNiches, solutions, integrations, comparisons, resources, posts] =
    await Promise.all([
      getIndustries(),
      getHighRiskNiches(),
      getSolutions(),
      getIntegrations(),
      getComparisons(),
      getResources(),
      getAllPosts(),
    ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact-us`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/industries`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/solutions`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/integrations`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/compare`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms-of-service`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/industries/${industry.slug}`,
    lastModified: toDate(industry.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const highRiskNicheRoutes: MetadataRoute.Sitemap = highRiskNiches.map((niche) => ({
    url: `${SITE_URL}/industries/high-risk/${niche.slug}`,
    lastModified: toDate(niche.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${SITE_URL}/solutions/${solution.slug}`,
    lastModified: toDate(solution.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const integrationRoutes: MetadataRoute.Sitemap = integrations.map((integration) => ({
    url: `${SITE_URL}/integrations/${integration.slug}`,
    lastModified: toDate(integration.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((comparison) => ({
    url: `${SITE_URL}/compare/${comparison.slug}`,
    lastModified: toDate(comparison.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: `${SITE_URL}/resources/${resource.slug}`,
    lastModified: toDate(resource.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: toDate(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...industryRoutes,
    ...highRiskNicheRoutes,
    ...solutionRoutes,
    ...integrationRoutes,
    ...comparisonRoutes,
    ...resourceRoutes,
    ...postRoutes,
  ];
}
