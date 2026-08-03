export type ComparisonRow = {
  feature: string;
  dglide: string;
  freshdesk: string;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

export const differentiators = [
  {
    title: "Native field service",
    description: "Dispatch, track, and verify field work inside the ticket.",
    icon: "/comparison/diff-native.png",
  },
  {
    title: "One backbone",
    description: "Servicedesk, field service, ITSM, and CRM on one backbone.",
    icon: "/comparison/diff-backbone.png",
  },
  {
    title: "Whole-workflow configurability",
    description: "Reshape whole workflows without code, the week you decide.",
    icon: "/comparison/diff-configurable.png",
  },
  {
    title: "Included, not gated",
    description: "About 30% cheaper than Freshdesk, with more of the work covered.",
    icon: "/comparison/diff-included.png",
  },
] as const;

export const fitCards = [
  {
    kind: "dglide" as const,
    title: "DGlide Is the Better Choice If:",
    description:
      "Your operation spans tickets, technicians, and approvals, and the system has to carry all of it.",
    bullets: [
      "Tickets trigger field visits, installs, or maintenance",
      "Resolution crosses teams, assets, and approvals",
      "Your process changes faster than vendor roadmaps",
      "You want servicedesk, FSM, ITSM, and CRM in one place",
      "SLAs track work completed, not reply speed",
    ],
  },
  {
    kind: "freshdesk" as const,
    title: "Freshdesk Serves You Better If:",
    description:
      "You answer customers; you do not dispatch work. That is exactly what a helpdesk is for.",
    bullets: [
      "Your tickets end with a good reply",
      "Support runs high-volume across social channels",
      "Self-serve pricing and a free tier matter",
      "Forums and chatbot deflection cut your volume",
      "You want the most mature AI reply assistant",
    ],
  },
] as const;

export const winRows = [
  {
    title: "From Ticket to Verified Field Close",
    description:
      "A customer reports a fault on WhatsApp. DGlide logs the ticket, raises the work order, dispatches the technician, and closes only after an on-site OTP. Freshdesk needs a separate module before that chain even starts.",
    image: "/comparison/how-win-field-v2.png",
  },
  {
    title: "Your Process Moves. The System Follows.",
    description:
      "Add an approval step, a new contract type, or a different escalation path by configuration. Your operations lead ships the change in days. In a helpdesk, bigger changes wait on higher tiers and product limits.",
    image: "/comparison/how-win-workflow-v2.png",
  },
  {
    title: "One Platform Instead of a Stack",
    description:
      "Freshdesk pricing grows per agent, then again for Omni channels, then again for AI add-ons. DGlide covers servicedesk, field service, ITSM, and CRM on one platform, for 30% lower pricing.",
    image: "/comparison/how-win-stack-v2.png",
  },
] as const;

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Platform",
    rows: [
      { feature: "Servicedesk, FSM, ITSM, CRM in one platform", dglide: "Yes", freshdesk: "No (separate products)" },
      { feature: "No-code configuration of whole workflows", dglide: "Yes", freshdesk: "Partial" },
      { feature: "Works as an operations system, not only an inbox", dglide: "Yes", freshdesk: "No" },
    ],
  },
  {
    title: "Channels",
    rows: [
      { feature: "Email", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Web forms", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Live chat", dglide: "Yes", freshdesk: "Add-on (Omni)" },
      { feature: "WhatsApp", dglide: "Yes", freshdesk: "Add-on (Omni)" },
      { feature: "Facebook", dglide: "Yes", freshdesk: "Add-on (Omni)" },
      { feature: "Instagram", dglide: "Yes", freshdesk: "Add-on (Omni)" },
      { feature: "SMS", dglide: "Yes (Twilio)", freshdesk: "Add-on (Omni)" },
      { feature: "Telephony", dglide: "Yes", freshdesk: "Add-on (Omni)" },
      { feature: "X (Twitter)", dglide: "No", freshdesk: "Add-on (Omni)" },
      { feature: "Telegram, WeChat, LINE", dglide: "No", freshdesk: "Add-on (Omni)" },
    ],
  },
  {
    title: "Ticket handling and agent tools",
    rows: [
      { feature: "Quick ticket peek view", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Priority work modes for agents", dglide: "Partial", freshdesk: "Yes" },
      { feature: "Table and grid views", dglide: "Partial (web)", freshdesk: "Yes" },
      { feature: "Canned responses and snippets", dglide: "Partial (templates)", freshdesk: "Yes" },
      { feature: "Email templates", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Split one ticket into multiple tasks", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Clone ticket", dglide: "No", freshdesk: "Marketplace app" },
      { feature: "Mobile app for agents", dglide: "Yes", freshdesk: "Yes" },
    ],
  },
  {
    title: "Self-service and knowledge",
    rows: [
      { feature: "Multilingual knowledge base", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Multi-brand help center", dglide: "Yes (portal workspaces)", freshdesk: "Yes" },
      { feature: "Community forums", dglide: "No", freshdesk: "Yes" },
      { feature: "Support chatbot", dglide: "Partial (Glider Bot)", freshdesk: "Yes (Freddy)" },
      { feature: "Guided conversation flows", dglide: "Partial", freshdesk: "Yes" },
    ],
  },
  {
    title: "AI and automation",
    rows: [
      { feature: "AI categorization and routing", dglide: "Yes", freshdesk: "Yes" },
      { feature: "AI prioritization", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Ticket auto-tagging", dglide: "Yes", freshdesk: "Yes" },
      { feature: "AI reply assistant", dglide: "Partial", freshdesk: "Add-on (Freddy Copilot)" },
      { feature: "Autonomous AI agent", dglide: "Partial", freshdesk: "Add-on (usage-priced)" },
      { feature: "Sentiment analysis and predictions", dglide: "No", freshdesk: "Higher tier" },
    ],
  },
  {
    title: "Customization",
    rows: [
      { feature: "Custom statuses and grouping", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Custom fields and form layouts", dglide: "Yes", freshdesk: "Yes" },
      { feature: "No-code workflow automation", dglide: "Yes (whole workflows)", freshdesk: "Yes (follow-ups, escalations)" },
      { feature: "Configurable forms and field logic", dglide: "Yes", freshdesk: "Partial" },
      { feature: "Custom objects and advanced routing", dglide: "Yes", freshdesk: "Pro tier and up" },
      { feature: "Approval workflows", dglide: "Yes", freshdesk: "Enterprise tier" },
    ],
  },
  {
    title: "Analytics and reporting",
    rows: [
      { feature: "SLA dashboards", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Agent performance dashboards", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Custom dashboards", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Response, resolution, FCR reports", dglide: "Yes", freshdesk: "Yes" },
      { feature: "AI analytics dashboard", dglide: "No", freshdesk: "Yes" },
      { feature: "Audit logs", dglide: "Yes", freshdesk: "Enterprise tier" },
    ],
  },
  {
    title: "Field service and operational closure",
    rows: [
      { feature: "Work order creation and tracking", dglide: "Yes", freshdesk: "Add-on (FSM module)" },
      { feature: "Technician assignment and scheduling", dglide: "Yes", freshdesk: "Add-on (FSM module)" },
      { feature: "Preventive maintenance auto work orders", dglide: "Yes", freshdesk: "No" },
      { feature: "Technician mobile task view", dglide: "Yes", freshdesk: "Add-on (FSM module)" },
      { feature: "Route tracking", dglide: "Yes", freshdesk: "No" },
      { feature: "Distance-based expense calculation", dglide: "Yes", freshdesk: "No" },
      { feature: "OTP-verified work order closure", dglide: "Yes", freshdesk: "No" },
      { feature: "Customer verification before closure", dglide: "Yes", freshdesk: "No" },
      { feature: "Tool and asset management", dglide: "Yes", freshdesk: "No" },
    ],
  },
  {
    title: "Pricing and access",
    rows: [
      { feature: "Free trial", dglide: "Yes", freshdesk: "Yes" },
      { feature: "Free tier", dglide: "No", freshdesk: "Yes (1-2 agents)" },
      { feature: "Public pricing", dglide: "No (custom quote)", freshdesk: "Yes" },
      { feature: "Self-serve onboarding", dglide: "No (guided)", freshdesk: "Yes" },
      { feature: "Channels and AI without paid add-ons", dglide: "Yes", freshdesk: "No" },
      { feature: "Per-agent price climb as you grow", dglide: "No", freshdesk: "Yes" },
    ],
  },
];

export const comparisonFaqData: Record<string, string> = {
  title: "Frequently Asked Questions",
  faq_1_q: "What is the difference between DGlide and Freshdesk?",
  faq_1_a:
    "Freshdesk is a customer support helpdesk built to answer and track conversations. DGlide is a configurable operations platform where a ticket can raise a work order, dispatch a technician, and close after verified completion. The difference is what happens after your team opens the ticket.",
  faq_2_q: "Is DGlide a good Freshdesk alternative?",
  faq_2_a:
    "DGlide is a strong Freshdesk alternative for operations, field service, and IT support teams whose tickets trigger real work: site visits, approvals, asset changes, and SLAs. Teams that only need a customer support inbox are usually better served by a dedicated helpdesk.",
  faq_3_q: "Is DGlide cheaper than Freshdesk?",
  faq_3_a:
    "Yes, typically around 30% lower for comparable operations teams. Freshdesk pricing grows per agent, then adds Omni for full channels and separate AI add-ons. DGlide covers servicedesk, field service, ITSM, and CRM in one quote, so the total comes in lower.",
  faq_4_q: "Can DGlide handle field service without an add-on?",
  faq_4_a:
    "Yes. Work orders, technician scheduling, route tracking, preventive maintenance, and OTP-verified closure are native to the platform. Freshdesk delivers field service through a separately paid module, and route tracking and verified closure are not part of it.",
  faq_5_q: "How hard is it to switch from Freshdesk to DGlide?",
  faq_5_a:
    "Switching is a configuration exercise, not a software project. DGlide starts you on a working servicedesk shaped to your ticket types, stages, and SLAs, and teams typically go live in weeks. Your existing workflows are mapped during guided onboarding.",
  faq_6_q: "Does DGlide offer a free trial?",
  faq_6_a:
    "Yes. DGlide offers a free trial along with a guided demo, so you can see the system on your own workflows before committing. There is no permanent free tier, which Freshdesk does offer for very small teams.",
  faq_7_q: "When is Freshdesk the better choice?",
  faq_7_a:
    "Freshdesk is the better choice when support is the whole job: high-volume customer conversations across many social channels, self-serve pricing, a free tier for small teams, and a mature AI reply assistant. If your tickets end with a good reply, a helpdesk fits.",
  faq_8_q: "How is DGlide priced?",
  faq_8_a:
    "Pricing is quote-based and scales with your plan, Starter, Advanced, or Enterprise, and your scope, not a per-agent license. The quote shows exactly what is included, with no surprise add-ons, and comparable teams typically land around 30% under a full Freshdesk stack.",
};

export const caseStudyData: Record<string, string> = {
  title: "Proof, Not Promises",
  challenge_title: "The Challenge",
  challenge_body:
    "A 50-person laser machine manufacturer was losing high-intent leads, running slow service, and flying blind across departments.",
  challenge_tag_1: "Machinery Manufacturer",
  challenge_tag_2: "Sales + Service Ops",
  metrics_title: "The Success Metrics",
  metrics_body:
    "After DGlide, the team could see and act in real time. The numbers moved within the first quarter.",
  metric_1_num: "3X",
  metric_1_label: "Lead Capture",
  metric_2_num: "8 Min",
  metric_2_label: "Response, down from 40+",
  metric_3_num: "75%",
  metric_3_label: "Lower cost than the quoted ERP",
  quote_text: "Now I open my phone and see every project, every complaint, every shipment.",
  right_title: "How DGlide Fixed It",
  right_item_1: "Every lead alert routed instantly",
  right_item_2: "One platform for sales, service, and projects",
  right_item_3: "One dashboard for the whole operation",
  right_item_4: "Automated routing of work and approvals",
  right_item_5: "Service, field, and office in sync",
  right_item_6: "Continuous fit through the Living Service Model",
  cta_label: "Get the Full Case Study",
  cta_href: "/case-studies",
};
