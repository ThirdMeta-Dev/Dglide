import type { Metadata } from "next";
import FSMPage from "../field-service-management-fsm/page";

// Ads-only landing page: identical to /field-service-management-fsm but must
// never be indexed — no canonical, excluded from sitemap.ts.
export const metadata: Metadata = {
  title: { absolute: "Field Service Management Software for India | DGlide" },
  description:
    "Stop coordinating field teams over WhatsApp and Excel. DGlide gives real-time visibility on visits, work orders, and scheduling.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default FSMPage;
