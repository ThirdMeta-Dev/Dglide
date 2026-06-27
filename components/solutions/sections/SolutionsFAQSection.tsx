"use client";

import { FunctionComponent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { faqItems } from "@/data/solutionsPageData";
import { motionEase, ScrollReveal } from "@/components/animations/MotionPrimitives";

type FaqItem = {
  question: string;
  answer: string;
  open?: boolean;
};

type SolutionsFAQSectionProps = {
  items?: FaqItem[];
  defaultOpenIndex?: number;
  heading?: string;
};

const SolutionsFAQSection: FunctionComponent<SolutionsFAQSectionProps> = ({
  items = faqItems,
  defaultOpenIndex = 1,
  heading = "Frequently Asked questions",
}) => {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  return (
    <section className="sol-section sol-faq-section">
      <SolutionsContainer>
        <div className="sol-faq-panel">
          <span className="sol-faq-glow" aria-hidden />

          <div className="sol-faq-inner">
            <ScrollReveal direction="up">
              <h2 className="sol-faq-heading">{heading}</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
            <div className="sol-faq-list">
              {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={item.question}
                    className="sol-faq-item"
                    layout="size"
                    animate={{ borderRadius: isOpen ? 25 : 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className={`sol-faq-question${
                        isOpen ? " sol-faq-question--open" : ""
                      }`}
                      aria-expanded={isOpen}
                    >
                      {item.question}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && item.answer ? (
                        <motion.p
                          className="sol-faq-answer"
                          style={{ overflow: "hidden" }}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: motionEase }}
                        >
                          {item.answer}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    {index < items.length - 1 && (
                      <span className="sol-faq-divider" aria-hidden />
                    )}
                  </motion.div>
                );
              })}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default SolutionsFAQSection;
