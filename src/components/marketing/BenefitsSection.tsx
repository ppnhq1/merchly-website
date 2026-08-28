const benefits = [
  {
    title: "Transparent pricing",
    description:
      "Interchange-level rates with no hidden fees or surprise statements.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 20L20 4M7 8a3 3 0 100-6 3 3 0 000 6zM17 22a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    ),
  },
  {
    title: "Fast funding",
    description: "Get paid sooner with next-day and same-day funding options.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4.5 13.5H11L10.5 22L19.5 10.5H13L13 2Z" />
      </svg>
    ),
  },
  {
    title: "24/7 support",
    description: "Real, US-based specialists who answer when you call.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
      </svg>
    ),
  },
  {
    title: "High-risk friendly",
    description: "Specialized underwriting for industries other processors decline.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex flex-col gap-3">
            <div className="h-12 w-12 rounded-box bg-primary/10 text-primary flex items-center justify-center">
              {benefit.icon}
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
