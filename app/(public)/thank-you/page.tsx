import type { Metadata } from "next";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";
import AUFinalCTASection from "@/components/about/sections/AUFinalCTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { getHomepageSections } from "@/lib/supabase/sections";
import ThankYouHero from "./ThankYouHero";
import ThankYouFAQ from "./ThankYouFAQ";
import ThankYouReasons from "./ThankYouReasons";
import styles from "./ThankYouPage.module.css";

export const metadata: Metadata = {
  title: "Thank You | DGlide",
  description:
    "Thank you for reaching out. We have received your inquiry and will be in touch shortly.",
};

export default async function ThankYouPage() {
  const sections = await getHomepageSections();

  const testimonialData = {
    ...(sections.testimonials ?? {}),
    section_title: "Hear It From the Teams Using DGlide",
    subtitle:
      "These are operations teams that stopped fighting their software once they picked DGlide",
  };

  return (
    <AnimatedPublicPage className={styles.page}>
      {/* 1. Hero / Thank You header + "What happens next?" CTA card */}
      <ThankYouHero />

      {/* 2. Four reasons section — Figma node 1374:16454 */}
      <ThankYouReasons />

      {/* 3. Testimonials — reused from homepage exactly */}
      <div className={styles.testimonialsWrap}>
        <TestimonialsSection data={testimonialData} />
      </div>

      {/* 4. Blue CTA — AUFinalCTASection with Figma-exact text from node 1371:12602
              Badge: "While you wait" → "See DGlide in Action" (default from component)
              Heading: "Run your operations on a system that adapts with you"
              Button: "Explore the platform" */}
      <div className={styles.ctaWrap}>
        <AUFinalCTASection
          badgeText="See DGlide in Action"
          heading="Run Your Operations on a System That Adapts With You"
          ctaLabel="Explore the platform"
          ctaHref="/platform"
        />
      </div>

      {/* 5. FAQ section — from Figma nodes 1371:13787 + 1415:4243 */}
      <ThankYouFAQ />
    </AnimatedPublicPage>
  );
}
