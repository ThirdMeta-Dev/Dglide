import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import { getHomepageSections } from "@/lib/supabase/sections";
import ComparisonPage from "./ComparisonPage";

const title = "DGlide vs UpTeams Comparison: Features, Pricing, Fit";
const description =
  "See where UpTeams' attendance tracking ends and DGlide's operations platform begins: field visits, tickets, workflows, pricing, and total cost.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/dglide-vs-upteams",
  },
  openGraph: {
    title,
    description,
    url: "/dglide-vs-upteams",
  },
};

export default async function DGlideVsUpTeamsPage() {
  const homepageSections = await getHomepageSections();

  return <ComparisonPage homepageSections={homepageSections} />;
}
