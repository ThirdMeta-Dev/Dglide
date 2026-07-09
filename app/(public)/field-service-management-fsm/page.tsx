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
import {
  fsmNavItems, fsmHeroEyebrow, fsmHeroHeading, fsmHeroDescription, fsmHeroBullets, fsmHeroPrimaryCta, fsmHeroSecondaryCta,
  fsmProblemHeading, fsmProblemDescription, fsmProblemCards, fsmProblemFooterText, fsmProblemCtaLabel,
  fsmBuiltForHeading, fsmBuiltForDescription, fsmFitItems, fsmIndustryItems,
  fsmPlatformHeading, fsmPlatformDescription, fsmPlatformFeatures, fsmPlatformOrbitItems, fsmPlatformFooterText, fsmPlatformCtaLabel,
  fsmWorkflowHeading, fsmWorkflowSteps, fsmWorkflowCtaLabel,
  fsmCapabilitiesHeading, fsmCapabilityItems,
  fsmTechnicianHeading, fsmTechnicianDescription, fsmTechnicianFeatures,
  fsmBetterWayHeading, fsmBetterWayDescription, fsmBetterWayLeftTitle, fsmBetterWayRightTitle, fsmRigidToolsItems, fsmCustomBuildItems, fsmBetterWayFooterItems,
  fsmWorkflowChangeTitle, fsmWorkflowChangeSubtitle, fsmWorkflowChangeBullets, fsmWorkflowTimelineItems,
  fsmImprovesHeading, fsmImprovesFeatures,
  fsmRealOpsHeading, fsmRealOpsChallengeQuote, fsmRealOpsChallengeBullets, fsmRealOpsMetricsDescription, fsmRealOpsMetrics, fsmRealOpsFooterQuote, fsmRealOpsSolutionItems,
  fsmConfigurableHeading, fsmConfigurableDescription, fsmConfigurableFeatures, fsmConfigurableCards,
  fsmGoLiveHeading, fsmGoLiveDescription, fsmGoLiveCards,
  fsmIntegrationsHeading, fsmIntegrationsDescription,
  fsmFinalCtaEyebrow, fsmFinalCtaHeading, fsmFinalCtaButton,
  fsmFaqItems,
} from "@/data/fsmPageData";
import { integrationNodes } from "@/data/solutionsPageData";

export const metadata: Metadata = {
  title: "Field Service Management | DGlide",
  description: "DGlide FSM helps service-heavy teams run requests, work orders, scheduling, and field execution in one place.",
};

export default function FSMPage() {
  return (
    <AnimatedPublicPage className="solutions-page" staticFirstCount={2}>
      <FSMHeroSection
        eyebrow={fsmHeroEyebrow}
        heading={fsmHeroHeading}
        description={fsmHeroDescription}
        bullets={fsmHeroBullets}
        primaryCta={fsmHeroPrimaryCta}
        secondaryCta={fsmHeroSecondaryCta}
        imageSrc="/solutions/fsm-hero-illustration.png"
        imageAlt="DGlide FSM — field service management dashboard"
      />
      <SolutionsSectionNav items={fsmNavItems} />
      <FieldServiceProblemSection
        heading={fsmProblemHeading}
        description={fsmProblemDescription}
        cards={fsmProblemCards}
        footerText={fsmProblemFooterText}
        ctaLabel={fsmProblemCtaLabel}
      />
      <BuiltForSection
        heading={fsmBuiltForHeading}
        description={fsmBuiltForDescription}
        centerImage="/solutions/built-for/fsm-center-illustration.png"
        fitItems={fsmFitItems}
        industryItems={fsmIndustryItems}
      />
      <OnePlatformSection
        heading={fsmPlatformHeading}
        description={fsmPlatformDescription}
        features={fsmPlatformFeatures}
        orbitItems={fsmPlatformOrbitItems}
        footerText={fsmPlatformFooterText}
        ctaLabel={fsmPlatformCtaLabel}
      />
      <ServiceWorkflowSection
        heading={fsmWorkflowHeading}
        steps={fsmWorkflowSteps}
        ctaLabel={fsmWorkflowCtaLabel}
        sectionId="what-fsm-does"
      />
      <CoreCapabilitiesSection
        heading={fsmCapabilitiesHeading}
        items={fsmCapabilityItems}
      />
      <TechnicianMobileSection
        heading={fsmTechnicianHeading}
        description={fsmTechnicianDescription}
        features={fsmTechnicianFeatures}
      />
      <BetterWaySection
        heading={fsmBetterWayHeading}
        description={fsmBetterWayDescription}
        leftTitle={fsmBetterWayLeftTitle}
        rightTitle={fsmBetterWayRightTitle}
        leftItems={fsmRigidToolsItems}
        rightItems={fsmCustomBuildItems}
        footerItems={fsmBetterWayFooterItems}
      />
      <WorkflowChangeSection
        sectionId="core-fsm-capabilities"
        title={fsmWorkflowChangeTitle}
        subtitle={fsmWorkflowChangeSubtitle}
        bullets={fsmWorkflowChangeBullets}
        timelineItems={fsmWorkflowTimelineItems}
      />
      <WhatImprovesSection
        heading={fsmImprovesHeading}
        features={fsmImprovesFeatures}
        sectionId="benefits-outcomes"
      />
      <RealOperationsSection
        heading={fsmRealOpsHeading}
        challengeQuote={fsmRealOpsChallengeQuote}
        challengeBullets={fsmRealOpsChallengeBullets}
        metricsDescription={fsmRealOpsMetricsDescription}
        metrics={fsmRealOpsMetrics}
        footerQuote={fsmRealOpsFooterQuote}
        solutionItems={fsmRealOpsSolutionItems}
      />
      <ConfigurablePlatformSection
        heading={fsmConfigurableHeading}
        description={fsmConfigurableDescription}
        features={fsmConfigurableFeatures}
        cards={fsmConfigurableCards}
      />
      <GoLiveFasterSection
        heading={fsmGoLiveHeading}
        description={fsmGoLiveDescription}
        cards={fsmGoLiveCards}
      />
      <IntegrationsHubSection
        heading={fsmIntegrationsHeading}
        description={fsmIntegrationsDescription}
        nodes={integrationNodes}
      />
      <SolutionsFinalCTA
        eyebrow={fsmFinalCtaEyebrow}
        heading={fsmFinalCtaHeading}
        buttonLabel={fsmFinalCtaButton}
      />
      <SolutionsFAQSection items={fsmFaqItems} />
    </AnimatedPublicPage>
  );
}
