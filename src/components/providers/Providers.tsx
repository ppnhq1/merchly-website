"use client";

import { ThemeProvider } from "next-themes";
import { LeadModalProvider } from "@/components/marketing/LeadModalContext";
import { LeadModal } from "@/components/marketing/LeadModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      themes={["merchly", "merchlydark"]}
      defaultTheme="system"
      enableSystem
    >
      <LeadModalProvider>
        {children}
        <LeadModal />
      </LeadModalProvider>
    </ThemeProvider>
  );
}
