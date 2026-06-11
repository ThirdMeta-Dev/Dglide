import { FunctionComponent } from "react";
import IntegrationsHubSection from "@/components/solutions/sections/IntegrationsHubSection";
import {
  platformIntegrationDescription,
  platformIntegrationHeading,
  platformIntegrationNodes,
} from "@/data/platformPageData";

const PlatformIntegrationsSection: FunctionComponent = () => (
  <IntegrationsHubSection
    heading={platformIntegrationHeading}
    description={platformIntegrationDescription}
    nodes={platformIntegrationNodes}
  />
);

export default PlatformIntegrationsSection;
