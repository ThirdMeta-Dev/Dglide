"use client";

"use client";

import { FunctionComponent, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
  mobileHeading?: string;
  description?: string;
  mobileDescription?: string;
  cards?: typeof goLiveCards;
  mobileCards?: typeof goLiveCards;
  mobileCtaLabel?: string;
};

const GoLiveFasterSection: FunctionComponent<GoLiveFasterSectionProps> = ({
  heading = "Go Live Faster, Without a Heavy Build",
  mobileHeading,
  description = goLiveSectionDescription,
  mobileDescription,
  cards = goLiveCards,
  mobileCards,
  mobileCtaLabel,
}) => {
  const router = useRouter();

  return (
    <section className="sol-section sol-go-live-section">
      <SolutionsContainer>
        <div className="sol-go-live-inner">
          <header className="sol-go-live-header">
            <ScrollReveal direction="up" style={{ width: "100%" }}>
              <h2 className="sol-go-live-heading">
                <span className={mobileHeading ? "sol-copy-desktop" : ""}>{heading}</span>
                {mobileHeading ? <span className="sol-copy-mobile">{mobileHeading}</span> : null}
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1} style={{ width: "100%" }}>
              <p className="sol-go-live-description">
                <span className={mobileDescription ? "sol-copy-desktop" : ""}>{description}</span>
                {mobileDescription ? <span className="sol-copy-mobile">{mobileDescription}</span> : null}
              </p>
            </ScrollReveal>
          </header>

          <div className="sol-go-live-cards" style={{ width: "100%" }}>
              {cards.map((card, index) => (
                <motion.div
                  key={card.step}
                  className="sol-go-live-card-col"
                  style={
                    {
                      "--go-live-offset": `${card.offsetTop}px`,
                      zIndex: index + 1,
                    } as CSSProperties
                  }
                  initial={{ y: -60, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
                          <h3 className="sol-go-live-card-title">
                            <span className={mobileCards ? "sol-copy-desktop" : ""}>{card.title}</span>
                            {mobileCards ? <span className="sol-copy-mobile">{mobileCards[index]?.title ?? card.title}</span> : null}
                          </h3>
                          <p className="sol-go-live-card-description">
                            <span className={mobileCards ? "sol-copy-desktop" : ""}>{card.description}</span>
                            {mobileCards ? (
                              <span className="sol-copy-mobile">{mobileCards[index]?.description ?? card.description}</span>
                            ) : null}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToContact(router)}
                        className="sol-go-live-link"
                      >
                        <span>
                          <span className={mobileCtaLabel ? "sol-copy-desktop" : ""}>Get Started Now</span>
                          {mobileCtaLabel ? <span className="sol-copy-mobile">{mobileCtaLabel}</span> : null}
                        </span>
                        <GoLiveLinkArrow />
                      </button>
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default GoLiveFasterSection;
