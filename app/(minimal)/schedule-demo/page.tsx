import { getScheduleDemoSections } from "@/lib/supabase/sections";
import ScheduleDemoHero from "./ScheduleDemoHero";
import ScheduleDemoLogos from "./ScheduleDemoLogos";
import WhyDGlideSection from "@/components/sections/WhyDGlideSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";

export default async function ScheduleDemoPage() {
  const sections = await getScheduleDemoSections();
  return (
    <AnimatedPublicPage className="sd-page-root" style={{ minHeight: "100vh" }}>
      <ScheduleDemoHero data={sections.hero} />
      <ScheduleDemoLogos data={sections.logo_strip} />
      <WhyDGlideSection data={sections.why_dglide} />
      <CaseStudiesSection data={sections.case_studies} />
      <CTASection data={sections.cta} />
      <FAQSection data={sections.faq} />
    </AnimatedPublicPage>
  );
}
