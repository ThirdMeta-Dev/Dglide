"use client";

import { FunctionComponent, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { finalCtaEyebrow, finalCtaHeading } from "@/data/solutionsPageData";

const WAVE_RING_COUNT = 15;

const FinalCtaArrow: FunctionComponent = () => (
  <svg
    className="sol-final-cta-button-arrow"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M1.5 11.5L11.5 1.5"
      stroke="#1C2BFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11.5 1.5H4.5"
      stroke="#1C2BFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11.5 1.5V8.5"
      stroke="#1C2BFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

type SolutionsFinalCTAProps = {
  eyebrow?: string;
  heading?: string;
  buttonLabel?: string;
};

const SolutionsFinalCTA: FunctionComponent<SolutionsFinalCTAProps> = ({
  eyebrow = finalCtaEyebrow,
  heading = finalCtaHeading,
  buttonLabel = "Get A Free Demo!",
}) => {
  const router = useRouter();

  return (
    <section className="sol-section sol-final-cta-section">
      <SolutionsContainer>
        <div className="sol-final-cta-banner">
          <div className="sol-final-cta-waves" aria-hidden>
            {Array.from({ length: WAVE_RING_COUNT }, (_, index) => (
              <span
                key={index}
                className="sol-final-cta-wave-ring"
                style={{ "--wave-index": index } as CSSProperties}
              />
            ))}
          </div>

          <div className="sol-final-cta-content">
            <div className="sol-final-cta-copy">
              <div className="sol-final-cta-eyebrow">
                <span className="sol-final-cta-eyebrow-bar" aria-hidden />
                <span className="sol-final-cta-eyebrow-text">
                  {eyebrow}
                </span>
              </div>

              <h2 className="sol-final-cta-heading">{heading}</h2>
            </div>

            <button
              type="button"
              onClick={() => scrollToContact(router)}
              className="sol-final-cta-button"
            >
              <span>{buttonLabel}</span>
              <FinalCtaArrow />
            </button>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default SolutionsFinalCTA;
