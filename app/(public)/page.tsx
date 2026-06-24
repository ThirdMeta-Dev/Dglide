import { getHomepageSections } from "@/lib/supabase/sections";
import HeroSection from "@/components/sections/HeroSection";
import SoftwareWorksSection from "@/components/sections/SoftwareWorksSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import FourReasonsSection from "@/components/sections/FourReasonsSection";
import OneSystemSection from "@/components/sections/OneSystemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LivingServiceSection from "@/components/sections/LivingServiceSection";
import BusinessTabsSection from "@/components/sections/BusinessTabsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import CompetitorSection from "@/components/sections/CompetitorSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import LogoCarouselSection from "@/components/sections/LogoCarouselSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LiveFasterSection from "@/components/sections/LiveFasterSection";
import UsefulResourcesSection from "@/components/sections/UsefulResourcesSection";
import CTASection from "@/components/sections/CTASection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";

export default async function HomePage() {
  const sections = await getHomepageSections();

  return (
    <AnimatedPublicPage>
      <HeroSection data={sections.hero} />
      <SoftwareWorksSection data={sections.software_works} />
      <ComparisonSection data={sections.comparison} />
      <FourReasonsSection data={sections.four_reasons} />
      <OneSystemSection data={sections.one_system} />
      <HowItWorksSection data={sections.how_it_works} />
      <LivingServiceSection data={sections.living_service} />
      <BusinessTabsSection data={sections.business_tabs} />
      <CaseStudiesSection data={sections.case_studies} />
      <CompetitorSection data={sections.competitor} />
      <CapabilitiesSection data={sections.capabilities} />
      <LogoCarouselSection data={sections.logo_carousel} />
      <TestimonialsSection data={sections.testimonials} />
      <LiveFasterSection data={sections.live_faster} />
      <UsefulResourcesSection />
      <CTASection data={sections.cta} />
    </AnimatedPublicPage>
  );
}
