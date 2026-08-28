"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const options = [
  { value: "merchly", label: "Light" },
  { value: "merchlydark", label: "Dark" },
  { value: "system", label: "System" },
] as const;

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

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
    return <div className="btn btn-ghost btn-circle" aria-hidden="true" />;
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="Change theme"
      >
        {resolvedTheme === "merchlydark" ? <MoonIcon /> : <SunIcon />}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-40 p-2 shadow border border-base-300"
      >
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              className={theme === option.value ? "active" : ""}
              onClick={() => setTheme(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
