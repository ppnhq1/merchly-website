// Shared icon library for every "icon" select field across the CMS
// collections below. Keeping one list means every collection's icon picker
// offers the same options, and the frontend can resolve any of them through
// a single lookup (see resolve-icon.ts).
export const ICON_OPTIONS = [
  "UtensilsCrossed",
  "ShoppingBag",
  "Globe",
  "Globe2",
  "HeartPulse",
  "Dumbbell",
  "Hammer",
  "Briefcase",
  "Car",
  "BedDouble",
  "HandHeart",
  "ShieldAlert",
  "Leaf",
  "Pill",
  "Lock",
  "Cigarette",
  "Crosshair",
  "Repeat",
  "Repeat2",
  "Plane",
  "Dices",
  "Landmark",
  "Store",
  "Smartphone",
  "Phone",
  "FileText",
  "ShoppingCart",
  "Package",
  "Boxes",
  "Calculator",
  "Receipt",
  "Plug",
  "BookOpen",
  "GitCompareArrows",
] as const;

export type IconName = (typeof ICON_OPTIONS)[number];
