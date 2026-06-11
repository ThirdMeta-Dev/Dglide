import { FunctionComponent } from "react";
import WhatImprovesSection from "@/components/solutions/sections/WhatImprovesSection";
import {
  platformImproveFeatures,
} from "@/data/platformPageData";

const PlatformWhatImprovesSection: FunctionComponent = () => (
  <WhatImprovesSection
    heading="What The Platform Helps You Improve"
    description="Lorem Ipsum Is Simply Model Is Not One Product. It Is A Connected"
    features={platformImproveFeatures}
    sectionId="platform-improves"
  />
);

export default PlatformWhatImprovesSection;
