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
      const { firstName, lastName, ...rest } = values;
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, firstName, lastName, source, recaptchaToken }),
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
      <div role="alert" className="alert alert-success">
        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        <span>Thanks — a member of our team will reach out shortly.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="fieldset min-w-0 gap-1 px-0">
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
            <label className="label" htmlFor="lead-first-name">
              First name
            </label>
            <label
              className={
                errors.firstName ? "input input-error w-full" : "input w-full"
              }
            >
              <User className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
              <input
                id="lead-first-name"
                type="text"
                required
                placeholder="Jordan"
                className="grow min-w-0"
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />
            </label>
            {errors.firstName && (
              <p className="label text-error">{errors.firstName.message}</p>
            )}
          </div>
          <div className="min-w-0">
            <label className="label" htmlFor="lead-last-name">
              Last name
            </label>
            <label
              className={
                errors.lastName ? "input input-error w-full" : "input w-full"
              }
            >
              <User className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
              <input
                id="lead-last-name"
                type="text"
                required
                placeholder="Rivera"
                className="grow min-w-0"
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />
            </label>
            {errors.lastName && (
              <p className="label text-error">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <label className="label mt-2" htmlFor="lead-email">
          Work email
        </label>
        <label className={errors.email ? "input input-error w-full" : "input w-full"}>
          <Mail className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
          <input
            id="lead-email"
            type="email"
            required
            placeholder="you@business.com"
            className="grow min-w-0"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </label>
        {errors.email && (
          <p className="label text-error">{errors.email.message}</p>
        )}

        <label className="label mt-2" htmlFor="lead-phone">
          Phone
        </label>
        <label className={errors.phone ? "input input-error w-full" : "input w-full"}>
          <Phone className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
          <input
            id="lead-phone"
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
          <p className="label text-error">{errors.phone.message}</p>
        )}

        <label className="label mt-2" htmlFor="lead-time-in-business">
          Time in business
        </label>
        <label className={errors.timeInBusiness ? "select select-error w-full" : "select w-full"}>
          <CalendarClock className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
          <select
            id="lead-time-in-business"
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
          <p className="label text-error">{errors.timeInBusiness.message}</p>
        )}

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

        <label className="label mt-3 items-start gap-2 whitespace-normal">
          <input
            type="checkbox"
            className="checkbox checkbox-sm mt-0.5 shrink-0"
            {...register("consent")}
          />
          <span className="whitespace-normal">
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
              {errorMessage || "Something went wrong. Please try again."}
            </span>
          </div>
        )}
      </fieldset>
    </form>
  );
}
