import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { improvesFeatures } from "@/data/solutionsPageData";

type WhatImprovesSectionProps = {
  heading?: string;
  description?: string;
  features?: typeof improvesFeatures;
  sectionId?: string;
};

const WhatImprovesSection: FunctionComponent<WhatImprovesSectionProps> = ({
  heading = "What Improves with Dglide FSM",
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
          <h2 className="sol-what-improves-heading">{heading}</h2>
          {description && (
            <p className="sol-what-improves-subheading">{description}</p>
          )}
        </header>

        <div className="sol-what-improves-grid">
          {improvesRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`sol-what-improves-row${
                rowIndex === 1 ? " sol-what-improves-row--bottom" : ""
              }`}
            >
              {row.map((feature) => (
                <article
                  key={feature.title}
                  className={`sol-what-improves-card sol-what-improves-card--${feature.align}`}
                >
                  <img
                    src="/solutions/orange-bg.svg"
                    alt=""
                    width={40}
                    height={40}
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </SolutionsContainer>
  </section>
  );
};

export default WhatImprovesSection;
