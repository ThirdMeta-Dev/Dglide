"use client";

import { FunctionComponent, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  goLiveCards,
  goLiveSectionDescription,
} from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const GoLiveLinkArrow: FunctionComponent = () => (
  <svg
    className="sol-go-live-link-arrow"
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

type GoLiveFasterSectionProps = {
  heading?: string;
  description?: string;
  cards?: typeof goLiveCards;
};

const GoLiveFasterSection: FunctionComponent<GoLiveFasterSectionProps> = ({
  heading = "Go Live Faster, Without a Heavy Build",
  description = goLiveSectionDescription,
  cards = goLiveCards,
}) => {
  const router = useRouter();

  return (
    <section className="sol-section sol-go-live-section">
      <SolutionsContainer>
        <div className="sol-go-live-inner">
          <header className="sol-go-live-header">
            <ScrollReveal direction="up" style={{ width: "100%" }}>
              <h2 className="sol-go-live-heading">
                {heading}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1} style={{ width: "100%" }}>
              <p className="sol-go-live-description">{description}</p>
            </ScrollReveal>
          </header>

          <ScrollReveal direction="up" delay={0.1} style={{ width: "100%" }}>
            <div className="sol-go-live-cards">
              {cards.map((card, index) => (
                <div
                  key={card.step}
                  className="sol-go-live-card-col"
                  style={
                    {
                      "--go-live-offset": `${card.offsetTop}px`,
                      zIndex: index + 1,
                    } as CSSProperties
                  }
                >
                  <article
                    className={`sol-go-live-card${
                      card.shadow ? " sol-go-live-card--shadow" : ""
                    }`}
                    style={{ height: card.cardHeight }}
                  >
                    <span className="sol-go-live-card-step" aria-hidden>
                      {card.step}
                    </span>

                    <div className="sol-go-live-card-body">
                      <div className="sol-go-live-card-main">
                        <img
                          src={card.icon}
                          alt=""
                          width={88}
                          height={48}
                          className="sol-go-live-card-icon"
                          aria-hidden
                        />

                        <div className="sol-go-live-card-copy">
                          <h3 className="sol-go-live-card-title">{card.title}</h3>
                          <p className="sol-go-live-card-description">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToContact(router)}
                        className="sol-go-live-link"
                      >
                        <span>Get Started Now</span>
                        <GoLiveLinkArrow />
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default GoLiveFasterSection;
