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
  crmBetterWay,
  crmBuiltFor,
  crmCapabilitiesHeading,
  crmCapabilityItems,
  crmFaqItems,
  crmGoLive,
  crmHero,
  crmIntegrationNodes,
  crmNavItems,
  crmPlatform,
  crmProblem,
  crmRealOperations,
  crmTechnician,
  crmWorkflow,
  crmWorkflowChange,
} from "@/data/crmPageData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";
const PAGE_URL = `${SITE_URL}/customer-relationship-management-crm`;

export const metadata: Metadata = {
  title: { absolute: "One CRM for Sales, Service & Field Visits | DGlide" },
  description: "DGlide CRM connects sales, service, field visits, and account history in one record, so nothing lives in a separate, disconnected tool.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "One CRM for Sales, Service & Field Visits | DGlide",
    description: "DGlide CRM connects sales, service, field visits, and account history in one record, so nothing lives in a separate, disconnected tool.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: `${SITE_URL}/solutions/crm/hero.webp`, width: 1200, height: 839, alt: "DGlide CRM customer relationship dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One CRM for Sales, Service & Field Visits | DGlide",
    description: "DGlide CRM connects sales, service, field visits, and account history in one record, so nothing lives in a separate, disconnected tool.",
    images: [`${SITE_URL}/solutions/crm/hero.webp`],
  },
};

export default function CRMPage() {
  return (
    <AnimatedPublicPage className="solutions-page crm-solutions-page" staticFirstCount={2}>
      <FSMHeroSection
        eyebrow={crmHero.eyebrow}
        heading={crmHero.heading}
        description={crmHero.description}
        bullets={crmHero.bullets}
        primaryCta={crmHero.primaryCta}
        secondaryCta={crmHero.secondaryCta}
        secondaryScrollTargetId="core-capabilities"
        imageSrc="/solutions/crm/hero.webp"
        imageAlt="DGlide CRM customer relationship dashboard"
        imageClassName="crm-hero-image"
      />
      <SolutionsSectionNav items={crmNavItems} />
      <FieldServiceProblemSection
        sectionId="crm-problem"
        sectionClassName="sol-problem-section--crm"
        heading={crmProblem.heading}
        description={crmProblem.description}
        cards={crmProblem.cards}
        footerText={crmProblem.footerText}
        ctaLabel={crmProblem.ctaLabel}
      />
      <BuiltForSection
        heading={crmBuiltFor.heading}
        description={crmBuiltFor.description}
        centerImage="/solutions/crm/audience-v2.webp"
        fitItems={crmBuiltFor.fitItems}
        industryItems={crmBuiltFor.industryItems}
      />
      <OnePlatformSection
        heading={crmPlatform.heading}
        description={crmPlatform.description}
        features={crmPlatform.features}
        orbitItems={crmPlatform.orbitItems}
        footerText={crmPlatform.footerText}
        ctaLabel={crmPlatform.ctaLabel}
      />
      <ServiceWorkflowSection
        heading={crmWorkflow.heading}
        steps={crmWorkflow.steps}
        ctaLabel={crmWorkflow.ctaLabel}
        sectionId="what-crm-does"
      />
      <CoreCapabilitiesSection heading={crmCapabilitiesHeading} items={crmCapabilityItems} />
      <TechnicianMobileSection
        heading={crmTechnician.heading}
        description={crmTechnician.description}
        features={crmTechnician.features}
        imageSrc="/solutions/crm/mobile.webp"
        imageAlt="DGlide CRM mobile account and visit workflow"
        sectionClassName="sol-technician-section--crm"
      />
      <BetterWaySection {...crmBetterWay} />
      <WorkflowChangeSection
        sectionId="core-crm-capabilities"
        title={crmWorkflowChange.title}
        subtitle={crmWorkflowChange.subtitle}
        bullets={crmWorkflowChange.bullets}
        timelineItems={crmWorkflowChange.timelineItems}
      />
      <RealOperationsSection {...crmRealOperations} />
      <GoLiveFasterSection heading={crmGoLive.heading} description={crmGoLive.description} cards={crmGoLive.cards} />
      <IntegrationsHubSection
        heading="Connect CRM With the Systems You Already Use"
        description="DGlide is designed to work with your existing business environment instead of replacing everything at once."
        nodes={crmIntegrationNodes}
      />
      <SolutionsFinalCTA
        eyebrow="See It on Your Workflow"
        heading="See DGlide CRM Run on Your Real Customer Workflow"
        buttonLabel="Get A Free Demo!"
      />
      <SolutionsFAQSection items={crmFaqItems} />
    </AnimatedPublicPage>
  );
}
