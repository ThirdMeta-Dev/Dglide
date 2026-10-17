import FsmIndiaLeadModal from "@/components/ads/FsmIndiaLeadModal";
import FsmAdsTrustedLogos from "@/components/ads/FsmAdsTrustedLogos";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ConfigurablePlatformSection from "@/components/solutions/sections/ConfigurablePlatformSection";
import FSMHeroSection from "@/components/solutions/sections/FSMHeroSection";
import IntegrationsHubSection from "@/components/solutions/sections/IntegrationsHubSection";
import OnePlatformSection from "@/components/solutions/sections/OnePlatformSection";
import SolutionsFAQSection from "@/components/solutions/sections/SolutionsFAQSection";
import WorkflowChangeSection from "@/components/solutions/sections/WorkflowChangeSection";
import {
  fsmConfigurableCards,
  fsmConfigurableDescription,
  fsmConfigurableFeatures,
  fsmConfigurableHeading,
  fsmConfigurableMobileFeatures,
  fsmFaqItems,
  fsmHeroBullets,
  fsmHeroDescription,
  fsmHeroEyebrow,
  fsmHeroHeading,
  fsmHeroPrimaryCta,
  fsmIntegrationsDescription,
  fsmIntegrationsHeading,
  fsmPlatformCtaLabel,
  fsmPlatformDescription,
  fsmPlatformFeatures,
  fsmPlatformFooterText,
  fsmPlatformHeading,
  fsmPlatformOrbitItems,
  fsmWorkflowChangeBullets,
  fsmWorkflowChangeSubtitle,
  fsmWorkflowChangeTitle,
  fsmWorkflowTimelineItems,
} from "@/data/fsmPageData";
import { integrationNodes } from "@/data/solutionsPageData";

/**
 * Focused FSM landing page assembled from the existing production sections in
 * the order specified by the campaign document.
 */
export default function FsmFocusedLandingPage() {
  return (
    <AnimatedPublicPage
      className="solutions-page solutions-page--fsm solutions-page--shared-mobile-ui solutions-page--fsm-ads"
      staticFirstCount={2}
    >
      <FsmIndiaLeadModal />

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
        secondaryCta="Download Brochure"
        mobilePrimaryCta={fsmHeroPrimaryCta}
        mobileSecondaryCta="Download Brochure"
        secondaryOpensBrochure
        imageSrc="/solutions/fsm-hero-illustration.png"
        mobileImageSrc="/solutions/fsm-hero-mobile.png"
        imageAlt="DGlide FSM field service management dashboard"
        mobileBeforeImage={<FsmAdsTrustedLogos />}
      />

      <FsmAdsTrustedLogos className="hidden lg:block" />

      <OnePlatformSection
        heading={fsmPlatformHeading}
        description={fsmPlatformDescription}
        features={fsmPlatformFeatures}
        orbitItems={fsmPlatformOrbitItems}
        footerText={fsmPlatformFooterText}
        ctaLabel={fsmPlatformCtaLabel}
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

      <div id="configurable-platform">
        <ConfigurablePlatformSection
          heading={fsmConfigurableHeading}
          description={fsmConfigurableDescription}
          features={fsmConfigurableFeatures}
          mobileFeatures={fsmConfigurableMobileFeatures}
          cards={fsmConfigurableCards}
        />
      </div>

      <div id="customer-stories">
        <TestimonialsSection />
      </div>

      <IntegrationsHubSection
        heading={fsmIntegrationsHeading}
        description={fsmIntegrationsDescription}
        mobileDescription="DGlide is designed to work with your existing business environment."
        nodes={integrationNodes}
      />

      <SolutionsFAQSection items={fsmFaqItems} />
    </AnimatedPublicPage>
  );
}
