import * as LucideIcons from "lucide-react";
import { Globe, type LucideIcon } from "lucide-react";

const iconRegistry = LucideIcons as unknown as Record<string, LucideIcon>;

// CMS records store an icon as a string (see icon-options.ts). This resolves
// that string to the actual component at render time, falling back to a
// generic icon if the stored name doesn't match a known export.
export function resolveIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Globe;
  return iconRegistry[name] ?? Globe;
}
