"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserLeadSource } from "@/lib/lead-source";

type FieldName = "name" | "email" | "contact" | "company" | "message";
type FormState = Record<FieldName, string>;
type FieldErrors = Partial<Record<FieldName, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  contact: "",
  company: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^[+\d\s().-]+$/;

function validate(values: FormState) {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const contact = values.contact.trim();
  const company = values.company.trim();
  const message = values.message.trim();
  const digitCount = contact.replace(/\D/g, "").length;

  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 100) errors.name = "Name must be 100 characters or less.";

  if (!email) errors.email = "Email ID is required.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";

  if (!contact) errors.contact = "Contact number is required.";
  else if (!PHONE_CHARS_RE.test(contact) || digitCount < 7 || digitCount > 15) {
    errors.contact = "Enter a valid contact number.";
  }

  if (!company) errors.company = "Company name is required.";
  else if (company.length < 2) errors.company = "Company name must be at least 2 characters.";
  else if (company.length > 140) errors.company = "Company name must be 140 characters or less.";

  if (message.length > 1000) errors.message = "Message must be 1000 characters or less.";

  return errors;
}

function fieldClass(hasError: boolean, extra = "") {
  return [
    "w-full rounded-lg bg-[#F3F3F3] px-3 py-2.5 text-[13px] font-medium leading-[160%] text-[#222222] outline-none transition",
    "placeholder:text-[#555555] focus:ring-2 focus:ring-[#1C2BFF]/20",
    hasError ? "ring-1 ring-[#D92D20]" : "ring-0",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;

  return (
    <p className="mt-1 text-xs leading-4 text-[#D92D20]" style={{ fontFamily: "var(--font-inter)" }}>
      {error}
    </p>
  );
}

export default function ContactDemoForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [statusError, setStatusError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasErrors = useMemo(() => Object.keys(fieldErrors).length > 0, [fieldErrors]);

  function updateField(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusError("");

    const nextErrors = validate(form);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...getBrowserLeadSource() }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (!response.ok) {
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        throw new Error(result.error || "Failed to submit");
      }

      setSubmitted(true);
      setForm(initialForm);
      router.push("/thank-you");
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center gap-5 text-center">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FF7F1C]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 13l4 4L19 7" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2
          className="m-0 text-[28px] leading-9 text-black"
          style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
        >
          Message Sent
        </h2>
        <p className="m-0 max-w-[360px] text-base leading-7 text-[#6F7276]" style={{ fontFamily: "var(--font-inter)" }}>
          We&apos;ll route your message to the right DGlide team and get back with a clear next step.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="rounded-full border border-[#141FB5] px-6 py-3 text-sm text-[#141FB5] cursor-pointer"
          style={{ fontFamily: "var(--font-sora)", transition: "background 0.22s ease, color 0.22s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#141FB5"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#141FB5"; }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-[78px] overflow-hidden rounded-full border border-[#F3F3F3]">
          <Image src="/contact-us/demo-guide.png" alt="DGlide guide" fill sizes="78px" className="object-cover object-top" />
        </div>
        <div className="relative w-full rounded-xl bg-[#F3F3F3] px-7 py-4 text-center">
          <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 rounded-sm bg-[#F3F3F3]" />
          <p className="relative m-0 text-[15px] leading-6 text-[#222222]" style={{ fontFamily: "var(--font-inter)" }}>
            &quot;Hi, I&apos;m Vinayak from DGlide. Answer a couple of quick questions, and I&apos;ll tailor your demo.&quot;
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div>
          <label className="sr-only" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={fieldClass(Boolean(fieldErrors.name))}
            placeholder="Name *"
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          <div id="contact-name-error">
            <FieldError error={fieldErrors.name} />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="sr-only" htmlFor="contact-email">
              Email ID
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={fieldClass(Boolean(fieldErrors.email))}
              placeholder="Email ID *"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            />
            <div id="contact-email-error">
              <FieldError error={fieldErrors.email} />
            </div>
          </div>
          <div>
            <label className="sr-only" htmlFor="contact-phone">
              Contact No.
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="contact"
              value={form.contact}
              onChange={(event) => updateField("contact", event.target.value)}
              className={fieldClass(Boolean(fieldErrors.contact))}
              placeholder="Contact No. *"
              autoComplete="tel"
              aria-invalid={Boolean(fieldErrors.contact)}
              aria-describedby={fieldErrors.contact ? "contact-phone-error" : undefined}
            />
            <div id="contact-phone-error">
              <FieldError error={fieldErrors.contact} />
            </div>
          </div>
        </div>

        <div>
          <label className="sr-only" htmlFor="contact-company">
            Your company name
          </label>
          <input
            id="contact-company"
            name="company"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            className={fieldClass(Boolean(fieldErrors.company))}
            placeholder="Your company name *"
            autoComplete="organization"
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "contact-company-error" : undefined}
          />
          <div id="contact-company-error">
            <FieldError error={fieldErrors.company} />
          </div>
        </div>

        <div>
          <label className="sr-only" htmlFor="contact-message">
            Tell us how we can help
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={fieldClass(Boolean(fieldErrors.message), "min-h-[100px] resize-none")}
            placeholder="Tell us how we can help"
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          />
          <div id="contact-message-error">
            <FieldError error={fieldErrors.message} />
          </div>
        </div>
      </div>

      {statusError && !hasErrors ? (
        <p className="m-0 text-sm leading-5 text-[#D92D20]" style={{ fontFamily: "var(--font-inter)" }}>
          {statusError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-fit self-center items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        style={{
          fontFamily: "var(--font-sora)",
          background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background 0.22s ease",
        }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(273deg, #0b148c 4.29%, #141fb5 95.71%)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)"; }}
      >
        {loading ? "Submitting..." : "Get the full story"}
        {!loading ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-rotate-45"
          >
            <path d="M3 9h12M10 4l5 5-5 5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </button>
    </form>
  );
}
