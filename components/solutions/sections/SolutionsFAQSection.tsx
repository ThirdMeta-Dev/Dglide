"use client";

import { FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { faqItems } from "@/data/solutionsPageData";

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
            <h2 className="sol-faq-heading">{heading}</h2>

            <div className="sol-faq-list">
              {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={item.question} className="sol-faq-item">
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

                    {isOpen && item.answer && (
                      <p className="sol-faq-answer">{item.answer}</p>
                    )}

                    {index < items.length - 1 && (
                      <span className="sol-faq-divider" aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default SolutionsFAQSection;
