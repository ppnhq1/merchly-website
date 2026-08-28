"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  message: z.string().optional(),
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
      <div className="alert alert-success">
        <span>Thanks — a member of our team will reach out shortly.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {/* Honeypot field, hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("companyWebsite")}
      />

      <div className="form-control">
        <input
          type="text"
          placeholder="Full name"
          className="input input-bordered w-full"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-error text-sm mt-1">{errors.name.message}</span>
        )}
      </div>

      <div className="form-control">
        <input
          type="email"
          placeholder="Work email"
          className="input input-bordered w-full"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-error text-sm mt-1">{errors.email.message}</span>
        )}
      </div>

      <div className="form-control">
        <input
          type="tel"
          placeholder="Phone (optional)"
          className="input input-bordered w-full"
          {...register("phone")}
        />
      </div>

      <div className="form-control">
        <input
          type="text"
          placeholder="Business name (optional)"
          className="input input-bordered w-full"
          {...register("businessName")}
        />
      </div>

      {showMessage && (
        <div className="form-control">
          <textarea
            placeholder="Tell us about your business (optional)"
            className="textarea textarea-bordered w-full"
            rows={3}
            {...register("message")}
          />
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : submitLabel}
      </button>

      {status === "error" && (
        <span className="text-error text-sm">
          Something went wrong. Please try again.
        </span>
      )}
    </form>
  );
}
