"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type LeadModalContextValue = {
  isOpen: boolean;
  source: string;
  openLeadModal: (source: string) => void;
  closeLeadModal: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");

  const openLeadModal = useCallback((nextSource: string) => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, source, openLeadModal, closeLeadModal }),
    [isOpen, source, openLeadModal, closeLeadModal],
  );

  return (
    <LeadModalContext.Provider value={value}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
