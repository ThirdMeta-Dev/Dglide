import { FunctionComponent } from "react";
import FSMHeroSection from "@/components/solutions/sections/FSMHeroSection";
import {
  platformHeroBullets,
  platformHeroDescription,
  platformHeroEyebrow,
  platformHeroHeading,
  platformHeroImage,
  platformHeroPrimaryCta,
  platformHeroSecondaryCta,
} from "@/data/platformPageData";

const PlatformHeroSection: FunctionComponent = () => (
  <FSMHeroSection
    eyebrow={platformHeroEyebrow}
    heading={platformHeroHeading}
    description={platformHeroDescription}
    bullets={platformHeroBullets}
    primaryCta={platformHeroPrimaryCta}
    secondaryCta={platformHeroSecondaryCta}
    imageSrc={platformHeroImage}
    imageAlt="DGlide — configurable operations platform dashboard"
    actionsInline
  />
);

export default PlatformHeroSection;
