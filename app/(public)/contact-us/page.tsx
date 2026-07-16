import type { Metadata } from "next";
import ContactPageSections from "@/components/contact-us/ContactPageSections";

export const metadata: Metadata = {
  title: { absolute: "Talk to Us, Not a Ticket Number | DGlide" },
  description:
    "We build the ticketing systems. Getting in touch with us shouldn't feel like filing one. Reach sales, support, or the team, no queue.",
};

export default function ContactUsPage() {
  return <ContactPageSections />;
}
