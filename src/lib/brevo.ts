const BREVO_API_URL = "https://api.brevo.com/v3";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  message?: string;
  source: string;
};

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
        ${lead.phone ? `<p><strong>Phone:</strong> ${lead.phone}</p>` : ""}
        ${lead.businessName ? `<p><strong>Business:</strong> ${lead.businessName}</p>` : ""}
        ${lead.message ? `<p><strong>Message:</strong> ${lead.message}</p>` : ""}
      `,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo email send failed (${response.status}): ${body}`);
  }
}

// Adds the lead as a contact to the configured Brevo list for follow-up nurture sequences.
export async function addLeadToBrevoList(lead: LeadPayload) {
  const listId = process.env.BREVO_LIST_ID;
  if (!listId) return; // list sync is optional

  const [firstName, ...rest] = lead.name.split(" ");

  const response = await fetch(`${BREVO_API_URL}/contacts`, {
    method: "POST",
    headers: brevoHeaders(),
    body: JSON.stringify({
      email: lead.email,
      listIds: [Number(listId)],
      updateEnabled: true,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: rest.join(" "),
        SMS: lead.phone,
        COMPANY: lead.businessName,
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Brevo contact sync failed (${response.status}): ${body}`);
  }
}
