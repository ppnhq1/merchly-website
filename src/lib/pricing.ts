import { findGlobal } from "@/lib/payload";

export type RateFactor = {
  title: string;
  description: string;
};

export type PricingContent = {
  heroTitle: string;
  heroDescription: string;
  interchangeSummary: string;
  contractsSummary: string;
  merchantPaysSummary: string;
  customerPaysSummary: string;
  rateFactors: RateFactor[];
  ctaDescription: string;
};

export async function getPricingContent(): Promise<PricingContent> {
  return findGlobal<PricingContent>("pricing");
}
