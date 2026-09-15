import flatPricingIcon from "@/components/comparison-assets/upteams/flat-pricing.svg";
import fieldVisitToTicketImage from "@/components/comparison-assets/upteams/field-visit-to-ticket.png";
import noCodeWorkflowIcon from "@/components/comparison-assets/upteams/no-code-workflow.svg";
import onePlatformImage from "@/components/comparison-assets/upteams/one-platform.png";
import oneRecordIcon from "@/components/comparison-assets/upteams/one-record.svg";
import processMovesImage from "@/components/comparison-assets/upteams/process-moves.png";
import visitToTicketIcon from "@/components/comparison-assets/upteams/visit-to-ticket.svg";

export type ComparisonRow = { feature: string; dglide: string; upteams: string };
export type ComparisonGroup = { title: string; rows: ComparisonRow[] };

export const differentiators = [
  { title: "AMC Built-In", description: "Contracts, visit counts, and renewal alerts sit beside every job.", icon: visitToTicketIcon },
  { title: "Serial Number First", description: "Every complaint opens against the machine and its warranty.", icon: oneRecordIcon },
  { title: "Works Without Signal", description: "Technicians update status, parts, and sign-off offline, then sync.", icon: noCodeWorkflowIcon },
  { title: "Tally and GST Ready", description: "GST invoices and Tally entries flow from the closed job.", icon: flatPricingIcon },
] as const;

export const fitCards = [
  {
    kind: "dglide" as const,
    title: "DGlide Is the Better Choice If",
    description: "Your service revenue comes from machines you sold, contracts you renew, and parts you bill.",
    bullets: [
      "AMC and warranty renewals drive revenue",
      "Complaints must open against a serial number",
      "Technicians work where signal drops",
      "Accounts run on Tally with GST invoices",
      "Sales enquiries and service share one record",
    ],
  },
  {
    kind: "freshdesk" as const,
    title: "Zoho FSM Serves You Better If",
    description: "You book many short, one-off visits and already run Zoho CRM or Zoho Books.",
    bullets: [
      "Your teams already work inside Zoho apps",
      "The free plan covers your job volume",
      "Jobs are single visits, not contracts",
      "You want published prices and self-signup",
      "Technicians need the app in many languages",
    ],
  },
] as const;

export const winRows = [
  {
    title: "AMC Contracts Live Inside the System",
    description: "Zoho FSM lists no contract module; contracts attach to an asset as documents. DGlide holds each AMC as a record: visits owed, visits done, expiry date, and a renewal alert your coordinator sees weeks before the contract lapses.",
    image: fieldVisitToTicketImage,
  },
  {
    title: "The Job Keeps Moving Offline",
    description: "Zoho FSM's offline mode is read-only for the latest 200 appointments, and status updates wait for signal. DGlide technicians update status, parts used, photos, and customer sign-off offline, and the job syncs once the phone reconnects.",
    image: processMovesImage,
  },
  {
    title: "Spares and Tally Without Extra Apps",
    description: "Zoho FSM needs Zoho Inventory and Zoho Books subscriptions for stock and serial numbers, and lists no Tally connector. DGlide tracks spares by machine, raises the GST invoice from the job, and syncs entries to Tally.",
    image: onePlatformImage,
  },
] as const;

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Pricing and Plans",
    rows: [
      { feature: "Pricing basis", dglide: "Custom quote for your team and scope", upteams: "Service appointments per month, whole organisation" },
      { feature: "Entry price", dglide: "Custom quote", upteams: "Standard from INR 1,200 a month (60 appointments), plus GST" },
      { feature: "At 2,000 appointments a month", dglide: "Custom quote", upteams: "Standard INR 19,600, Professional INR 30,000, Premium INR 40,000 a month, plus GST" },
      { feature: "Multi-day jobs", dglide: "Custom quote", upteams: "Counted once for each day the job spans" },
      { feature: "Unused volume", dglide: "Not applicable", upteams: "Unused appointments do not roll over" },
      { feature: "Free plan", dglide: "Not offered", upteams: "Free: 30 appointments a month, 20 users" },
      { feature: "Free trial", dglide: "Yes", upteams: "Yes" },
      { feature: "Setup and onboarding", dglide: "DGlide team configures and trains", upteams: "Self-setup, or Zoho partner packages" },
      { feature: "User limit", dglide: "Set in your quote", upteams: "200 on Standard and Professional, 500 on Premium" },
    ],
  },
  {
    title: "Service Requests and Work Orders",
    rows: [
      { feature: "Service requests from calls, email, and web", dglide: "Included", upteams: "Included; web forms from Standard" },
      { feature: "Complaints logged from your own website", dglide: "Included", upteams: "Web forms, Standard" },
      { feature: "Complaint categories and root cause", dglide: "Included", upteams: "Not listed" },
      { feature: "Estimates and quotes", dglide: "Included", upteams: "Included; multi-option estimates Professional" },
      { feature: "Work orders", dglide: "Included", upteams: "Included; 10 to 50 line items by edition" },
      { feature: "Multi-day installation jobs", dglide: "Included", upteams: "Professional" },
      { feature: "Checklists and job sheets", dglide: "Included", upteams: "Professional" },
    ],
  },
  {
    title: "Scheduling and Dispatch",
    rows: [
      { feature: "Dispatch board", dglide: "Included", upteams: "Gantt all editions; map Standard; grid Professional" },
      { feature: "Live technician location", dglide: "Included", upteams: "Standard" },
      { feature: "Skill-based assignment", dglide: "Included", upteams: "Premium" },
      { feature: "Automatic job assignment", dglide: "Included", upteams: "Not listed (territory auto-assignment rule only)" },
      { feature: "Route planning", dglide: "Included", upteams: "Not listed" },
      { feature: "SLA timers and escalations", dglide: "Included", upteams: "Not listed" },
      { feature: "Territories and crews", dglide: "Included", upteams: "Standard" },
      { feature: "Shifts", dglide: "Included", upteams: "Premium" },
    ],
  },
  {
    title: "Technician Mobile App",
    rows: [
      { feature: "Android and iOS apps", dglide: "Included", upteams: "Included" },
      { feature: "Status updates offline", dglide: "Included", upteams: "Not available (offline is read-only)" },
      { feature: "Job history offline", dglide: "Included", upteams: "Latest 200 appointments, cached daily" },
      { feature: "Hindi and regional languages", dglide: "Included", upteams: "Hindi (only Indian language listed)" },
      { feature: "Photos, notes, and customer signature", dglide: "Included", upteams: "Included" },
      { feature: "Parts used, logged from site", dglide: "Included", upteams: "Included" },
    ],
  },
  {
    title: "Installed Base, AMC and Warranty",
    rows: [
      { feature: "Installed base by serial number", dglide: "Included", upteams: "Assets Professional; serial numbers via Zoho Inventory" },
      { feature: "AMC and service contracts", dglide: "Included", upteams: "Not listed (contracts attach to assets as documents)" },
      { feature: "Visits owed and visits done per contract", dglide: "Included", upteams: "Not listed" },
      { feature: "AMC renewal alerts", dglide: "Included", upteams: "Not listed" },
      { feature: "Comprehensive and non-comprehensive AMC terms", dglide: "Included", upteams: "Not listed" },
      { feature: "Warranty status by serial number", dglide: "Included", upteams: "Warranty expiry field on asset, Professional" },
      { feature: "Chargeable vs under-warranty visits", dglide: "Included", upteams: "Not listed" },
      { feature: "Preventive maintenance plans", dglide: "Included", upteams: "Professional (500 active plans)" },
    ],
  },
  {
    title: "Spares, Billing and Accounts",
    rows: [
      { feature: "Spare parts catalogue", dglide: "Included", upteams: "Included" },
      { feature: "Spares stock by location", dglide: "Included", upteams: "Via Zoho app (Zoho Inventory Professional and Zoho Books Premium)" },
      { feature: "Spares by machine model", dglide: "Included", upteams: "Not listed" },
      { feature: "GST invoice from the job", dglide: "Included", upteams: "Via Zoho app (Zoho Invoice or Zoho Books, Indian tax edition)" },
      { feature: "Payment links from the field", dglide: "Included", upteams: "Included through Zoho Invoice or Zoho Books gateways" },
      { feature: "Tally sync", dglide: "Included", upteams: "Not listed" },
      { feature: "Job costing", dglide: "Included", upteams: "Professional" },
    ],
  },
  {
    title: "Customer Communication",
    rows: [
      { feature: "WhatsApp updates", dglide: "Included", upteams: "Professional" },
      { feature: "Email and SMS updates", dglide: "Included", upteams: "Included" },
      { feature: "Customer portal", dglide: "Included", upteams: "Included" },
      { feature: "Online estimate approval", dglide: "Included", upteams: "Included" },
      { feature: "Built-in calling", dglide: "Included", upteams: "Professional" },
    ],
  },
  {
    title: "Sales and Leads",
    rows: [
      { feature: "Enquiry and lead management", dglide: "Included", upteams: "Via Zoho app (Zoho CRM or Bigin, Standard)" },
      { feature: "IndiaMART lead sync", dglide: "Included", upteams: "Not listed" },
      { feature: "Sale to installation handoff", dglide: "Included", upteams: "Via Zoho app (Zoho CRM, Standard)" },
    ],
  },
  {
    title: "Customisation and Workflows",
    rows: [
      { feature: "Custom fields", dglide: "Included", upteams: "10 to 300 per module by edition" },
      { feature: "Custom modules", dglide: "Included", upteams: "Not listed" },
      { feature: "Approval steps", dglide: "Included", upteams: "Not listed" },
      { feature: "Workflow rules", dglide: "Included", upteams: "3 to 20 active per module by edition" },
      { feature: "Time-based workflows", dglide: "Included", upteams: "Professional" },
      { feature: "How changes are made", dglide: "Configured by DGlide, no code", upteams: "Deluge custom functions, Standard and up" },
      { feature: "Roles and field permissions", dglide: "Included", upteams: "Profiles Standard; field permissions Premium" },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { feature: "Tally", dglide: "Included", upteams: "Not listed" },
      { feature: "Zoho Books and Zoho CRM", dglide: "Included", upteams: "Standard" },
      { feature: "SAP Business One and other ERPs", dglide: "Included", upteams: "Not listed" },
      { feature: "QuickBooks and Xero", dglide: "Included", upteams: "Customer-built with Deluge scripts" },
      { feature: "REST API and webhooks", dglide: "Included", upteams: "API all editions; webhooks Standard" },
      { feature: "Zapier", dglide: "Included", upteams: "Standard" },
    ],
  },
  {
    title: "Reporting",
    rows: [
      { feature: "Dashboards", dglide: "Included", upteams: "Included" },
      { feature: "Custom reports", dglide: "Included", upteams: "Standard" },
      { feature: "Scheduled reports", dglide: "Included", upteams: "Premium" },
      { feature: "AMC revenue and renewal reports", dglide: "Included", upteams: "Not listed" },
      { feature: "Technician productivity", dglide: "Included", upteams: "Workforce insights, Premium" },
    ],
  },
  {
    title: "Data and Support",
    rows: [
      { feature: "India data hosting", dglide: "Included", upteams: "Included (India data centre)" },
      { feature: "Data export", dglide: "Included", upteams: "CSV, 5,000 to 50,000 records per export by edition" },
      { feature: "Setup help", dglide: "DGlide team", upteams: "Zoho onboarding team or paid partner" },
    ],
  },
];

export const comparisonFaqData: Record<string, string> = {
  title: "Frequently Asked Questions",
  faq_1_q: "How much does Zoho FSM cost?",
  faq_1_a: "Zoho FSM costs from INR 1,200 a month on its Standard edition. Zoho prices by service appointments per month, not per user. Higher editions and larger appointment volumes cost more, plus GST. DGlide is priced by custom quote for your team and scope.",
  faq_2_q: "Is Zoho FSM free?",
  faq_2_a: "Zoho FSM has a free plan with limits. It allows 30 service appointments a month and up to 20 users. Offline access starts on the paid Standard edition. Assets, maintenance plans, and WhatsApp need the Professional edition.",
  faq_3_q: "Is Zoho FSM included in Zoho One?",
  faq_3_a: "No, Zoho FSM is not included in Zoho One. Zoho sells FSM as a stand-alone product. You subscribe to it separately from any Zoho One licence. Stock tracking also needs Zoho Inventory and Zoho Books subscriptions.",
  faq_4_q: "What is the difference between Zoho FSM and DGlide?",
  faq_4_a: "The difference between Zoho FSM and DGlide is what each system is built around. Zoho FSM is built around scheduling service appointments. DGlide is built around the equipment you service, its AMC contracts, and warranties. DGlide also keeps spares, GST billing, and Tally sync in one system.",
  faq_5_q: "Does Zoho FSM manage AMC contracts?",
  faq_5_a: "Zoho FSM does not list a dedicated AMC or contract module. Its help pages show contracts attached to assets as documents. Maintenance plans can schedule recurring visits on the Professional edition. DGlide tracks each AMC as a record with visits owed and renewal alerts.",
  faq_6_q: "Is DGlide a good Zoho FSM alternative?",
  faq_6_a: "DGlide is a good Zoho FSM alternative for equipment and AMC service businesses. It suits teams whose revenue comes from contracts, warranties, and spares. Teams booking short one-off visits may prefer Zoho FSM. So may companies running every department on Zoho apps.",
  faq_7_q: "How do we move from Zoho FSM to DGlide?",
  faq_7_a: "Moving from Zoho FSM to DGlide starts with Zoho's CSV exports. You export customers, assets, and work order history. DGlide maps them to machines, contracts, and open jobs. Most teams go live in weeks with technicians trained on the new app.",
  faq_8_q: "How is DGlide priced?",
  faq_8_a: "DGlide is priced by custom quote. The quote depends on your team, sites, and workflows. Field service, AMC contracts, and billing run on the same platform. Book a demo to get a quote for your service operation.",
};

export const caseStudyData: Record<string, string> = {
  title: "Proof, Not Promises",
  challenge_title: "The Challenge",
  challenge_body: "An air cooler maker was losing service revenue somewhere between complaint calls, technician visits, and billing.",
  challenge_tag_1: "Appliance Manufacturer",
  challenge_tag_2: "Complaints + Service Billing",
  metrics_title: "The Success Metrics",
  metrics_body: "Once complaints, technicians, and billing ran in one system, service became a profit centre.",
  metric_1_num: "3x",
  metric_1_label: "Service revenue growth in Q1",
  metric_2_num: "40%+",
  metric_2_label: "Faster response time",
  metric_3_num: "1",
  metric_3_label: "System from complaint to invoice",
  quote_text: "We were fixing coolers and forgetting to bill for them. DGlide stopped that. — Mohit Makkar, Director, Clarion",
  right_title: "How DGlide Fixed It",
  right_item_1: "Customers log complaints on the Clarion website",
  right_item_2: "Every complaint lands in one service queue",
  right_item_3: "Technicians assigned and tracked through the day",
  right_item_4: "Billing raised from the closed job",
  right_item_5: "Response time cut by more than 40%",
  right_item_6: "Service reported as its own profit line",
  cta_label: "Get the Full Case Study",
  cta_href: "/case-studies",
};
