import type { Metadata } from "next";
import FsmFocusedLandingPage from "@/components/landing/FsmFocusedLandingPage";
import "@/styles/solutions-page.css";

export const metadata: Metadata = {
  title: { absolute: "Field Service Management Software | DGlide" },
  description:
    "Run work orders, scheduling, technician execution, and field service reporting in one configurable DGlide workflow.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function FsmIndiaLandingPage() {
  return <FsmFocusedLandingPage />;
}
