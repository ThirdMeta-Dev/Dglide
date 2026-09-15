import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import { getHomepageSections } from "@/lib/supabase/sections";
import ComparisonPage from "./ComparisonPage";

const title = "Zoho FSM vs DGlide: Which One Runs Your AMC Business?";
const description =
  "Compare Zoho FSM and DGlide for AMC contracts, warranties, serial-number service, offline field work, spares, GST billing, and Tally integration.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/zoho-fsm-vs-dglide" },
  openGraph: {
    title,
    description,
    url: "/zoho-fsm-vs-dglide",
  },
};

export default async function ZohoFsmVsDGlidePage() {
  const homepageSections = await getHomepageSections();

  return <ComparisonPage homepageSections={homepageSections} />;
}
