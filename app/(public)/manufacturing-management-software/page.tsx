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
import RealOperationsSection from "@/components/solutions/sections/RealOperationsSection";
import GoLiveFasterSection from "@/components/solutions/sections/GoLiveFasterSection";
import IntegrationsHubSection from "@/components/solutions/sections/IntegrationsHubSection";
import SolutionsFinalCTA from "@/components/solutions/sections/SolutionsFinalCTA";
import SolutionsFAQSection from "@/components/solutions/sections/SolutionsFAQSection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";
import {
  manufacturingBetterWay,
  manufacturingBuiltFor,
  manufacturingCapabilitiesHeading,
  manufacturingCapabilitiesMobileHeading,
  manufacturingCapabilityItems,
  manufacturingCapabilityMobileItems,
  manufacturingFaqItems,
  manufacturingGoLive,
  manufacturingHero,
  manufacturingIntegrationNodes,
  manufacturingMobileFaqItems,
  manufacturingMobileIntegrationNodes,
  manufacturingNavItems,
  manufacturingOperator,
  manufacturingPlatform,
  manufacturingProblem,
  manufacturingRealOperations,
  manufacturingWorkflow,
  manufacturingWorkflowChange,
} from "@/data/manufacturingPageData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";
const PAGE_URL = `${SITE_URL}/manufacturing-management-software`;

export const metadata: Metadata = {
  title: "Manufacturing Process Management Software",
  description: "DGlide Manufacturing Process Management connects BOMs, component workorders, inventory validation, assembly, QC, dependencies, and reporting in one configurable platform.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Manufacturing Process Management Software | DGlide",
    description: "Track every component workorder, material dependency, assembly task, and QC step in one production system.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/solutions/manufacturing/hero.webp`, width: 1200, height: 900, alt: "DGlide manufacturing process management dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manufacturing Process Management Software | DGlide",
    description: "Track every component workorder, material dependency, assembly task, and QC step in one production system.",
    images: [`${SITE_URL}/solutions/manufacturing/hero.webp`],
  },
};

export default function ManufacturingManagementSoftwarePage() {
  return (
    <AnimatedPublicPage className="solutions-page solutions-page--manufacturing solutions-page--shared-mobile-ui crm-solutions-page manufacturing-solutions-page" staticFirstCount={2}>
      <FSMHeroSection
        eyebrow={manufacturingHero.eyebrow}
        mobileEyebrow={manufacturingHero.mobileEyebrow}
        heading={manufacturingHero.heading}
        mobileHeading={manufacturingHero.mobileHeading}
        description={manufacturingHero.description}
        mobileDescription={manufacturingHero.mobileDescription}
        bullets={manufacturingHero.bullets}
        mobileBullets={manufacturingHero.mobileBullets}
        primaryCta={manufacturingHero.primaryCta}
        secondaryCta={manufacturingHero.secondaryCta}
        secondaryScrollTargetId="core-capabilities"
        imageSrc="/solutions/manufacturing/hero.webp"
        mobileImageSrc="/solutions/manufacturing/hero-mobile.png"
        imageAlt="DGlide manufacturing process management dashboard"
        imageClassName="manufacturing-hero-image"
      />
      <SolutionsSectionNav items={manufacturingNavItems} />
      <FieldServiceProblemSection
        sectionId="manufacturing-problem"
        sectionClassName="sol-problem-section--crm"
        heading={manufacturingProblem.heading}
        mobileHeading={manufacturingProblem.mobileHeading}
        description={manufacturingProblem.description}
        cards={manufacturingProblem.cards}
        footerText={manufacturingProblem.footerText}
        mobileFooterText={manufacturingProblem.mobileFooterText}
        ctaLabel={manufacturingProblem.ctaLabel}
        mobileCtaLabel={manufacturingProblem.mobileCtaLabel}
      />
      <BuiltForSection
        heading={manufacturingBuiltFor.heading}
        mobileHeading={manufacturingBuiltFor.mobileHeading}
        description={manufacturingBuiltFor.description}
        centerImage="/solutions/manufacturing/audience.webp"
        fitItems={manufacturingBuiltFor.fitItems}
        mobileFitItems={manufacturingBuiltFor.mobileFitItems}
        industryItems={manufacturingBuiltFor.industryItems}
        mobileIndustryItems={manufacturingBuiltFor.mobileIndustryItems}
        mobileInitialIndex={manufacturingBuiltFor.mobileInitialIndex}
      />
      <OnePlatformSection
        heading={manufacturingPlatform.heading}
        mobileHeading={manufacturingPlatform.mobileHeading}
        description={manufacturingPlatform.description}
        features={manufacturingPlatform.features}
        mobileFeatures={manufacturingPlatform.mobileFeatures}
        orbitItems={manufacturingPlatform.orbitItems}
        mobileOrbitItems={manufacturingPlatform.mobileOrbitItems}
        mobileInitialId={manufacturingPlatform.mobileInitialId}
        footerText={manufacturingPlatform.footerText}
        mobileFooterText={manufacturingPlatform.mobileFooterText}
        ctaLabel={manufacturingPlatform.ctaLabel}
      />
      <ServiceWorkflowSection
        heading={manufacturingWorkflow.heading}
        steps={manufacturingWorkflow.steps}
        mobileStepDescriptions={manufacturingWorkflow.mobileStepDescriptions}
        ctaLabel={manufacturingWorkflow.ctaLabel}
        sectionId="what-process-management-does"
      />
      <CoreCapabilitiesSection
        heading={manufacturingCapabilitiesHeading}
        mobileHeading={manufacturingCapabilitiesMobileHeading}
        items={manufacturingCapabilityItems}
        mobileItems={manufacturingCapabilityMobileItems}
        mobileInitialIndex={1}
      />
      <TechnicianMobileSection
        heading={manufacturingOperator.heading}
        mobileHeading={manufacturingOperator.mobileHeading}
        description={manufacturingOperator.description}
        features={manufacturingOperator.features}
        mobileFeatures={manufacturingOperator.mobileFeatures}
        mobileInitialIndex={manufacturingOperator.mobileInitialIndex}
        imageSrc="/solutions/manufacturing/operator.webp"
        imageAlt="DGlide operator workorder and production task workflow"
        sectionClassName="sol-technician-section--crm"
      />
      <BetterWaySection {...manufacturingBetterWay} />
      <WorkflowChangeSection
        sectionId="core-manufacturing-capabilities"
        title={manufacturingWorkflowChange.title}
        mobileTitle={manufacturingWorkflowChange.mobileTitle}
        subtitle={manufacturingWorkflowChange.subtitle}
        bullets={manufacturingWorkflowChange.bullets}
        mobileBullets={manufacturingWorkflowChange.bullets}
        timelineItems={manufacturingWorkflowChange.timelineItems}
        mobileTimelineItems={manufacturingWorkflowChange.timelineItems}
        mobileInitialIndex={manufacturingWorkflowChange.mobileInitialIndex}
      />
      <RealOperationsSection {...manufacturingRealOperations} />
      <GoLiveFasterSection
        heading={manufacturingGoLive.heading}
        mobileHeading={manufacturingGoLive.mobileHeading}
        description={manufacturingGoLive.description}
        cards={manufacturingGoLive.cards}
        mobileCards={manufacturingGoLive.mobileCards}
      />
      <IntegrationsHubSection
        heading="Connect Process Management With the Systems You Already Use"
        mobileHeading="Connect Process Management to Your Existing Systems"
        description="DGlide integrates with your existing business environment from the start."
        mobileDescription="DGlide integrates with your existing business environment from the scratch."
        nodes={manufacturingIntegrationNodes}
        mobileNodes={manufacturingMobileIntegrationNodes}
      />
      <SolutionsFinalCTA
        eyebrow="See It on Your Workflow"
        heading="See DGlide Manufacturing Process Management Live On Your Production"
        mobileHeading="DGlide Manufacturing Process Management Live "
        buttonLabel="Get A Free Demo!"
      />
      <SolutionsFAQSection
        items={manufacturingFaqItems}
        mobileItems={manufacturingMobileFaqItems}
        mobileDefaultOpenIndex={1}
      />
    </AnimatedPublicPage>
  );
}
