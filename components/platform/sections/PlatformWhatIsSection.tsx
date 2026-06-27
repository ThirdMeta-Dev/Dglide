import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import {
  platformThreePillars,
  platformWhatIsDescription,
  platformWhatIsHeading,
} from "@/data/platformPageData";

const PlatformWhatIsSection: FunctionComponent = () => (
  <section className="sol-section sol-plat-what-is-section">
    <SolutionsContainer>
      <ScrollReveal direction="up">
        <div className="sol-plat-what-is-header">
          <h2 className="sol-plat-what-is-heading">{platformWhatIsHeading}</h2>
          <p className="sol-plat-what-is-description">{platformWhatIsDescription}</p>
        </div>
      </ScrollReveal>

      <StaggerReveal className="sol-plat-pillars-grid">
        {platformThreePillars.map((pillar) => (
          <StaggerItem key={pillar.title}>
          <div className="sol-plat-pillar-card">
            <div className="sol-plat-pillar-icon-wrap">
              <img
                src={pillar.icon}
                alt=""
                width={88}
                height={48}
                className="sol-plat-pillar-icon"
                aria-hidden
              />
            </div>
            <h3 className="sol-plat-pillar-title">{pillar.title}</h3>
            <p className="sol-plat-pillar-description">{pillar.description}</p>
          </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </SolutionsContainer>
  </section>
);

export default PlatformWhatIsSection;
