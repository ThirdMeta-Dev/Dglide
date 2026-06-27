import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { improvesFeatures } from "@/data/solutionsPageData";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

type WhatImprovesSectionProps = {
  heading?: string;
  description?: string;
  features?: typeof improvesFeatures;
  sectionId?: string;
};

const WhatImprovesSection: FunctionComponent<WhatImprovesSectionProps> = ({
  heading = "What Improves With DGlide ITSM",
  description,
  features = improvesFeatures,
  sectionId = "benefits-outcomes",
}) => {
  const improvesRows = [
    features.slice(0, 3),
    features.slice(3, 6),
  ] as const;

  return (
  <section id={sectionId} className="sol-section sol-what-improves-section">
    <SolutionsContainer>
      <div className="sol-what-improves-inner">
        <header className="sol-what-improves-header">
          <ScrollReveal direction="up">
            <h2 className="sol-what-improves-heading">{heading}</h2>
          </ScrollReveal>
          {description && (
            <ScrollReveal direction="up" delay={0.1}>
              <p className="sol-what-improves-subheading">{description}</p>
            </ScrollReveal>
          )}
        </header>

        <StaggerReveal className="sol-what-improves-grid">
          {improvesRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`sol-what-improves-row${
                rowIndex === 1 ? " sol-what-improves-row--bottom" : ""
              }`}
            >
              {row.map((feature) => (
                <StaggerItem key={feature.title}>
                  <article
                    className={`sol-what-improves-card sol-what-improves-card--${feature.align}`}
                  >
                    <img
                      src={feature.icon}
                      alt=""
                      width={88}
                      height={48}
                      className="sol-what-improves-icon"
                      aria-hidden
                    />
                    <div className="sol-what-improves-card-body">
                      <h3 className="sol-what-improves-card-title">
                        {feature.title}
                      </h3>
                      <p className="sol-what-improves-card-description">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </div>
          ))}
        </StaggerReveal>
      </div>
    </SolutionsContainer>
  </section>
  );
};

export default WhatImprovesSection;
