"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-mount gate to avoid a server/client hydration mismatch, per
    // next-themes' documented pattern — there's no external state to
    // synchronize here, just a one-time "are we on the client yet" flag.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="skeleton h-8 w-8 rounded-full shrink-0" aria-hidden="true" />
    );
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost btn-circle btn-sm"
        popoverTarget="theme-nav-menu"
        style={{ anchorName: "--theme-nav-menu" } as React.CSSProperties}
        aria-label="Change theme"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4.5 w-4.5" aria-hidden="true" />
        ) : (
          <Sun className="h-4.5 w-4.5" aria-hidden="true" />
        )}
      </button>
      <ul
        id="theme-nav-menu"
        popover="auto"
        className="dropdown dropdown-end menu menu-sm bg-base-100 rounded-box z-50 mt-3 w-40 p-2 shadow-lg border border-base-300"
        style={{ positionAnchor: "--theme-nav-menu" } as React.CSSProperties}
      >
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              className={theme === option.value ? "menu-active" : ""}
              onClick={() => setTheme(option.value)}
            >
              <option.icon className="h-4 w-4" aria-hidden="true" />
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
