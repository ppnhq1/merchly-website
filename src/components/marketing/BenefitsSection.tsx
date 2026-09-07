import { Icon } from "@/components/ui/AppIcon";

const benefits = [
  {
    title: "Transparent pricing",
    description:
      "Interchange-level rates with no hidden fees or surprise statements.",
    icon: "lucide:hand-coins",
  },
  {
    title: "Fast funding",
    description: "Get paid sooner with next-day and same-day funding options.",
    icon: "lucide:zap",
  },
  {
    title: "24/7 support",
    description: "Real, US-based specialists who answer when you call.",
    icon: "lucide:headset",
  },
  {
    title: "High-risk friendly",
    description: "Specialized underwriting for industries other processors decline.",
    icon: "lucide:shield-check",
  },
];

export function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="hover-3d cursor-default">
            <div className="card bg-base-200 border border-base-300 shadow-sm h-full">
              <div className="card-body">
                <div className="h-12 w-12 mask mask-squircle bg-primary/10 text-primary flex items-center justify-center">
                  <Icon
                    icon={benefit.icon}
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg mt-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-base-content/70">
                  {benefit.description}
                </p>
              </div>
            </div>
            {/* 8 empty divs required by daisyUI's hover-3d tilt effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ))}
      </div>
    </section>
  );
}
