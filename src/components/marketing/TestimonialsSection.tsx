// TODO: replace with real customer quotes before launch.
const testimonials = [
  {
    quote:
      "Switching to Merchly cut our processing costs and the funding actually lands the next day like they said it would.",
    name: "Jordan M.",
    role: "Owner, quick-service restaurant",
  },
  {
    quote:
      "We were rejected by three processors before Merchly. Their team understood our industry and got us approved in days.",
    name: "Priya S.",
    role: "Founder, e-commerce brand",
  },
  {
    quote:
      "Support actually picks up the phone. That alone has been worth switching for.",
    name: "Dave R.",
    role: "Retail store manager",
  },
];

export function TestimonialsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-heading font-bold">
          Trusted by businesses like yours
        </h2>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="card bg-base-100 border border-base-300"
          >
            <blockquote className="card-body">
              <p className="text-base-content/80">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <figcaption className="mt-4">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-base-content/60">
                  {testimonial.role}
                </div>
              </figcaption>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
