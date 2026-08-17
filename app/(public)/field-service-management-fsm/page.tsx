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
  fsmConfigurableHeading, fsmConfigurableDescription, fsmConfigurableFeatures, fsmConfigurableMobileFeatures, fsmConfigurableCards,
  fsmGoLiveHeading, fsmGoLiveDescription, fsmGoLiveCards,
  fsmIntegrationsHeading, fsmIntegrationsDescription,
  fsmFinalCtaEyebrow, fsmFinalCtaHeading, fsmFinalCtaButton,
  fsmFaqItems,
} from "@/data/fsmPageData";
import { integrationNodes } from "@/data/solutionsPageData";

export const metadata: Metadata = {
  title: { absolute: "Field Service Software That Adapts to Your Crew | DGlide" },
  description: "Stop coordinating field teams over WhatsApp and Excel. DGlide gives real-time visibility on visits, work orders, and scheduling.",
};

export default function FSMPage() {
  return (
    <AnimatedPublicPage className="solutions-page solutions-page--fsm solutions-page--shared-mobile-ui" staticFirstCount={2}>
      <FSMHeroSection
        eyebrow={fsmHeroEyebrow}
        heading={fsmHeroHeading}
        description={fsmHeroDescription}
        mobileHeading="Field Service That Fits Your Real Operations"
        mobileDescription="DGlide FSM helps service-heavy teams run entire workflow in one place."
        bullets={fsmHeroBullets}
        mobileBullets={[
          "Work orders, scheduling, and field tracking",
          "Built for machinery and service-heavy teams",
          "Configurable workflows without custom build",
        ]}
        primaryCta={fsmHeroPrimaryCta}
        secondaryCta={fsmHeroSecondaryCta}
        mobilePrimaryCta="Pick your demo time"
        mobileSecondaryCta="Explore The Platform"
        secondaryScrollTargetId="core-capabilities"
        imageSrc="/solutions/fsm-hero-illustration.png"
        mobileImageSrc="/solutions/fsm-hero-mobile.png"
        imageAlt="DGlide FSM — field service management dashboard"
      />
      <SolutionsSectionNav items={fsmNavItems} />
      <FieldServiceProblemSection
        heading={fsmProblemHeading}
        mobileHeading="Software That Fits the Way Your Service Works"
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
        mobileStepDescriptions={[
          "Create service requests from teams, users or customers.",
          "Convert requests into structured jobs with clear ownership.",
          "Allocate work by priority, availability, location, or expertise.",
          "Technicians update status, notes, and service details from the field.",
          "Confirm completion with customer validation, and reporting.",
        ]}
        ctaLabel={fsmWorkflowCtaLabel}
        sectionId="what-fsm-does"
      />
      <CoreCapabilitiesSection
        heading={fsmCapabilitiesHeading}
        items={fsmCapabilityItems}
      />
      <TechnicianMobileSection
        heading={fsmTechnicianHeading}
        mobileHeading="Give Technicians a Mobile Workflow, Not Phone Calls"
        description={fsmTechnicianDescription}
        features={fsmTechnicianFeatures}
      />
      <BetterWaySection
        heading={fsmBetterWayHeading}
        mobileHeading="Configurable Software That Scales With Your Business"
        description={fsmBetterWayDescription}
        leftTitle={fsmBetterWayLeftTitle}
        rightTitle={fsmBetterWayRightTitle}
        leftItems={fsmRigidToolsItems}
        rightItems={fsmCustomBuildItems}
        mobileLeftItems={[
          "Fast to start. But difficult to adapt",
          "Cheap at start, Expensive later",
          "Fits the category, not your business.",
        ]}
        mobileRightItems={[
          "Fits at first then becomes a burden",
          "Months to build, years to maintain.",
          "Custom fit comes with a headache.",
        ]}
        footerItems={fsmBetterWayFooterItems}
      />
      <WorkflowChangeSection
        sectionId="core-fsm-capabilities"
        title={fsmWorkflowChangeTitle}
        mobileTitle="An FSM That Evolves With Your Service Workflow"
        subtitle={fsmWorkflowChangeSubtitle}
        bullets={fsmWorkflowChangeBullets}
        timelineItems={fsmWorkflowTimelineItems}
        mobileInitialIndex={1}
      />
      <WhatImprovesSection
        heading={fsmImprovesHeading}
        features={fsmImprovesFeatures}
        mobileDescriptions={[
          "Requests reach the right technician fast.",
          "Field teams know what to do, so they finish more jobs a day.",
          "See every job's status as it happens, so nothing stalls unseen.",
          "Track every deadline automatically and escalate before a breach.",
          "Faster, more reliable service builds the trust that scales renewals.",
          "Work moves itself between stages, reducing a chase of updates and approvals.",
        ]}
        sectionId="benefits-outcomes"
      />
      <RealOperationsSection
        heading={fsmRealOpsHeading}
        challengeQuote={fsmRealOpsChallengeQuote}
        challengeBullets={fsmRealOpsChallengeBullets}
        metricsDescription={fsmRealOpsMetricsDescription}
        metrics={fsmRealOpsMetrics}
        footerQuote={fsmRealOpsFooterQuote}
        mobileFooterQuote={'"Now I open my phone and see everything in one place. That changed how I run the company."'}
        mobileFooterAttribution="- Director, Prompt Lasers"
        solutionItems={fsmRealOpsSolutionItems}
      />
      <ConfigurablePlatformSection
        heading={fsmConfigurableHeading}
        description={fsmConfigurableDescription}
        features={fsmConfigurableFeatures}
        mobileFeatures={fsmConfigurableMobileFeatures}
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
        mobileDescription="DGlide is designed to work with your existing business environment."
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
