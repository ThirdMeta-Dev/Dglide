import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { platformSectionNavItems } from "@/data/platformPageData";

const PlatformSectionNav: FunctionComponent = () => (
  <nav className="sol-nav-bar" aria-label="Platform sections">
    <SolutionsContainer className="flex justify-center">
      <div className="sol-section-nav">
        {platformSectionNavItems.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`sol-section-nav-link ${
              index === 1 ? "sol-section-nav-link--active" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </SolutionsContainer>
  </nav>
);

export default PlatformSectionNav;
