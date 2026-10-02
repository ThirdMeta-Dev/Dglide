import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { AnimatedPublicPage } from "@/components/animations/MotionPrimitives";
import AUFinalCTASection from "@/components/about/sections/AUFinalCTASection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { getHomepageSections } from "@/lib/supabase/sections";
import ThankYouHero from "./ThankYouHero";
import ThankYouFAQ from "./ThankYouFAQ";
import ThankYouReasons from "./ThankYouReasons";
import styles from "./ThankYouPage.module.css";
import { THANK_YOU_ACCESS_COOKIE, THANK_YOU_ACCESS_PARAM } from "@/lib/thank-you-access";

export const metadata: Metadata = {
  title: "Thank You | DGlide",
  description:
    "Thank you for reaching out. We have received your inquiry and will be in touch shortly.",
};

type ThankYouPageProps = {
  searchParams?: Promise<{
    brochure?: string | string[];
    submitted?: string | string[];
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const submittedParam = params?.[THANK_YOU_ACCESS_PARAM];
  const submitted = Array.isArray(submittedParam) ? submittedParam[0] : submittedParam;
  const cookieStore = await cookies();
  const hasSubmissionAccess =
    submitted === "1" && cookieStore.get(THANK_YOU_ACCESS_COOKIE)?.value === "1";

  if (!hasSubmissionAccess) notFound();

  const brochure = Array.isArray(params?.brochure) ? params?.brochure[0] : params?.brochure;
  const showBrochureDownload = brochure === "fsm-hvac";
  const sections = await getHomepageSections();

  const testimonialData = {
    ...(sections.testimonials ?? {}),
    section_title: "Hear It From the Teams Using DGlide",
    subtitle:
      "These are operations teams that stopped fighting their software once they picked DGlide",
  };

  return (
    <AnimatedPublicPage className={styles.page} staticFirstCount={1}>
      <Script id="google-tag-manager-thank-you" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W8ZSJQM8');
        `}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18310414886"
        strategy="afterInteractive"
      />
      <Script id="google-ads-thank-you" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18310414886');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-W8ZSJQM8"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* 1. Hero / Thank You header + "What happens next?" CTA card */}
      <ThankYouHero showBrochureDownload={showBrochureDownload} />

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
