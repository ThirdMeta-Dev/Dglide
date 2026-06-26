"use client";

import { useState } from "react";
import styles from "./ThankYouPage.module.css";

/* ─────────────────────────────────────────────────────────────
   ThankYouFAQ
   Source Figma: nodes 1371:13787 + 1415:4243

   FAQ section layout (from Figma absoluteBoundingBox):
   - Outer frame: 1200px wide, transparent bg
   - Inner: horizontal layout, gap 64px
     - Left column: 360px wide — "Frequently Asked Questions" heading
     - Right column: 680px wide — accordion list, itemSpacing 22px

   "Frequently Asked Questions" text:
   - TASA Orbiter Regular 44px, lineHeight 54px
   - Gradient fill: #000 → #FF7F1C (right to left)

   FAQ items extracted from Figma nodes:
   1. "When will my demo happen?" (closed, fontSize 16 black)
      Expanded item: "What if none of the times worked for me?"
      - Question: TASA Orbiter Medium 20px, color #FF7F1C
      - Answer: Inter Regular 15px, lineHeight 26px, #555
      "No problem. Our team will reach out to find a time that fits
       your schedule. You don't have to chase us."

   2. "What happens in the demo?" (closed)
   3. "How should I prepare?" (closed)
   4. "Can I reschedule or cancel?" (closed)
   5. "Do I need to be ready to buy?" (closed)

   Separator lines: gradient #E2E2E2 → #F3F3F3, 1px, full width

   We populate answers for all questions using context from the page theme.
   Only the answer text for Q1 is directly visible in Figma (the expanded
   item shows it). The rest are collapsed in the design but we add answers
   from the page's intent.
   ───────────────────────────────────────────────────────────── */

type FAQItem = {
  q: string;
  a: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "When will my demo happen?",
    a: "You can pick a time slot directly using the scheduling link, or our team will reach out to you within one business day to set it up.",
  },
  {
    q: "What if none of the times worked for me?",
    a: "No problem. Our team will reach out to find a time that fits your schedule. You don't have to chase us.",
  },
  {
    q: "What happens in the demo?",
    a: "We start by understanding how your operation actually runs, then show you DGlide working on your real workflow — not a generic script. It usually runs about 30 minutes.",
  },
  {
    q: "How should I prepare?",
    a: "You don't need to prepare much. If you can share a brief description of your current workflow or biggest process pain points ahead of time, that helps us tailor the demo. Otherwise, just show up.",
  },
  {
    q: "Can I reschedule or cancel?",
    a: "Yes, absolutely. You can reschedule or cancel at any time using the link in your confirmation email. No friction.",
  },
  {
    q: "Do I need to be ready to buy?",
    a: "Not at all. The demo is just a look at what DGlide can do for your team. There's no pressure and no obligation. If it's not the right fit, we'll tell you that too.",
  },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThankYouFAQ() {
  // Default to first item open (matches Figma: "What if none of the times…" shown expanded)
  const [openIndex, setOpenIndex] = useState<number>(1);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqInner}>
        {/* ── Left: Heading ── */}
        <div className={styles.faqLeft}>
          <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
        </div>

        {/* ── Right: Accordion ── */}
        <div className={styles.faqRight} role="list">
          {/* Top divider */}
          <hr className={styles.faqDivider} />

          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className={styles.faqItem} role="listitem">
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span
                    className={`${styles.faqQuestionText} ${
                      isOpen ? styles.faqQuestionTextExpanded : ""
                    }`}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`${styles.faqChevron} ${
                      isOpen ? styles.faqChevronExpanded : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    className={styles.faqAnswer}
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                  >
                    {item.a}
                  </div>
                )}

                <hr className={styles.faqDivider} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
