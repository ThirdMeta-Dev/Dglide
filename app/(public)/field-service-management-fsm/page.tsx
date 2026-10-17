import type { Metadata } from "next";
import FSMPageContent from "@/components/solutions/FSMPageContent";

export const metadata: Metadata = {
  title: { absolute: "Field Service Software That Adapts to Your Crew | DGlide" },
  description:
    "Stop coordinating field teams over WhatsApp and Excel. DGlide gives real-time visibility on visits, work orders, and scheduling.",
};

export default function FSMPage() {
  return <FSMPageContent />;
}
