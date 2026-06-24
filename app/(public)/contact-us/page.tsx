import type { Metadata } from "next";
import ContactPageSections from "@/components/contact-us/ContactPageSections";

export const metadata: Metadata = {
  title: "Contact Us | DGlide",
  description:
    "Reach the right DGlide team for demos, support, partnerships, media, careers, and general enquiries.",
};

export default function ContactUsPage() {
  return <ContactPageSections />;
}
