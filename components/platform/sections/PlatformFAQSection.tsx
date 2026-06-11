import { FunctionComponent } from "react";
import SolutionsFAQSection from "@/components/solutions/sections/SolutionsFAQSection";
import { platformFaqItems } from "@/data/platformPageData";

const PlatformFAQSection: FunctionComponent = () => (
  <SolutionsFAQSection
    items={platformFaqItems}
    heading="Frequently Asked Questions"
  />
);

export default PlatformFAQSection;
