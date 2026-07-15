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
  manufacturingCapabilityItems,
  manufacturingFaqItems,
  manufacturingGoLive,
  manufacturingHero,
  manufacturingIntegrationNodes,
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
    <AnimatedPublicPage className="solutions-page crm-solutions-page manufacturing-solutions-page" staticFirstCount={2}>
      <FSMHeroSection
        eyebrow={manufacturingHero.eyebrow}
        heading={manufacturingHero.heading}
        description={manufacturingHero.description}
        bullets={manufacturingHero.bullets}
        primaryCta={manufacturingHero.primaryCta}
        secondaryCta={manufacturingHero.secondaryCta}
        secondaryScrollTargetId="core-capabilities"
        imageSrc="/solutions/manufacturing/hero.webp"
        imageAlt="DGlide manufacturing process management dashboard"
        imageClassName="manufacturing-hero-image"
      />
      <SolutionsSectionNav items={manufacturingNavItems} />
      <FieldServiceProblemSection
        sectionId="manufacturing-problem"
        sectionClassName="sol-problem-section--crm"
        heading={manufacturingProblem.heading}
        description={manufacturingProblem.description}
        cards={manufacturingProblem.cards}
        footerText={manufacturingProblem.footerText}
        ctaLabel={manufacturingProblem.ctaLabel}
      />
      <BuiltForSection
        heading={manufacturingBuiltFor.heading}
        description={manufacturingBuiltFor.description}
        centerImage="/solutions/manufacturing/audience.webp"
        fitItems={manufacturingBuiltFor.fitItems}
        industryItems={manufacturingBuiltFor.industryItems}
      />
      <OnePlatformSection
        heading={manufacturingPlatform.heading}
        description={manufacturingPlatform.description}
        features={manufacturingPlatform.features}
        orbitItems={manufacturingPlatform.orbitItems}
        footerText={manufacturingPlatform.footerText}
        ctaLabel={manufacturingPlatform.ctaLabel}
      />
      <ServiceWorkflowSection
        heading={manufacturingWorkflow.heading}
        steps={manufacturingWorkflow.steps}
        ctaLabel={manufacturingWorkflow.ctaLabel}
        sectionId="what-process-management-does"
      />
      <CoreCapabilitiesSection heading={manufacturingCapabilitiesHeading} items={manufacturingCapabilityItems} />
      <TechnicianMobileSection
        heading={manufacturingOperator.heading}
        description={manufacturingOperator.description}
        features={manufacturingOperator.features}
        imageSrc="/solutions/manufacturing/operator.webp"
        imageAlt="DGlide operator workorder and production task workflow"
        sectionClassName="sol-technician-section--crm"
      />
      <BetterWaySection {...manufacturingBetterWay} />
      <WorkflowChangeSection
        sectionId="core-manufacturing-capabilities"
        title={manufacturingWorkflowChange.title}
        subtitle={manufacturingWorkflowChange.subtitle}
        bullets={manufacturingWorkflowChange.bullets}
        timelineItems={manufacturingWorkflowChange.timelineItems}
      />
      <RealOperationsSection {...manufacturingRealOperations} />
      <GoLiveFasterSection heading={manufacturingGoLive.heading} description={manufacturingGoLive.description} cards={manufacturingGoLive.cards} />
      <IntegrationsHubSection
        heading="Connect Process Management With the Systems You Already Use"
        description="DGlide integrates with your existing business environment from the start."
        nodes={manufacturingIntegrationNodes}
      />
      <SolutionsFinalCTA
        eyebrow="See It on Your Workflow"
        heading="See DGlide Manufacturing Process Management Live On Your Production"
        buttonLabel="Get A Free Demo!"
      />
      <SolutionsFAQSection items={manufacturingFaqItems} />
    </AnimatedPublicPage>
  );
}
