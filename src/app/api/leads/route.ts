import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  addLeadToBrevoList,
  sendLeadNotification,
  sendWelcomeEmail,
} from "@/lib/brevo";
import { sendWelcomeText } from "@/lib/bulkvs";
import { normalizeUsPhoneToE164 } from "@/lib/phone";

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().max(50).optional(),
  businessName: z.string().max(200).optional(),
  businessType: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
  source: z.string().min(1).max(100),
  // Honeypot field: real users never fill this in.
  companyWebsite: z.string().max(0).optional(),
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

  const { companyWebsite, ...rest } = parsed.data;
  if (companyWebsite) {
    // Silently accept bot submissions without processing them.
    return NextResponse.json({ ok: true });
  }

  // Store and forward phone numbers in the canonical "1XXXXXXXXXX" format —
  // the one shape every downstream consumer (Brevo, BulkVS) can rely on.
  // An unparseable number is dropped rather than blocking the submission,
  // since phone is optional.
  const lead = {
    ...rest,
    phone: rest.phone ? (normalizeUsPhoneToE164(rest.phone) ?? undefined) : undefined,
  };

  try {
    // The internal team notification is the one step that must succeed —
    // everything else is a best-effort follow-up to the lead themselves.
    await sendLeadNotification(lead);
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  const followUps = await Promise.allSettled([
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
