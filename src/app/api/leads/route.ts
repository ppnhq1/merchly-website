import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addLeadToBrevoList, sendLeadNotification } from "@/lib/brevo";

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

  const { companyWebsite, ...lead } = parsed.data;
  if (companyWebsite) {
    // Silently accept bot submissions without processing them.
    return NextResponse.json({ ok: true });
  }

  try {
    await Promise.all([sendLeadNotification(lead), addLeadToBrevoList(lead)]);
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
