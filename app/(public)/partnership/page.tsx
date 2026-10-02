import type { Metadata } from "next";
import PartnershipPage from "@/components/partnership/PartnershipPage";
import "@/components/partnership/partnership.css";

export const metadata: Metadata = {
  title: "DGlide Partner Program",
  description: "Join the DGlide Partner Program for implementation and referral partners in India and the UAE.",
};

export default function PartnershipRoute() {
  return <PartnershipPage />;
}
