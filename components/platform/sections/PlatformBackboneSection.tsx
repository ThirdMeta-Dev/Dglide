import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformBackboneCards,
  platformBackboneDescription,
  platformBackboneHeading,
} from "@/data/platformPageData";

const PlatformBackboneSection: FunctionComponent = () => (
  <section id="platform-backbone" className="sol-section sol-configurable-section">
    <SolutionsContainer>
      <div className="sol-plat-backbone-grid">
        <div>
          <h2 className="sol-configurable-heading">{platformBackboneHeading}</h2>
          <p className="sol-configurable-description">{platformBackboneDescription}</p>
        </div>

        <div className="sol-plat-backbone-cards">
          {platformBackboneCards.map((card, index) => (
            <article
              key={card.label}
              className={`sol-plat-backbone-card${
                index === 0
                  ? " sol-plat-backbone-card--primary"
                  : " sol-plat-backbone-card--layer"
              }`}
            >
              <div className="sol-plat-backbone-card-header">
                <img
                  src="/solutions/orange-bg.svg"
                  alt=""
                  width={44}
                  height={44}
                  aria-hidden
                />
                <h3 className="sol-plat-backbone-card-title">{card.title}</h3>
              </div>
              <p className="sol-plat-backbone-card-description">{card.description}</p>
              {index === 0 && (
                <div className="sol-plat-backbone-tags">
                  {card.bullets.map((tag) => (
                    <span key={tag} className="sol-plat-backbone-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformBackboneSection;
