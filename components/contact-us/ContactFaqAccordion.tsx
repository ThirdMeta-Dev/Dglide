"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { motionEase } from "@/components/animations/MotionPrimitives";

const contactFaqs = [
  {
    question: "How soon will I hear back after I reach out?",
    answer: "Your message is routed to the team that owns it, so you get a relevant reply instead of a generic handoff.",
  },
  {
    question: "Do I need to be ready to buy to book a demo?",
    answer: "No. Plenty of people book a walkthrough just to see if DGlide fits how they work. Bring your questions, not a budget. There's no pressure to decide.",
  },
  {
    question: "What happens in a walkthrough?",
    answer: "We walk through the workflow you care about, show how DGlide routes work across teams, and map the next step if it looks useful.",
  },
  {
    question: "How should I prepare for the call?",
    answer: "Bring the workflow that slows your team down today. A rough process, a current tool list, or a real example is enough.",
  },
  {
    question: "Is DGlide a fit for a business my size?",
    answer: "DGlide fits teams that coordinate work across people, stages, locations, or departments. The walkthrough is the fastest way to check fit.",
  },
  {
    question: "How much does DGlide cost?",
    answer: "Pricing depends on the workflow, users, and setup scope. The team will share the right commercial path after understanding your operation.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Your form details stay private and are used only to route your enquiry and prepare the right response.",
  },
  {
    question: "I'm already a customer and need help. Where do I go?",
    answer: "Use the customer support contact on this page or email support@dglide.com with your company name, issue type, and a short description.",
  },
];

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors"
      style={{ borderColor: open ? "#FF7F1C" : "#E0E0E0" }}
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10" stroke={open ? "#FF7F1C" : "#888888"} strokeWidth="1.5" strokeLinecap="round" />
        {!open ? <path d="M7 2v10" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" /> : null}
      </svg>
    </span>
  );
}

export default function ContactFaqAccordion() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <div className="flex flex-col">
      {contactFaqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `contact-faq-${index}`;

        return (
          <motion.div
            key={faq.question}
            layout="size"
            animate={{ borderRadius: isOpen ? 25 : 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {index > 0 ? <div className="h-px bg-gradient-to-r from-[#E2E2E2] to-[#F3F3F3]" /> : null}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              className="flex w-full items-start gap-4 border-0 bg-transparent px-0 py-[22px] text-left"
            >
              <span
                className="min-w-0 flex-1 text-base leading-[26px] transition-colors"
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontWeight: isOpen ? 500 : 400,
                  color: isOpen ? "#FF7F1C" : "#000000",
                }}
              >
                {faq.question}
              </span>
              <ToggleIcon open={isOpen} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: motionEase }}
                >
                  <p
                    className="m-0 pb-[22px] pr-0 text-[15px] leading-[26px] tracking-[0.0133em] text-[#555555] md:pr-12"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {faq.answer.split(" ").map((word, wordIndex) => (
                      <motion.span
                        key={`${word}-${wordIndex}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 28,
                          delay: 0.08 + wordIndex * 0.028,
                        }}
                      >
                        {word}
                        {wordIndex < faq.answer.split(" ").length - 1 ? "\u00a0" : ""}
                      </motion.span>
                    ))}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
      <div className="h-px bg-gradient-to-r from-[#E2E2E2] to-[#F3F3F3]" />
    </div>
  );
}
