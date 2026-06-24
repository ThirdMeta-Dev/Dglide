import type { Metadata } from "next";
import WDHeroSection from "@/components/why-dglide/sections/WDHeroSection";
import WDTradeoffSection from "@/components/why-dglide/sections/WDTradeoffSection";
import WDCustomFitSection from "@/components/why-dglide/sections/WDCustomFitSection";
import WDFitsBestSection from "@/components/why-dglide/sections/WDFitsBestSection";
import WDOperationsRunSection from "@/components/why-dglide/sections/WDOperationsRunSection";
import LivingServiceSection from "@/components/sections/LivingServiceSection";
import WDRightFitSection from "@/components/why-dglide/sections/WDRightFitSection";
import BusinessTabsSection from "@/components/sections/BusinessTabsSection";
import WDOnePlatformSection from "@/components/why-dglide/sections/WDOnePlatformSection";
import WDStuckBetweenSection from "@/components/why-dglide/sections/WDStuckBetweenSection";
import WDProblemToSystemSection from "@/components/why-dglide/sections/WDProblemToSystemSection";
import WDBeforeAfterSection from "@/components/why-dglide/sections/WDBeforeAfterSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import WDFAQSection from "@/components/why-dglide/sections/WDFAQSection";
import WDFinalCTASection from "@/components/why-dglide/sections/WDFinalCTASection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";

export const metadata: Metadata = {
  title: "Why DGlide | DGlide",
  description:
    "Your operations need software that fits. Not software you fit into. See why teams choose DGlide over rigid tools and custom builds.",
};

export default function WhyDGlidePage() {
  return (
    <AnimatedPublicPage className="bg-[#F3F3F3]">
      <WDHeroSection />
      <div className="py-12 lg:py-16">
        <WDTradeoffSection />
      </div>
      <WDCustomFitSection />
      <WDFitsBestSection />
      <div className="py-12 lg:py-16">
        <WDOperationsRunSection />
      </div>
      <LivingServiceSection
        data={{
          left_title:
            "Your Business Changes After Go-Live. Your Software Should Too.",
          left_body:
            "Most systems are implemented once, then slowly fall out of sync with how your operation really runs. DGlide works differently. Through the Living Service Model, your system keeps adapting as your workflows, teams, rules, and processes evolve.",
        }}
      />
      <div className="py-12 lg:py-16">
        <WDRightFitSection />
      </div>
      <BusinessTabsSection
        data={{
          section_title: "Built for Businesses Where Workflows Are Not Simple",
        }}
      />
      <WDOnePlatformSection />
      <div className="py-12 lg:py-16">
        <WDStuckBetweenSection />
      </div>
      <WDProblemToSystemSection />
      <div className="py-12 lg:py-16">
        <WDBeforeAfterSection />
      </div>
      <CaseStudiesSection
        data={{ title: "How Dglide Works in Real Operations" }}
      />
      <WDFAQSection />
      <WDFinalCTASection />
    </AnimatedPublicPage>
  );
}
