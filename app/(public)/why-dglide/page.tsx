import type { Metadata } from "next";
import "@/styles/why-dglide-responsive.css";
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
          slide_1_detail: "Go live on a working system",
          slide_1_body: "You start with a ready-to-run operational system, configured to your current process. No long build before you can use it.",
          slide_1_bullet_1: "Live in weeks, not quarters",
          slide_1_bullet_2: "Configured to fit how you work today",
          slide_2_detail: "Run your real operations",
          slide_2_body: "As your team works, real requirements surface: a new field, a niche approval, a process exception. With most software, that's where you get stuck.",
          slide_2_bullet_1: "Real-time visibility across your operation",
          slide_2_bullet_2: "Workflows your team actually follows",
          slide_3_detail: "Change it without a rebuild",
          slide_3_body: "When your workflows, teams, or rules change, the system changes with them. No hardcoded limits, no waiting on a vendor to say no.",
          slide_3_bullet_1: "Add fields, steps, and approvals as you grow",
          slide_3_bullet_2: "No dev project for every change",
          slide_4_detail: "Keep getting sharper over time",
          slide_4_body: "Intelligence and a continuous service layer keep the system aligned as your operation evolves, so it improves instead of drifting out of sync.",
          slide_4_bullet_1: "Automation cuts manual coordination",
          slide_4_bullet_2: "A service layer keeps you aligned",
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
      <div className="mb-[130px]">
        <WDFAQSection />
      </div>
      <div className="mb-[130px]">
        <WDFinalCTASection />
      </div>
    </AnimatedPublicPage>
  );
}
