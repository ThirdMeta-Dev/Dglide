import type { Metadata } from "next";
import { listBlogPostsFreshSafe } from "@/lib/blog-db";
import { listPublishedCaseStudiesFresh } from "@/lib/case-studies-db";
import "@/styles/about-responsive.css";
import AUHeroSection from "@/components/about/sections/AUHeroSection";
import AUWhatIsSection from "@/components/about/sections/AUWhatIsSection";
import AUSameProblemSection from "@/components/about/sections/AUSameProblemSection";
import AUCoreBeliefSection from "@/components/about/sections/AUCoreBeliefSection";
import LivingServiceSection from "@/components/sections/LivingServiceSection";
import AUMultiSystemsSection from "@/components/about/sections/AUMultiSystemsSection";
import AUThinkDifferentlySection from "@/components/about/sections/AUThinkDifferentlySection";
import BusinessTabsSection from "@/components/sections/BusinessTabsSection";
import AUHowWeWorkSection from "@/components/about/sections/AUHowWeWorkSection";
import AUFounderQuoteSection from "@/components/about/sections/AUFounderQuoteSection";
import AUPeopleSection from "@/components/about/sections/AUPeopleSection";
import LogoCarouselSection from "@/components/sections/LogoCarouselSection";
import AUJourneySection from "@/components/about/sections/AUJourneySection";
import UsefulResourcesSection from "@/components/sections/UsefulResourcesSection";
import AUFinalCTASection from "@/components/about/sections/AUFinalCTASection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";

export const metadata: Metadata = {
  title: { absolute: "Meet the Team Behind the Platform | About DGlide" },
  description:
    "DGlide exists because software should adapt to you, not the other way around. Meet the Pune-based team, backed by 20+ years in field ops and ITSM.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const [{ docs: blogPosts }, caseStudies] = await Promise.all([
    listBlogPostsFreshSafe({
      publishedOnly: true,
      limit: 1,
      sortField: "publishedAt",
      sortDir: "desc",
      fields: "list",
    }),
    listPublishedCaseStudiesFresh(),
  ]);

  return (
    <AnimatedPublicPage className="bg-[#F3F3F3]">
      <AUHeroSection />
      <div className="py-[60px] lg:py-16">
        <AUWhatIsSection />
      </div>
      <AUSameProblemSection />
      <div className="py-[60px] lg:py-16">
        <AUCoreBeliefSection />
      </div>
      <LivingServiceSection
        data={{
          left_title: "The Philosophy Behind DGlide: Living Service Model",
          left_body:
            "Most systems stop evolving after implementation. DGlide does not. Through our Living Service Model, we keep your system aligned with real operations long after go-live, so it never freezes on day one.",
        }}
      />
      <div className="py-[60px] lg:py-16">
        <AUMultiSystemsSection />
      </div>
      <AUThinkDifferentlySection />
      <BusinessTabsSection
        data={{
          section_title: "Built for Businesses Where Workflows Are Not Simple",
        }}
      />
      <div className="py-[60px] lg:py-16">
        <AUHowWeWorkSection />
      </div>
      <AUFounderQuoteSection />
      <div className="py-[60px] lg:py-16">
        <AUPeopleSection />
      </div>
      <LogoCarouselSection title="" />
      <div className="py-[60px] lg:py-16">
        <AUJourneySection />
      </div>
      <UsefulResourcesSection latestPost={blogPosts[0]} latestCaseStudy={caseStudies[0]} />
      <div className="pt-[60px] pb-[130px] lg:pt-16">
        <AUFinalCTASection />
      </div>
    </AnimatedPublicPage>
  );
}
