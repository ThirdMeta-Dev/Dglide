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

const crmProblemMobileDescriptions = [
  "Sales logs the deal as won and moves on. Nobody updates what happens next.",
  "Service picks up a customer with no context and relearn the info from scratch.",
  "Service calls, WhatsApp threads, and spreadsheets hold the real account history.",
  "A lead, a customer, and an AMC account all sit under one static status field.",
  "The same account exists in three different ways across three different teams.",
];

const crmMobileFitItems = [
  { label: "Sales and service sharing the same account" },
  { label: "Accounts tracked in chats, sheets" },
  { label: "Accounts that change status over time" },
  { label: "Repeat business and renewal-driven relationships" },
  { label: "Field visits tied to accounts" },
];

const crmMobileIndustryItems = crmBuiltFor.industryItems.map((item, index) => ({
  ...item,
  description:
    index === 1
      ? "DGlide tracks dealer and distributor accounts with full visibility across the channel."
      : item.description,
}));

const crmMobilePlatformFeatures = [
  "Continuity: Visible account records throughout",
  "Real-Time View: See every account in real-time",
  "Configurability: Change how the pipeline works.",
];

const crmMobileOrbitItems = [
  {
    ...crmPlatform.orbitItems[5],
    id: "schedule",
    label: "Schedule",
  },
  crmPlatform.orbitItems[0],
  {
    ...crmPlatform.orbitItems[1],
    id: "work-order",
    label: "Work Order",
  },
  ...crmPlatform.orbitItems.slice(2, 5),
];

const crmMobileCapabilityLabels = [
  "Work Order Management",
  "Pipeline & Deal Tracking",
  "Technician Mobile App",
  "SLA & Escalations",
  "Route, Location & Expense",
  "Reports & Dashboards",
  "Integrations",
];

const crmMobileCapabilityItems = crmCapabilityItems.map((item, index) => ({
  ...item,
  label: crmMobileCapabilityLabels[index] ?? item.label,
  mobileImage: `/business-tabs/crm-cap-mobile-${index + 1}-figma.png`,
  ...(index === 1
    ? {
        title: "Pipeline & Deal Tracking",
        paragraphs: ["See the whole team's day on one board and rebook without phone calls."],
        mobileFeatures: [
          "Assign by skill, location, and load",
          "One board for the whole team",
          "Reschedule without a round of calls",
        ],
        whyItMatters: "See exactly what's open, what's stalling, and what's about to close.",
      }
    : {}),
}));

const crmMobileGoLiveCards = crmGoLive.cards.map((card, index) => {
  const mobileCopy = [
    {
      title: "Understand Your Service Workflow",
      description: "Map your request types, approvals, SLAs, and resolution rules.",
    },
    {
      title: "Configure the CRM System",
      description: "Adapt forms, workflows, approvals, and dashboards to how you work.",
    },
    {
      title: "Train Your Teams",
      description: "Prepare agents, approvers, and service managers to run it.",
    },
    {
      title: "Go Live",
      description: "Start running real service operations inside DGlide.",
    },
    {
      title: "Keep Improving",
      description: "Use the Living Service Model to refine workflows after real usage begins.",
    },
  ][index];

  return mobileCopy ? { ...card, ...mobileCopy } : card;
});

const crmMobileIntegrationNodes = {
  left: [
    crmIntegrationNodes.left[2],
    crmIntegrationNodes.left[0],
    crmIntegrationNodes.left[1],
  ],
  right: crmIntegrationNodes.right,
};

const crmMobileFaqItems = crmFaqItems.map((item, index) => ({
  ...item,
  answer:
    index === 1
      ? "No. DGlide runs IT service, customer support, and internal ops (HR, admin, finance) on one platform, so requests don't fall out of the system at department lines."
      : item.answer,
}));

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
    <AnimatedPublicPage className="solutions-page solutions-page--crm solutions-page--shared-mobile-ui crm-solutions-page" staticFirstCount={2}>
      <FSMHeroSection
        eyebrow={crmHero.eyebrow}
        heading={crmHero.heading}
        description={crmHero.description}
        mobileHeading={"One Customer Record.\nNot Five Different Stories."}
        mobileDescription="DGlide CRM keeps every customer record tied to what's actually happening."
        bullets={crmHero.bullets}
        mobileBullets={[
          "Every data tied to every account",
          "No re-entering data between teams",
          "Configurable pipelines and lifecycle stages.",
        ]}
        primaryCta={crmHero.primaryCta}
        secondaryCta={crmHero.secondaryCta}
        secondaryScrollTargetId="core-capabilities"
        imageSrc="/solutions/crm/hero.webp"
        mobileImageSrc="/solutions/crm/hero-mobile.png"
        imageAlt="DGlide CRM customer relationship dashboard"
        imageClassName="crm-hero-image"
      />
      <SolutionsSectionNav items={crmNavItems} />
      <FieldServiceProblemSection
        sectionId="crm-problem"
        sectionClassName="sol-problem-section--crm"
        heading={crmProblem.heading}
        mobileHeading="Track Customers Beyond the Sale"
        description={crmProblem.description}
        cards={crmProblem.cards.map((card, index) => ({
          ...card,
          mobileDescription: crmProblemMobileDescriptions[index],
        }))}
        footerText={crmProblem.footerText}
        mobileFooterText="5 gaps, 1 root cause: your CRM stopped being accurate"
        ctaLabel={crmProblem.ctaLabel}
      />
      <BuiltForSection
        heading={crmBuiltFor.heading}
        mobileHeading={"One Customer. Every\nTeam. Complete Visibility."}
        description={crmBuiltFor.description}
        centerImage="/solutions/crm/audience-v2.webp"
        fitItems={crmBuiltFor.fitItems}
        mobileFitItems={crmMobileFitItems}
        industryItems={crmBuiltFor.industryItems}
        mobileIndustryItems={crmMobileIndustryItems}
        mobileInitialIndex={1}
      />
      <OnePlatformSection
        heading={crmPlatform.heading}
        mobileHeading={"One CRM for the Entire\nCustomer Journey"}
        description={crmPlatform.description}
        features={crmPlatform.features}
        mobileFeatures={crmMobilePlatformFeatures}
        orbitItems={crmPlatform.orbitItems}
        mobileOrbitItems={crmMobileOrbitItems}
        mobileInitialId="capture"
        footerText={crmPlatform.footerText}
        mobileFooterText="Every stage of the relationship stays connected."
        ctaLabel={crmPlatform.ctaLabel}
      />
      <ServiceWorkflowSection
        heading={crmWorkflow.heading}
        mobileHeading={"Here’s How Your Workflow\nLooks With DGlide CRM"}
        steps={crmWorkflow.steps}
        mobileStepDescriptions={[
          "A closed deal stays open. Everything updates automatically.",
          "Every note, call, and requirement moves with the account.",
          "Every call, field visit, and ticket attaches to the account.",
          "The lifecycle stage updates as the relationship moves.",
          "Sales, service, and billing all view the same record, always current.",
        ]}
        ctaLabel={crmWorkflow.ctaLabel}
        sectionId="what-crm-does"
      />
      <CoreCapabilitiesSection
        heading={crmCapabilitiesHeading}
        mobileHeading="What's Actually Inside DGlide CRM"
        items={crmCapabilityItems}
        mobileItems={crmMobileCapabilityItems}
        mobileInitialIndex={1}
      />
      <TechnicianMobileSection
        heading={crmTechnician.heading}
        mobileHeading={"Every Visit Begins With\nComplete Customer Insight"}
        description={crmTechnician.description}
        features={crmTechnician.features}
        mobileInitialIndex={1}
        imageSrc="/solutions/crm/mobile.webp"
        imageAlt="DGlide CRM mobile account and visit workflow"
        sectionClassName="sol-technician-section--crm"
      />
      <BetterWaySection
        {...crmBetterWay}
        mobileHeading="Configurable Software That Scales With Your Business"
        mobileLeftItems={[
          "Fast to start. Difficult to mend.",
          "Cheap to start, expensive in reviews.",
          "Fits the category, not your business.",
        ]}
        mobileRightItems={[
          "Fits at first. Becomes a burden later",
          "Months to build, yours to maintain & fix.",
          "Custom fit. Custom headache.",
        ]}
        mobileFooterItems={[
          "Configurable operations platform",
          "Fit of a custom build",
          "Ready-to-run systems",
        ]}
      />
      <WorkflowChangeSection
        sectionId="core-crm-capabilities"
        title={crmWorkflowChange.title}
        mobileTitle="A CRM That Adapts as Your Business Changes"
        subtitle={crmWorkflowChange.subtitle}
        bullets={crmWorkflowChange.bullets}
        timelineItems={crmWorkflowChange.timelineItems}
        mobileInitialIndex={1}
      />
      <RealOperationsSection
        {...crmRealOperations}
        mobileFooterQuote={'"Now I open my phone and see every project, every complaint, every shipment."'}
      />
      <GoLiveFasterSection
        heading={crmGoLive.heading}
        mobileHeading="Go Live in Weeks, Not Months"
        description={crmGoLive.description}
        cards={crmGoLive.cards}
        mobileCards={crmMobileGoLiveCards}
      />
      <IntegrationsHubSection
        heading="Connect CRM With the Systems You Already Use"
        description="DGlide is designed to work with your existing business environment instead of replacing everything at once."
        mobileDescription="DGlide integrates with your existing business environment from the scratch."
        nodes={crmIntegrationNodes}
        mobileNodes={crmMobileIntegrationNodes}
      />
      <SolutionsFinalCTA
        eyebrow="See It on Your Workflow"
        heading="See DGlide CRM Run on Your Real Customer Workflow"
        mobileHeading="See DGlide CRM Run on Your Real Service Workflow"
        buttonLabel="Get A Free Demo!"
      />
      <SolutionsFAQSection
        items={crmFaqItems}
        mobileItems={crmMobileFaqItems}
        mobileDefaultOpenIndex={1}
      />
    </AnimatedPublicPage>
  );
}
