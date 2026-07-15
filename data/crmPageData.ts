import {
  fsmBetterWayDescription,
  fsmBetterWayFooterItems,
  fsmBetterWayHeading,
  fsmBetterWayLeftTitle,
  fsmBetterWayRightTitle,
  fsmCustomBuildItems,
  fsmRealOpsChallengeBullets,
  fsmRealOpsChallengeQuote,
  fsmRealOpsFooterQuote,
  fsmRealOpsHeading,
  fsmRealOpsMetrics,
  fsmRealOpsMetricsDescription,
  fsmRealOpsSolutionItems,
  fsmRigidToolsItems,
} from "@/data/fsmPageData";

export const crmNavItems = [
  { id: "crm-problem", label: "CRM Problem" },
  { id: "who-built-for", label: "Who DGlide CRM Is Built For" },
  { id: "what-crm-does", label: "What DGlide CRM Does" },
  { id: "core-crm-capabilities", label: "Core CRM Capabilities" },
  { id: "integrations", label: "Integrations" },
];

export const crmHero = {
  eyebrow: "Customer Relationship Management",
  heading: "One Customer Record. Not Five Different Stories.",
  description: "DGlide CRM keeps every customer record tied to what's actually happening: service tickets, installs, field visits, and account history, not just sales notes.",
  bullets: [
    "Service history and field visits, tied to every account",
    "No re-entering data between sales, service, and field teams",
    "Configurable pipelines and lifecycle stages, without a custom build",
  ],
  primaryCta: "Book A Free Demo",
  secondaryCta: "CRM Capabilities",
};

export const crmProblem = {
  heading: "This is what happens when a CRM only tracks the sale. Everything after it turns into guesswork.",
  description: "A CRM that stops updating after the sale isn't tracking your customer anymore.",
  footerText: "5 gaps, 1 root cause: your CRM stopped being the place where the truth lives.",
  ctaLabel: "Explore DGlide CRM For You",
  cards: [
    { icon: "/solutions/problem-icons/requests-scattered.png", title: "Status: Closed. Reality: Ongoing", description: "Sales logs the deal as won and moves on. Nobody updates what happens next: installs, complaints, renewals." },
    { icon: "/solutions/problem-icons/rigid-ticket-flows.png", title: "Sales-to-Service Handoff Gap", description: "Service picks up a customer with zero context. They relearn the account from scratch every single time." },
    { icon: "/solutions/problem-icons/manual-approvals.png", title: "Customer History Lives Off-System", description: "Service calls, WhatsApp threads, and spreadsheets hold the real account history. The CRM holds the sales pitch." },
    { icon: "/solutions/problem-icons/sla-gaps.png", title: "No Real Lifecycle Tracking", description: "A lead, a customer, and an AMC account all sit under one static status field that nobody trusts." },
    { icon: "/solutions/problem-icons/workflows-stuck.png", title: "Duplicate Records, No Single View", description: "The same account exists in three different ways across three different teams, and none of them agree." },
  ],
};

export const crmBuiltFor = {
  heading: "One Customer, Many Teams. That's Where Most CRMs Fall Apart.",
  description: "Built for businesses where more than one team needs to know what's happening with a customer.",
  fitItems: [
    { label: "Sales and service sharing the same account" },
    { label: "Accounts tracked in chats and sheets" },
    { label: "Accounts that change status over time" },
    { label: "Repeat business and renewal-driven relationships" },
    { label: "Field visits tied to accounts" },
  ],
  industryItems: [
    { icon: "/solutions/built-for/card-1.png", title: "Hybrid Sales and Service Teams", description: "When the same account moves from sales to service to renewal, DGlide keeps one record instead of three different versions." },
    { icon: "/solutions/built-for/card-2.png", title: "Channel and Distributor-Led Businesses", description: "DGlide tracks dealer and distributor accounts the same way it tracks direct customers, with full visibility across the channel." },
    { icon: "/solutions/built-for/card-3.png", title: "AMC and Renewal-Driven Businesses", description: "When the real relationship is an ongoing AMC contract, DGlide tracks renewal dates, service history, and account status together." },
    { icon: "/solutions/built-for/card-4.png", title: "Growing Teams Outgrowing Spreadsheets", description: "When spreadsheets and WhatsApp threads can't keep up with a growing customer base, DGlide gives the team one system instead." },
  ],
};

export const crmPlatform = {
  heading: "The All-in-One CRM Solution",
  description: "Every stage of a customer relationship, capture to renewal, stays connected in DGlide CRM instead of scattered across tools.",
  features: [
    "Continuity: The account record carries forward through every stage",
    "Real-Time View: See exactly what stage every account is in",
    "Configurability: Change how the pipeline works as your process changes",
  ],
  orbitItems: [
    { id: "capture", label: "Capture", description: "Leads and inquiries from every channel land in one inbox, so nothing sits unseen in someone's phone.", icon: "/solutions/orbit-icons/capture.png", iconSide: "right" as const, left: "17%", top: "32%" },
    { id: "qualify", label: "Qualify", description: "Every lead moves through real pipeline stages, so the team always knows what's actually in progress.", icon: "/solutions/orbit-icons/log-categorize.png", iconSide: "left" as const, left: "68%", top: "12%" },
    { id: "handoff", label: "Handoff", description: "When a deal closes, the full account history moves with it, so service never starts from zero.", icon: "/solutions/orbit-icons/route-approve.png", iconSide: "left" as const, left: "87%", top: "38%" },
    { id: "service", label: "Service", description: "Installs, tickets, and field visits attach automatically to the account, building a real service history.", icon: "/solutions/orbit-icons/resolve.png", iconSide: "left" as const, left: "82%", top: "72%" },
    { id: "renew", label: "Renew", description: "AMC and renewal dates stay tied to the account, so nothing expires without anyone noticing.", icon: "/solutions/orbit-icons/verify-close.png", iconSide: "right" as const, left: "31%", top: "87%" },
    { id: "overview", label: "Overview", description: "See account health, relationship stage, and history in one view, without pulling data from five systems.", icon: "/solutions/orbit-icons/report.png", iconSide: "right" as const, left: "17%", top: "62%" },
  ],
  footerText: "Every stage of the relationship stays connected, from the first inquiry to the last renewal.",
  ctaLabel: "Book A Demo",
};

export const crmWorkflow = {
  heading: "Here’s How Your Workflow Looks With DGlide CRM",
  ctaLabel: "See CRM Live In Demo",
  steps: [
    { title: "Keep the Record Open", description: "A closed deal stays open. Installs, renewals, and complaints keep updating automatically.", icon: "/solutions/workflow-icons/capture.png", active: true },
    { title: "Transfer Full History", description: "Every note, call, and requirement moves with the account the moment it's handed off.", icon: "/solutions/workflow-icons/log-categorize.png", active: false },
    { title: "Log Every Touchpoint", description: "Every call, field visit, and ticket attaches to the account automatically, no manual entry.", icon: "/solutions/workflow-icons/route-approve.png", active: false },
    { title: "Update the Lifecycle Stage", description: "The lifecycle stage updates as the relationship moves, from lead to customer to renewal.", icon: "/solutions/workflow-icons/track-resolution.png", active: false },
    { title: "Sync the Single Record", description: "Sales, service, and billing all view the same record, always current.", icon: "/solutions/workflow-icons/verify-close.png", active: false },
  ],
};

export const crmCapabilitiesHeading = "What's Actually Inside DGlide CRM";
export const crmCapabilityItems = [
  { label: "Contact & Account Management", title: "Contact & Account Management", paragraphs: ["Every account holds contacts, deal history, service records, and notes in one place. Search any customer and see the complete picture instantly, no digging through five tools."], features: ["One record per account", "Full contact and deal history", "Notes and files attached automatically"], whyItMatters: "A single record per account means nobody re-explains the customer relationship from memory.", image: "/business-tabs/crm-cap-1.webp" },
  { label: "Pipeline & Deal Tracking", title: "Pipeline & Deal Tracking", paragraphs: ["Assign the right technician by skill, location, and availability, then dispatch in minutes. See the whole team's day on one board and rebook without phone calls."], features: ["Assign by skill, location, and load", "One board for the whole team", "Reschedule without a round of calls"], whyItMatters: "See exactly what's open, what's stalling, and what's about to close, updated as it happens.", image: "/business-tabs/crm-cap-2.webp" },
  { label: "Service History & Field Sync", title: "Service History & Field Sync", paragraphs: ["Field visits, installs, and tickets sync to the account the moment they're logged, so the record is never behind what's actually happening."], features: ["Field visits sync automatically", "Tickets attach to the right account", "Zero double data entry"], whyItMatters: "Automatic sync means the account record is never a week behind reality.", image: "/business-tabs/crm-cap-3.webp" },
  { label: "Renewals & AMC Tracking", title: "Renewals & AMC Tracking", paragraphs: ["Contract terms, renewal dates, and history stay attached to the account, so nothing lapses without warning."], features: ["Renewal dates tracked automatically", "Reminders before renewal deadlines", "Full contract history on record"], whyItMatters: "An alert before a contract lapses is the difference between renewal and churn.", image: "/business-tabs/crm-cap-4.webp" },
  { label: "Communication & Activity Log", title: "Communication & Activity Log", paragraphs: ["Calls, emails, and WhatsApp messages log to the account automatically, so the full conversation history is visible to anyone who picks up the account next."], features: ["Calls and emails are logged automatically", "WhatsApp history tied to the record", "Full history, visible to any team member"], whyItMatters: "A logged conversation history means no customer has to repeat themselves to a new rep.", image: "/business-tabs/crm-cap-5.webp" },
  { label: "Reports & Dashboards", title: "Reports & Dashboards", paragraphs: ["Pipeline status, account health, and lifecycle stage show up in one dashboard, filterable by team, stage, or account type."], features: ["One view for pipeline and health", "Filter by team, stage, or type", "Live data, no spreadsheet needed"], whyItMatters: "A live dashboard means leadership stops asking for a report that's already three days old.", image: "/business-tabs/crm-cap-6.webp" },
  { label: "Integrations", title: "Integrations", paragraphs: ["DGlide CRM connects natively to FSM, ITSM, Field Sales, and billing, so account data flows across the platform without a separate integration project."], features: ["Native sync with FSM, ITSM, etc.", "Billing synced without setup", "No extra tools required"], whyItMatters: "Native integration means account data stays current everywhere, not just in the CRM tab.", image: "/business-tabs/crm-cap-7.webp" },
];

export const crmTechnician = {
  heading: "Every Visit Starts With Full Context",
  description: "A rep walking into a meeting cold, with no account history, loses credibility before they even sit down. DGlide CRM puts the full account on their phone first.",
  features: [
    { title: "View today's scheduled visits", description: "See every account visit assigned for the day, in the order they're scheduled, before leaving the office.", icon: "/solutions/technician-icons/icon-1.png", active: true },
    { title: "Access full account history", description: "See the account's full history, deal stage, and past notes before the meeting starts, no calling the office to ask.", icon: "/solutions/technician-icons/icon-2.png", active: false },
    { title: "Update the deal stage on the spot", description: "Move the deal to its real stage right after the conversation, not hours later back at a desk.", icon: "/solutions/technician-icons/icon-3.png", active: false },
    { title: "Log meeting notes immediately", description: "Log visit notes right after the meeting, so details don't get lost or reconstructed from memory later.", icon: "/solutions/technician-icons/icon-4.png", active: false },
    { title: "Confirm the visit with a signature", description: "Get sign-off or confirmation from the customer before leaving, so the visit closes clean, no follow-up call needed to confirm.", icon: "/solutions/technician-icons/icon-5.png", active: false },
  ],
};

export const crmBetterWay = { heading: fsmBetterWayHeading, description: fsmBetterWayDescription, leftTitle: fsmBetterWayLeftTitle, rightTitle: fsmBetterWayRightTitle, leftItems: fsmRigidToolsItems, rightItems: fsmCustomBuildItems, footerItems: fsmBetterWayFooterItems };

export const crmWorkflowChange = {
  title: "Accounts Change. Stages Change. Teams Change. DGlide CRM Keeps Up.",
  subtitle: "New deal stages, new account types, new approval rules: none of it stays fixed for long. DGlide CRM adjusts with you, without a rebuild.",
  bullets: ["Add new pipeline stages without a rebuild", "Adjust approval rules as your team grows", "Scale the system without hiring developers"],
  timelineItems: [
    { icon: "/solutions/workflow-change/faster-resolution.png", title: "Quicker First Response", description: "Every inquiry lands in one place, so reps respond before a lead goes cold.", width: 620 },
    { icon: "/solutions/workflow-change/realtime-visibility.png", title: "Better Rep Productivity", description: "Reps know exactly which accounts need attention, what stage they're in, and what to do next.", width: 581 },
    { icon: "/solutions/workflow-change/sla-control.png", title: "Real-Time Pipeline Visibility", description: "See exactly which deals are active, stalled, or closing, updated as it happens, not end of week.", width: 581 },
    { icon: "/solutions/workflow-change/less-manual.png", title: "Renewals, Never Missed", description: "Every renewal date is tracked against the account, with time to act before it lapses.", width: 610 },
    { icon: "/solutions/workflow-change/beyond-ticketing.png", title: "Fewer Repeated Conversations", description: "Full account history means customers never start a conversation from scratch.", width: 664 },
    { icon: "/solutions/workflow-change/better-service.png", title: "Less Manual Coordination", description: "Handoffs happen through the record itself, not a chain of calls and follow-up emails.", width: 740 },
  ],
};

export const crmRealOperations = { heading: fsmRealOpsHeading, challengeQuote: fsmRealOpsChallengeQuote, challengeBullets: fsmRealOpsChallengeBullets, metricsDescription: fsmRealOpsMetricsDescription, metrics: fsmRealOpsMetrics, footerQuote: fsmRealOpsFooterQuote, solutionItems: fsmRealOpsSolutionItems };

export const crmGoLive = {
  heading: "Go Live Faster Without Heavy Implementation",
  description: "Five clear steps from your current chaos to a running CRM system, no long IT project.",
  cards: [
    { step: "01", title: "Understand Your CRM Workflow", description: "Map your leads, accounts, pipelines, handoffs, and renewal rules.", icon: "/solutions/go-live/icon-1.png", offsetTop: 0, cardHeight: 436, shadow: false },
    { step: "02", title: "Configure the CRM System", description: "Adapt fields, pipelines, approvals, and dashboards to how you work.", icon: "/solutions/go-live/icon-2.png", offsetTop: 40, cardHeight: 396, shadow: true },
    { step: "03", title: "Train Your Teams", description: "Prepare sales, service, and account teams to run it.", icon: "/solutions/go-live/icon-3.png", offsetTop: 80, cardHeight: 356, shadow: true },
    { step: "04", title: "Go Live", description: "Start running real customer relationships inside DGlide.", icon: "/solutions/go-live/icon-4.png", offsetTop: 120, cardHeight: 316, shadow: true },
    { step: "05", title: "Keep Improving", description: "Refine pipelines and lifecycle stages after real usage begins.", icon: "/solutions/go-live/icon-5.png", offsetTop: 160, cardHeight: 276, shadow: true },
  ],
};

export const crmIntegrationNodes = {
  left: [
    { label: "FSM systems", icon: "/solutions/built-for/card-1.png" },
    { label: "ITSM tools", icon: "/solutions/integrations-hub/itsm-tools.png" },
    { label: "Accounting and billing tools", icon: "/solutions/integrations-hub/accounting-billing-tools.png" },
  ],
  right: [
    { label: "ERP systems", icon: "/solutions/integrations-hub/erp-systems.svg" },
    { label: "IoT or device data", icon: "/solutions/integrations-hub/iot-device-data.png" },
    { label: "Internal business applications", icon: "/solutions/integrations-hub/internal-business-apps.svg" },
  ],
};

export const crmFaqItems = [
  { question: "We've tried CRMs before and ended up bending our sales process to fit the software. How is DGlide different?", answer: "Most CRMs come with fixed pipeline stages and fields, so you adjust your process to match the software. DGlide configures around how you actually sell, service, and renew, not the other way around.", open: false },
  { question: "How fast can we actually start using it?", answer: "Teams are typically live within weeks. Configure pipeline stages, connect existing data, train the team, and start working, no lengthy build cycle.", open: true },
  { question: "Do we need technical staff to manage this?", answer: "No developers required. Changes to stages, fields, and rules are made through configuration, not custom code.", open: false },
  { question: "Can it connect to our existing systems?", answer: "Yes. DGlide CRM connects natively to FSM, ITSM, Field Sales, and billing, and integrates with common third-party tools, so you're not starting from a blank slate.", open: false },
  { question: "What happens when our sales process changes down the line?", answer: "As your sales or service process changes, DGlide changes with it, no rebuild, no waiting on developers.", open: false },
  { question: "What happens to our existing customer data when we switch?", answer: "Existing customer, deal, and contact data can be imported during setup, so you're not starting from zero on day one.", open: false },
];
