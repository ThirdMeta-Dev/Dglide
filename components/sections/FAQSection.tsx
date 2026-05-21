"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What can I expect from the demo?",
    a: "You'll get a live walkthrough of DGlide built around your specific operation — not a generic product tour. We'll show you exactly how your workflows, stages, and team fit inside the system.",
  },
  {
    q: "How long does the demo take?",
    a: "The demo runs about 30 minutes. We keep it focused on your operation, so you see what matters without a long, generic tour.",
  },
  {
    q: "Do I have to commit to anything?",
    a: "Not at all. The demo is completely free and carries no obligation. It's a chance to see whether DGlide fits before you make any decisions.",
  },
  {
    q: "Does DGlide work for an operation like mine?",
    a: "DGlide is built for field service operations, manufacturing, growing SMBs, and internal operations teams. If you run coordinated work across people, locations, or stages, it's likely a fit — that's exactly what we'll confirm in the demo.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: `1.5px solid ${open ? "#FF7F1C" : "#E0E0E0"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 0.2s",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7H12" stroke={open ? "#FF7F1C" : "#888"} strokeWidth="1.5" strokeLinecap="round" />
        {!open && (
          <path d="M7 2V12" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}

export default function FAQSection({ data }: { data?: Record<string, string> } = {}) {
  const sectionTitle = data?.title ?? "Frequently Asked questions";
  const faqs = FAQS.map((faq, i) => ({
    q: data?.[`faq_${i + 1}_q`] ?? faq.q,
    a: data?.[`faq_${i + 1}_a`] ?? faq.a,
  }));
  const [openIdx, setOpenIdx] = useState(1);

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? -1 : i));
  }

  return (
    <section
      style={{
        width: "100%",
        background: "transparent",
        padding: "80px 0 96px",
      }}
    >
      <div
        className="faq-cols"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          gap: 64,
          alignItems: "flex-start",
        }}
      >
        {/* Left: title */}
        <div className="faq-left" style={{ flex: "0 0 380px", paddingTop: 8 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <h2
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 44,
                fontWeight: 400,
                lineHeight: "54px",
                color: "#000",
                margin: 0,
              }}
            >
              {sectionTitle}
            </h2>
            <h2
              aria-hidden
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 44,
                fontWeight: 400,
                lineHeight: "54px",
                margin: 0,
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000 40%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
              }}
            >
              {sectionTitle}
            </h2>
          </div>
        </div>

        {/* Right: accordion */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i}>
                {i > 0 && <div style={{ height: 1, background: "#F0F0F0" }} />}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "22px 0",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-tasa-orbiter)",
                      fontSize: isOpen ? 18 : 16,
                      fontWeight: isOpen ? 500 : 400,
                      lineHeight: "26px",
                      color: isOpen ? "#FF7F1C" : "#000",
                      transition: "all 0.2s ease",
                      flex: 1,
                    }}
                  >
                    {faq.q}
                  </span>
                  <PlusIcon open={isOpen} />
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 200 : 0,
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      fontWeight: 400,
                      lineHeight: "25px",
                      color: "#545454",
                      margin: "0 0 24px",
                      paddingRight: 48,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
          <div style={{ height: 1, background: "#F0F0F0" }} />
        </div>
      </div>
    </section>
  );
}
