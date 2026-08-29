"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { LeadForm } from "@/components/marketing/LeadForm";
import { useLeadModal } from "@/components/marketing/LeadModalContext";

export function LeadModal() {
  const { isOpen, source, closeLeadModal } = useLeadModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={closeLeadModal}
      onCancel={closeLeadModal}
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            type="submit"
            aria-label="Close"
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
        <span className="badge badge-soft badge-primary badge-sm">
          Free, no obligation
        </span>
        <h3 className="font-heading font-bold text-2xl mt-2">
          Get your free quote
        </h3>
        <p className="text-sm text-base-content/70 mt-1">
          Tell us a bit about your business and a Merchly specialist will
          follow up within one business day.
        </p>
        <div className="mt-6">
          {isOpen && <LeadForm source={source} showMessage={false} />}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
}
