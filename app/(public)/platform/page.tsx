import type { Metadata } from "next";
import "@/styles/solutions-page.css";
import "@/styles/platform-page.css";
import PlatformHeroSection from "@/components/platform/sections/PlatformHeroSection";
import PlatformSectionNav from "@/components/platform/sections/PlatformSectionNav";
import PlatformOperationalRealitySection from "@/components/platform/sections/PlatformOperationalRealitySection";
import PlatformWhatIsSection from "@/components/platform/sections/PlatformWhatIsSection";
import PlatformThreePillarsSection from "@/components/platform/sections/PlatformThreePillarsSection";
import PlatformBackboneSection from "@/components/platform/sections/PlatformBackboneSection";
import PlatformCapabilitiesIntroSection from "@/components/platform/sections/PlatformCapabilitiesIntroSection";
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

export const metadata: Metadata = {
  title: "Platform | DGlide",
  description:
    "The DGlide platform — one operational backbone for field service, workflows, integrations, and enterprise scale.",
};

export default function PlatformPage() {
  return (
    <div className="solutions-page platform-page">
      <img
        src="/solutions/curve.svg"
        alt=""
        aria-hidden
        className="sol-hero-curve"
      />
      <PlatformHeroSection />
      <PlatformSectionNav />
      <PlatformOperationalRealitySection />
      <PlatformWhatIsSection />
      <PlatformThreePillarsSection />
      <PlatformBackboneSection />
      <PlatformCapabilitiesIntroSection />
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
    </div>
  );
}
