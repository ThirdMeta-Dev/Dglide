import type { Metadata } from "next";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";
import AUFinalCTASection from "@/components/about/sections/AUFinalCTASection";
import LogoCarouselSection from "@/components/sections/LogoCarouselSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { getHomepageSections } from "@/lib/supabase/sections";
import {
  PlanComparisonSection,
  PricingFAQSection,
} from "./PricingInteractiveSections";
import {
  PricingHeroSection,
  PricingPrinciplesSection,
} from "./PricingStaticSections";
import styles from "./PricingPage.module.css";

export const metadata: Metadata = {
  title: { absolute: "Pricing Plans: Starter, Advanced & Enterprise | DGlide" },
  description:
    "Compare DGlide's Starter, Advanced, and Enterprise plans for ITSM and field service management. See what's included before you talk to sales.",
};

export default async function PricingPage() {
  const sections = await getHomepageSections();
  const testimonialData = {
    ...(sections.testimonials ?? {}),
    section_title: "Hear It From the Teams Using DGlide",
    subtitle:
      "These are operations teams that stopped fighting their software once they picked DGlide",
  };

  return (
    <AnimatedPublicPage className={styles.page} staticFirstCount={1}>
      <PricingHeroSection />
      <PlanComparisonSection />
      <PricingPrinciplesSection />
      <div className={styles.logoBand}>
        <LogoCarouselSection data={sections.logo_carousel} />
      </div>
      <div className={styles.pricingCtaWrap}>
        <AUFinalCTASection
          badgeText="One Platform, Priced to You"
          heading={"Tell Us How You Operate.\nWe'll Scope the Plan That Fits."}
          ctaLabel="Book A Free Demo!"
          ctaHref="/schedule-demo"
        />
      </div>
      <div className={styles.testimonialWrap}>
        <TestimonialsSection data={testimonialData} />
      </div>
      <PricingFAQSection />
    </AnimatedPublicPage>
  );
}
