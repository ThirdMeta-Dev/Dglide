"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { motionEase } from "@/components/animations/MotionPrimitives";

/*
 * Why DGlide — Frequently Asked Questions (Figma node 1099:1567)
 * White rounded card (r30) · left: gradient heading + Q/A illustration · right: accordion.
 * Figma only provides answer copy for the open item ("How is DGlide different from
 * a custom build?"); the remaining answers can be injected via the `data` prop
 * (faq_<n>_a) once copy exists.
 */

const FAQS: { q: string; a: string | null }[] = [
  {
    q: "How is DGlide different from a low-code platform?",
    a: null,
  },
  {
    q: "How is DGlide different from a custom build?",
    a: "A custom build gives you exact fit, but with long timelines, high cost, and maintenance you own forever. DGlide gets you custom-level fit without becoming a software company. You get the fit, not the burden.",
  },
  {
    q: "Will it actually fit our workflow, or will we end up adjusting to the software like always?",
    a: null,
  },
  {
    q: "How fast can we go live?",
    a: null,
  },
  {
    q: "What happens when our process changes after go-live?",
    a: null,
  },
  {
    q: "Do we need a developer or an IT team to run it?",
    a: null,
  },
  {
    q: "What if we only need one solution, like field service, for now?",
    a: null,
  },
  {
    q: "Is DGlide an AI tool?",
    a: null,
  },
];

const DIVIDER = "linear-gradient(90deg, #E2E2E2 0%, #F3F3F3 100%)";

export default function WDFAQSection({ data }: { data?: Record<string, string> } = {}) {
  const sectionTitle = data?.title ?? "Frequently Asked Questions";
  const faqs = FAQS.map((faq, i) => ({
    q: data?.[`faq_${i + 1}_q`] ?? faq.q,
    a: data?.[`faq_${i + 1}_a`] ?? faq.a,
  }));
  // Figma shows item 2 ("How is DGlide different from a custom build?") open by default
  const [openIdx, setOpenIdx] = useState(1);

  function toggle(i: number) {
    setOpenIdx((prev) => (prev === i ? -1 : i));
  }

  return (
    <section style={{ width: "100%", padding: "0 16px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          className="wd-faq-cols"
          style={{
            display: "flex",
            gap: 64,
            padding: "0 48px",
            alignItems: "flex-start",
          }}
        >
          {/* Left: gradient heading + illustration */}
          <div className="wd-faq-left" style={{ flex: "0 0 360px" }}>
            <h2
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 44,
                fontWeight: 400,
                lineHeight: "58px",
                margin: 0,
                maxWidth: 360,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000000 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {sectionTitle}
            </h2>
            <Image
              className="wd-faq-illu"
              src="/why-dglide/faq/faq-illustration.png"
              alt="Questions flowing through a magnifying glass into an answer"
              width={267}
              height={379}
              style={{
                display: "block",
                marginTop: 101,
                marginLeft: 24,
                width: 267,
                height: 379,
              }}
            />
          </div>

          {/* Right: accordion */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              const isFirst = i === 0;
              const isLast = i === faqs.length - 1;
              const padTop = isFirst ? 0 : 22;
              const padBottom = isOpen && faq.a ? 8 : isLast ? 0 : 22;
              return (
                <motion.div
                  key={i}
                  layout="size"
                  animate={{ borderRadius: isOpen ? 25 : 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                >
                  {i > 0 && <div style={{ height: 1, background: DIVIDER }} />}
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: `${padTop}px 0 ${padBottom}px`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-tasa-orbiter)",
                        fontSize: isOpen ? 20 : 16,
                        fontWeight: isOpen ? 500 : 400,
                        lineHeight: isOpen ? "28px" : "26px",
                        color: isOpen ? "#FF7F1C" : "#000",
                        transition: "color 0.2s ease",
                        flex: 1,
                      }}
                    >
                      {faq.q}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {faq.a && isOpen ? (
                      <motion.div
                        style={{ overflow: "hidden" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: motionEase }}
                      >
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: 15,
                            fontWeight: 400,
                            lineHeight: "26px",
                            letterSpacing: 0.2,
                            color: "#555555",
                            margin: `0 0 ${isLast ? 0 : 22}px`,
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .wd-faq-cols {
            flex-direction: column !important;
            gap: 8px !important;
            padding: 32px 20px !important;
          }
          .wd-faq-left {
            flex: 0 0 auto !important;
            width: 100% !important;
          }
          .wd-faq-left h2 {
            font-size: 32px !important;
            line-height: 42px !important;
          }
          .wd-faq-illu {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
