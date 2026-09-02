declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const LEAD_RECAPTCHA_ACTION = "lead_form";

export function getRecaptchaToken(
  action: string = LEAD_RECAPTCHA_ACTION,
): Promise<string | undefined> {
  return new Promise((resolve) => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) {
      resolve(undefined);
      return;
    }
    window.grecaptcha.ready(() => {
      window
        .grecaptcha!.execute(siteKey, { action })
        .then(resolve)
        .catch(() => resolve(undefined));
    });
  });
}
