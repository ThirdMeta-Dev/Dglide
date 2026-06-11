import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { platformFeatureGridCards } from "@/data/platformPageData";

const PlatformFeatureGridSection: FunctionComponent = () => (
  <section className="sol-section">
    <SolutionsContainer>
      <div className="sol-plat-feature-grid">
        {platformFeatureGridCards.map((card, index) => (
          <article key={`${card.title}-${index}`} className="sol-plat-feature-card">
            <img
              src="/solutions/orange-bg.svg"
              alt=""
              width={56}
              height={56}
              aria-hidden
            />
            <h3 className="sol-plat-feature-card-title">{card.title}</h3>
            <p className="sol-plat-feature-card-description">{card.description}</p>

            {card.tags && (
              <div className="sol-plat-feature-tags">
                {card.tags.map((tag) => (
                  <span key={tag} className="sol-plat-backbone-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {card.stats && (
              <div className="sol-plat-feature-stats">
                {card.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="sol-plat-feature-stat-value">{stat.value}</p>
                    <p className="sol-plat-feature-stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {card.listItems && (
              <div className="sol-plat-feature-list-row">
                {card.listItems.map((item) => (
                  <span key={item} className="sol-plat-feature-list-item">
                    <img
                      src="/solutions/section-1-icon.svg"
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden
                    />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformFeatureGridSection;
