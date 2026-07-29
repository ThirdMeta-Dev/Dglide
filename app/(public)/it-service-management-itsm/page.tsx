import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import FSMHeroSection from "@/components/solutions/sections/FSMHeroSection";
import SolutionsSectionNav from "@/components/solutions/sections/SolutionsSectionNav";
import {
  capabilityTabContent,
  goLiveCards,
  itsmSectionNavItems,
  platformOrbitItems,
  problemCards,
} from "@/data/solutionsPageData";
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
    <AnimatedPublicPage className="solutions-page solutions-page--itsm solutions-page--shared-mobile-ui" staticFirstCount={2}>
      <FSMHeroSection
        mobileHeading="Service Management That Fits Your Workflows"
        mobileDescription="DGlide ITSM helps service, IT, and teams run everything in one configurable system."
        mobileBullets={[
          "Tickets, approvals, and SLAs in one flow",
          "Built for IT, support, and internal ops teams",
          "Configurable workflows at one place",
        ]}
        mobilePrimaryCta="Book a Demo"
        mobileSecondaryCta="ITSM Capabilities"
        secondaryScrollTargetId="core-capabilities"
        mobileImageSrc="/solutions/itsm-hero-mobile.png"
      />
      <SolutionsSectionNav items={itsmSectionNavItems} />
      <FieldServiceProblemSection
        mobileHeading="Where Ticketing Stops, DGlide Takes Over"
        mobileFooterText="Your team isn't slow. Your tool just stops when real workflows begin."
        cards={problemCards.map((card, index) => ({
          ...card,
          mobileDescription: [
            "Requests arrive by email, chat, calls, and forms. Nothing is easily traceable.",
            "Your tool forces one fixed path. Real requests need steps it just can't model.",
            "Tickets sit in inboxes waiting for someone to assign or approve.",
            "Deadlines slip with no warning. Nothing flags a breach or escalates it in time.",
            "The moment a request touches HR, finance, or ops, it falls out back into email.",
          ][index],
        }))}
      />
      <BuiltForSection mobileHeading="Outgrown Ticketing? Upgrade to Smarter Service Management." />
      <OnePlatformSection
        mobileHeading="One Platform for Your Entire Service Workflow"
        mobileFeatures={[
          "One connected flow, not a tool plus six inboxes",
          "See every request's stage in real time",
          "Configure each stage to your workflow",
        ]}
        mobileOrbitItems={[
          {
            ...platformOrbitItems[0],
            id: "schedule",
            label: "Schedule",
          },
          platformOrbitItems[1],
          {
            ...platformOrbitItems[2],
            id: "work-order",
            label: "Work Order",
          },
        ]}
        mobileInitialId="capture"
        mobileFooterText="Every workflow can be configured around how you actually operates."
      />
      <ServiceWorkflowSection
        mobileHeading="From Request to Resolution, Without Losing Control"
        mobileStepDescriptions={[
          "Create service requests from users in one place.",
          "Convert requests into structured jobs with clear ownership & detail.",
          "Allocate work by priority, availability, location, or expertise.",
          "Technicians update status, notes, and service details from the field",
          "Confirm completion with customer validation, and reporting.",
        ]}
        mobileCtaLabel="See FSM Live In Demo"
      />
      <CoreCapabilitiesSection
        mobileHeading="The Capabilities Behind Every Resolved Request"
        mobileInitialIndex={1}
        mobileItems={[
          {
            label: "Work Order Management",
            ...capabilityTabContent["Incident & Request Management"],
            title: "Work Order Management",
            mobileImage: "/business-tabs/itsm-cap-mobile-1-figma.png",
          },
          {
            label: "Incident & Request Management",
            ...capabilityTabContent["Incident & Request Management"],
            title: "Incident & Request Management",
            mobileImage: "/business-tabs/itsm-cap-mobile-2-figma.png",
            mobileFeatures: [
              "Capture every incident and request",
              "Create structured service tickets",
              "Assign priority and ownership",
              "Track status to resolution",
            ],
          },
          {
            label: "Technician Mobile App",
            ...capabilityTabContent["Service Catalog & Self-Service"],
            title: "Technician Mobile App",
            mobileImage: "/business-tabs/itsm-cap-mobile-3-figma.png",
          },
          {
            label: "SLA & Escalations",
            ...capabilityTabContent["SLA & Escalations"],
            title: "SLA & Escalations",
            mobileImage: "/business-tabs/itsm-cap-mobile-4-figma.png",
          },
          {
            label: "Route, Location & Expense",
            ...capabilityTabContent["Approvals & Workflow Automation"],
            title: "Route, Location & Expense",
            mobileImage: "/business-tabs/itsm-cap-mobile-5-figma.png",
          },
          {
            label: "Reports & Dashboards",
            ...capabilityTabContent["Reports & Dashboards"],
            title: "Reports & Dashboards",
            mobileImage: "/business-tabs/itsm-cap-mobile-6-figma.png",
          },
          {
            label: "Integrations",
            ...capabilityTabContent.Integrations,
            title: "Integrations",
            mobileImage: "/business-tabs/itsm-cap-mobile-7-figma.png",
          },
        ]}
      />
      <TechnicianMobileSection mobileHeading="Move Service Beyond the Inbox, Into One Workspace" />
      <BetterWaySection
        mobileHeading="Configurable Software That Scales With Your Business"
        mobileLeftItems={[
          "Fast to start. Difficult to adapt.",
          "Cheap to start, expensive later",
          "Fits the category, not your business.",
        ]}
        mobileRightItems={[
          "Fits at first. Then it becomes a burden",
          "Months to build, years to maintain.",
          "Custom fit comes with a headache.",
        ]}
      />
      <WorkflowChangeSection
        mobileTitle="Software That Evolves With Your Workflows"
        mobileBullets={[
          "Add new request types without a rebuild",
          "Change approval and escalation rules anytime",
          "Extend to new teams without a developer",
        ]}
      />
      <WhatImprovesSection
        mobileDescriptions={[
          "Requests reach the right technician fast.",
          "See every ticket's status as it happens, so nothing is stalled",
          "Faster, more reliable service builds the trust",
          "Track every deadline automatically and escalate before a breach.",
          "Run approvals and cross-team processes your old tool dropped",
          "Work moves itself between stages. Stop chasing updates.",
        ]}
      />
      <RealOperationsSection
        mobileFooterQuote={'"Now I open my phone and see every thing in one single dashboard”'}
        mobileFooterAttribution="- Director, Prompt Lasers"
      />
      <ConfigurablePlatformSection
        mobileFeatures={[
          "Workflow engine",
          "Approvals & escalations",
          "Self-service portal",
          "APIs & webhooks",
          "Forms & templates",
          "Reports & dashboards",
          "SLA logic",
        ]}
        mobileCards={[
          {
            label: "ITSM",
            mobileLabel: "FSM.",
            title: "Fully Configured",
            description:
              "Your field service runs on DGlide's platform, not a siloed tool, so it connects to everything else you operate.",
            bullets: [
              "Built on the same engine",
              "Configured to your service workflow",
            ],
          },
          {
            label: "Configurable Backbone",
            mobileLabel: "Configurable backbone",
            title: "One Engine, Many Workflows",
            description:
              "The backbone that runs FSM also runs sales, process, and internal operations, configured for each, not rebuilt.",
            bullets: [
              "Expand into new workflows anytime",
              "No new tool to buy or learn",
            ],
          },
          {
            label: "Integrations and Data",
            mobileLabel: "Integrations and data.",
            title: "Connected Data",
            description:
              "FSM shares customer, asset, and job data with your CRM, ERP, and other systems, so nothing lives on an island.",
            bullets: [
              "Sync across your existing systems",
              "One source of truth for service data",
            ],
          },
        ]}
      />
      <GoLiveFasterSection
        mobileDescription="A working service management system, configured to your workflows"
        mobileCards={goLiveCards.map((card, index) => ({
          ...card,
          title: [
            "Understand Your Service Workflow",
            "Configure the FSM System",
            "Train Your Teams",
            "Go Live",
            "Keep Improving",
          ][index] ?? card.title,
          description: [
            "Map your requests, work orders, technicians, SLAs, and closure rules.",
            "Adapt forms, workflows, approvals, and dashboards to how you work.",
            "Prepare supervisors, service managers, and technicians to run it.",
            "Start running real service operations inside DGlide.",
            "Use LSM to refine workflows after real usage begins.",
          ][index] ?? card.description,
        }))}
        mobileCtaLabel="Get Started Now"
      />
      <IntegrationsHubSection />
      <SolutionsFinalCTA />
      <SolutionsFAQSection />
    </AnimatedPublicPage>
  );
}
