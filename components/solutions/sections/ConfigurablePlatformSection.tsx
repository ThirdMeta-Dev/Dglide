import { FunctionComponent, CSSProperties } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformCards,
  platformFeatures,
  platformSectionDescription,
} from "@/data/solutionsPageData";

const WAVE_RING_COUNT = 15;

const FeatureIcon: FunctionComponent = () => (
  <img
    src="/solutions/section-1-icon.svg"
    alt=""
    width={22}
    height={22}
    className="sol-configurable-feature-icon"
    aria-hidden
  />
);

const ConfigurablePlatformSection: FunctionComponent = () => (
  <section className="sol-section sol-configurable-section">
    <SolutionsContainer>
      <div className="sol-configurable-inner">
        <span
          className="sol-configurable-glow sol-configurable-glow--top"
          aria-hidden
        />
        <span
          className="sol-configurable-glow sol-configurable-glow--bottom"
          aria-hidden
        />

        <header className="sol-configurable-header">
          <h2 className="sol-configurable-heading">
            FSM Powered by Dglide&apos;s Configurable Operations Platform
          </h2>
          <p className="sol-configurable-description">
            {platformSectionDescription}
          </p>
        </header>

        <div className="sol-configurable-body">
          <div className="sol-configurable-waves" aria-hidden>
            {Array.from({ length: WAVE_RING_COUNT }, (_, index) => (
              <span
                key={index}
                className="sol-configurable-wave-ring"
                style={{ "--wave-index": index } as CSSProperties}
              />
            ))}
          </div>

          <ul className="sol-configurable-features">
            {platformFeatures.map((feature) => (
              <li key={feature} className="sol-configurable-feature">
                <FeatureIcon />
                <span className="sol-configurable-feature-text">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="sol-configurable-cards">
            {platformCards.map((card) => (
              <article key={card.label} className="sol-configurable-card">
                <div className="sol-configurable-card-label">
                  <span className="sol-configurable-card-label-bar" aria-hidden />
                  <span className="sol-configurable-card-label-text">
                    {card.label}
                  </span>
                </div>

                <div className="sol-configurable-card-body">
                  <h3 className="sol-configurable-card-title">{card.title}</h3>

                  <div className="sol-configurable-card-content">
                    <p className="sol-configurable-card-description">
                      {card.description}
                    </p>

                    <ul className="sol-configurable-card-bullets">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="sol-configurable-card-bullet">
                          <FeatureIcon />
                          <span className="sol-configurable-card-bullet-text">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default ConfigurablePlatformSection;
