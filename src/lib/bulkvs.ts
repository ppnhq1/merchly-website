const BULKVS_API_URL =
  process.env.BULKVS_API_URL ?? "https://portal.bulkvs.com/api/v1.0";

type LeadPayload = {
  firstName: string;
  phone: string;
};

// Sends a welcome text from Luis at Merchly confirming the lead's message
// was received and inviting them to call in anytime. Expects lead.phone to
// already be normalized to "1XXXXXXXXXX" (see src/lib/phone.ts) — the API
// route normalizes every lead before it reaches here. Phone is a required
// field on every lead form, so this always has a number to text.
export async function sendWelcomeText(lead: LeadPayload) {
  const authHeader = process.env.BULKVS_BASIC_AUTH;
  const fromNumber = process.env.BULKVS_FROM_NUMBER;
  if (!authHeader || !fromNumber) {
    throw new Error("BULKVS_BASIC_AUTH or BULKVS_FROM_NUMBER is not set");
  }

  const message =
    `Hi ${lead.firstName}, this is Luis with Merchly! We got your ` +
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
