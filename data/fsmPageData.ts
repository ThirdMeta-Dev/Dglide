// FSM Section Nav
export const fsmNavItems = [
  { id: "field-service-problem", label: "Field Service Problem" },
  { id: "who-built-for", label: "Who DGlide FSM Is Built For" },
  { id: "what-fsm-does", label: "What DGlide FSM Does" },
  { id: "core-fsm-capabilities", label: "Core FSM Capabilities" },
  { id: "benefits-outcomes", label: "Benefits & Outcomes" },
  { id: "integrations", label: "Integrations" },
];

// FSM Hero
export const fsmHeroEyebrow = "Field Service Management";
export const fsmHeroHeading = "Field Service That Fits Your Real Operations";
export const fsmHeroDescription = "DGlide FSM helps service-heavy teams run requests, work orders, scheduling, and field execution in one place.";
export const fsmHeroBullets = [
  "Work orders, scheduling, and field tracking in one flow",
  "Built for machinery, equipment, and service-heavy teams",
  "Configurable workflows without a custom build",
];
export const fsmHeroPrimaryCta = "Book A Free Demo";
export const fsmHeroSecondaryCta = "FSM Capabilities";

// FSM Problem Section
export const fsmProblemHeading = "The Problem Isn't Your Tools. It's That They Don't Run the Way Your Service Does.";
export const fsmProblemDescription = "When your system doesn't match how service runs, the gaps show up everywhere.";
export const fsmProblemFooterText = "Expert Teams can't outrun a system that was never built to fit your service.";
export const fsmProblemCtaLabel = "Explore DGlide For You";
export const fsmProblemCards = [
  {
    icon: "/solutions/problem-icons/requests-scattered.png",
    title: "Scattered Service Requests",
    description: "Requests arrive by call, email, and WhatsApp. Nothing lands in one place you can track.",
    mobileDescription: "Requests arrive by call, email, and WhatsApp. Nothing is tracked in one place.",
  },
  {
    icon: "/solutions/problem-icons/rigid-ticket-flows.png",
    title: "Manual Technician Assignment",
    description: "Someone decides who goes where by memory and guesswork, not skill, location, or load.",
    mobileDescription: "Someone decides who goes where by memory or guesswork. Not skill or load.",
  },
  {
    icon: "/solutions/problem-icons/manual-approvals.png",
    title: "No Real-Time Field Visibility",
    description: "Once an engineer leaves, you're blind until they call. You can't see status or delays.",
    mobileDescription: "Once a tech leaves, you're blind until they call. You can't see status or delays.",
  },
  {
    icon: "/solutions/problem-icons/sla-gaps.png",
    title: "SLA and Escalation Gaps",
    description: "Deadlines slip with no warning. Nothing flags a breach or escalates it before the customer does.",
    mobileDescription: "Deadlines slip with no warning. Nothing flags a breach before the customer does.",
  },
  {
    icon: "/solutions/problem-icons/workflows-stuck.png",
    title: "Weak Closure Control",
    description: "Jobs get marked done with no proof, no sign-off, and no clean record to bill against.",
  },
];

// FSM Built For
export const fsmBuiltForHeading = "Service Operations Break When Coordination Is Manual";
export const fsmBuiltForDescription = "DGlide FSM fits service-heavy businesses that have outgrown calls, spreadsheets, and guesswork.";
export const fsmFitItems = [
  { label: "Field technicians and engineers" },
  { label: "Requests handled manually today" },
  { label: "Teams that need field visibility" },
  { label: "Workflows that keep changing" },
  { label: "Growing installed base or AMC contracts" },
];
export const fsmIndustryItems = [
  {
    icon: "/solutions/built-for/card-1.png",
    title: "Machinery Manufacturers",
    description: "You sell machines that need installation, service, and uptime. DGlide tracks every work order, technician, and service visit against the asset, not a spreadsheet.",
  },
  {
    icon: "/solutions/built-for/card-2.png",
    title: "Equipment Businesses",
    description: "Track customer assets, field jobs, service history, and support requests in one system. DGlide connects every request to the right equipment, technician, and timeline.",
  },
  {
    icon: "/solutions/built-for/card-3.png",
    title: "Service-Heavy Manufacturers",
    description: "When service drives revenue and reputation, manual coordination becomes the bottleneck. DGlide structures requests, assignment, and closure so service scales without more chaos.",
  },
  {
    icon: "/solutions/built-for/card-4.png",
    title: "Installation-Led Businesses",
    description: "Every sale ends in a site visit. DGlide schedules installs, routes the right technician, and confirms closure with proof, so jobs don't stall after the order.",
  },
];

// FSM One Platform
export const fsmPlatformHeading = "One Platform. Multiple Operational Systems";
export const fsmPlatformDescription = "DGlide FSM connects every step of your field service, from the first request to job closure, in one flow.";
export const fsmPlatformFeatures = [
  "One connected flow, not six disconnected tools",
  "See every job's stage in real time",
  "Configure each stage to how you actually work",
];
export const fsmPlatformOrbitItems = [
  {
    id: "request",
    label: "Request",
    description: "Capture every request from calls, email, and portal in one inbox, nothing missed.",
    iconSide: "right" as const,
    icon: "/solutions/orbit-icons/capture.png",
    left: "17%",
    top: "32%",
  },
  {
    id: "work-order",
    label: "Work Order",
    description: "Generate structured work orders with customer details, assets, priorities, and service instructions.",
    iconSide: "left" as const,
    icon: "/solutions/orbit-icons/log-categorize.png",
    left: "68%",
    top: "12%",
  },
  {
    id: "schedule",
    label: "Schedule",
    description: "Assign the right technician by skill, location, and availability, not guesswork.",
    iconSide: "left" as const,
    icon: "/solutions/orbit-icons/route-approve.png",
    left: "87%",
    top: "38%",
  },
  {
    id: "execute",
    label: "Execute",
    description: "Technicians work the job on mobile, with full details, even when offline.",
    iconSide: "left" as const,
    icon: "/solutions/orbit-icons/resolve.png",
    left: "82%",
    top: "72%",
  },
  {
    id: "verify",
    label: "Verify",
    description: "Confirm completion with proof, customer sign-off, OTP verification, and an automatic SLA check.",
    iconSide: "right" as const,
    icon: "/solutions/orbit-icons/verify-close.png",
    left: "31%",
    top: "87%",
  },
  {
    id: "report",
    label: "Report",
    description: "See response times, SLA performance, and trends across every job and team.",
    iconSide: "right" as const,
    icon: "/solutions/orbit-icons/report.png",
    left: "17%",
    top: "62%",
  },
];
export const fsmPlatformFooterText = "Every workflow can be configured around how your service team actually operates.";
export const fsmPlatformCtaLabel = "Book A Demo";

// FSM Workflow Steps
export const fsmWorkflowHeading = "From Service Request to Closure, Without Losing Control";
export const fsmWorkflowSteps = [
  {
    title: "Capture the Request",
    description: "Create service requests from teams, customers, or internal users, all in one place.",
    icon: "/solutions/workflow-icons/capture.png",
    active: true,
  },
  {
    title: "Create the Work Order",
    description: "Convert requests into structured jobs with clear ownership and detail.",
    icon: "/solutions/workflow-icons/log-categorize.png",
    active: false,
  },
  {
    title: "Assign the Technician",
    description: "Allocate work by priority, availability, location, or expertise.",
    icon: "/solutions/workflow-icons/route-approve.png",
    active: false,
  },
  {
    title: "Track Field Execution",
    description: "Technicians update status, notes, and service details from the field as work happens.",
    icon: "/solutions/workflow-icons/track-resolution.png",
    active: false,
  },
  {
    title: "Verify and Close",
    description: "Confirm completion with customer validation, clean closure, and reporting.",
    icon: "/solutions/workflow-icons/verify-close.png",
    active: false,
  },
];
export const fsmWorkflowCtaLabel = "See FSM Live In Demo";

// FSM Core Capabilities
export const fsmCapabilitiesHeading = "The Capabilities That Keep Service Moving";
export const fsmCapabilityItems = [
  {
    label: "Work Order Management",
    title: "Work Order Management",
    paragraphs: ["Turn every request into a structured work order with the asset, customer, priority, and history attached, so everyone sees who owns the job and what's left."],
    features: ["Structured jobs with clear ownership", "Asset, customer, and history on every order", "Status visible from open to close"],
    mobileFeatures: ["Every request becomes a work order", "Asset, customer, priority, history attached", "Clear owner on every job", "Status visible from open to close"],
    whyItMatters: "When work orders are structured, nothing gets worked twice or dropped between people.",
    image: "/business-tabs/fsm-cap-1.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-1-figma.png",
  },
  {
    label: "Scheduling & Dispatch",
    title: "Scheduling & Dispatch",
    paragraphs: ["Assign the right technician by skill, location, and availability, then dispatch in minutes. See the whole team's day on one board and rebook without phone calls."],
    features: ["Assign by skill, location, and load", "One board for the whole team", "Reschedule without a round of calls"],
    mobileFeatures: ["Assign by skill and location", "Dispatch jobs in minutes", "One board, every schedule", "Reschedule without phone calls"],
    whyItMatters: "Better scheduling cuts drive time and missed slots, so techs finish more jobs a day.",
    image: "/business-tabs/fsm-cap-2.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-2-figma.png",
  },
  {
    label: "Technician Mobile App",
    title: "Technician Mobile App",
    paragraphs: ["Technicians get job details, customer history, and checklists on their phone, even offline. They update status, add photos and notes, and capture sign-off from the field."],
    features: ["Full job detail on any phone", "Works offline, syncs later", "Photos, notes, and sign-off on site"],
    mobileFeatures: ["Complete job details on phone", "Works offline, syncs automatically", "Add photos and field notes", "Capture customer sign-off onsite"],
    whyItMatters: "With everything on site, techs fix more on the first visit and stop calling the office.",
    image: "/business-tabs/fsm-cap-3.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-3-figma.png",
  },
  {
    label: "SLA & Escalations",
    title: "SLA & Escalations",
    paragraphs: ["Set response and resolution targets per customer or contract. DGlide tracks every clock automatically and escalates a job before it breaches, not after the complaint."],
    features: ["SLA timers per customer or contract", "Automatic escalation before a breach", "Breach risk visible in real time"],
    mobileFeatures: ["Set SLAs by customer", "Track SLA timers automatically", "Escalate before SLA breaches", "View breach risks in real time"],
    whyItMatters: "Catching a slipping SLA early protects the contracts your service runs on.",
    image: "/business-tabs/fsm-cap-4.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-4-figma.png",
  },
  {
    label: "Route, Location & Expense",
    title: "Route, Location & Expense",
    paragraphs: ["Plan efficient routes, see technician location through the day, and capture job expenses from the field. Less driving, fewer surprises, cleaner cost tracking per job."],
    features: ["Optimized routes for the day", "Live technician location", "Expenses logged against each job"],
    mobileFeatures: ["Optimize daily service routes", "Track technician locations live", "Log expenses for every job", "Reduce travel and job costs"],
    whyItMatters: "Tighter routing and tracked costs make every visit cheaper and easier to bill.",
    image: "/business-tabs/fsm-cap-5.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-5-figma.png",
  },
  {
    label: "Reports & Dashboards",
    title: "Reports & Dashboards",
    paragraphs: ["See response times, SLA performance, technician productivity, and job trends in one dashboard. Spot the bottlenecks before they cost you a customer or a contract."],
    features: ["Response, SLA, and productivity in one view", "Trends across teams and regions", "Export-ready for reviews"],
    mobileFeatures: ["Monitor response and SLA performance", "Track technician productivity", "Spot trends across teams", "Export reports for reviews"],
    whyItMatters: "When you can see where service slows down, you fix the pattern, not just one job.",
    image: "/business-tabs/fsm-cap-6.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-6-figma.png",
  },
  {
    label: "Integrations",
    title: "Integrations",
    paragraphs: ["Connect DGlide to your CRM, ERP, and accounting tools so customer, asset, and billing data stays in sync. Field service stops being an island."],
    features: ["Sync with CRM, ERP, and accounting", "Customer and asset data stays current", "No double entry between systems"],
    mobileFeatures: ["Connect CRM, ERP, and accounting", "Keep customer data synchronized", "Sync assets and billing automatically", "Eliminate duplicate data entry"],
    whyItMatters: "When systems share data, your team stops re-keying and your records finally match.",
    image: "/business-tabs/fsm-cap-7.png",
    mobileImage: "/business-tabs/fsm-cap-mobile-7-figma.png",
  },
];

// FSM Technician Mobile
export const fsmTechnicianHeading = "Give Technicians a Clear Field Workflow";
export const fsmTechnicianDescription = "Field teams shouldn't depend on calls and manual updates to know what's next. DGlide gives technicians a mobile-first workflow for daily service execution.";
export const fsmTechnicianFeatures = [
  {
    title: "View assigned work orders",
    description: "See the day's jobs, addresses, and priorities on the phone, without calling the office.",
    icon: "/solutions/technician-icons/icon-1.png",
    active: true,
  },
  {
    title: "Access customer and asset details",
    description: "Open full service history, asset details, and past notes before arriving on site.",
    icon: "/solutions/technician-icons/icon-2.png",
    active: false,
  },
  {
    title: "Update job status in real time",
    description: "Move a job from started to done as it happens, so the office sees progress live.",
    icon: "/solutions/technician-icons/icon-3.png",
    active: false,
  },
  {
    title: "Add service notes and completion details",
    description: "Log what was done, parts used, and photos, right from the field.",
    icon: "/solutions/technician-icons/icon-4.png",
    active: false,
  },
  {
    title: "Close jobs with customer confirmation",
    description: "Capture sign-off and proof on the phone, so closure is clean and billable.",
    icon: "/solutions/technician-icons/icon-5.png",
    active: false,
  },
];

// FSM Better Way
export const fsmBetterWayHeading = "Stuck Between Rigid Tools and Building Your Own?";
export const fsmBetterWayDescription = "Until now, you had two bad options: software that does not fit, or a custom build that never ends. DGlide is the 3rd: Best of All Worlds.";
export const fsmBetterWayLeftTitle = "Fixed-Category Tools";
export const fsmBetterWayRightTitle = "Building Your Own";
export const fsmRigidToolsItems = [
  "Fast to start. Your business bends to fit the software.",
  "Cheap to start, expensive in workarounds.",
  "Fits the category, not your business.",
];
export const fsmCustomBuildItems = [
  "Fits at first. Becomes a software project you own forever.",
  "Months to build, years to maintain, yours to fix.",
  "Custom fit comes with a custom headache.",
];
export const fsmBetterWayFooterItems = ["Ready to Run", "Configured to Your Process", "Adapts as You Change"];

// FSM Workflow Change
export const fsmWorkflowChangeTitle = "Your Service Workflow Will Change. Your FSM Should Too.";
export const fsmWorkflowChangeSubtitle = "New service types, technician rules, customer expectations, escalation paths: it all keeps shifting. DGlide shifts with it, no rebuild.";
export const fsmWorkflowChangeBullets = [
  "Add new service types without a rebuild",
  "Change technician rules and escalation paths anytime",
  "Adjust as you grow, no developers needed",
];
export const fsmWorkflowTimelineItems = [
  { icon: "/solutions/workflow-change/faster-resolution.png", title: "Faster Service Response", description: "Requests reach the right technician in minutes, not after rounds of calls.", width: 620 },
  { icon: "/solutions/workflow-change/realtime-visibility.png", title: "Better Technician Productivity", description: "Field teams know what to do, where to go, and what to update.", width: 581 },
  { icon: "/solutions/workflow-change/sla-control.png", title: "Real-Time Operational Visibility", description: "See every job's status as it happens, with no chasing for updates.", width: 581 },
  { icon: "/solutions/workflow-change/less-manual.png", title: "Stronger SLA Control", description: "Track every deadline and escalate before a breach, not after.", width: 610 },
  { icon: "/solutions/workflow-change/beyond-ticketing.png", title: "Improved Customer Experience", description: "Faster, more reliable service your customers actually notice.", width: 664 },
  { icon: "/solutions/workflow-change/better-service.png", title: "Less Manual Coordination", description: "Work moves itself between stages, so your team stops chasing.", width: 740 },
];

// FSM What Improves
export const fsmImprovesHeading = "What Improves With DGlide FSM";
export const fsmImprovesFeatures = [
  { title: "Faster Service Response", description: "Requests reach the right technician fast, so jobs start sooner and customers wait less.", align: "left" as const, icon: "/solutions/what-improves/icon-1.png" },
  { title: "Better Technician Productivity", description: "Field teams know what to do and where to go, so they finish more jobs a day.", align: "center" as const, icon: "/solutions/what-improves/icon-2.png" },
  { title: "Real-Time Operational Visibility", description: "See every job's status as it happens, so nothing stalls unseen or gets forgotten.", align: "right" as const, icon: "/solutions/what-improves/icon-3.png" },
  { title: "Stronger SLA Control", description: "Track every deadline automatically and escalate before a breach, protecting the contracts you depend on.", align: "left" as const, icon: "/solutions/what-improves/icon-4.png" },
  { title: "Improved Customer Experience", description: "Faster, more reliable service builds the trust that keeps customers and contracts renewing.", align: "center" as const, icon: "/solutions/what-improves/icon-5.png" },
  { title: "Less Manual Coordination", description: "Work moves itself between stages, so your team stops chasing updates and approvals.", align: "right" as const, icon: "/solutions/what-improves/icon-6.png" },
];

// FSM Real Operations
export const fsmRealOpsHeading = "How DGlide Works in Real Operations";
export const fsmRealOpsChallengeQuote = "We were spending lakhs to generate leads, then losing them because nobody saw the alert in time.";
export const fsmRealOpsChallengeBullets = ["No real-time visibility", "No structured follow-up"];
export const fsmRealOpsMetricsDescription = "With one system tracking every lead, project, and complaint, response times collapsed and almost nothing slipped.";
export const fsmRealOpsMetrics = [
  { value: "3X", label: "More Leads Captured" },
  { value: "8 min", label: "Response Time, from 40+" },
];
export const fsmRealOpsFooterQuote = "\"Now I open my phone and see every project, every complaint, every shipment. That changed how I run the company.\" — Director, Prompt Lasers";
export const fsmRealOpsSolutionItems = [
  "One system for every lead, project, and complaint",
  "Instant alerts the moment a lead comes in",
  "Response time cut from 40+ minutes to 8",
  "Full visibility across projects and shipments",
  "No ERP cost, no rip-and-replace",
  "Configured to how Prompt Lasers actually runs",
];

// FSM Configurable Platform
export const fsmConfigurableHeading = "FSM Powered by DGlide's Configurable Operations Platform";
export const fsmConfigurableDescription = "DGlide FSM isn't a disconnected field service tool. It runs on the same operational backbone that powers workflows across service, sales, process, and internal operations.";
export const fsmConfigurableFeatures = [
  "Workflow engine",
  "Forms and templates",
  "Approvals and escalations",
  "SLA logic",
  "Reports and dashboards",
  "Mobile access",
  "APIs and webhooks",
];
export const fsmConfigurableMobileFeatures = [
  "Workflow engine",
  "Forms & templates",
  "Approvals & escalations",
  "SLA logic",
  "Reports & dashboards",
  "Mobile access",
  "APIs & webhooks",
];
export const fsmConfigurableCards = [
  {
    label: "FSM",
    mobileLabel: "FSM.",
    title: "Fully Configured",
    description: "Your field service runs on DGlide's platform, not a siloed tool, so it connects to everything else you operate.",
    bullets: ["Built on the same engine", "Configured to your service workflow"],
  },
  {
    label: "Configurable Backbone",
    mobileLabel: "Configurable backbone",
    title: "One Engine, Many Workflows",
    description: "The backbone that runs FSM also runs sales, process, and internal operations, configured for each, not rebuilt.",
    bullets: ["Expand into new workflows anytime", "No new tool to buy or learn"],
  },
  {
    label: "Integrations and Data",
    mobileLabel: "Integrations and data.",
    title: "Connected Data",
    description: "FSM shares customer, asset, and job data with your CRM, ERP, and other systems, so nothing lives on an island.",
    bullets: ["Sync across your existing systems", "One source of truth for service data"],
  },
];

// FSM Go Live
export const fsmGoLiveHeading = "Go Live Faster Without Heavy Implementation";
export const fsmGoLiveDescription = "Five clear steps from your current chaos to a running system, no long IT project.";
export const fsmGoLiveCards = [
  { step: "01", title: "Understand Your Service Workflow", description: "Map your requests, work orders, technicians, SLAs, and closure rules.", icon: "/solutions/go-live/icon-1.png", offsetTop: 0, cardHeight: 436, shadow: false },
  { step: "02", title: "Configure the FSM System", description: "Adapt forms, workflows, approvals, and dashboards to how you work.", icon: "/solutions/go-live/icon-2.png", offsetTop: 40, cardHeight: 396, shadow: true },
  { step: "03", title: "Train Your Teams", description: "Prepare supervisors, service managers, and technicians to run it.", icon: "/solutions/go-live/icon-3.png", offsetTop: 80, cardHeight: 356, shadow: true },
  { step: "04", title: "Go Live", description: "Start running real service operations inside DGlide.", icon: "/solutions/go-live/icon-4.png", offsetTop: 120, cardHeight: 316, shadow: true },
  { step: "05", title: "Keep Improving", description: "Use LSM to refine workflows after real usage begins.", icon: "/solutions/go-live/icon-5.png", offsetTop: 160, cardHeight: 276, shadow: true },
];

// FSM Integrations
export const fsmIntegrationsHeading = "Connect FSM With the Systems You Already Use";
export const fsmIntegrationsDescription = "DGlide is designed to work with your existing business environment instead of replacing everything at once.";

// FSM Final CTA
export const fsmFinalCtaEyebrow = "See It on Your Workflow";
export const fsmFinalCtaHeading = "See DGlide FSM Run on Your Real Service Workflow";
export const fsmFinalCtaButton = "Get A Free Demo!";

// FSM FAQs
export const fsmFaqItems = [
  {
    question: "We've tried FSM tools before and ended up bending our process to fit them. How is DGlide different?",
    answer: "DGlide starts with a working FSM system, then configures it to your workflow: your stages, approvals, and rules. You shape the system to your process, not the other way around.",
    open: false,
  },
  {
    question: "How long does it take to go live?",
    answer: "Most teams go live in weeks, not months. You map your service workflow, configure forms and rules, train the team, and start running. No long build project.",
    open: true,
  },
  {
    question: "Do we need developers or an IT team to run it?",
    answer: "No. DGlide is configured, not coded. Your supervisors and managers can adjust forms, workflows, and approvals without writing code or hiring developers.",
    open: false,
  },
  {
    question: "Will it work with the tools we already use?",
    answer: "Yes. DGlide connects to your CRM, ERP, accounting, and IoT or device data, so field service shares one set of customer, asset, and job records.",
    open: false,
  },
  {
    question: "Our service process keeps changing. Will the system keep up?",
    answer: "That's the point of the Living Service Model. After go-live, you reshape workflows, add service types, and change rules as your business changes, with no rebuild.",
    open: false,
  },
  {
    question: "Does the technician app work without internet?",
    answer: "Yes. Technicians get job details and update status offline, and everything syncs once they're back online.",
    open: false,
  },
];
