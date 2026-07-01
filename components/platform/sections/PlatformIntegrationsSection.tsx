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
    centerImageSrc="/solutions/integrations-hub-center-v2.png"
  />
);

export default PlatformIntegrationsSection;
