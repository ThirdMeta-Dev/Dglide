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
    title: "Scattered Service Requests",
    description: "Your system adapts to how not from scratch lorem ipsum",
  },
  {
    title: "Manual Technician Assignment",
    description: "Your system adapts to how not from scratch lorem ipsum",
  },
  {
    title: "No Real-Time Field Visibility",
    description: "Your system adapts to how not from scratch lorem ipsum",
  },
  {
    title: "SLA and Escalation Gaps",
    description: "Your system adapts to how not from scratch lorem ipsum",
  },
  {
    title: "Weak Closure Control",
    description: "Your system adapts to how not from scratch lorem ipsum",
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
  "Fits Your Workflow",
  "Fits Your Workflow",
  "Fits Your Workflow",
];

const platformNodeDescription =
  "Dglide FSM connects every step of your field service operation, from service request to job";

export const platformOrbitItems = [
  {
    id: "report",
    label: "Report",
    description: platformNodeDescription,
    iconSide: "right" as const,
    left: "17%",
    top: "32%",
  },
  {
    id: "request",
    label: "Request",
    description: platformNodeDescription,
    iconSide: "left" as const,
    left: "68%",
    top: "12%",
  },
  {
    id: "work-order",
    label: "Work Order",
    description: platformNodeDescription,
    iconSide: "left" as const,
    left: "87%",
    top: "38%",
  },
  {
    id: "schedule",
    label: "Schedule",
    description: platformNodeDescription,
    iconSide: "left" as const,
    left: "82%",
    top: "72%",
  },
  {
    id: "execute",
    label: "Execute",
    description: platformNodeDescription,
    iconSide: "right" as const,
    left: "31%",
    top: "87%",
  },
  {
    id: "verify",
    label: "Verify",
    description: platformNodeDescription,
    iconSide: "right" as const,
    left: "17%",
    top: "62%",
  },
];

export const workflowSteps = [
  {
    title: "Capture the Request",
    description:
      "Create service requests from teams, customers, or internal users.",
    active: true,
  },
  {
    title: "Create the Work Order",
    description:
      "Convert requests into structured jobs with clear ownership.",
    active: true,
  },
  {
    title: "Assign the Technician",
    description:
      "Allocate work based on priority, availability, location, or expertise.",
    active: false,
  },
  {
    title: "Track Field Execution",
    description:
      "Technicians update job status, notes, service details, and progress from the field.",
    active: false,
  },
  {
    title: "Verify and Close",
    description:
      "Confirm completion with customer validation, job closure, and reporting.",
    active: false,
  },
];

export const capabilityTabs = [
  "Work Order Management",
  "Scheduling & Dispatch",
  "Technician Mobile App",
  "SLA & Escalations",
  "Route, Location & Expense",
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
  }
> = {
  "Work Order Management": {
    title: "Work Order Management",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
  "Scheduling & Dispatch": {
    title: "Scheduling & Dispatch",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
  "Technician Mobile App": {
    title: "Technician Mobile App",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
  "SLA & Escalations": {
    title: "SLA & Escalations",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
  "Route, Location & Expense": {
    title: "Route, Location & Expense",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
  "Reports & Dashboards": {
    title: "Reports & Dashboards",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
  Integrations: {
    title: "Integrations",
    paragraphs: [
      "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
      "When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
    ],
    features: [
      "Work orders, scheduling, field tracking",
      "Built for machinery, equipment, and service-heavy",
      "Configurable workflows without",
    ],
    whyItMatters:
      "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply of the type.",
  },
};

export const technicianFeatures = [
  {
    title: "View assigned work orders",
    description: "",
    active: false,
  },
  {
    title: "Access customer and asset details",
    description:
      "Track Customer Assets, Field Jobs, Service History, And Support Requests. Track Customer Assets, Field Jobs",
    active: true,
  },
  {
    title: "Update job status in real time",
    description: "",
    active: false,
  },
  {
    title: "Add service notes and completion details",
    description: "",
    active: false,
  },
  {
    title: "Close jobs with customer confirmation",
    description: "",
    active: false,
  },
];

export const hubCenterItems = [
  "Disconnected tools create",
  "Disconnected tools create",
  "Disconnected tools create lorem ipsum",
];

export const rigidToolsItems = [
  "Disconnected tools create manual",
  "Disconnected create manual",
  "Disconnected tools create",
];

export const customBuildItems = [
  "Disconnected tools create",
  "Disconnected tools create manual",
  "Disconnected create manual",
];

export const workflowChangeSubtitle =
  "New service types, technician rules, customer expectations, escalation paths";

export const workflowChangeBullets = [
  "Work orders, scheduling, field",
  "Built for machinery, equipment, and",
  "Configurable workflows without",
];

export const workflowTimelineItems = [
  {
    title: "Faster Service Response",
    description: "",
    width: 620,
  },
  {
    title: "Better Technician Productivity",
    description:
      "Field teams know what to do, where to go, and what to update.",
    width: 581,
  },
  {
    title: "Real-Time Operational Visibility",
    description: "",
    width: 581,
  },
  {
    title: "Stronger SLA Control",
    description: "",
    width: 610,
  },
  {
    title: "Improved Customer Experience",
    description: "",
    width: 664,
  },
  {
    title: "Less Manual Coordination",
    description: "",
    width: 740,
  },
];

export type ImprovesFeatureAlign = "left" | "center" | "right";

export const improvesFeatures: {
  title: string;
  description: string;
  align: ImprovesFeatureAlign;
}[] = [
  {
    title: "Faster Service Response",
    description:
      "Lorem ipsim is simply model is not one product lorem ipsum is",
    align: "left",
  },
  {
    title: "Better Technician Productivity",
    description:
      "Lorem ipsim is simply model is not one product lorem ipsum is",
    align: "center",
  },
  {
    title: "Real-Time Operational Visibility",
    description:
      "Lorem ipsim is simply model is not one product lorem ipsum is",
    align: "right",
  },
  {
    title: "Stronger SLA Control",
    description:
      "Lorem ipsim is simply model is not one product lorem ipsum is",
    align: "left",
  },
  {
    title: "Improved Customer Experience",
    description:
      "Lorem ipsim is simply model is not one product lorem ipsum is",
    align: "center",
  },
  {
    title: "Less Manual Coordination",
    description:
      "Lorem ipsim is simply model is not one product lorem ipsum is",
    align: "right",
  },
];

export const realOpsChallengeQuote =
  "The lack of real-time visibility created a 40% lag in service resolution times lorem ipsum is simply dummy text of the type.";

export const realOpsChallengeBullets = [
  "Automated Operational Flows",
  "Workflow Coordination",
];

export const realOpsMetricsDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry";

export const realOpsMetrics = [
  { value: "Real Time", label: "Updated Speed" },
  { value: "92%", label: "Efficiency Gain" },
];

export const realOpsFooterQuote =
  "The lack of real-time visibility created a 40% lag in service resolute times lorem ipsum is simply dummy text of the type.";

export const realOpsSolutionItems = [
  "Disconnected tools create manual",
  "Disconnected create manual",
  "Disconnected tools create manual lorem is",
  "Disconnected tools create",
  "Disconnected tools create",
  "Disconnected tools create",
];

export const platformSectionDescription =
  "Dglide FSM is not a disconnected field service tool. It runs on the same operational backbone that powers workflows across service, sales, process, and internal operations.";

export const platformFeatures = [
  "Workflow engine",
  "Forms and templates",
  "Approvals and escalations",
  "SLA logic",
  "Reports and dashboards",
  "Mobile access",
  "APIs and webhooks",
];

export const platformCards = [
  {
    label: "FSM.",
    title: "Enterprise Suites",
    description:
      "Dglide FSM is not a disconnected field service tool. It runs on the same operational backbone",
    bullets: ["Real-Time Visibility", "Automated Operational Flows"],
  },
  {
    label: "Configurable backbone.",
    title: "Enterprise Suites",
    description:
      "Dglide FSM is not a disconnected field service tool. It runs on the same operational backbone",
    bullets: ["Real-Time Visibility", "Automated Operational Flows"],
  },
  {
    label: "Integrations and data.",
    title: "Enterprise Suites",
    description:
      "Dglide FSM is not a disconnected field service tool. It runs on the same operational backbone",
    bullets: ["Real-Time Visibility", "Automated Operational Flows"],
  },
];

export const goLiveSectionDescription =
  "Lorem ipsim is simply model is not one product. It is a connected";

export const goLiveCards = [
  {
    step: "01",
    title: "Understand Your Service Workflow",
    description:
      "Map requests, work orders, technicians, SLAs, and closure rules.",
    offsetTop: 0,
    cardHeight: 436,
    shadow: false,
  },
  {
    step: "02",
    title: "Configure the FSM System",
    description: "Adapt forms, workflows, approvals, and dashboards.",
    offsetTop: 36,
    cardHeight: 400,
    shadow: true,
  },
  {
    step: "03",
    title: "Train Your Teams",
    description: "Prepare supervisors, service managers, and technicians.",
    offsetTop: 0,
    cardHeight: 436,
    shadow: true,
  },
  {
    step: "04",
    title: "Go Live",
    description: "Start running service operations inside Dglide.",
    offsetTop: 80,
    cardHeight: 356,
    shadow: true,
  },
  {
    step: "05",
    title: "Keep Improving",
    description: "Use LSM to refine workflows after real usage begins.",
    offsetTop: 144,
    cardHeight: 292,
    shadow: true,
  },
];

export const integrationSectionDescription =
  "Dglide is designed to work with your existing business environment instead of replacing everything at once.";

export const integrationNodes = {
  left: ["CRM systems", "ITSM tools", "CRM systems"],
  right: ["ERP systems", "IoT or device data", "Internal business applications"],
};

export const finalCtaEyebrow = "Lorem ipsum is simply";

export const finalCtaHeading =
  "Lorem Ipsum is simply dummy text of the printing and typeset";

export const faqItems = [
  {
    question: "Lorem Ipsum is simply dummy text of the printing and",
    answer: "",
    open: false,
  },
  {
    question: "Disconnected tools create manual friction.",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum is simply dummy Lorem Lorem Ipsum is simp",
    open: true,
  },
  {
    question: "Lorem Ipsum is simply dummy text of the printing and",
    answer: "",
    open: false,
  },
  {
    question: "Reactive states replace strategic momentum.",
    answer: "",
    open: false,
  },
];
