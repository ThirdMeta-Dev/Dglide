import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import { getHomepageSections } from "@/lib/supabase/sections";
import ComparisonPage from "../dglide-vs-freshdesk/ComparisonPage";

export const metadata: Metadata = {
  title: { absolute: "DGlide vs Freshdesk: Full Helpdesk Comparison" },
  description:
    "Compare DGlide and Freshdesk across helpdesk channels, workflows, field service, pricing, automation, and total operational fit.",
  alternates: {
    canonical: "/freshdesk-alternative",
  },
  openGraph: {
    title: "DGlide vs Freshdesk: A Helpdesk or an Operations Platform?",
    description:
      "See where Freshdesk's helpdesk ends and DGlide's operations platform begins.",
    url: "/freshdesk-alternative",
  },
};

export default async function FreshdeskAlternativePage() {
  const homepageSections = await getHomepageSections();

  return <ComparisonPage homepageSections={homepageSections} />;
}
