import { ICON_OPTIONS } from "./icon-options";

// CMS records store an icon as a string (see icon-options.ts). This resolves
// that string to an Iconify icon id at render time (pass it to <Icon icon=.../>
// from @/components/ui/AppIcon), falling back to a generic icon if the
// stored name doesn't match a known option.
function toKebabCase(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])([0-9])/g, "$1-$2")
    .toLowerCase();
}

const knownIcons = new Set<string>(ICON_OPTIONS);

export function resolveIcon(name: string | null | undefined): string {
  const key = name && knownIcons.has(name) ? name : "Globe";
  return `lucide:${toKebabCase(key)}`;
}
