import { FunctionComponent } from "react";
import Image from "next/image";
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
        {platformNotAToolCards.map((card) => (
          <article key={card.title} className="sol-plat-not-tool-card">
            <Image
              src={card.icon}
              alt=""
              width={88}
              height={48}
              className="sol-plat-not-tool-card-icon"
              aria-hidden
            />
            <div>
              <h3 className="sol-plat-not-tool-card-title">{card.title}</h3>
              <p className="sol-plat-not-tool-card-desc">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformNotAToolSection;
