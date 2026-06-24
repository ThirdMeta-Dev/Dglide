import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import FSMHeroSection from "@/components/solutions/sections/FSMHeroSection";
import SolutionsSectionNav from "@/components/solutions/sections/SolutionsSectionNav";
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
  title: "Solutions | DGlide",
  description:
    "Field service management solutions that fit your real operations — work orders, scheduling, technician mobile apps, and integrations.",
};

export default function SolutionsPage() {
  return (
    <AnimatedPublicPage className="solutions-page" staticFirstCount={1}>
      <img
        src="/solutions/curve.svg"
        alt=""
        aria-hidden
        className="sol-hero-curve"
      />
      <FSMHeroSection />
      <SolutionsSectionNav />
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
