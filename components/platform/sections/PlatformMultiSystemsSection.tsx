"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformMultiSystemsCards,
  platformMultiSystemsDescription,
  platformMultiSystemsHeading,
} from "@/data/platformPageData";

const ExploreArrow: FunctionComponent = () => (
  <svg viewBox="0 0 13 13" width={12} height={12} fill="none" aria-hidden>
    <path d="M1.5 11.5L11.5 1.5" stroke="#1C2BFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M11.5 1.5H4.5" stroke="#1C2BFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M11.5 1.5V8.5" stroke="#1C2BFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlatformMultiSystemsSection: FunctionComponent = () => {
  const router = useRouter();

  return (
    <section id="platform-multi-systems" className="sol-section">
      <SolutionsContainer>
        <header className="sol-plat-multi-systems-header">
          <h2 className="sol-plat-multi-systems-heading">
            {platformMultiSystemsHeading}
          </h2>
          <p className="sol-plat-multi-systems-description">
            {platformMultiSystemsDescription}
          </p>
          <div className="sol-plat-multi-systems-hub">
            <span className="sol-plat-multi-systems-hub-btn">Dglide Platform</span>
          </div>
        </header>

        <div className="sol-plat-multi-systems-grid">
          {platformMultiSystemsCards.map((card) => (
            <article key={card.title} className="sol-plat-multi-systems-card">
              <img
                src="/solutions/orange-bg.svg"
                alt=""
                width={48}
                height={48}
                aria-hidden
              />
              <h3 className="sol-problem-card-title">{card.title}</h3>
              <p className="sol-problem-card-description">{card.description}</p>
              <button
                type="button"
                className="sol-plat-multi-systems-link"
                onClick={() => scrollToContact(router)}
              >
                {card.link}
                <ExploreArrow />
              </button>
            </article>
          ))}
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformMultiSystemsSection;
