import type { Metadata } from "next";
import { getHomepageSections } from "@/lib/supabase/sections";
import { listBlogPostsFreshSafe } from "@/lib/blog-db";
import { listPublishedCaseStudiesFresh } from "@/lib/case-studies-db";
import HeroSection from "@/components/sections/HeroSection";
import AiEngineTeaserSection from "@/components/sections/AiEngineTeaserSection";
import SoftwareWorksSection from "@/components/sections/SoftwareWorksSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import KeepYourProcessSection from "@/components/sections/KeepYourProcessSection";
import FourReasonsSection from "@/components/sections/FourReasonsSection";
import OneSystemSection from "@/components/sections/OneSystemSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LivingServiceSection from "@/components/sections/LivingServiceSection";
import BusinessTabsSection from "@/components/sections/BusinessTabsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import CompetitorSection from "@/components/sections/CompetitorSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import GoLiveSection from "@/components/sections/GoLiveSection";
import HomeFaqSection from "@/components/sections/HomeFaqSection";
import UsefulResourcesSection from "@/components/sections/UsefulResourcesSection";
import CTASection from "@/components/sections/CTASection";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";
import {
  EXTRA_CAPABILITIES,
  HOME_FAQS,
  HOME_META,
  HOME_OVERRIDES,
  KEEP_PROCESS_BANDS,
  ONE_SYSTEM_AI_NOTE,
} from "@/data/homepageRevamp";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dglide.com";

export const metadata: Metadata = {
  title: { absolute: HOME_META.title },
  description: HOME_META.description,
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "DGlide",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: "DGlide is field service and operations software for manufacturers.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "DGlide",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "DGlide",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      description:
        "Field service, AMC, production and CRM software for manufacturers, with an AI engine that builds no-code apps from a flow diagram.",
      featureList: [
        "Field service and work order management",
        "AMC contract scheduling and renewal reminders",
        "Complaints, helpdesk and SLA tracking",
        "Production tracking",
        "CRM with IndiaMART leads",
        "WhatsApp and email request intake",
        "Android and iOS apps for field teams",
        "AI engine that builds apps from a flow diagram or written requirement",
      ],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: HOME_FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default async function HomePage() {
  const [sections, { docs: blogPosts }, caseStudies] = await Promise.all([
    getHomepageSections(),
    listBlogPostsFreshSafe({ publishedOnly: true, limit: 1, sortField: 'publishedAt', sortDir: 'desc', fields: 'list' }),
    listPublishedCaseStudiesFresh(),
  ]);

  // Revamped copy is laid over the CMS values (see data/homepageRevamp.ts).
  const section = (key: string) => ({ ...(sections[key] ?? {}), ...(HOME_OVERRIDES[key] ?? {}) });

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <AnimatedPublicPage staticFirstCount={1}>
      <HeroSection data={section("hero")} />
      <AiEngineTeaserSection />
      <SoftwareWorksSection data={section("software_works")} />
      <ComparisonSection data={section("comparison")} />
      <KeepYourProcessSection {...KEEP_PROCESS_BANDS.first} />
      <FourReasonsSection data={section("four_reasons")} />
      <OneSystemSection data={section("one_system")} aiNote={ONE_SYSTEM_AI_NOTE} />
      <HowItWorksSection data={section("how_it_works")} />
      <LivingServiceSection data={section("living_service")} />
      <BusinessTabsSection data={section("business_tabs")} />
      <CaseStudiesSection data={section("case_studies")} />
      <CompetitorSection data={section("competitor")} />
      <CapabilitiesSection data={section("capabilities")} extra={EXTRA_CAPABILITIES} />
      <TestimonialsSection data={sections.testimonials} />
      <KeepYourProcessSection {...KEEP_PROCESS_BANDS.second} />
      <GoLiveSection />
      <HomeFaqSection />
      <UsefulResourcesSection latestPost={blogPosts[0]} latestCaseStudy={caseStudies[0]} />
      <CTASection data={section("cta")} />
    </AnimatedPublicPage>
    </>
  );
}
