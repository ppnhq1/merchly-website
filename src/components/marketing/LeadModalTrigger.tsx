"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useLeadModal } from "@/components/marketing/LeadModalContext";

type LeadModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  source: string;
  children: ReactNode;
};

export function LeadModalTrigger({
  source,
  children,
  ...buttonProps
}: LeadModalTriggerProps) {
  const { openLeadModal } = useLeadModal();

  return (
    <button type="button" onClick={() => openLeadModal(source)} {...buttonProps}>
      {children}
    </button>
  );
}
