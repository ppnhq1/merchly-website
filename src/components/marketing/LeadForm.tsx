"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";

const businessTypes = [
  "Restaurant",
  "Retail",
  "E-commerce",
  "High-risk",
  "Other",
] as const;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((value) => value, "Consent is required"),
  companyWebsite: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

type LeadFormProps = {
  source: string;
  showMessage?: boolean;
  submitLabel?: string;
};

export function LeadForm({
  source,
  showMessage = true,
  submitLabel = "Get My Free Quote",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="alert" className="alert alert-success">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        <span>Thanks — a member of our team will reach out shortly.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="fieldset gap-1 px-0">
        {/* Honeypot field, hidden from real users and assistive tech */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          aria-label="Leave this field blank"
          className="hidden"
          {...register("companyWebsite")}
        />

        <label className="label" htmlFor="lead-name">
          Full name
        </label>
        <input
          id="lead-name"
          type="text"
          required
          placeholder="Jordan Rivera"
          className={
            errors.name ? "input validator input-error w-full" : "input validator w-full"
          }
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="label text-error">{errors.name.message}</p>
        )}

        <label className="label mt-2" htmlFor="lead-email">
          Work email
        </label>
        <input
          id="lead-email"
          type="email"
          required
          placeholder="you@business.com"
          className={
            errors.email ? "input validator input-error w-full" : "input validator w-full"
          }
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="label text-error">{errors.email.message}</p>
        )}

        <label className="label mt-2" htmlFor="lead-phone">
          Phone <span className="text-base-content/50">(optional)</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="(555) 555-0100"
          className="input w-full"
          {...register("phone")}
        />

        <label className="label mt-2" htmlFor="lead-business">
          Business name <span className="text-base-content/50">(optional)</span>
        </label>
        <input
          id="lead-business"
          type="text"
          placeholder="Acme Co."
          className="input w-full"
          {...register("businessName")}
        />

        <label className="label mt-2" htmlFor="lead-business-type">
          Business type <span className="text-base-content/50">(optional)</span>
        </label>
        <select
          id="lead-business-type"
          className="select w-full"
          defaultValue=""
          {...register("businessType")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {businessTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {showMessage && (
          <>
            <label className="label mt-2" htmlFor="lead-message">
              Tell us about your business{" "}
              <span className="text-base-content/50">(optional)</span>
            </label>
            <textarea
              id="lead-message"
              placeholder="What you sell, roughly how much you process monthly, and any timeline"
              className="textarea w-full"
              rows={3}
              {...register("message")}
            />
          </>
        )}

        <label className="label mt-3 items-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm mt-0.5"
            {...register("consent")}
          />
          <span>
            I agree to be contacted by Merchly about my quote by phone,
            email, or text.
          </span>
        </label>
        {errors.consent && (
          <p className="label text-error">{errors.consent.message}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-sm mt-4"
          disabled={status === "loading"}
        >
          {status === "loading" && (
            <span className="loading loading-spinner loading-xs" />
          )}
          {status === "loading" ? "Sending..." : submitLabel}
        </button>

        {status === "error" && (
          <div role="alert" className="alert alert-error alert-soft mt-2 py-2">
            <span className="text-sm">
              Something went wrong. Please try again.
            </span>
          </div>
        )}
      </fieldset>
    </form>
  );
}
