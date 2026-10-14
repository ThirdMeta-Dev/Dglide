// Homepage revamp (14 Oct 2026): copy laid over the CMS section values in app/(public)/page.tsx.
// Plan and reasoning: DGlide-Homepage-Revamp-v1-2026-10-14.md (buyer questions, From Zero positioning,
// SEO/AEO/GEO layer, AI engine as an addition). While these overrides exist, the matching CMS fields
// are not editable from the admin panel; move the copy into the CMS to hand editing back.

type SectionCopy = Record<string, string>;

export const HOME_META = {
  title: "DGlide: Field Service, AMC and Operations Software With AI",
  description:
    "Field service, AMC, production and CRM software for Indian manufacturers, set up around your process. Now with an AI engine that builds apps. Book a demo.",
};

// One description used on every page, so search and AI engines see a consistent entity line.
export const ENTITY_LINE = "DGlide is field service and operations software for manufacturers.";

export const HOME_OVERRIDES: Record<string, SectionCopy> = {
  hero: {
    badge_text: "Field Service and Operations Software for Manufacturers",
    title: "Service Calls, AMC Visits and Production, Off WhatsApp and Excel.",
    subtitle:
      "Ready-to-run systems for field service, AMC contracts, production and sales, set up around how your team already works. Now with an AI engine that builds new apps from a flow diagram.",
    cta_primary_label: "Book a 30-Minute Demo",
    cta_secondary_label: "See How It Works",
    cta_secondary_href: "#how-it-works",
    logo_carousel_title: "Used by Indian Manufacturers",
    logo_carousel_link_label: "See What Each One Runs",
    logo_carousel_link_href: "/customers",
  },
  software_works: {
    badge_text: "Your Software Works.",
    title: "Just Not the Way You Do.",
    subtitle: "Most software makes the team change how it works. Here is what that looked like at DGlide's customers before they switched.",
    item_1_title: "Complaints Arrive by Phone and Get Lost",
    item_1_body: "Service requests come in by call and WhatsApp, and nobody can say which ones are still open.",
    item_2_title: "Stock Lives in Excel and a Tally-Type App",
    item_2_body: "Purchases, production and dispatch never update the same number, so stock gets counted by hand.",
    item_3_title: "Production Status Means Chasing People",
    item_3_body: "Every process and machine update travels by word of mouth and spreadsheet.",
    item_4_title: "Separate Apps That Never Matched the Business",
    item_4_body: "Sales, service, AMCs and manuals sit in different tools, and work falls between them.",
  },
  comparison: {
    left_item_1: "Fast to start. Your business bends to match the software.",
    left_item_3: "Built for the category, not your business.",
    right_item_1: "Works at first. Becomes a software project you own forever.",
    right_item_3: "A custom build comes with a custom headache.",
  },
  four_reasons: {
    title: "Four Reasons Operations Leaders Choose DGlide",
    card_1_title: "Shaped to Your Operation",
    card_1_desc: "Configure the process to match how your team already works.",
    card_2_title: "Live in Weeks, Not Months",
    card_2_desc: "You get a real, working setup fast, then refine it.",
    card_3_title: "Change It by Asking",
    card_3_desc: "Need a new field, approval step or dashboard? Describe it, and the AI engine builds it on the platform.",
    card_4_title: "No Code to Own",
    card_4_desc: "No developer dependency and no code to host, even for what the AI builds.",
  },
  one_system: {
    title: "Run Your Whole Operation on One System",
    subtitle: "Field Service, AMC Contracts, Production and Sales on One Backbone, Instead of Disconnected Tools.",
    left_1_title: "Field Service and AMC",
    left_1_desc: "Work orders, scheduling, dispatch, AMC visits and service reports in one place.",
    left_2_title: "Complaints and Helpdesk",
    left_2_desc: "Customer complaints, internal requests and IT tickets, each with an owner and an SLA.",
    right_1_title: "Production Tracking",
    right_1_desc: "Track every stage from raw material to finished product and dispatch.",
    right_2_title: "Field Sales and CRM",
    right_2_desc: "Leads, IndiaMART enquiries, visits and quotations in one pipeline.",
  },
  how_it_works: {
    title: "How DGlide Goes Live in Weeks, Not Months",
    step_1_title: "Start With a Working System",
    step_1_desc: "Begin with ready-made field service, CRM or production apps.",
    step_2_title: "Shape It to Your Process",
    step_2_desc: "Set your stages, approvals and roles. Or upload a flow diagram, and the AI engine builds the first version.",
    step_3_title: "Check, Then Launch",
    step_3_desc: "A second AI validates every AI build, and your team tests it in a sandbox before go-live.",
    step_4_title: "Change It Anytime",
    step_4_desc: "Ask for a new field, form or dashboard. No rebuild project.",
  },
  living_service: {
    left_title: "The Living Service Model: Software That Keeps Up With You",
    left_body:
      "Your system is adjusted as your operation changes, quarter after quarter. With the AI engine, many changes now start with a single sentence.",
    feature_1: "Live Visibility",
    tab_4_label: "Improve Without Developers",
  },
  business_tabs: {
    section_title: "Built for Businesses Like Yours",
    tab_1_label: "Equipment and Machinery Makers",
    tab_1_title: "Equipment and Machinery Makers",
    tab_1_subtitle: "After-sales service, AMCs and spares for the machines you sell",
    tab_1_bullet_1: "When complaints come in by phone, WhatsApp and email.",
    tab_1_bullet_2: "When AMC visits and renewals live in a register.",
    tab_1_bullet_3: "When engineers need the right manual and spare at the machine.",
    tab_1_cta_label: "See Field Service and AMC",
    tab_1_cta_href: "/field-service-management-fsm",
    tab_2_label: "Manufacturing and Production",
    tab_2_title: "Manufacturing and Production",
    tab_2_subtitle: "Factories running production on spreadsheets and floor knowledge",
    tab_2_bullet_1: "When production updates travel by WhatsApp.",
    tab_2_bullet_2: "When every product line works a little differently.",
    tab_2_bullet_3: "When quality and dispatch work from different lists.",
    tab_2_cta_label: "See Production Tracking",
    tab_2_cta_href: "/manufacturing-management-software",
    tab_3_label: "Service and AMC Businesses",
    tab_3_title: "Service and AMC Businesses",
    tab_3_subtitle: "Service teams juggling calls, visits and payouts",
    tab_3_bullet_1: "When technicians are assigned by phone.",
    tab_3_bullet_2: "When nobody can see which jobs breach their SLA.",
    tab_3_bullet_3: "When monthly payouts are worked out by hand.",
    tab_3_cta_label: "See Field Service",
    tab_3_cta_href: "/field-service-management-fsm",
    tab_4_label: "Internal Support Teams",
    tab_4_title: "Internal Support Teams",
    tab_4_subtitle: "IT and support teams working from an inbox",
    tab_4_bullet_1: "When requests arrive by email with no owner.",
    tab_4_bullet_2: "When SLAs are tracked in someone's head.",
    tab_4_bullet_3: "When managers cannot see the queue.",
    tab_4_cta_label: "See Ticketing",
    tab_4_cta_href: "/it-service-management-itsm",
  },
  case_studies: {
    cta_label: "See What Every Customer Runs",
    cta_href: "/customers",
  },
  competitor: {
    title: "Every Other Option Has a Catch",
    comp_1_label: "Enterprise Suites",
    comp_1_bullet_1: "Heavy, slow to roll out",
    comp_1_bullet_2: "Feature-heavy, complex and overkill",
    comp_2_label: "Standard Software",
    comp_2_bullet_1: "Fixed workflows you cannot change",
    comp_2_bullet_2: "Cheap upfront",
    comp_3_label: "Custom Build or AI-Generated Code",
    comp_3_bullet_1: "Months to build, or minutes to generate",
    comp_3_bullet_2: "Either way, the code is yours to host, secure and fix",
    right_title: "With DGlide",
    right_body:
      "DGlide Is Not a Heavier Suite, a Rigid Tool or Code You Maintain. It Is a Platform Shaped to How You Work, Where Even AI-Built Apps Run Governed and Ready to Edit.",
    right_feat_1: "Works your way from day one",
    right_feat_2: "Live in weeks, not months",
    right_feat_3: "Changes by asking, through the AI engine",
    right_feat_4: "No code to host or maintain",
  },
  capabilities: {
    title: "What Every DGlide App Comes With",
    subtitle: "One set of capabilities, working across your whole operation.",
    cap_1_title: "Automated Workflows",
    cap_1_desc: "Cut the manual steps between every stage.",
    cap_2_title: "Approvals and SLA Tracking",
    cap_2_desc: "Stage-based approvals, escalations and SLA alerts built in.",
    cap_3_title: "Live Dashboards",
    cap_3_desc: "Role-based views of every job, request and exception.",
    cap_4_title: "Mobile App for Field Teams",
    cap_4_desc: "Android and iOS apps for check-in, photos and customer sign-off at the site.",
  },
  cta: {
    badge_text: "Book a 30-Minute Demo",
    title: "Bring One Workflow Your Team Runs Today. See It Set Up on DGlide, or Built by the AI Engine From Your Diagram.",
    cta_label: "Book a Demo",
  },
};

// Extra capability cards, shown after the four CMS cards.
export const EXTRA_CAPABILITIES = [
  {
    id: "ai",
    title: "AI Engine",
    desc: "Build forms, workflows and dashboards from a diagram or a sentence, checked by a second AI before go-live.",
    href: "/ai-engine",
  },
  {
    id: "intake",
    title: "WhatsApp and Email Intake",
    desc: "Customers raise requests on WhatsApp or email, and each one becomes a ticket or work order.",
  },
];

export const ONE_SYSTEM_AI_NOTE = {
  text: "Need something that is not on this list? Describe it, and the AI engine builds it on the same system.",
  linkLabel: "See the AI Engine",
  href: "/ai-engine",
};

export const KEEP_PROCESS_BANDS = {
  first: {
    titleLines: ["Keep Your Process.", "Change the Software Instead."] as [string, string],
    description:
      "In One Demo, DGlide Maps a Workflow Your Team Runs Today. You Will Know in 30 Minutes, Not 6 Months Into a Rollout.",
    ctaLabel: "Book a Demo",
  },
  second: {
    titleLines: ["Lost Leads, Slow Service, No Visibility.", "Fixed in a Quarter."] as [string, string],
    description:
      "That Was a 50-Person Manufacturer. Tell DGlide How Your Operation Runs Today, and See in 30 Minutes Where the Leaks Are.",
    ctaLabel: "Show Me Where the Leaks Are",
  },
};

// Testimonials that cannot be traced to a real, named person stay off the page.
export const UNVERIFIED_TESTIMONIAL_COMPANIES = ["aero precision works", "nexus field services", "scaleops international"];

// Risk block (buyer question: what could go wrong, what will it take). Replaces "From Demo to Live in Weeks".
export const GO_LIVE = {
  eyebrow: "BEFORE YOU SWITCH",
  title: "What It Takes to Go Live",
  subtitle: "The questions owners and service heads ask before they switch, answered up front.",
  items: [
    { title: "Weeks, Not Months", body: "Start from a working system and go live in weeks, then keep refining." },
    { title: "AI Builds Are Checked", body: "A second AI validates every AI build. Changes are tested in a sandbox, then pushed to production." },
    { title: "Works With Your Channels", body: "WhatsApp through WATI, email inboxes, IndiaMART, barcode scanning and business-card scans." },
    { title: "On Every Phone", body: "Android and iOS apps for technicians, with check-in, photos and customer sign-off." },
    { title: "Your Formats, Kept", body: "Quotations, invoices and service reports follow the formats you already use." },
  ],
};

// Homepage FAQ (house format: restate first, 3-4 sentences under 15 words each, under 60 words, no numbers).
export const HOME_FAQS = [
  {
    q: "What is DGlide?",
    a: "DGlide is field service and operations software for manufacturers. It runs service calls, AMC visits, production and sales on one system. Each setup follows how the team already works. A built-in AI engine builds new apps from a flow diagram.",
  },
  {
    q: "Who uses DGlide?",
    a: "DGlide is used by Indian manufacturers and service teams. Customers include laser, CNC, cooler, watch and steel makers. Most run field service, CRM or production tracking. Many run several of these on one system.",
  },
  {
    q: "What is the DGlide AI engine?",
    a: "The DGlide AI engine builds no-code apps from a diagram or written requirement. It creates the forms, fields, workflows and dashboards. A second AI validates each build before it goes live. The app runs on the DGlide platform, not as raw code.",
  },
  {
    q: "Is DGlide a code generator?",
    a: "No, DGlide is not a code generator. The AI engine builds apps on the DGlide no-code platform. There is no raw code to host or maintain. Teams change the app by asking or by editing it directly.",
  },
  {
    q: "How long does it take to go live on DGlide?",
    a: "Most DGlide setups go live in weeks, not months. Teams start from a working system instead of a blank screen. Stages, approvals and roles are then set to match the process. The AI engine can build the first version from a diagram.",
  },
  {
    q: "Does DGlide work with WhatsApp and IndiaMART?",
    a: "Yes, DGlide works with WhatsApp and IndiaMART. Customers can raise service requests on WhatsApp through WATI. IndiaMART enquiries arrive in the CRM as leads. Email inboxes can also create tickets automatically.",
  },
  {
    q: "Can DGlide manage AMC contracts?",
    a: "Yes, DGlide manages AMC contracts and their visits. AMC schedules create work orders automatically. Reminders go out before a contract expires. Engineers record each visit on the mobile app.",
  },
];
