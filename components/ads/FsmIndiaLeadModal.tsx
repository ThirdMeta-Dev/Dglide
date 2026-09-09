"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ContactDemoForm from "@/components/contact-us/ContactDemoForm";
import { FSM_INDIA_LEAD_MODAL_EVENT } from "@/lib/fsm-india-ads";

export default function FsmIndiaLeadModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(FSM_INDIA_LEAD_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(FSM_INDIA_LEAD_MODAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fsm-india-modal-title"
        className="relative max-h-[calc(100vh-32px)] w-full max-w-[720px] overflow-y-auto rounded-[24px] bg-white px-5 py-6 shadow-2xl sm:px-9 sm:py-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F3F3F3] text-[#222] transition hover:bg-[#E7E7E7] focus:outline-none focus:ring-2 focus:ring-[#1C2BFF]/30"
          aria-label="Close demo form"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-6 px-12 text-center">
          <p className="mb-2 text-sm font-medium text-[#FF7F1C] [font-family:var(--font-sora)]">
            Book a live DGlide walkthrough
          </p>
          <h2
            id="fsm-india-modal-title"
            className="m-0 text-[28px] font-normal leading-tight text-black sm:text-[36px]"
            style={{ fontFamily: "var(--font-tasa-orbiter)" }}
          >
            Tell us what&apos;s slowing you down
          </h2>
        </div>

        <ContactDemoForm formType="FSM India Ads" submitLabel="Book My Demo" />
      </div>
    </div>
  );
}
