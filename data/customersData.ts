// Customers page (/customers). One entry per client: logo, name, and how they use DGlide.
// Source: DGlide Customer Implementation Document (Oct 2026). No metrics or people's names by design.
// The `slug` doubles as the anchor id, so homepage logos can link to /customers#<slug>.

export type Customer = {
  slug: string;
  name: string;
  logo?: string;
  industry: string;
  useCases: string[];
  summary: string;
};

export const CUSTOMERS: Customer[] = [
  {
    slug: "ams-india",
    name: "AMS India",
    logo: "/logos/armadillo.png",
    industry: "Electronics manufacturer",
    useCases: ["Projects", "Resource Planning", "Expenses", "Quotations and Invoices"],
    summary:
      "AMS India runs its projects on DGlide, from enquiry to completion. An approved quotation opens the project, and engineer time and expenses are tracked against it. Managers can see which engineers are free and which are overloaded.",
  },
  {
    slug: "charnock-equipment",
    name: "Charnock Equipment",
    industry: "Machinery and components manufacturer",
    useCases: ["CRM", "Field Service", "AMC Management", "Products and Spares"],
    summary:
      "Charnock Equipment runs sales, field service and AMCs on one system, organised by region. AMC visits create work orders on schedule, and engineers open product manuals on the job. Service reports go out as signed PDFs.",
  },
  {
    slug: "clarion-coolers",
    name: "Clarion Coolers",
    logo: "/logos/clarion.png",
    industry: "Air cooler manufacturer",
    useCases: ["WhatsApp Service Requests", "Field Service", "Spare Parts", "Attendance"],
    summary:
      "Clarion Coolers takes service requests on WhatsApp instead of phone calls. Each request becomes a work order, goes to the right manager by ZIP code, and closes only after an OTP check. Spare parts stock and staff attendance run on DGlide too.",
  },
  {
    slug: "indotech",
    name: "Indotech",
    logo: "/logos/indo-tech.png",
    industry: "Machinery manufacturer",
    useCases: ["CRM", "WhatsApp Service Requests", "Field Service", "Quotations and Invoices", "Attendance"],
    summary:
      "Indotech runs its ERP on DGlide, covering CRM, field service, quotations, invoices and attendance. Customers raise service requests on WhatsApp, and each one is assigned by region and agent type. Customers and agents get the details by email automatically.",
  },
  {
    slug: "jsw-steel",
    name: "JSW Steel",
    logo: "/logos/jsw.svg",
    industry: "Steel manufacturer",
    useCases: ["IT Ticketing"],
    summary:
      "JSW Steel runs plant IT ticketing on DGlide. Each issue is sorted by category, sub category and concern area, routed to the right team, and tracked to closure. Alerts and reports keep management informed.",
  },
  {
    slug: "power2u",
    name: "Power2U",
    logo: "/logos/power2u.png",
    industry: "Industrial weld cleaning and surface treatment",
    useCases: ["CRM", "Asset Management"],
    summary:
      "Power2U keeps customers, prospects, campaigns, products and assets in a DGlide CRM. Prospects are tracked by status and source, with dashboards for the pipeline and revenue against target.",
  },
  {
    slug: "prompt-lasers",
    name: "Prompt Lasers",
    logo: "/case-studies/logos/prompt-lasers.png",
    industry: "Laser machinery manufacturer",
    useCases: ["CRM", "Projects", "Inventory", "Field Service"],
    summary:
      "Prompt Lasers runs sales, projects, stock and field service on DGlide. A payment on an order opens the project and its tasks, and a dispatch creates the service work order. Stock updates with every purchase and dispatch.",
  },
  {
    slug: "rolcon",
    name: "Rolcon",
    logo: "/logos/rolcon.svg",
    industry: "Drive and conveyor chain manufacturer",
    useCases: ["Customer Service Ticketing", "SLA Management"],
    summary:
      "Rolcon runs customer service tickets on DGlide. Emails to its support inboxes become tickets and go to the right group. Each ticket carries an SLA by priority, with alerts before a breach.",
  },
  {
    slug: "sharp-laser-component",
    name: "Sharp Laser Component",
    logo: "/logos/sharp-laser-component.svg",
    industry: "Machinery manufacturer",
    useCases: ["Production Tracking", "Quotations", "Dispatch"],
    summary:
      "Sharp Laser Component tracks production on DGlide instead of Excel. Each work order moves process by process and machine by machine, through quality checks to dispatch. Offcuts are traced back to their parent sheet.",
  },
  {
    slug: "tgt-watches",
    name: "TGT Watches",
    logo: "/logos/tgt.svg",
    industry: "Wristwatch manufacturer",
    useCases: ["Manufacturing ERP", "Barcode Stock Tracking", "Production", "Dispatch"],
    summary:
      "TGT Watches runs orders, production and stock on DGlide instead of Excel and a Tally-type app. Barcode scans fill in item details, and raw material, component and finished watch stock update on their own.",
  },
  {
    slug: "yks-engineering",
    name: "YKS Engineering",
    industry: "CNC machine manufacturer",
    useCases: ["CRM", "IndiaMART Leads"],
    summary:
      "YKS Engineering runs a custom CRM on DGlide. IndiaMART enquiries arrive as leads, and the assigned salesperson is notified. Each salesperson sees only their own records.",
  },
];

// Homepage logo strip: logo file to the customer it belongs to.
export const LOGO_TO_SLUG: Record<string, string> = Object.fromEntries(
  CUSTOMERS.filter((c) => c.logo).map((c) => [c.logo as string, c.slug]),
);
