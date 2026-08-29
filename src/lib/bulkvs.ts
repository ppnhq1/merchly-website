const BULKVS_API_URL =
  process.env.BULKVS_API_URL ?? "https://portal.bulkvs.com/api/v1.0";

type LeadPayload = {
  name: string;
  phone?: string;
};

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || "there";
}

// Sends a welcome text from Luis at Merchly confirming the lead's message
// was received and inviting them to call in anytime. Expects lead.phone to
// already be normalized to "1XXXXXXXXXX" (see src/lib/phone.ts) — the API
// route normalizes every lead before it reaches here.
export async function sendWelcomeText(lead: LeadPayload) {
  if (!lead.phone) return; // no phone on the form, nothing to text

  const authHeader = process.env.BULKVS_BASIC_AUTH;
  const fromNumber = process.env.BULKVS_FROM_NUMBER;
  if (!authHeader || !fromNumber) {
    throw new Error("BULKVS_BASIC_AUTH or BULKVS_FROM_NUMBER is not set");
  }

  const message =
    `Hi ${firstName(lead.name)}, this is Luis with Merchly! We got your ` +
    `message and we're excited to help get your business set up. Ready to ` +
    `move forward, or just have questions? Call us anytime at ` +
    `(804) 602-7461 — we're available 24/7 for support or to get you ` +
    `signed up.`;

  const response = await fetch(`${BULKVS_API_URL}/messageSend`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      From: fromNumber,
      To: [lead.phone],
      Message: message,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`BulkVS message send failed (${response.status}): ${body}`);
  }
}
