// Regenerates src/lib/icon-set.json — a minimal Iconify collection
// containing only the Lucide icons this site actually uses, extracted from
// @iconify-json/lucide. Bundling just these icons (instead of using
// Iconify's runtime API or shipping the full ~1600-icon set) keeps icon
// rendering synchronous and offline (see src/components/ui/AppIcon.tsx).
//
// Run after adding a new icon name to src/lib/icon-options.ts or a new
// <Icon icon="lucide:..."> call site:
//   node scripts/generate-icon-set.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { getIconData } from "@iconify/utils";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

const iconNames = [
  // Used directly in JSX across the site
  "activity-square",
  "arrow-left",
  "arrow-right",
  "arrow-up-right",
  "book-open",
  "building-2",
  "calendar-clock",
  "check",
  "check-circle-2",
  "circle-dollar-sign",
  "circle-help",
  "clock",
  "eye-off",
  "git-compare-arrows",
  "hand-coins",
  "headset",
  "info",
  "landmark",
  "mail",
  "menu",
  "monitor",
  "moon",
  "newspaper",
  "percent",
  "phone",
  "phone-call",
  "quote",
  "receipt",
  "shield-check",
  "sliders-horizontal",
  "store",
  "sun",
  "user",
  "users",
  "x",
  "zap",
  // CMS-selectable icons (see src/lib/icon-options.ts) resolved at runtime
  "utensils-crossed",
  "shopping-bag",
  "globe",
  "globe-2",
  "heart-pulse",
  "dumbbell",
  "hammer",
  "briefcase",
  "car",
  "bed-double",
  "hand-heart",
  "shield-alert",
  "leaf",
  "pill",
  "lock",
  "cigarette",
  "crosshair",
  "repeat",
  "repeat-2",
  "plane",
  "dices",
  "smartphone",
  "file-text",
  "shopping-cart",
  "package",
  "boxes",
  "calculator",
  "plug",
];

const fullSet = JSON.parse(
  readFileSync(`${projectRoot}node_modules/@iconify-json/lucide/icons.json`),
);

const icons = {};
const missing = [];
for (const name of new Set(iconNames)) {
  const data = getIconData(fullSet, name);
  if (!data) {
    missing.push(name);
    continue;
  }
  icons[name] = data;
}

if (missing.length) {
  console.error("Missing icons:", missing);
  process.exit(1);
}

const output = {
  prefix: "lucide",
  icons,
  width: fullSet.width,
  height: fullSet.height,
};

writeFileSync(`${projectRoot}src/lib/icon-set.json`, JSON.stringify(output));

console.log(`Wrote ${Object.keys(icons).length} icons to src/lib/icon-set.json`);
