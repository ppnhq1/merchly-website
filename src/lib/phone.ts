// Live-formats a US phone number as the user types, e.g. "5555550100" ->
// "(555) 555-0100". Tolerates a pasted leading "+1"/"1" country code.
export function formatUsPhoneInput(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// Normalizes a US phone number to the "1XXXXXXXXXX" format used for storage
// and required by the BulkVS messaging API. Returns null for anything that
// isn't a valid 10-digit US number (with or without a leading country code).
export function normalizeUsPhoneToE164(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return digits;
  return null;
}
