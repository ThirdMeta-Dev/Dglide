import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformNotAToolCards,
  platformNotAToolHeading,
} from "@/data/platformPageData";

const PlatformNotAToolSection: FunctionComponent = () => (
  <section className="sol-section">
    <SolutionsContainer>
      <h2 className="sol-plat-not-tool-heading">{platformNotAToolHeading}</h2>
      <div className="sol-plat-not-tool-grid">
        {platformNotAToolCards.map((card, index) => (
          <article key={`${card.title}-${index}`} className="sol-plat-not-tool-card">
            <img
              src="/solutions/orange-bg.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden
            />
            <h3 className="sol-problem-card-title">{card.title}</h3>
            <p className="sol-problem-card-description">{card.description}</p>
          </article>
        ))}
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformNotAToolSection;
