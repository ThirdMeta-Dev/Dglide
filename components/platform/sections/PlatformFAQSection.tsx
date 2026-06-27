"use client";

import { FunctionComponent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const FAQ_ITEMS = [
  {
    question: "What is the DGlide platform?",
    answer:
      "A configurable operations platform. It gives you ready-to-run systems for field service, sales, and operations on one shared backbone, then adapts them to how you work.",
  },
  {
    question: "Is DGlide a low-code platform?",
    answer:
      "No. You don't get a blank canvas to build. You start on a working system and configure it, without code or a dev team.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Weeks, not months. You start on a ready system and configure from there, instead of building from scratch.",
  },
  {
    question: "Can DGlide work with the tools we already use?",
    answer:
      "Yes. It connects to your CRM, ERP, and other systems through APIs, so you don't replace everything at once.",
  },
  {
    question: "What happens when our processes change?",
    answer:
      "The system is reconfigured to match, with no rebuild. That continuous adaptation is the Living Service Model.",
  },
  {
    question: "Do we need a technical team to run it?",
    answer:
      "No. DGlide is configured for you and maintained around your operation. You run it, not build it.",
  },
];

const AUTO_DURATION = 5000;

const PlatformFAQSection: FunctionComponent = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const advance = (fromIndex: number) => {
    setOpenIndex((fromIndex + 1) % FAQ_ITEMS.length);
  };

  useEffect(() => {
    setProgress(0);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / AUTO_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        advance(openIndex);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [openIndex]);

  const handleClick = (index: number) => {
    setOpenIndex(index);
    setProgress(0);
    startRef.current = performance.now();
  };

  return (
    <section className="sol-section sol-plat-faq-section">
      <SolutionsContainer>
        <div className="sol-plat-faq-inner">
          {/* Left: image + heading */}
          <div className="sol-plat-faq-left">
            <ScrollReveal direction="left">
              <h2 className="sol-plat-faq-heading">Frequently Asked Questions</h2>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.1}>
              <div className="sol-plat-faq-image-wrap">
                <Image
                  src="/platform/faq-illustration.png"
                  alt="FAQ illustration"
                  width={267}
                  height={379}
                  className="sol-plat-faq-image"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right: accordion */}
          <ScrollReveal direction="right">
          <div className="sol-plat-faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className={`sol-plat-faq-item${isOpen ? " sol-plat-faq-item--open" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  <button
                    type="button"
                    className="sol-plat-faq-question"
                    aria-expanded={isOpen}
                  >
                    {item.question}
                  </button>

                  {isOpen && (
                    <p className="sol-plat-faq-answer">{item.answer}</p>
                  )}

                  <span className="sol-plat-faq-divider" aria-hidden />
                </div>
              );
            })}
          </div>
          </ScrollReveal>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformFAQSection;
