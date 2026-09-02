"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, User, Mail, Phone, CalendarClock } from "lucide-react";
import { formatUsPhoneInput, normalizeUsPhoneToE164 } from "@/lib/phone";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { TIME_IN_BUSINESS_OPTIONS, TIME_IN_BUSINESS_VALUES } from "@/lib/time-in-business";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .refine((value) => normalizeUsPhoneToE164(value) !== null, "Enter a valid phone number"),
  timeInBusiness: z.enum(TIME_IN_BUSINESS_VALUES, {
    message: "Please select how long you've been in business",
  }),
  consent: z.boolean().refine((value) => value, "Consent is required"),
  companyWebsite: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

type HeroLeadFormProps = {
  source: string;
};

// A leaner, hero-embedded lead form (First/Last name, email, phone, time in
// business) — distinct from LeadForm/LeadModal, which use the same field set
// via a fuller layout (see LeadForm.tsx) for the page's other CTAs. Posts to
// the same /api/leads endpoint/contract as LeadForm.
export function HeroLeadForm({ source }: HeroLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    try {
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, recaptchaToken }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error || "Request failed");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : null);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card w-full min-w-0 bg-base-300 border border-base-content/10 shadow-xl">
        <div className="card-body items-center text-center gap-3">
          <div className="rounded-full bg-success/15 p-3">
            <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
          </div>
          <h2 className="card-title font-heading">You&apos;re all set</h2>
          <p className="text-sm text-base-content/70">
            A member of our team will reach out shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="card w-full min-w-0 bg-base-300 border border-base-content/10 shadow-xl"
    >
      <div className="card-body gap-0">
        <h2 className="card-title font-heading">Get your free quote</h2>
        <p className="text-sm text-base-content/60">
          See your rate in minutes — no obligation.
        </p>

        <fieldset className="fieldset min-w-0 mt-3 gap-1 p-0">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="min-w-0">
              <label className="label text-xs" htmlFor="hero-first-name">
                First name
              </label>
              <label
                className={
                  errors.firstName
                    ? "input input-sm input-error w-full"
                    : "input input-sm w-full"
                }
              >
                <User className="h-3.5 w-3.5 opacity-50 shrink-0" aria-hidden="true" />
                <input
                  id="hero-first-name"
                  type="text"
                  required
                  placeholder="Jordan"
                  className="grow min-w-0"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                />
              </label>
            </div>
            <div className="min-w-0">
              <label className="label text-xs" htmlFor="hero-last-name">
                Last name
              </label>
              <label
                className={
                  errors.lastName
                    ? "input input-sm input-error w-full"
                    : "input input-sm w-full"
                }
              >
                <User className="h-3.5 w-3.5 opacity-50 shrink-0" aria-hidden="true" />
                <input
                  id="hero-last-name"
                  type="text"
                  required
                  placeholder="Rivera"
                  className="grow min-w-0"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                />
              </label>
            </div>
          </div>

          <label className="label text-xs mt-2" htmlFor="hero-email">
            Work email
          </label>
          <label
            className={errors.email ? "input input-sm input-error w-full" : "input input-sm w-full"}
          >
            <Mail className="h-3.5 w-3.5 opacity-50 shrink-0" aria-hidden="true" />
            <input
              id="hero-email"
              type="email"
              required
              placeholder="you@business.com"
              className="grow min-w-0"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </label>

          <label className="label text-xs mt-2" htmlFor="hero-phone">
            Phone
          </label>
          <label
            className={
              errors.phone ? "input input-sm input-error w-full" : "input input-sm w-full"
            }
          >
            <Phone className="h-3.5 w-3.5 opacity-50 shrink-0" aria-hidden="true" />
            <input
              id="hero-phone"
              type="tel"
              inputMode="tel"
              required
              placeholder="(555) 555-0100"
              maxLength={14}
              className="grow min-w-0 tabular-nums"
              aria-invalid={!!errors.phone}
              {...register("phone", {
                onChange: (event) => {
                  setValue("phone", formatUsPhoneInput(event.target.value));
                },
              })}
            />
          </label>
          {errors.phone && (
            <p className="text-xs text-error">{errors.phone.message}</p>
          )}

          <label className="label text-xs mt-2" htmlFor="hero-time-in-business">
            Time in business
          </label>
          <label
            className={
              errors.timeInBusiness ? "select select-sm select-error w-full" : "select select-sm w-full"
            }
          >
            <CalendarClock className="h-3.5 w-3.5 opacity-50 shrink-0" aria-hidden="true" />
            <select
              id="hero-time-in-business"
              className="grow min-w-0"
              required
              defaultValue=""
              aria-invalid={!!errors.timeInBusiness}
              {...register("timeInBusiness")}
            >
              <option value="" disabled>
                Choose one
              </option>
              {TIME_IN_BUSINESS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {errors.timeInBusiness && (
            <p className="text-xs text-error">{errors.timeInBusiness.message}</p>
          )}

          <label className="label mt-3 items-start gap-2 whitespace-normal">
            <input
              type="checkbox"
              className="checkbox checkbox-sm mt-0.5 shrink-0"
              {...register("consent")}
            />
            <span className="whitespace-normal text-xs text-base-content/70">
              I agree to be contacted by Merchly about my quote by phone,
              email, or text.
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-error">{errors.consent.message}</p>
          )}

          <div className="aura aura-glow mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-sm w-full"
              disabled={status === "loading"}
            >
              {status === "loading" && (
                <span className="loading loading-spinner loading-xs" />
              )}
              {status === "loading" ? "Sending..." : "Get My Free Quote"}
            </button>
          </div>

          {status === "error" && (
            <div role="alert" className="alert alert-error alert-soft mt-2 py-2">
              <span className="text-xs">
                {errorMessage || "Something went wrong. Please try again."}
              </span>
            </div>
          )}
        </fieldset>
      </div>
    </form>
  );
}
