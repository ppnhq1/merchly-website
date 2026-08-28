export type Industry = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    tagline: "Fast, reliable payments for every table and takeout order.",
    summary:
      "From quick-service counters to full-service dining rooms, Merchly supports tableside payments, online ordering, and tip-friendly checkout built for the pace of restaurant service.",
  },
  {
    slug: "retail",
    name: "Retail",
    tagline: "In-store and online checkout that keeps up with your customers.",
    summary:
      "Merchly gives retailers unified in-store and online payment processing, inventory-friendly reporting, and next-day funding to keep cash flow moving.",
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Built for online checkout, subscriptions, and growth.",
    summary:
      "Plug Merchly into your storefront for secure card-not-present processing, fraud tools, and integrations with the platforms online sellers already use.",
  },
  {
    slug: "high-risk",
    name: "High-Risk Merchants",
    tagline: "Specialized processing for industries traditional banks turn away.",
    summary:
      "Merchly works with underwriters who understand high-risk categories, helping approved merchants get set up with stable, compliant processing.",
  },
];

export type HighRiskNiche = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
};

export const highRiskNiches: HighRiskNiche[] = [
  {
    slug: "cbd-nutraceuticals",
    name: "CBD & Nutraceuticals",
    tagline: "Compliant processing for the supplement and CBD industry.",
    summary:
      "Merchly partners with banks experienced in CBD, hemp-derived products, and nutraceutical supplements to help legitimate merchants get approved and stay approved.",
  },
  {
    slug: "adult-entertainment",
    name: "Adult Entertainment",
    tagline: "Discreet, dependable payment processing built for adult businesses.",
    summary:
      "We work with acquirers who specialize in adult content and entertainment merchants, offering discreet billing descriptors and chargeback protection tools.",
  },
  {
    slug: "vape-tobacco-firearms",
    name: "Vape, Tobacco & Firearms",
    tagline: "Age-restricted, regulated product processing done right.",
    summary:
      "Merchly supports age-restricted and regulated product merchants — vape shops, tobacco retailers, and firearms dealers — with compliant, age-verified checkout options.",
  },
  {
    slug: "subscription-mlm-dating",
    name: "Subscription, MLM & Dating Services",
    tagline: "Recurring billing built to handle chargebacks and churn.",
    summary:
      "High-chargeback recurring billing models — subscription boxes, MLM/direct sales, and dating services — get dedicated chargeback mitigation and retry logic with Merchly.",
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getHighRiskNicheBySlug(slug: string) {
  return highRiskNiches.find((niche) => niche.slug === slug);
}
