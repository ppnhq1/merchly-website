export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type SectionAnchor = { heading: string; anchor: string };

// Computes anchors for a list of headings in a single pass, so every
// consumer (TOC links, heading ids) uses the exact same anchor for the same
// section instead of two independent slugify calls drifting apart.
// Disambiguates duplicate/colliding slugs by appending -2, -3, etc.
export function buildSectionAnchors(headings: string[]): SectionAnchor[] {
  const seen = new Map<string, number>();
  return headings.map((heading) => {
    const base = slugify(heading) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const anchor = count === 0 ? base : `${base}-${count + 1}`;
    return { heading, anchor };
  });
}
