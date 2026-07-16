import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import FSMHeroSection from "@/components/solutions/sections/FSMHeroSection";
import SolutionsSectionNav from "@/components/solutions/sections/SolutionsSectionNav";
import { itsmSectionNavItems } from "@/data/solutionsPageData";
import FieldServiceProblemSection from "@/components/solutions/sections/FieldServiceProblemSection";
import BuiltForSection from "@/components/solutions/sections/BuiltForSection";
import OnePlatformSection from "@/components/solutions/sections/OnePlatformSection";
import ServiceWorkflowSection from "@/components/solutions/sections/ServiceWorkflowSection";
import CoreCapabilitiesSection from "@/components/solutions/sections/CoreCapabilitiesSection";
import TechnicianMobileSection from "@/components/solutions/sections/TechnicianMobileSection";
import BetterWaySection from "@/components/solutions/sections/BetterWaySection";
import WorkflowChangeSection from "@/components/solutions/sections/WorkflowChangeSection";
import WhatImprovesSection from "@/components/solutions/sections/WhatImprovesSection";
import RealOperationsSection from "@/components/solutions/sections/RealOperationsSection";
import ConfigurablePlatformSection from "@/components/solutions/sections/ConfigurablePlatformSection";
import GoLiveFasterSection from "@/components/solutions/sections/GoLiveFasterSection";
import IntegrationsHubSection from "@/components/solutions/sections/IntegrationsHubSection";
import SolutionsFinalCTA from "@/components/solutions/sections/SolutionsFinalCTA";
import SolutionsFAQSection from "@/components/solutions/sections/SolutionsFAQSection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";

export const metadata: Metadata = {
  title: { absolute: "ITSM That Adapts to Your Workflow | DGlide" },
  description:
    "Stop reshaping your process to fit rigid ITSM tools. DGlide adapts to how your team already handles requests, approvals, and SLAs, no 6-month rollout.",
};

export default function SolutionsPage() {
  return (
    <AnimatedPublicPage className="solutions-page" staticFirstCount={2}>
      <FSMHeroSection secondaryScrollTargetId="core-capabilities" />
      <SolutionsSectionNav items={itsmSectionNavItems} />
      <FieldServiceProblemSection />
      <BuiltForSection />
      <OnePlatformSection />
      <ServiceWorkflowSection />
      <CoreCapabilitiesSection />
      <TechnicianMobileSection />
      <BetterWaySection />
      <WorkflowChangeSection />
      <WhatImprovesSection />
      <RealOperationsSection />
      <ConfigurablePlatformSection />
      <GoLiveFasterSection />
      <IntegrationsHubSection />
      <SolutionsFinalCTA />
      <SolutionsFAQSection />
    </AnimatedPublicPage>
  );
}
