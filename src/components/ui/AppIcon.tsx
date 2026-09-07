"use client";

import { Icon as IconifyIcon, addCollection, type IconProps } from "@iconify/react";
import iconSet from "@/lib/icon-set.json";

// Icons are bundled locally (see src/lib/icon-set.json, generated from
// @iconify-json/lucide) rather than fetched from Iconify's API at runtime —
// this keeps icon rendering synchronous (no flash-of-missing-icon on first
// paint) and avoids a third-party network dependency in production.
addCollection(iconSet);

export function Icon(props: Omit<IconProps, "ssr">) {
  return <IconifyIcon ssr {...props} />;
}
