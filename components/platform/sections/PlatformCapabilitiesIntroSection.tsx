import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformCapabilitiesDescription,
  platformCapabilitiesHeading,
} from "@/data/platformPageData";

const PlatformCapabilitiesIntroSection: FunctionComponent = () => (
  <section id="platform-capabilities" className="sol-section">
    <SolutionsContainer>
      <header className="sol-what-improves-header">
        <h2 className="sol-what-improves-heading">{platformCapabilitiesHeading}</h2>
        <p className="sol-what-improves-subheading">
          {platformCapabilitiesDescription}
        </p>
      </header>
    </SolutionsContainer>
  </section>
);

export default PlatformCapabilitiesIntroSection;
