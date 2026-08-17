import type { Metadata } from "next";
import { listPublishedCaseStudiesFresh, type CaseStudy } from "@/lib/case-studies-db";
import { listBlogPostsSafe } from "@/lib/blog-db";
import UsefulResourcesSection from "@/components/sections/UsefulResourcesSection";
import CaseStudiesClient from "./CaseStudiesClient";

// Shown until real case studies are published via /admin/case-studies.
// Content from Figma node 2238:564 (Case study Listing & Download page).
const FALLBACK_STUDIES: CaseStudy[] = [
  {
    id: "",
    company: "Prompt Lasers",
    logoUrl: "/case-studies/logos/prompt-lasers.png",
    category: "Field Service",
    title: "Prompt Lasers stopped losing high-intent leads",
    excerpt:
      "DGlide automated IndiaMART lead capture and connected sales with operations, cutting response time from 40+ minutes to just 8 and tripling captured Buy Leads.",
    personName: "Mr. Rahul Sharma",
    personRole: "Director, Prompt Lasers",
    metricOneValue: "-75%",
    metricOneLabel: "Lower system cost vs. quoted ERP alternatives",
    metricTwoValue: "8 Min",
    metricTwoLabel: "Average lead response time, down from 40+",
    pdfUrl: "",
    isFeatured: true,
    status: "published",
    orderIndex: 0,
    createdAt: "",
    updatedAt: "",
  },
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: { absolute: "Case Studies: Real Teams, Real Results | DGlide" },
  description: "See how manufacturing, facility management, and logistics teams replaced broken tools with DGlide, and what changed in SLAs, cost, and field visibility.",
};

export default async function CaseStudiesPage() {
  const [studies, blogResult] = await Promise.all([
    listPublishedCaseStudiesFresh(),
    listBlogPostsSafe({ limit: 1, publishedOnly: true, sortField: "publishedAt", sortDir: "desc", fields: "list" }),
  ]);

  const effectiveStudies = studies.length > 0 ? studies : FALLBACK_STUDIES;

  return (
    <>
      <CaseStudiesClient studies={effectiveStudies} />
      <UsefulResourcesSection latestPost={blogResult.docs[0]} latestCaseStudy={effectiveStudies[0]} />
    </>
  );
}
