const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

// reCAPTCHA v3 returns a 0.0–1.0 score; below this we treat the submission as bot traffic.
const MIN_SCORE = 0.5;

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

// Verifies a reCAPTCHA v3 token server-side. Returns true only if Google
// confirms the token, the action matches what the client requested, and the
// score clears the bot-traffic threshold.
export async function verifyRecaptcha(token: string | undefined, expectedAction: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    throw new Error("RECAPTCHA_SECRET_KEY is not set");
  }
  if (!token) return false;

  const response = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: secretKey, response: token }),
  });

  if (!response.ok) return false;

  const result = (await response.json()) as SiteVerifyResponse;
  const passed =
    result.success &&
    result.action === expectedAction &&
    (result.score ?? 0) >= MIN_SCORE;

  // Otherwise a rejection is a black box: was the token invalid/expired
  // (wrong domain registered for the site key, e.g. testing on localhost),
  // the action mismatched, or a genuinely low bot-likelihood score?
  if (!passed) {
    console.warn("reCAPTCHA verification did not pass", {
      success: result.success,
      action: result.action,
      expectedAction,
      score: result.score,
      errorCodes: result["error-codes"],
    });
  }

  return passed;
}
