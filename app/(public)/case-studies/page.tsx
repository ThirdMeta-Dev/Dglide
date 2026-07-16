import type { Metadata } from "next";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies | DGlide",
  description: "Practical stories and measurable outcomes from operations powered by DGlide.",
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
