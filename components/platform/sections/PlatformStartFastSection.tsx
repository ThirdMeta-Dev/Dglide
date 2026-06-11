import { FunctionComponent } from "react";
import ServiceWorkflowSection from "@/components/solutions/sections/ServiceWorkflowSection";
import {
  platformStartFastHeading,
  platformStartFastSteps,
} from "@/data/platformPageData";

const PlatformStartFastSection: FunctionComponent = () => (
  <ServiceWorkflowSection
    sectionId="platform-start-fast"
    heading={platformStartFastHeading}
    steps={platformStartFastSteps}
    showCta={false}
  />
);

export default PlatformStartFastSection;
