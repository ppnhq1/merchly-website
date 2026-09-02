// Shared between the hero lead form (client) and the /api/leads route
// (server) so the option values can't drift apart between the two.
export const TIME_IN_BUSINESS_OPTIONS = [
  { value: "startup", label: "Startup" },
  { value: "6-months", label: "6+ months" },
  { value: "1-year", label: "1 year" },
  { value: "2-years", label: "2 years" },
  { value: "3-plus-years", label: "3+ years" },
] as const;

export const TIME_IN_BUSINESS_VALUES = TIME_IN_BUSINESS_OPTIONS.map(
  (option) => option.value,
) as [string, ...string[]];
