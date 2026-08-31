export type ComparisonRow = {
  feature: string;
  dglide: string;
  upteams: string;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

export const differentiators = [
  {
    title: "Visit to ticket, automatically",
    description: "A distributor complaint raised mid-visit becomes a tracked ticket. Not a WhatsApp message nobody follows up on.",
    icon: "/comparison/diff-native.png",
  },
  {
    title: "One record, not three tools",
    description: "Sales, field service, and IT ticketing share the same record instead of living in three disconnected systems.",
    icon: "/comparison/diff-backbone.png",
  },
  {
    title: "No-code workflow changes",
    description: "Add a form field or an approval step yourself, the same week you need it. No vendor ticket required.",
    icon: "/comparison/diff-configurable.png",
  },
  {
    title: "Flat pricing, not per-seat",
    description: "Modular pricing that stays flat as headcount grows, instead of scaling per rep like UpTeams does.",
    icon: "/comparison/diff-included.png",
  },
] as const;

export const fitCards = [
  {
    kind: "dglide" as const,
    title: "DGlide Is the Better Choice If:",
    description:
      "Your field visits need to turn into tracked outcomes across sales, service, and IT, not just a logged check-in.",
    bullets: [
      "Visits can turn into complaints, tickets, or orders",
      "Resolution spans ops, service, and IT teams",
      "Your process changes faster than vendor roadmaps",
      "You want CRM, field service, and ticketing in one place",
      "Success means resolved, not just visited",
    ],
  },
  {
    kind: "freshdesk" as const,
    title: "UpTeams Serves You Better If:",
    description:
      "You need proof a rep visited a location. That is exactly what UpTeams is built for.",
    bullets: [
      "Your only requirement is GPS-verified attendance",
      "Field team stays small and the workflow stays simple",
      "You do not need a service or IT ticketing layer behind a visit",
      "A fast, narrow rollout matters more than platform depth",
      "Per-seat pricing works fine at your current headcount",
    ],
  },
] as const;

export const winRows = [
  {
    title: "From Field Visit to Resolved Ticket",
    description:
      "A rep finds a damaged shipment on a routine stop. DGlide logs the ticket from that visit, routes it to the right team, and closes it after resolution. UpTeams stops at the GPS check-in, leaving that complaint to a phone call.",
    image: "/comparison/how-win-field-v2.png",
  },
  {
    title: "Your Process Moves. The System Follows.",
    description:
      "Add an approval step, a new escalation path, or a routing rule by configuration. Your operations lead ships the change in days. UpTeams' workflow stays fixed around attendance tracking, not process flexibility.",
    image: "/comparison/how-win-workflow-v2.png",
  },
  {
    title: "One Platform Instead of a Stack",
    description:
      "UpTeams prices per rep, ₹199 to ₹299 per user per month, with no service or ticketing layer at any tier. DGlide scopes CRM, field service, and IT ticketing into one platform quote, priced to what you actually use.",
    image: "/comparison/how-win-stack-v2.png",
  },
] as const;

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Platform",
    rows: [
      { feature: "Field sales, service, CRM, and ITSM in one platform", dglide: "Yes", upteams: "No (field sales & CRM only)" },
      { feature: "No-code configuration of whole workflows", dglide: "Yes", upteams: "Partial (custom forms only)" },
      { feature: "Works as an operations system, not only a field app", dglide: "Yes", upteams: "No" },
    ],
  },
  {
    title: "Field & Attendance",
    rows: [
      { feature: "GPS geo-attendance", dglide: "Yes", upteams: "Yes" },
      { feature: "Location tracking", dglide: "Yes", upteams: "Yes" },
      { feature: "Visit scheduling and logging", dglide: "Yes", upteams: "Yes" },
      { feature: "Route tracking / optimization", dglide: "Yes", upteams: "Not listed" },
    ],
  },
  {
    title: "CRM & Sales",
    rows: [
      { feature: "Lead management", dglide: "Yes", upteams: "Yes" },
      { feature: "Order management", dglide: "Yes", upteams: "Yes" },
      { feature: "Task management", dglide: "Yes", upteams: "Yes" },
    ],
  },
  {
    title: "Service & IT Ticketing",
    rows: [
      { feature: "Service ticket created from a field visit", dglide: "Yes", upteams: "No" },
      { feature: "IT / service desk (ITSM)", dglide: "Yes", upteams: "No" },
      { feature: "Work order creation and technician dispatch", dglide: "Yes", upteams: "No" },
      { feature: "SLA tracking on tickets", dglide: "Yes", upteams: "No" },
    ],
  },
  {
    title: "Workflow Customization",
    rows: [
      { feature: "Custom forms", dglide: "Yes", upteams: "Yes" },
      { feature: "Approval workflows", dglide: "Yes", upteams: "Not listed" },
      { feature: "Escalation rules", dglide: "Yes", upteams: "Not listed" },
    ],
  },
  {
    title: "HR & Expense",
    rows: [
      { feature: "Leave management", dglide: "No (not a core module)", upteams: "Yes" },
      { feature: "Expense management", dglide: "No (not a core module)", upteams: "Yes" },
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      { feature: "Dashboards and custom reports", dglide: "Yes", upteams: "Not listed as a dedicated feature" },
      { feature: "Audit logs", dglide: "Yes", upteams: "Not listed" },
    ],
  },
  {
    title: "Pricing & Access",
    rows: [
      { feature: "Free trial", dglide: "Yes", upteams: "Yes" },
      { feature: "Public per-seat pricing", dglide: "No (custom quote)", upteams: "Yes (₹199 to ₹299/user/month)" },
      { feature: "Bill scales with headcount", dglide: "Yes (scoped quote)", upteams: "Yes (more seats, more total cost, though per-seat rate drops at higher tiers)" },
    ],
  },
];

export const comparisonFaqData: Record<string, string> = {
  title: "Frequently Asked Questions",
  faq_1_q: "What is UpTeams used for?",
  faq_1_a:
    "UpTeams is a field force and field service management app built around visit tracking, GPS attendance, and staff monitoring, combined with a lightweight CRM and HR module. It is positioned for small to mid-sized field teams in retail, pharma, real estate, or transportation that want attendance and basic sales tracking without enterprise pricing.",
  faq_2_q: "Is UpTeams free?",
  faq_2_a:
    "No, but it offers a free trial (3 to 5 days, no credit card required) before you move to a paid plan. There is no permanent free tier.",
  faq_3_q: "How much does UpTeams cost?",
  faq_3_a:
    "UpTeams publishes per-seat pricing on its site: ₹299 per user per month for up to 5 users, ₹266 per user per month for 5 to 25 users, and ₹199 per user per month for 25-plus users, with custom Enterprise pricing above that. None of these tiers include service or IT ticketing.",
  faq_4_q: "What is the best alternative to UpTeams?",
  faq_4_a:
    "It depends on what UpTeams doesn't cover for you. If you need deeper distributor-level retail analytics, FieldAssist or Bizom go further than UpTeams. If you need a field visit to become a tracked service ticket with sales, service, and IT sharing one record, DGlide is built for that specific gap.",
  faq_5_q: "Is DGlide better than UpTeams?",
  faq_5_a:
    "Better for a different job. UpTeams is a lean, affordable choice when attendance and basic CRM tracking are the whole requirement. DGlide is the better fit once a visit needs to produce a tracked outcome, a resolved ticket, a routed approval, a service record, rather than just proof that a rep showed up.",
  faq_6_q: "Does DGlide offer a free trial?",
  faq_6_a:
    "Yes, DGlide offers a free trial along with guided onboarding, similar to UpTeams' no-credit-card trial. The difference is UpTeams lets you self-serve straight into a paid tier, while DGlide scopes the system to your workflow before you commit to a plan.",
  faq_7_q: "What is the difference between DGlide and UpTeams?",
  faq_7_a:
    "UpTeams proves a rep visited a location. DGlide is a configurable operations platform where that same visit can raise a work order, dispatch a technician, and close only after verified resolution, unifying CRM, field service, and IT ticketing on one record instead of stopping at the GPS check-in.",
  faq_8_q: "How is DGlide priced compared to UpTeams?",
  faq_8_a:
    "UpTeams publishes flat per-seat rates. DGlide is quote-based and scales with your plan and scope rather than headcount alone, so pricing stays flat as your field team grows instead of climbing per rep the way UpTeams' does.",
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
