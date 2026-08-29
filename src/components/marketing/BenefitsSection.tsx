import { HandCoins, Zap, Headset, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Transparent pricing",
    description:
      "Interchange-level rates with no hidden fees or surprise statements.",
    icon: HandCoins,
  },
  {
    title: "Fast funding",
    description: "Get paid sooner with next-day and same-day funding options.",
    icon: Zap,
  },
  {
    title: "24/7 support",
    description: "Real, US-based specialists who answer when you call.",
    icon: Headset,
  },
  {
    title: "High-risk friendly",
    description: "Specialized underwriting for industries other processors decline.",
    icon: ShieldCheck,
  },
];

export function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex flex-col gap-3">
            <div className="h-12 w-12 mask mask-squircle bg-primary/10 text-primary flex items-center justify-center">
              <benefit.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="font-heading font-semibold text-lg">
              {benefit.title}
            </h3>
            <p className="text-sm text-base-content/70">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
