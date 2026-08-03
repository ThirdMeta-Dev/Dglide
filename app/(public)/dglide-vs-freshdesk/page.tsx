import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import { getHomepageSections } from "@/lib/supabase/sections";
import ComparisonPage from "./ComparisonPage";

export const metadata: Metadata = {
  title: { absolute: "DGlide vs Freshdesk: Full Helpdesk Comparison" },
  description:
    "Compare DGlide and Freshdesk across helpdesk channels, workflows, field service, pricing, automation, and total operational fit.",
  alternates: {
    canonical: "/dglide-vs-freshdesk",
  },
  openGraph: {
    title: "DGlide vs Freshdesk: A Helpdesk or an Operations Platform?",
    description:
      "See where Freshdesk's helpdesk ends and DGlide's operations platform begins.",
    url: "/dglide-vs-freshdesk",
  },
};

export default async function DGlideVsFreshdeskPage() {
  const homepageSections = await getHomepageSections();

  return <ComparisonPage homepageSections={homepageSections} />;
}
