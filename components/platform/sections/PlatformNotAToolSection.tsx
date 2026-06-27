import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import {
  platformNotAToolCards,
  platformNotAToolHeading,
} from "@/data/platformPageData";

const PlatformNotAToolSection: FunctionComponent = () => (
  <section className="sol-section">
    <SolutionsContainer>
      <ScrollReveal direction="up">
        <h2 className="sol-plat-not-tool-heading">{platformNotAToolHeading}</h2>
      </ScrollReveal>

      <StaggerReveal className="sol-plat-not-tool-grid">
        {platformNotAToolCards.map((card, i) => (
          <StaggerItem
            key={card.title}
            className={
              i === 3 ? "sol-plat-not-tool-item sol-plat-not-tool-item--col4" :
              i === 4 ? "sol-plat-not-tool-item sol-plat-not-tool-item--col5" :
              "sol-plat-not-tool-item"
            }
          >
          <article
            className={
              i === 0 || i === 3 ? "sol-plat-not-tool-card sol-plat-not-tool-card--right" :
              i === 2 || i === 4 ? "sol-plat-not-tool-card sol-plat-not-tool-card--left" :
              "sol-plat-not-tool-card"
            }
          >
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
          </StaggerItem>
        ))}
      </StaggerReveal>
    </SolutionsContainer>
  </section>
);

export default PlatformNotAToolSection;
