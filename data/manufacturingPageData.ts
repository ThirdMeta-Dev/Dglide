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

const ICON_ROOT = "/solutions/manufacturing/icons";

export const manufacturingNavItems = [
  { id: "manufacturing-problem", label: "Production Problem" },
  { id: "who-built-for", label: "Who Process Management Is Built For" },
  { id: "what-process-management-does", label: "What Process Management Does" },
  { id: "core-manufacturing-capabilities", label: "Core Process Management Capabilities" },
  { id: "integrations", label: "Integrations" },
];

export const manufacturingHero = {
  eyebrow: "Manufacturing Process Management",
  mobileEyebrow: "Customer Relationship Management",
  heading: "Every Component Has a Workorder. Track Them All in One Place",
  description: "DGlide Process Management breaks each product's bill of materials into component work orders and tracks every assembly, QC, and packaging task in one place.",
  mobileHeading: "Every Component Has a Workorder. Track It in one place.",
  mobileDescription: "DGlide Process Management breaks each product's entire track record in one place.",
  bullets: [
    "Auto-generate component workorders from your BOM",
    "Dependency control across work orders and tasks",
    "Inventory validated before production starts",
  ],
  mobileBullets: [
    "Auto-generate component work orders",
    "Dependency control across work orders",
    "Inventory validated before production starts",
  ],
  primaryCta: "Book A Free Demo",
  secondaryCta: "See Capabilities",
};

export const manufacturingProblem = {
  heading: "Production Doesn't Break at the Product Level. It Breaks at the Component Level",
  mobileHeading: "Connected Operations Keep Production Running Smoothly",
  description: "When products, work orders, and inventory live in separate tools, the gaps hide until production stalls.",
  footerText: "One missed component is all it takes to turn an on-time build late.",
  mobileFooterText: "One missed component is all it takes to turn an on-time build late.",
  ctaLabel: "Explore DGlide Process Management",
  mobileCtaLabel: "Explore Process Management",
  cards: [
    { icon: `${ICON_ROOT}/problem-1.png`, title: "Disconnected Processes", description: "Your BOM is in one system, work orders in another, inventory in a third. Nothing connects the three.", mobileDescription: "Your BOM is in one system, work orders in another, inventory in a third." },
    { icon: `${ICON_ROOT}/problem-2.png`, title: "No Assembly Visibility", description: "You see the finished product on the schedule, but not where each component work order actually stands.", mobileDescription: "You see the finished product on the schedule, not where work order actually stands." },
    { icon: `${ICON_ROOT}/problem-3.png`, title: "Manual Component Tracking", description: "Every sub-assembly and task gets tracked by hand on spreadsheets and whiteboards. It breaks as volume grows.", mobileDescription: "Every sub-assembly and task gets tracked by hand on spreadsheets and whiteboards." },
    { icon: `${ICON_ROOT}/problem-4.png`, title: "Inventory Runs Short Mid-Build", description: "Nobody confirms material availability until production stalls. The shortage surfaces after the work order has already started.", mobileDescription: "Nobody confirms material availability until production stalls." },
    { icon: `${ICON_ROOT}/problem-5.png`, title: "Dependencies Cause Delays", description: "Final assembly waits on a component nobody flagged as late. One missed dependency stalls the entire build.", mobileDescription: "Final assembly gets stalled because of someone missed to flag a component." },
  ],
};

export const manufacturingBuiltFor = {
  heading: "If Your Product Has a Bill of Materials, This Was Built for You.",
  mobileHeading: "Built for Manufacturers Using Bill of Materials",
  description: "DGlide Process Management fits manufacturers who build products from components, sub-assemblies, and multi-step tasks.",
  fitItems: [
    { label: "Assembly-based or discrete manufacturing" },
    { label: "Multi-stage production with dependencies" },
    { label: "Component steps with prerequisites" },
    { label: "Sub-assemblies tracked on spreadsheets" },
    { label: "Production status kept in Excel" },
    { label: "Production gated by material availability" },
    { label: "Multiple products, variants, or models" },
  ],
  mobileFitItems: [
    { label: "Assembly-based or discrete manufacturing" },
    { label: "Multi-stage production with dependencies" },
    { label: "Component steps with prerequisites" },
    { label: "Sub-assemblies tracked on spreadsheets" },
    { label: "Production status kept in Excel" },
    { label: "Production gated by material availability" },
  ],
  industryItems: [
    { icon: `${ICON_ROOT}/built-for-1.png`, title: "Multi-Level Assembly Manufacturers", description: "When a product is built from sub-assemblies, DGlide explodes the BOM into component work orders and tracks each one to completion." },
    { icon: `${ICON_ROOT}/built-for-2.png`, title: "Made-to-Order & Configurable Products", description: "When each order has a different configuration, DGlide adapts the workorders and tasks to match, without a custom build." },
    { icon: `${ICON_ROOT}/built-for-3.png`, title: "Industrial Machinery & Equipment Makers", description: "For machinery built from many parts and stages, DGlide tracks assembly, QC, and testing tasks against one connected work order." },
    { icon: `${ICON_ROOT}/built-for-4.png`, title: "Multi-Line Production Teams", description: "DGlide scales across products and variants, so adding a new line doesn't mean a new system." },
  ],
  mobileIndustryItems: [
    { icon: `${ICON_ROOT}/built-for-1.png`, title: "Multi-Level Assembly Manufacturers", description: "When a product is built from sub-assemblies, DGlide explodes the BOM into component work orders and tracks each one to completion." },
    { icon: `${ICON_ROOT}/built-for-2.png`, title: "Made-to-Order & Configurable Products", description: "DGlide adapts the work orders and tasks to match, without a custom build." },
    { icon: `${ICON_ROOT}/built-for-3.png`, title: "Industrial Machinery & Equipment Makers", description: "For machinery built from many parts and stages, DGlide tracks assembly, QC, and testing tasks against one connected work order." },
    { icon: `${ICON_ROOT}/built-for-4.png`, title: "Multi-Line Production Teams", description: "DGlide scales across products and variants, so adding a new line doesn't mean a new system." },
  ],
  mobileInitialIndex: 1,
};

export const manufacturingPlatform = {
  heading: "One Platform for the Whole Production Lifecycle",
  mobileHeading: "One Platform for End-to-End Production Management",
  description: "DGlide connects every stage of production, from defining the BOM to shipping the finished build, in one platform.",
  features: [
    "Unified Platform: Products, work orders, tasks, and inventory run on one platform.",
    "Live Tracking: See the real status of every component workorder and task",
    "Rule-Based Execution: Keep the build in sequence, with inventory validated up front.",
  ],
  mobileFeatures: [
    "Unified Platform",
    "Live Tracking",
    "Rule-Based Execution",
  ],
  orbitItems: [
    { id: "bom", label: "BOM", description: "Set up the product structure and BOM once, and the build flows from it.", icon: `${ICON_ROOT}/orbit-1.png`, iconSide: "left" as const, left: "68%", top: "12%" },
    { id: "generate", label: "Generate", description: "The system auto-generates component-level sub-workorders from the product structure, no manual setup.", icon: `${ICON_ROOT}/orbit-2.png`, iconSide: "left" as const, left: "87%", top: "38%" },
    { id: "allocate", label: "Allocate", description: "Material availability is checked up front, and stock is allocated to each work order.", icon: `${ICON_ROOT}/orbit-3.png`, iconSide: "right" as const, left: "31%", top: "87%" },
    { id: "tasks", label: "Tasks", description: "Assembly, QC, testing, and packaging tasks run with clear ownership at every step.", icon: `${ICON_ROOT}/orbit-4.png`, iconSide: "left" as const, left: "82%", top: "72%" },
    { id: "status", label: "Status", description: "Track progress and dependencies as the build moves, with nothing starting out of order.", icon: `${ICON_ROOT}/orbit-5.png`, iconSide: "right" as const, left: "17%", top: "62%" },
    { id: "dashboards", label: "Dashboards", description: "See the whole build's status, component by component, in one live dashboard.", icon: `${ICON_ROOT}/orbit-6.png`, iconSide: "right" as const, left: "17%", top: "32%" },
  ],
  mobileOrbitItems: [
    { id: "bom", label: "BOM", description: "Set up the product structure and BOM once, and the build flows from it.", icon: `${ICON_ROOT}/orbit-1.png`, iconSide: "left" as const, left: "68%", top: "12%" },
    { id: "generate", label: "Work Order", description: "The system auto-generates component-level sub-workorders from the product structure, no manual setup.", icon: `${ICON_ROOT}/orbit-2.png`, iconSide: "left" as const, left: "87%", top: "38%" },
    { id: "allocate", label: "Allocate", description: "Material availability is checked up front, and stock is allocated to each work order.", icon: `${ICON_ROOT}/orbit-3.png`, iconSide: "right" as const, left: "31%", top: "87%" },
    { id: "tasks", label: "Tasks", description: "Assembly, QC, testing, and packaging tasks run with clear ownership at every step.", icon: `${ICON_ROOT}/orbit-4.png`, iconSide: "left" as const, left: "82%", top: "72%" },
    { id: "status", label: "Status", description: "Track progress and dependencies as the build moves, with nothing starting out of order.", icon: `${ICON_ROOT}/orbit-5.png`, iconSide: "right" as const, left: "17%", top: "62%" },
    { id: "dashboards", label: "Schedule", description: "See the whole build's status, component by component, in one live dashboard.", icon: `${ICON_ROOT}/orbit-6.png`, iconSide: "right" as const, left: "17%", top: "32%" },
  ],
  mobileInitialId: "bom",
  footerText: "One system carries the build from the first component to the final report.",
  mobileFooterText: "One system carries the build from start to end.",
  ctaLabel: "Book A Demo",
};

export const manufacturingWorkflow = {
  heading: "How a Product Goes From Structure to Shipped",
  ctaLabel: "Book A Walkthrough",
  mobileStepDescriptions: [
    "Define the finished product with its components and bill of materials.",
    "The system auto-generates component-level work orders.",
    "Material availability is validated and reserved against each workorder.",
    "Teams run assembly, QC, testing, and packaging tasks automatically.",
    "Follow the build to the finish, with real-time inventory visibility.",
  ],
  steps: [
    { title: "Define the Product", description: "Define the finished product with its components and bill of materials, once.", icon: `${ICON_ROOT}/workflow-1.png`, active: true },
    { title: "Create Component Orders", description: "The system auto-generates component-level work orders from the product structure, no manual entry.", icon: `${ICON_ROOT}/workflow-2.png`, active: false },
    { title: "Validate Materials", description: "Material availability is validated and reserved against each workorder before production starts.", icon: `${ICON_ROOT}/workflow-3.png`, active: false },
    { title: "Execute the Tasks", description: "Teams run assembly, QC, testing, and packaging tasks with dependencies enforced automatically.", icon: `${ICON_ROOT}/workflow-4.png`, active: false },
    { title: "Track and Report", description: "Follow the build to the finish, with status and inventory visible throughout.", icon: `${ICON_ROOT}/workflow-5.png`, active: false },
  ],
};

export const manufacturingCapabilitiesHeading = "What's Actually Inside DGlide Process Management";
export const manufacturingCapabilityItems = [
  { label: "Product & BOM Management", title: "Product & BOM Management", paragraphs: ["Define each finished product with its structured components and bill of materials. Set the structure once, and every work order, task, and material check flows from it."], features: ["Structured products and components", "Bill of materials, defined once", "The foundation for every build"], mobileFeatures: ["Define products and components", "Create BOMs once", "Standardize every work order", "Build from one source"], whyItMatters: "One clear product structure means every build starts from the same source of truth.", image: "/business-tabs/manufacturing-cap-1.webp" },
  { label: "Workorder Management", title: "Workorder Management", paragraphs: ["Create, assign, and track main manufacturing work orders with real-time status. Component-level sub-workorders generate automatically from the product structure, so nothing is entered by hand."], features: ["Sub-workorders generated from the BOM", "Assign and track in real time", "No manual workorder entry"], whyItMatters: "Auto-generated sub-workorders remove the manual step where component tracking usually breaks.", image: "/business-tabs/manufacturing-cap-2.webp" },
  { label: "Assembly & QC Tasks", title: "Assembly & QC Tasks", paragraphs: ["Define and execute assembly, QC, testing, and packaging tasks with clear ownership. Every task sits against its work order, so nobody has to ask who is doing what."], features: ["Assembly, QC, testing, packaging tasks", "Clear ownership of every task", "Tasks tied to their work order"], whyItMatters: "Named ownership on each task means a stalled step has someone accountable for it.", image: "/business-tabs/manufacturing-cap-3.webp" },
  { label: "Dependency & Workflow Control", title: "Dependency & Workflow Control", paragraphs: ["Manage dependencies between main workorders, sub-workorders, and tasks. Rule-based transitions move work through lifecycle stages, so no step starts before the one it depends on clears."], features: ["Dependencies enforced automatically", "Rule-based stage transitions", "No step starts out of sequence"], whyItMatters: "Enforced dependencies mean a component is never assembled before its prerequisite passes QC.", image: "/business-tabs/manufacturing-cap-4.webp" },
  { label: "Inventory & Material Management", title: "Inventory & Material Management", paragraphs: ["Inventory is validated before a build begins and allocated to the work order, preventing shortages and overstocking."], features: ["Material checked before production starts", "Inventory reserved against work orders", "No mid-build shortages"], whyItMatters: "Reserved inventory means two work orders never quietly claim the same component.", image: "/business-tabs/manufacturing-cap-5.webp" },
  { label: "SLA, Escalation & Reporting", title: "SLA, Escalation & Reporting", paragraphs: ["SLAs watch production timelines and raise escalations on delays, while real-time dashboards show progress and inventory consumption."], features: ["Escalations on delays and blocks", "Live production dashboards", "Component completion at a glance"], whyItMatters: "An escalation on a blocked stage surfaces the delay while there's still time to act.", image: "/business-tabs/manufacturing-cap-6.webp" },
  { label: "Automation & Configuration", title: "Automation & Configuration", paragraphs: ["The system automates the repetitive setup work, and adapts to new products and variants through configuration alone."], features: ["Automated sub-workorders and assignments", "New products configured, not coded", "Handles variants and production models"], whyItMatters: "Adding a product line becomes a configuration change instead of a development project.", image: "/business-tabs/manufacturing-cap-7.webp" },
];

export const manufacturingCapabilitiesMobileHeading = "What's Actually \nInside DGlide Process Management";
export const manufacturingCapabilityMobileItems = [
  {
    ...manufacturingCapabilityItems[1],
    label: "Work Order Management",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-1-figma.png",
  },
  {
    ...manufacturingCapabilityItems[0],
    label: " Product & BOM Management",
    title: " Product & BOM Management",
    paragraphs: [],
    mobileFeatures: ["Define products and components", "Create BOMs once", "Standardize every work order", "Build from one source"],
    whyItMatters: "One clear product structure means every build starts from the same source of truth",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-2-figma.png",
  },
  {
    ...manufacturingCapabilityItems[2],
    label: "Assembly & QC Tasks",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-3-figma.png",
  },
  {
    ...manufacturingCapabilityItems[5],
    label: "SLA & Escalations",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-4-figma.png",
  },
  {
    ...manufacturingCapabilityItems[3],
    label: "Route, Location & Expense",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-5-figma.png",
  },
  {
    ...manufacturingCapabilityItems[4],
    label: "Reports & Dashboards",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-6-figma.png",
  },
  {
    ...manufacturingCapabilityItems[6],
    label: "Integrations",
    mobileImage: "/business-tabs/manufacturing-cap-mobile-7-figma.png",
  },
];

export const manufacturingOperator = {
  heading: "Operators See Their Work. Supervisors See Everything",
  mobileHeading: "Role-Based Visibility for Every Production Team",
  description: "Operators shouldn't chase updates or ask what to build next. DGlide puts assigned tasks, work order details, and status updates in a single view.",
  features: [
    { title: "See the shift's task list", description: "See every task assigned for the shift, in the order the build actually requires.", icon: `${ICON_ROOT}/operator-1.png`, active: true },
    { title: "Open workorder and component details", description: "Open the workorder, component specifications, and BOM details before starting the task.", icon: `${ICON_ROOT}/operator-2.png`, active: false },
    { title: "Update task status in real time", description: "Update the task the moment it moves, keeping the whole build's status current.", icon: `${ICON_ROOT}/operator-3.png`, active: false },
    { title: "Flag blocks and shortages", description: "Flag a missing component or blocked step on the spot, triggering an escalation automatically.", icon: `${ICON_ROOT}/operator-4.png`, active: false },
    { title: "Complete with QC sign-off", description: "Confirm QC and close, so downstream tasks unlock without a manual check.", icon: `${ICON_ROOT}/operator-5.png`, active: false },
  ],
  mobileFeatures: [
    { title: "See the shift's task list", description: "See every task assigned for the shift, in the order the build actually requires.", icon: `${ICON_ROOT}/operator-1.png`, active: true },
    { title: "Open workorder and component details", description: "Open the workorder, component specifications, and BOM details before starting the task,", icon: `${ICON_ROOT}/operator-2.png`, active: false },
    { title: "Update task status in real time", description: "Update the task the moment it moves, keeping the whole build's status current.", icon: `${ICON_ROOT}/operator-3.png`, active: false },
    { title: "Flag blocks and shortages", description: "Flag a missing component or blocked step on the spot, triggering an escalation automatically.", icon: `${ICON_ROOT}/operator-4.png`, active: false },
    { title: "Complete with QC sign-off", description: "Confirm QC and close, so downstream tasks unlock without a manual check.", icon: `${ICON_ROOT}/operator-5.png`, active: false },
  ],
  mobileInitialIndex: 1,
};

export const manufacturingBetterWay = {
  heading: fsmBetterWayHeading,
  mobileHeading: "Configurable Software That Scales With Your Business",
  description: fsmBetterWayDescription,
  leftTitle: fsmBetterWayLeftTitle,
  rightTitle: fsmBetterWayRightTitle,
  leftItems: fsmRigidToolsItems,
  rightItems: fsmCustomBuildItems,
  mobileLeftItems: [
    "Fast to start. Difficult to Mend.",
    "Cheap to start, Expensive in future.",
    "Fits the category, not your business.",
  ],
  mobileRightItems: [
    "Fits at first. Becomes a burden later.",
    "Months to build, years to maintain.",
    "Custom fit. Custom headache.",
  ],
  mobileFooterItems: [
    "Configurable operations platform",
    "Fit of a custom build",
    "Ready-to-run systems",
  ],
  footerItems: fsmBetterWayFooterItems,
};

export const manufacturingWorkflowChange = {
  title: "Add a Product Line / Without Adding a Software Project.",
  mobileTitle: "Scale Production Without Software Rebuilds",
  mobileInitialIndex: 1,
  subtitle: "New product lines, new variants, new QC steps: none of it stays fixed for long. DGlide reconfigures around the change, without code.",
  bullets: ["Support new variants without a rebuild", "Change stages and dependencies anytime", "Grow the product mix without a dev team"],
  timelineItems: [
    { icon: `${ICON_ROOT}/outcome-1.png`, title: "Faster Production Cycles", description: "Automated workorder creation, component tracking, and task execution cut delays and speed up assembly.", width: 620 },
    { icon: `${ICON_ROOT}/outcome-2.png`, title: "Full Control of the Build", description: "The whole lifecycle is visible in one place, so control doesn't depend on who's on shift.", width: 581 },
    { icon: `${ICON_ROOT}/outcome-3.png`, title: "Less Manual Tracking", description: "Status-driven workflows do the tracking, so the team stops maintaining spreadsheets by hand.", width: 581 },
    { icon: `${ICON_ROOT}/outcome-4.png`, title: "Optimized Inventory Utilization", description: "Inventory tied to production means less capital sitting idle and fewer builds stalled for parts.", width: 610 },
    { icon: `${ICON_ROOT}/outcome-5.png`, title: "Scalable Manufacturing Operations", description: "Execution stays consistent whether you run three products or thirty.", width: 664 },
    { icon: `${ICON_ROOT}/outcome-6.png`, title: "Workflows That Keep Up", description: "The system is adjusted around your changing production model, so it never becomes the constraint.", width: 740 },
  ],
};

export const manufacturingRealOperations = {
  heading: fsmRealOpsHeading,
  challengeQuote: fsmRealOpsChallengeQuote,
  challengeBullets: fsmRealOpsChallengeBullets,
  metricsDescription: fsmRealOpsMetricsDescription,
  metrics: fsmRealOpsMetrics,
  footerQuote: fsmRealOpsFooterQuote,
  mobileFooterQuote: '"Now I open my phone and see every project, every complaint, every shipment."',
  mobileFooterAttribution: "- Director, Prompt Lasers",
  solutionItems: fsmRealOpsSolutionItems,
};

export const manufacturingGoLive = {
  heading: "Go Live Faster, Without a Heavy Build",
  mobileHeading: "Go Live Faster Without Heavy Implementation",
  description: "A working Process Management system, configured to your production workflows and live in weeks, not a year-long implementation.",
  cards: [
    { step: "01", title: "Understand Your Production Workflow", description: "Map your products, BOMs, dependencies, material checks, and QC rules.", icon: `${ICON_ROOT}/go-live-1.png`, offsetTop: 0, cardHeight: 436, shadow: false },
    { step: "02", title: "Configure the Process Management System", description: "Adapt workorders, tasks, approvals, and dashboards to how you manufacture.", icon: `${ICON_ROOT}/go-live-2.png`, offsetTop: 40, cardHeight: 396, shadow: true },
    { step: "03", title: "Train Your Teams", description: "Prepare operators, supervisors, and production managers to run it.", icon: `${ICON_ROOT}/go-live-3.png`, offsetTop: 80, cardHeight: 356, shadow: true },
    { step: "04", title: "Go Live", description: "Start running real production operations inside DGlide.", icon: `${ICON_ROOT}/go-live-4.png`, offsetTop: 120, cardHeight: 316, shadow: true },
    { step: "05", title: "Keep Improving", description: "Refine workorders, dependencies, and workflows after real usage begins.", icon: `${ICON_ROOT}/go-live-5.png`, offsetTop: 160, cardHeight: 276, shadow: true },
  ],
  mobileCards: [
    { step: "01", title: "Understand Your Service Workflow", description: "Map your request types, approvals, SLAs, and resolution rules.", icon: `${ICON_ROOT}/go-live-1.png`, offsetTop: 0, cardHeight: 436, shadow: false },
    { step: "02", title: "Configure the Process Management System", description: "Adapt forms, workflows, approvals, and dashboards to how you work.", icon: `${ICON_ROOT}/go-live-2.png`, offsetTop: 40, cardHeight: 396, shadow: true },
    { step: "03", title: "Train Your Teams", description: "Prepare agents, approvers, and service managers to run it.", icon: `${ICON_ROOT}/go-live-3.png`, offsetTop: 80, cardHeight: 356, shadow: true },
    { step: "04", title: "Go Live", description: "Start running real service operations inside DGlide.", icon: `${ICON_ROOT}/go-live-4.png`, offsetTop: 120, cardHeight: 316, shadow: true },
    { step: "05", title: "Keep Improving", description: "Use the Living Service Model to refine workflows after real usage begins.", icon: `${ICON_ROOT}/go-live-5.png`, offsetTop: 160, cardHeight: 276, shadow: true },
  ],
};

export const manufacturingIntegrationNodes = {
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

export const manufacturingMobileIntegrationNodes = {
  left: [
    { label: "Accounting and billing tools", icon: "/solutions/integrations-hub/accounting-billing-tools.png" },
    { label: "FSM systems", icon: "/solutions/built-for/card-1.png" },
    { label: "ITSM tools", icon: "/solutions/integrations-hub/itsm-tools.png" },
  ],
  right: manufacturingIntegrationNodes.right,
};

export const manufacturingFaqItems = [
  { question: "Is this an ERP or an MES?", answer: "Your ERP plans the business. DGlide runs the build: sub-workorders, assembly and QC tasks, dependency control, and material validation. The two work together, not instead of each other.", open: false },
  { question: "How fast can we actually start using it?", answer: "Teams are typically live within weeks. Configure pipeline stages, connect existing data, train the team, and start working, no lengthy build cycle.", open: true },
  { question: "Do we need technical staff to manage this?", answer: "No developers required. Changes to stages, fields, and rules are made through configuration, not custom code.", open: false },
  { question: "Can it connect to our existing systems?", answer: "Yes. DGlide Manufacturing Process Management connects natively to FSM, ITSM, Field Sales, and billing, and integrates with common third-party tools, so you're not starting from a blank slate.", open: false },
  { question: "Can it handle multiple products and variants?", answer: "Yes. Workflows can be adapted for multiple products, variants, and production models through configuration, so adding a new line doesn't mean a new system or a new project.", open: false },
];

export const manufacturingMobileFaqItems = [
  { ...manufacturingFaqItems[0], question: " Is this an ERP or an MES?" },
  ...manufacturingFaqItems.slice(1),
];
