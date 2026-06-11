import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { platformThreePillars } from "@/data/platformPageData";

const PlatformThreePillarsSection: FunctionComponent = () => (
  <section className="sol-section sol-plat-pillars-section">
    <SolutionsContainer>
      <p className="sol-plat-pillars-intro">
        Dglide Is A Configurable Operations Platform That Powers Multiple Business
        Systems From One Shared Backbone. Start With A Ready Solution, Adapt It To
        Your Workflows.
      </p>

      <div className="sol-plat-pillars-grid">
        {platformThreePillars.map((pillar) => (
          <article key={pillar.title} className="sol-plat-pillar">
            <img
              src="/solutions/orange-bg.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden
            />
            <h3 className="sol-plat-pillar-title">{pillar.title}</h3>
            <p className="sol-plat-pillar-description">{pillar.description}</p>
          </article>
        ))}
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformThreePillarsSection;
