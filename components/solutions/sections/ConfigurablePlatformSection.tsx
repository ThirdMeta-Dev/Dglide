import { FunctionComponent, CSSProperties } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformCards,
  platformFeatures,
  platformSectionDescription,
} from "@/data/solutionsPageData";

const WAVE_RING_COUNT = 15;

const TickIcon: FunctionComponent = () => (
  <span className="sol-configurable-tick-icon-wrap" aria-hidden>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21.005"
      height="12.762"
      viewBox="0 0 24 14"
      fill="none"
      aria-hidden
    >
      <path d="M4.92601 6.82574L9.4923 9.10898L18.6249 4.54251L22.2779 6.3691L9.4923 12.7622L1.27297 8.65233L4.92601 6.82574Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
    </svg>
  </span>
);

type ConfigurablePlatformSectionProps = {
  heading?: string;
  description?: string;
  features?: string[];
  cards?: typeof platformCards;
};

const ConfigurablePlatformSection: FunctionComponent<ConfigurablePlatformSectionProps> = ({
  heading = "ITSM Powered by DGlide’s Configurable Operations Platform",
  description = platformSectionDescription,
  features = platformFeatures,
  cards = platformCards,
}) => (
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
            {heading}
          </h2>
          <p className="sol-configurable-description">
            {description}
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
            {features.map((feature) => (
              <li key={feature} className="sol-configurable-feature">
                <TickIcon />
                <span className="sol-configurable-feature-text">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="sol-configurable-cards">
            {cards.map((card) => (
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
                          <TickIcon />
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
