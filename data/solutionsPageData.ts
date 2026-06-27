export const sectionNavItems = [
  { id: "field-service-problem", label: "Field Service Problem" },
  { id: "who-built-for", label: "Who Dglide FSM Is Built For" },
  { id: "what-fsm-does", label: "What Dglide FSM Does" },
  { id: "core-capabilities", label: "Core FSM Capabilities" },
  { id: "benefits-outcomes", label: "Benefits & Outcomes" },
  { id: "integrations", label: "Integrations" },
];

export const heroBullets = [
  "Work orders, scheduling, field tracking",
  "Built for machinery, equipment, and service-heavy",
  "Configurable workflows without",
];

export const problemCards = [
  {
    icon: "/solutions/problem-icons/requests-scattered.svg",
    title: "Requests Scattered Across Channels",
    description: "Requests arrive by email, chat, calls, and forms. Nothing lands in one queue you can actually track.",
  },
  {
    icon: "/solutions/problem-icons/rigid-ticket-flows.svg",
    title: "Rigid Ticket Flows",
    description: "Your tool forces one fixed path. Real requests need approvals, branches, and steps it just can't model.",
  },
  {
    icon: "/solutions/problem-icons/manual-approvals.svg",
    title: "Manual Approvals and Routing",
    description: "Tickets sit in inboxes waiting for someone to assign or approve. Work stalls between people.",
  },
  {
    icon: "/solutions/problem-icons/sla-gaps.svg",
    title: "SLA and Escalation Gaps",
    description: "Deadlines slip with no warning. Nothing flags a breach or escalates it before the requester does.",
  },
  {
    icon: "/solutions/problem-icons/workflows-stuck.svg",
    title: "Workflows Stuck at the IT Edge",
    description: "The moment a request touches HR, finance, or ops, it falls out of the tool and back into email.",
  },
];

export const bestFitForItems = [
  "Field technicians & engineers",
  "Manual service requests",
  "Visibility needs",
  "Changing workflows",
  "Changing workflows",
];

const industryItemDescription =
  "Track customer assets, field jobs, service history, and support requests. Track customer assets, field jobs";

export const industryItems = [
  {
    title: "Machinery Manufacturers",
    description: industryItemDescription,
  },
  {
    title: "Equipment Businesses",
    description: industryItemDescription,
  },
  {
    title: "Service-Heavy Manufacturers",
    description: industryItemDescription,
  },
  {
    title: "Installation-Led Businesses",
    description: industryItemDescription,
  },
];

export const platformWorkflowFeatures = [
  "One connected flow, not a tool plus six inboxes",
  "See every request's stage in real time",
  "Configure each stage to how your team actually works",
];

export const platformOrbitItems = [
  {
    id: "report",
    label: "Report",
    description:
      "Track SLA compliance, volume trends, and team performance across all service lines.",
    iconSide: "right" as const,
    icon: "/solutions/orbit-icons/report.svg",
    left: "17%",
    top: "32%",
  },
  {
    id: "capture",
    label: "Capture",
    description:
      "Take in every request from portal, email, and chat in one queue, nothing missed.",
    iconSide: "left" as const,
    icon: "/solutions/orbit-icons/capture.svg",
    left: "68%",
    top: "12%",
  },
  {
    id: "log-categorize",
    label: "Log & Categorize",
    description:
      "Auto-tag and sort every request by type, priority, and affected service in seconds.",
    iconSide: "left" as const,
    icon: "/solutions/orbit-icons/log-categorize.svg",
    left: "87%",
    top: "38%",
  },
  {
    id: "route-approve",
    label: "Route & Approve",
    description:
      "Send requests to the right team or approver with SLA timers running from the start.",
    iconSide: "left" as const,
    icon: "/solutions/orbit-icons/route-approve.svg",
    left: "82%",
    top: "72%",
  },
  {
    id: "resolve",
    label: "Resolve",
    description:
      "Track progress, post updates, and close tickets with a clear audit trail.",
    iconSide: "right" as const,
    icon: "/solutions/orbit-icons/resolve.svg",
    left: "31%",
    top: "87%",
  },
  {
    id: "verify-close",
    label: "Verify & Close",
    description:
      "Confirm resolution with the requester and mark closure with feedback captured.",
    iconSide: "right" as const,
    icon: "/solutions/orbit-icons/verify-close.svg",
    left: "17%",
    top: "62%",
  },
];

export const workflowSteps = [
  {
    title: "Capture the Request",
    description:
      "Create service requests from teams, customers, or internal users, all in one place.",
    icon: "/solutions/workflow-icons/capture.svg",
    active: true,
  },
  {
    title: "Log and Categorize",
    description:
      "Convert requests into structured jobs with clear ownership and detail.",
    icon: "/solutions/workflow-icons/log-categorize.svg",
    active: false,
  },
  {
    title: "Route and Approve",
    description:
      "Allocate work by priority, availability, location, or expertise.",
    icon: "/solutions/workflow-icons/route-approve.svg",
    active: false,
  },
  {
    title: "Track Resolution",
    description:
      "Technicians update status, notes, and service details from the field as work happens.",
    icon: "/solutions/workflow-icons/track-resolution.svg",
    active: false,
  },
  {
    title: "Verify and Close",
    description:
      "Confirm completion with customer validation, clean closure, and reporting.",
    icon: "/solutions/workflow-icons/verify-close.svg",
    active: false,
  },
];

export const capabilityTabs = [
  "Incident & Request Management",
  "Service Catalog & Self-Service",
  "Approvals & Workflow Automation",
  "SLA & Escalations",
  "Asset & Change Visibility",
  "Reports & Dashboards",
  "Integrations",
] as const;

export type CapabilityTab = (typeof capabilityTabs)[number];

export const capabilityTabContent: Record<
  CapabilityTab,
  {
    title: string;
    paragraphs: string[];
    features: string[];
    whyItMatters: string;
    image: string;
  }
> = {
  "Incident & Request Management": {
    title: "Incident & Request Management",
    paragraphs: [
      "Capture every incident and request in one queue, then turn it into a structured ticket with type, priority, owner, and history attached.",
    ],
    features: [
      "Structured tickets with clear ownership",
      "Type, priority, and history on every request",
      "Status visible from raised to resolved",
    ],
    whyItMatters:
      "When requests are structured, nothing gets worked twice or dropped between people.",
    image: "/business-tabs/cap-1-incident.png",
  },
  "Service Catalog & Self-Service": {
    title: "Service Catalog & Self-Service",
    paragraphs: [
      "Give people a portal to raise the right request the right way, from a catalog of services you define. Fewer \"quick question\" emails, cleaner intake.",
    ],
    features: [
      "Self-service portal for requesters",
      "Catalog of defined services",
      "Standardized intake, less back-and-forth",
    ],
    whyItMatters:
      "Good intake means fewer misrouted tickets and faster first responses.",
    image: "/business-tabs/cap-2-catalog.png",
  },
  "Approvals & Workflow Automation": {
    title: "Approvals & Workflow Automation",
    paragraphs: [
      "Build the approvals, routing, and multi-step flows your real processes need, across IT and beyond. Tickets move by rule, not by someone remembering to forward them.",
    ],
    features: [
      "Multi-step approvals and routing",
      "Rules across IT, HR, finance, and ops",
      "Workflows configured, not coded",
    ],
    whyItMatters:
      "Automated routing stops work from stalling in inboxes between people.",
    image: "/business-tabs/cap-3-approvals.png",
  },
  "SLA & Escalations": {
    title: "SLA & Escalations",
    paragraphs: [
      "Set response and resolution targets per service or contract. DGlide tracks every clock automatically and escalates a ticket before it breaches, not after the complaint.",
    ],
    features: [
      "SLA timers per service or team",
      "Automatic escalation before a breach",
      "Breach risk visible in real time",
    ],
    whyItMatters:
      "Catching a slipping SLA early protects the service experience people judge you on.",
    image: "/business-tabs/cap-4-sla.png",
  },
  "Asset & Change Visibility": {
    title: "Asset & Change Visibility",
    paragraphs: [
      "Link requests to the assets, systems, and changes they affect, so agents see context and changes don't collide. ITAM and change tracking without enterprise overhead.",
    ],
    features: [
      "Assets linked to tickets and history",
      "Change tracking and a basic calendar",
      "Context on every related system",
    ],
    whyItMatters:
      "When agents see the asset and recent changes, they resolve faster and break less.",
    image: "/business-tabs/cap-5-asset.png",
  },
  "Reports & Dashboards": {
    title: "Reports & Dashboards",
    paragraphs: [
      "See response times, SLA performance, agent productivity, and request trends in one dashboard. Spot the bottleneck before it costs you a contract or a renewal.",
    ],
    features: [
      "Response, SLA, and productivity in one view",
      "Trends across teams and request types",
      "Export-ready for reviews",
    ],
    whyItMatters:
      "When you can see where service slows down, you fix the pattern, not just one ticket.",
    image: "/business-tabs/cap-6-reports.png",
  },
  Integrations: {
    title: "Integrations",
    paragraphs: [
      "Connect DGlide to your CRM, HRMS, ERP, and monitoring tools so request, asset, and customer data stays in sync. Service stops being an island.",
    ],
    features: [
      "Sync with CRM, HRMS, ERP, and FSM",
      "Asset and customer data stays current",
      "No double entry between systems",
    ],
    whyItMatters:
      "When systems share data, your team stops re-keying and your records finally match.",
    image: "/business-tabs/cap-7-integrations.png",
  },
};

export const technicianFeatures = [
  {
    title: "See your assigned queue",
    description: "Every agent sees their tickets, priorities, and SLA clocks in one view, no hunting.",
    icon: "/solutions/workflow-icons/capture.svg",
    active: true,
  },
  {
    title: "Open full request context",
    description: "Pull up history, linked assets, and past tickets before starting work.",
    icon: "/solutions/workflow-icons/log-categorize.svg",
    active: false,
  },
  {
    title: "Update status in real time",
    description: "Move a ticket through stages as it happens, so everyone sees progress live.",
    icon: "/solutions/workflow-icons/track-resolution.svg",
    active: false,
  },
  {
    title: "Log actions and resolution notes",
    description: "Capture what was done and why, right on the ticket.",
    icon: "/solutions/workflow-icons/route-approve.svg",
    active: false,
  },
  {
    title: "Close with requester confirmation",
    description: "Capture sign-off so closure is clean, billable, and auditable.",
    icon: "/solutions/workflow-icons/verify-close.svg",
    active: false,
  },
];

export const rigidToolsItems = [
  "Fast to start. Your business bends to fit the software.",
  "Cheap to start, expensive in workarounds.",
  "Fits the category, not your business.",
];

export const customBuildItems = [
  "Fits at first. Becomes a software project you own forever.",
  "Months to build, years to maintain, yours to fix.",
  "Custom fit comes with a custom headache.",
];

export const betterWayFooterItems = [
  "Ready to Run",
  "Configured to Your Process",
  "Adapts as You Change",
];

export const workflowChangeTitle =
  "Your Processes Keep Changing. Your System Should Keep Up.";

export const workflowChangeSubtitle =
  "New request types, approval rules, teams, escalation paths: it all keeps shifting. DGlide shifts with it, no rebuild.";

export const workflowChangeBullets = [
  "Add new request types without a rebuild",
  "Change approval and escalation rules anytime",
  "Extend to new teams as you grow, no developers needed",
];

export const workflowTimelineItems = [
  {
    icon: "/solutions/workflow-change/faster-resolution.svg",
    title: "Faster Resolution",
    description:
      "Requests reach the right person in minutes, not after rounds of forwarding.",
    width: 620,
  },
  {
    icon: "/solutions/workflow-change/realtime-visibility.svg",
    title: "Real-Time Request Visibility",
    description:
      "See every ticket's status as it happens, with no chasing for updates.",
    width: 581,
  },
  {
    icon: "/solutions/workflow-change/sla-control.svg",
    title: "Stronger SLA Control",
    description:
      "Track every deadline and escalate before a breach, not after.",
    width: 581,
  },
  {
    icon: "/solutions/workflow-change/less-manual.svg",
    title: "Less Manual Coordination",
    description:
      "Approvals and routing happen by rule, so work moves itself.",
    width: 610,
  },
  {
    icon: "/solutions/workflow-change/beyond-ticketing.svg",
    title: "Workflows Beyond Ticketing",
    description:
      "Run cross-team processes your old tool couldn't model.",
    width: 664,
  },
  {
    icon: "/solutions/workflow-change/better-service.svg",
    title: "Better Service Experience",
    description:
      "Faster, more reliable service your requesters actually notice.",
    width: 740,
  },
];

export type ImprovesFeatureAlign = "left" | "center" | "right";

export const improvesFeatures: {
  title: string;
  description: string;
  align: ImprovesFeatureAlign;
  icon?: string;
}[] = [
  {
    title: "Faster Service Response",
    description:
      "Requests reach the right technician fast, so jobs start sooner and customers wait less.",
    align: "left",
    icon: "/solutions/what-improves/icon-faster-service-response.svg",
  },
  {
    title: "Real-Time Request Visibility",
    description:
      "See every ticket's status as it happens, so nothing stalls unseen or gets forgotten.",
    align: "center",
    icon: "/solutions/what-improves/icon-real-time-visibility.svg",
  },
  {
    title: "Better Service Experience",
    description:
      "Faster, more reliable service builds the trust that keeps teams and customers happy.",
    align: "right",
    icon: "/solutions/what-improves/icon-better-service-experience.svg",
  },
  {
    title: "Stronger SLA Control",
    description:
      "Track every deadline automatically and escalate before a breach, protecting the contracts you depend on.",
    align: "left",
    icon: "/solutions/what-improves/icon-stronger-sla-control.svg",
  },
  {
    title: "Workflows Beyond Ticketing",
    description:
      "Run approvals and cross-team processes your old tool forced back into email.",
    align: "center",
    icon: "/solutions/what-improves/icon-workflows-beyond-ticketing.svg",
  },
  {
    title: "Less Manual Coordination",
    description:
      "Work moves itself between stages, so your team stops chasing updates and approvals.",
    align: "right",
    icon: "/solutions/what-improves/icon-less-manual-coordination.svg",
  },
];

export const realOpsChallengeQuote =
  "We were spending lakhs to generate leads, then losing them because nobody saw the alert in time.";

export const realOpsChallengeBullets = [
  "No real-time visibility",
  "No structured follow-up",
];

export const realOpsMetricsDescription =
  "With one system tracking every lead, project, and complaint, response times collapsed and almost nothing slipped.";

export const realOpsMetrics = [
  { value: "3X", label: "More Leads Captured" },
  { value: "8 min", label: "Response Time, from 40+" },
];

export const realOpsFooterQuote =
  "“Now I open my phone and see every project, every complaint, every shipment. That changed how I run the company.” — Director, Prompt Lasers";

export const realOpsSolutionItems = [
  "One system for every lead, project, and complaint",
  "Instant alerts the moment a lead comes in",
  "Response time cut from 40+ minutes to 8",
  "Full visibility across projects and shipments",
  "No ERP cost, no rip-and-replace",
  "Configured to how Prompt Lasers actually runs",
];

export const platformSectionDescription =
  "DGlide ITSM isn't a disconnected ticketing tool. It runs on the same operational backbone that powers workflows across service, sales, field, and internal operations.";

export const platformFeatures = [
  "Workflow engine",
  "Forms and templates",
  "Approvals and escalations",
  "SLA logic",
  "Self-service portal",
  "Reports and dashboards",
  "APIs and webhooks",
];

export const platformCards = [
  {
    label: "ITSM",
    title: "Fully Configured",
    description:
      "Your field service runs on DGlide's platform, not a siloed tool, so it connects to everything else you operate.",
    bullets: ["Built on the same engine", "Configured to your service workflow"],
  },
  {
    label: "Configurable Backbone",
    title: "One Engine",
    description:
      "The backbone that runs ITSM also runs FSM, sales, and internal ops, configured for each, not rebuilt.",
    bullets: ["Expand into new workflows anytime", "No new tool to buy or learn"],
  },
  {
    label: "Integrations and Data",
    title: "Connected Data",
    description:
      "ITSM shares request, asset, and customer data with your CRM, HRMS, and ERP, so nothing lives on an island.",
    bullets: ["Sync across your existing systems", "One source of truth for service data"],
  },
];

export const goLiveSectionDescription =
  "A working service management system, configured to your workflows and live in weeks, not a year-long ITIL rollout.";

export const goLiveCards = [
  {
    step: "01",
    title: "Understand Your Service Workflow",
    description:
      "Map your request types, approvals, SLAs, and resolution rules.",
    icon: "/solutions/go-live/icon-1.svg",
    offsetTop: 0,
    cardHeight: 436,
    shadow: false,
  },
  {
    step: "02",
    title: "Configure the FSM System",
    description:
      "Adapt forms, workflows, approvals, and dashboards to how you work.",
    icon: "/solutions/go-live/icon-2.svg",
    offsetTop: 36,
    cardHeight: 400,
    shadow: true,
  },
  {
    step: "03",
    title: "Train Your Teams",
    description: "Prepare agents, approvers, and service managers to run it.",
    icon: "/solutions/go-live/icon-3.svg",
    offsetTop: 0,
    cardHeight: 436,
    shadow: true,
  },
  {
    step: "04",
    title: "Go Live",
    description: "Start running real service operations inside DGlide.",
    icon: "/solutions/go-live/icon-4.svg",
    offsetTop: 80,
    cardHeight: 356,
    shadow: true,
  },
  {
    step: "05",
    title: "Keep Improving",
    description:
      "Use the Living Service Model to refine workflows after real usage begins.",
    icon: "/solutions/go-live/icon-5.svg",
    offsetTop: 144,
    cardHeight: 292,
    shadow: true,
  },
];

export const integrationSectionDescription =
  "DGlide integrates with your existing business environment from the scratch.";

export const integrationNodes = {
  left: [
    { label: "CRM systems", icon: "/solutions/integrations-hub/crm-systems.png" },
    { label: "ITSM tools", icon: "/solutions/integrations-hub/itsm-tools.png" },
    { label: "Accounting and billing tools", icon: "/solutions/integrations-hub/accounting-billing-tools.png" },
  ],
  right: [
    { label: "ERP systems", icon: "/solutions/integrations-hub/erp-systems.svg" },
    { label: "IoT or device data", icon: "/solutions/integrations-hub/iot-device-data.png" },
    { label: "Internal business applications", icon: "/solutions/integrations-hub/internal-business-apps.svg" },
  ],
};

export const finalCtaEyebrow = "See It on Your Workflow";

export const finalCtaHeading =
  "See DGlide Run on Your Real Service Workflow";

export const faqItems = [
  {
    question: "We already have a ticketing tool. Why DGlide?",
    answer:
      "Ticketing tools manage tickets. DGlide runs the full workflow around them: approvals, cross-team steps, and processes your tool can't model, all configurable.",
    open: false,
  },
  {
    question: "Is this only for IT?",
    answer:
      "No. DGlide runs IT service, customer support, and internal ops (HR, admin, finance) on one platform, so requests don't fall out of the system at department lines.",
    open: true,
  },
  {
    question: "Do we need ITIL or a big implementation?",
    answer:
      "No. DGlide gives you structured service workflows without enterprise ITIL weight. Most teams go live in weeks, configured, not coded.",
    open: false,
  },
  {
    question: "Can non-IT teams build their own workflows?",
    answer:
      "Yes. Forms, approvals, and workflows are configured, not coded. Service and ops managers adjust them without developers.",
    open: false,
  },
  {
    question: "Our processes keep changing. Will it keep up?",
    answer:
      "Yes, that's the Living Service Model. After go-live you reshape workflows, add request types, and change rules with no rebuild.",
    open: false,
  },
  {
    question: "Will it work with our other systems?",
    answer:
      "Yes. DGlide connects to CRM, HRMS, ERP, FSM, and monitoring tools, so request, asset, and customer data stays in sync.",
    open: false,
  },
  {
    question: "Is it built for teams our size?",
    answer:
      "DGlide fits service and ops teams of roughly 50 to 1000 people that have outgrown rigid ticketing but don't want enterprise ITSM weight.",
    open: false,
  },
];
