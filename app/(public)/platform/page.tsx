import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import "@/styles/platform-page.css";
import PlatformHeroSection from "@/components/platform/sections/PlatformHeroSection";
import PlatformSectionNav from "@/components/platform/sections/PlatformSectionNav";
import PlatformOperationalRealitySection from "@/components/platform/sections/PlatformOperationalRealitySection";
import PlatformWhatIsSection from "@/components/platform/sections/PlatformWhatIsSection";
import PlatformBackboneSection from "@/components/platform/sections/PlatformBackboneSection";
import PlatformVerticalCapabilitiesSection from "@/components/platform/sections/PlatformVerticalCapabilitiesSection";
import PlatformStartFastSection from "@/components/platform/sections/PlatformStartFastSection";
import PlatformLivingServiceSection from "@/components/platform/sections/PlatformLivingServiceSection";
import PlatformBusinessTabsSection from "@/components/platform/sections/PlatformBusinessTabsSection";
import PlatformMultiSystemsSection from "@/components/platform/sections/PlatformMultiSystemsSection";
import PlatformNotAToolSection from "@/components/platform/sections/PlatformNotAToolSection";
import PlatformImproveBannerSection from "@/components/platform/sections/PlatformImproveBannerSection";
import PlatformWhatImprovesSection from "@/components/platform/sections/PlatformWhatImprovesSection";
import PlatformFeatureGridSection from "@/components/platform/sections/PlatformFeatureGridSection";
import PlatformIntegrationsSection from "@/components/platform/sections/PlatformIntegrationsSection";
import PlatformRealOperationsSection from "@/components/platform/sections/PlatformRealOperationsSection";
import PlatformFinalCTA from "@/components/platform/sections/PlatformFinalCTA";
import PlatformFAQSection from "@/components/platform/sections/PlatformFAQSection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";

export const metadata: Metadata = {
  title: "Platform | DGlide",
  description:
    "The DGlide platform — one operational backbone for field service, workflows, integrations, and enterprise scale.",
};

export default function PlatformPage() {
  return (
    <AnimatedPublicPage className="solutions-page platform-page" staticFirstCount={1}>
      <PlatformHeroSection />
      <PlatformSectionNav />
      <PlatformOperationalRealitySection />
      <PlatformWhatIsSection />
      <PlatformBackboneSection />
      <PlatformVerticalCapabilitiesSection />
      <PlatformStartFastSection />
      <PlatformLivingServiceSection />
      <PlatformBusinessTabsSection />
      <PlatformMultiSystemsSection />
      <PlatformNotAToolSection />
      <PlatformImproveBannerSection />
      <PlatformWhatImprovesSection />
      <PlatformFeatureGridSection />
      <PlatformIntegrationsSection />
      <PlatformRealOperationsSection />
      <PlatformFAQSection />
      <PlatformFinalCTA />
    </AnimatedPublicPage>
  );
}
