"use client";

import { useEffect, useState } from "react";
import { getBrowserLeadSource } from "@/lib/lead-source";
import type { CaseStudy } from "@/lib/case-studies-db";
import styles from "@/app/(public)/case-studies/CaseStudiesPage.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^[+\d\s().-]+$/;

function validateLead(form: { name: string; email: string; phone: string }) {
  const errors: Record<string, string> = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();
  const digitCount = phone.replace(/\D/g, "").length;

  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or less.";

  if (!email) errors.email = "Email ID is required.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!PHONE_CHARS_RE.test(phone) || digitCount < 7 || digitCount > 15)
    errors.phone = "Enter a valid phone number.";

  return errors;
}

function BulletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" stroke="#FF7F1C" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 3v6h-6" stroke="#FF7F1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none" aria-hidden>
      <path d="M1.00003 8.09393C0.447744 8.09394 1.60277e-05 8.54167 5.96046e-08 9.09395C-1.59085e-05 9.64624 0.447686 10.0939 0.999971 10.0939L1 9.09393L1.00003 8.09393ZM15.1442 10.0935C15.6964 10.0935 16.1442 9.64577 16.1442 9.09349C16.1442 8.5412 15.6965 8.0935 15.1442 8.09352L15.1442 9.09352L15.1442 10.0935ZM1 9.09393L0.999971 10.0939L15.1442 10.0935L15.1442 9.09352L15.1442 8.09352L1.00003 8.09393L1 9.09393Z" fill="currentColor" />
      <path d="M10.3983 12.4279C10.0077 12.8184 10.0077 13.4516 10.3982 13.8421C10.7887 14.2326 11.4219 14.2326 11.8124 13.8421L11.1054 13.135L10.3983 12.4279ZM15.8538 9.80074C16.2443 9.41021 16.2443 8.77704 15.8538 8.38653C15.4633 7.99602 14.8301 7.99603 14.4396 8.38657L15.1467 9.09366L15.8538 9.80074ZM11.1054 13.135L11.8124 13.8421L15.8538 9.80074L15.1467 9.09366L14.4396 8.38657L10.3983 12.4279L11.1054 13.135Z" fill="currentColor" />
      <path d="M11.8087 4.34188C11.4182 3.95137 10.785 3.95139 10.3945 4.34192C10.0039 4.73246 10.0039 5.36562 10.3944 5.75613L11.1016 5.04901L11.8087 4.34188ZM14.4355 9.79721C14.826 10.1877 15.4592 10.1877 15.8497 9.79717C16.2403 9.40664 16.2403 8.77347 15.8498 8.38296L15.1426 9.09009L14.4355 9.79721ZM11.1016 5.04901L10.3944 5.75613L14.4355 9.79721L15.1426 9.09009L15.8498 8.38296L11.8087 4.34188L11.1016 5.04901Z" fill="currentColor" />
    </svg>
  );
}

export default function CaseStudyDownloadModal({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function setField(key: "name" | "email" | "phone", value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) setFieldErrors((fe) => ({ ...fe, [key]: "" }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const clientErrors = validateLead(form);
    if (Object.values(clientErrors).some(Boolean)) {
      setFieldErrors(clientErrors);
      return;
    }
    setBusy(true);
    setError("");
    setFieldErrors({});
    try {
      const res = await fetch("/api/case-studies/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseStudyId: study.id, ...form, ...getBrowserLeadSource() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFieldErrors(data?.fieldErrors || {});
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Download case study">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">×</button>
        {sent ? (
          <div className={styles.modalSuccess}>
            <span aria-hidden>✓</span>
            <h3>Check your inbox</h3>
            <p>We&apos;ve emailed <strong>{study.title}</strong> to {form.email}. It can take a couple of minutes to arrive.</p>
            <button type="button" className={styles.downloadBtn} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h3 className={styles.modalTitle}>Get the full case study in your inbox</h3>
            <ul className={styles.modalBullets}>
              <li><BulletIcon /> The full story, real numbers included</li>
              <li><BulletIcon /> Sent straight to your email as a PDF</li>
            </ul>
            <form onSubmit={submit} noValidate>
              <div className={styles.modalField}>
                <input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Name *"
                  aria-label="Name"
                  autoComplete="name"
                  className={fieldErrors.name ? styles.inputInvalid : ""}
                  required
                />
                {fieldErrors.name && <em>{fieldErrors.name}</em>}
              </div>
              <div className={styles.modalField}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="Email ID *"
                  aria-label="Email ID"
                  autoComplete="email"
                  className={fieldErrors.email ? styles.inputInvalid : ""}
                  required
                />
                {fieldErrors.email && <em>{fieldErrors.email}</em>}
              </div>
              <div className={styles.modalField}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="Phone Number *"
                  aria-label="Phone Number"
                  autoComplete="tel"
                  className={fieldErrors.phone ? styles.inputInvalid : ""}
                  required
                />
                {fieldErrors.phone && <em>{fieldErrors.phone}</em>}
              </div>
              {error && <p className={styles.modalError}>{error}</p>}
              <button type="submit" className={styles.downloadBtn} disabled={busy}>
                {busy ? "Sending…" : "Get the full story"} {!busy && <ArrowIcon />}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
