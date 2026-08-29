// TODO: replace with real customer quotes before launch.
const featured = {
  quote:
    "Switching to Merchly cut our processing costs and the funding actually lands the next day like they said it would.",
  name: "Jordan M.",
  role: "Owner, quick-service restaurant",
  initials: "JM",
};

const supporting = [
  {
    quote:
      "We were rejected by three processors before Merchly. Their team understood our industry and got us approved in days.",
    name: "Priya S.",
    role: "Founder, e-commerce brand",
    initials: "PS",
  },
  {
    quote:
      "Support actually picks up the phone. That alone has been worth switching for.",
    name: "Dave R.",
    role: "Retail store manager",
    initials: "DR",
  },
];

export function TestimonialsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-heading font-bold">
          Trusted by businesses like yours
        </h2>
        <p className="mt-3 text-base-content/70">
          Illustrative feedback — final testimonials will be sourced from
          verified Merchly merchants before launch.
        </p>
      </div>
      <div className="mt-12 grid lg:grid-cols-3 gap-6">
        <figure className="card bg-primary text-primary-content lg:col-span-2">
          <blockquote className="card-body justify-center">
            <p className="text-xl sm:text-2xl font-heading leading-snug">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="avatar avatar-placeholder">
                <div className="bg-primary-content/15 text-primary-content w-11 rounded-full">
                  <span className="text-sm font-semibold">{featured.initials}</span>
                </div>
              </div>
              <div>
                <div className="font-semibold">{featured.name}</div>
                <div className="text-sm text-primary-content/70">{featured.role}</div>
              </div>
            </figcaption>
          </blockquote>
        </figure>

        <div className="grid gap-6">
          {supporting.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="card bg-base-100 border border-base-300"
            >
              <blockquote className="card-body">
                <p className="text-base-content/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <figcaption className="mt-4 flex items-center gap-3">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-base-300 text-base-content w-9 rounded-full">
                      <span className="text-xs font-semibold">{testimonial.initials}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-base-content/60">{testimonial.role}</div>
                  </div>
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
