import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  addLeadToBrevoList,
  sendLeadNotification,
  sendWelcomeEmail,
} from "@/lib/brevo";
import { sendWelcomeText } from "@/lib/bulkvs";
import { normalizeUsPhoneToE164 } from "@/lib/phone";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { TIME_IN_BUSINESS_VALUES } from "@/lib/time-in-business";
import { getPayloadClient } from "@/lib/payload";

const leadSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  // Required, and must actually normalize to a valid 10-digit US number —
  // reuses the same normalizer the request already needs downstream rather
  // than duplicating a separate format regex.
  phone: z
    .string()
    .max(50)
    .refine((value) => normalizeUsPhoneToE164(value) !== null, "Enter a valid phone number"),
  message: z.string().max(2000).optional(),
  // Required. z.enum's built-in "no undefined/other value" rejection is
  // exactly what we want now — the client always sends one of the real
  // option values because the field is enforced there too (see
  // HeroLeadForm.tsx / LeadForm.tsx).
  timeInBusiness: z.enum(TIME_IN_BUSINESS_VALUES),
  source: z.string().min(1).max(100),
  // Honeypot field: real users never fill this in.
  companyWebsite: z.string().max(0).optional(),
  recaptchaToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission" },
      { status: 400 },
    );
  }

  const { companyWebsite, recaptchaToken, ...rest } = parsed.data;
  if (companyWebsite) {
    // Silently accept bot submissions without processing them.
    return NextResponse.json({ ok: true });
  }

  const isHuman = await verifyRecaptcha(recaptchaToken, "lead_form");
  if (!isHuman) {
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 400 },
    );
  }

  // Store and forward phone numbers in the canonical "1XXXXXXXXXX" format —
  // the one shape every downstream consumer (Brevo, BulkVS) can rely on.
  // The schema's refine() above already guarantees this normalizes cleanly.
  // `name` is derived once here so every downstream consumer that just wants
  // a display name (email subject lines, etc.) doesn't need to know about
  // firstName/lastName.
  const lead = {
    ...rest,
    name: `${rest.firstName.trim()} ${rest.lastName.trim()}`.trim(),
    phone: normalizeUsPhoneToE164(rest.phone) as string,
  };

  // Persisting the lead is the one step that must succeed — a submission
  // should never be lost just because Brevo/BulkVS is unreachable or
  // misconfigured. Every notification below is best-effort follow-up.
  try {
    const payload = await getPayloadClient();
    await payload.create({
      collection: "leads",
      data: {
        firstName: rest.firstName,
        lastName: rest.lastName,
        email: rest.email,
        phone: lead.phone,
        timeInBusiness: rest.timeInBusiness,
        message: rest.message,
        source: rest.source,
      },
    });
  } catch (error) {
    console.error("Failed to save lead", error);
    return NextResponse.json(
      { error: "We couldn't save your request. Please try again or contact us directly." },
      { status: 502 },
    );
  }

  const followUps = await Promise.allSettled([
    sendLeadNotification(lead),
    addLeadToBrevoList(lead),
    sendWelcomeEmail(lead),
    sendWelcomeText(lead),
  ]);
  followUps.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Lead follow-up failed", result.reason);
    }
  });

  return NextResponse.json({ ok: true });
}
