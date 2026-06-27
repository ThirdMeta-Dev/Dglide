import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformBackboneDescription,
  platformBackboneHeading,
  platformBackboneLayers,
} from "@/data/platformPageData";

const STACK_TOP_BASE = 100;
const STACK_TOP_STEP = 24;

const PlatformBackboneSection: FunctionComponent = () => (
  <section id="platform-backbone" className="sol-plat-backbone-section">
    <SolutionsContainer>
      <div className="sol-plat-backbone-layout">
        <div className="sol-plat-backbone-left">
          <h2 className="sol-plat-backbone-heading">{platformBackboneHeading}</h2>
          <p className="sol-plat-backbone-description">{platformBackboneDescription}</p>
        </div>

        <div className="sol-plat-backbone-cards">
          {platformBackboneLayers.map((layer, i) => (
            <article
              key={layer.title}
              className="sol-plat-backbone-card"
              style={{
                top: `${STACK_TOP_BASE + i * STACK_TOP_STEP}px`,
                zIndex: i + 1,
              }}
            >
              <div className="sol-plat-backbone-card-header">
                <img
                  src={layer.icon}
                  alt=""
                  width={88}
                  height={48}
                  className="sol-plat-backbone-card-icon"
                  aria-hidden
                />
                <div className="sol-plat-backbone-card-info">
                  <span className="sol-plat-backbone-card-layer">{layer.layer}</span>
                  <h3 className="sol-plat-backbone-card-title">{layer.title}</h3>
                  <p className="sol-plat-backbone-card-desc">{layer.description}</p>
                </div>
              </div>
              <div className="sol-plat-backbone-tags">
                {layer.tags.map((tag) => (
                  <span key={tag} className="sol-plat-backbone-tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformBackboneSection;
