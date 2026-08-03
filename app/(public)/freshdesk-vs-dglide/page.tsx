import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import { getHomepageSections } from "@/lib/supabase/sections";
import ComparisonPage from "../dglide-vs-freshdesk/ComparisonPage";

const title = "DGlide vs Freshdesk: Full Comparison for Operations Teams";
const description =
  "Compare DGlide and Freshdesk feature by feature: field service, workflows, AI, and cost. Operations teams typically pay about 30% less with DGlide.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/freshdesk-vs-dglide",
  },
  openGraph: {
    title,
    description,
    url: "/freshdesk-vs-dglide",
  },
};

export default async function FreshdeskVsDGlidePage() {
  const homepageSections = await getHomepageSections();

  return <ComparisonPage homepageSections={homepageSections} />;
}
