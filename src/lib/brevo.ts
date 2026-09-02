import { TIME_IN_BUSINESS_OPTIONS } from "@/lib/time-in-business";

const BREVO_API_URL = "https://api.brevo.com/v3";

type LeadPayload = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  timeInBusiness: string;
  source: string;
};

function timeInBusinessLabel(value: string | undefined) {
  return TIME_IN_BUSINESS_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function brevoHeaders() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not set");
  }
  return {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

// Notifies the internal team by email whenever a lead form is submitted.
export async function sendLeadNotification(lead: LeadPayload) {
  const toEmail = process.env.BREVO_NOTIFY_TO_EMAIL;
  const fromEmail = process.env.BREVO_SENDER_EMAIL;
  if (!toEmail || !fromEmail) {
    throw new Error("BREVO_NOTIFY_TO_EMAIL or BREVO_SENDER_EMAIL is not set");
  }

  const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: brevoHeaders(),
    body: JSON.stringify({
      sender: { email: fromEmail, name: "Merchly Website" },
      to: [{ email: toEmail }],
      subject: `New lead: ${lead.name} (${lead.source})`,
      htmlContent: `
        <h2>New website lead</h2>
        <p><strong>Source:</strong> ${lead.source}</p>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Time in business:</strong> ${timeInBusinessLabel(lead.timeInBusiness)}</p>
        ${lead.message ? `<p><strong>Message:</strong> ${lead.message}</p>` : ""}
      `,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo email send failed (${response.status}): ${body}`);
  }
}

const onboardingSteps = [
  { label: "Apply", detail: "5-minute application, no cost to submit" },
  { label: "Get approved", detail: "Underwriting in as little as 24 hours" },
  {
    label: "Start accepting payments",
    detail: "Terminal or gateway shipped and configured",
  },
];

const whatToHave = [
  "Your most recent processing statement, if you're switching from another provider",
  "Basic business info: legal name, EIN, and ownership details",
  "A rough estimate of your average monthly card volume",
];

const faqs = [
  {
    question: "How fast is approval?",
    answer:
      "Most standard-risk applications are approved within 24 hours. High-risk categories typically take 2–5 business days for underwriting review.",
  },
  {
    question: "Is there a contract or early termination fee?",
    answer:
      "We offer month-to-month terms with no early termination fee. Your rate and terms are detailed before you sign anything.",
  },
  {
    question: "How does funding speed work?",
    answer:
      "Standard funding lands in your account in 1–2 business days. Next-day and same-day funding are available for qualifying merchants.",
  },
];

export function buildWelcomeEmailHtml(lead: LeadPayload) {
  const stepsHtml = onboardingSteps
    .map(
      (step, index) => `
        <tr>
          <td style="padding:0 0 20px;vertical-align:top;width:36px;">
            <div style="width:28px;height:28px;border-radius:9999px;background:#e9fdf1;color:#06301c;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:28px;text-align:center;">${
              index + 1
            }</div>
          </td>
          <td style="padding:0 0 20px 12px;vertical-align:top;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#111827;">${
              step.label
            }</p>
            <p style="margin:2px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b7280;">${
              step.detail
            }</p>
          </td>
        </tr>`,
    )
    .join("");

  const whatToHaveHtml = whatToHave
    .map(
      (item) => `
        <tr>
          <td style="padding:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#374151;line-height:1.5;">• ${item}</td>
        </tr>`,
    )
    .join("");

  const faqHtml = faqs
    .map(
      (faq) => `
        <tr>
          <td style="padding:0 0 18px;">
            <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#111827;">${
              faq.question
            }</p>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b7280;line-height:1.5;">${
              faq.answer
            }</p>
          </td>
        </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to Merchly</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f5f7;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      Welcome to Merchly — here's what happens next, plus a few FAQs.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid #e5e7eb;">
                <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;color:#111827;">merchly</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#059669;">
                  You're in
                </p>
                <h1 style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.3;color:#111827;">
                  Welcome to Merchly, ${lead.firstName}.
                </h1>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#374151;">
                  Thanks for reaching out. A Merchly specialist will follow up within
                  one business day, but here's exactly what to expect in the
                  meantime — no surprises, same as our rates.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 8px;">
                <h2 style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#111827;">What happens next</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${stepsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#111827;">
                        To speed things up, have these ready
                      </p>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${whatToHaveHtml}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;" align="center">
                <a href="tel:+18046027461" style="display:inline-block;background:#05df72;color:#06301c;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:14px 28px;border-radius:9999px;">
                  Call us: (804) 602-7461
                </a>
                <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7280;">
                  We're available 24/7 — questions, support, or ready to sign up.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;border-top:1px solid #e5e7eb;padding-top:28px;">
                <h2 style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#111827;">A few questions we hear a lot</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${faqHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#9ca3af;line-height:1.6;">
                  Merchly — Financial tools for modern business.<br />
                  You're receiving this because you requested a quote at merchly.io.
                  Reply to this email anytime — a real person reads every message.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Sends the customer-facing welcome email after a lead submits the form —
// next steps, what to have ready, and answers to common questions.
export async function sendWelcomeEmail(lead: LeadPayload) {
  const fromEmail = process.env.BREVO_SENDER_EMAIL;
  if (!fromEmail) {
    throw new Error("BREVO_SENDER_EMAIL is not set");
  }

  const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: brevoHeaders(),
    body: JSON.stringify({
      sender: { email: fromEmail, name: "Merchly" },
      to: [{ email: lead.email, name: lead.name }],
      subject: "Welcome to Merchly — here's what happens next",
      htmlContent: buildWelcomeEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo welcome email failed (${response.status}): ${body}`);
  }
}

// Adds the lead as a contact to the configured Brevo list for follow-up nurture sequences.
export async function addLeadToBrevoList(lead: LeadPayload) {
  const listId = process.env.BREVO_LIST_ID;
  if (!listId) return; // list sync is optional

  const response = await fetch(`${BREVO_API_URL}/contacts`, {
    method: "POST",
    headers: brevoHeaders(),
    body: JSON.stringify({
      email: lead.email,
      listIds: [Number(listId)],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: lead.firstName,
        LASTNAME: lead.lastName,
        SMS: lead.phone,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo contact sync failed (${response.status}): ${body}`);
  }
}
