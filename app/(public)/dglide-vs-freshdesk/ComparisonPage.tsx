import Image from "next/image";
import Link from "next/link";
import type { HomepageSections } from "@/lib/supabase/sections";
import { AnimatedPublicPage, ScrollReveal, StaggerItem, StaggerReveal } from "@/components/animations/MotionPrimitives";
import IntegrationsHubSection from "@/components/solutions/sections/IntegrationsHubSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import WDFAQSection from "@/components/why-dglide/sections/WDFAQSection";
import CTASection from "@/components/sections/CTASection";
import { fsmIntegrationsDescription, fsmIntegrationsHeading } from "@/data/fsmPageData";
import { integrationNodes } from "@/data/solutionsPageData";
import ComparisonMatrix from "./ComparisonMatrix";
import {
  caseStudyData,
  comparisonFaqData,
  differentiators,
  fitCards,
  winRows,
} from "./comparison-data";
import styles from "./ComparisonPage.module.css";

const LOGOS = [
  { src: "/logos/logo-1.png", alt: "Power2U" },
  { src: "/logos/logo-2.png", alt: "Armadillo" },
  { src: "/logos/logo-3.png", alt: "Lead Controls" },
  { src: "/logos/logo-4.png", alt: "Clarion" },
  { src: "/logos/logo-5.png", alt: "Indo Tech" },
];

const howItWorksData = {
  title: "How DGlide Works",
  step_1_title: "Start With a Working System",
  step_1_desc: "Begin on a ready-to-run system",
  step_2_title: "Configure to Your Workflow",
  step_2_desc: "Set up your stages, approvals, and roles",
  step_3_title: "Launch Fast",
  step_3_desc: "Deploy fast, without long dev cycles.",
  step_4_title: "Change It Anytime",
  step_4_desc: "No rebuild projects. Just ongoing fit.",
};

const ctaData = {
  badge_text: "See It on Your Workflow",
  title: "Bring your last 20 tickets. A 30-minute walkthrough shows what DGlide closes that Freshdesk can't.",
  cta_label: "Book a Demo",
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tick({ variant }: { variant: "dglide" | "freshdesk" }) {
  if (variant === "dglide") {
    return (
      <svg className={styles.fitCardTickDglide} xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none" aria-hidden>
        <path d="M4.64021 6.29141L8.8494 8.39579L17.2678 4.18703L20.6351 5.87053L8.8494 11.7628L1.27285 7.97492L4.64021 6.29141Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64021 5.99679L8.8494 8.10118L17.2678 3.89241L20.6351 5.57592L8.8494 11.4682L1.27285 7.6803L4.64021 5.99679Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64021 5.69803L8.8494 7.80241L17.2678 3.59364L20.6351 5.27715L8.8494 11.1694L1.27285 7.38153L4.64021 5.69803Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64802 5.39981L8.85721 7.50419L17.2756 3.29542L20.643 4.97893L8.85721 10.8712L1.28066 7.08332L4.64802 5.39981Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64802 5.10238L8.85721 7.20677L17.2756 2.998L20.643 4.68151L8.85721 10.5738L1.28066 6.78589L4.64802 5.10238Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64021 4.80356L8.8494 6.90794L17.2678 2.69917L20.6351 4.38268L8.8494 10.275L1.27285 6.48706L4.64021 4.80356Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64802 4.50619L8.85721 6.61058L17.2756 2.40181L20.643 4.08532L8.85721 9.97759L1.28066 6.1897L4.64802 4.50619Z" fill="#030D8F" stroke="#030D8F" strokeWidth="1.42302" strokeLinecap="round" />
        <path d="M4.64802 4.20877L8.85721 6.31315L17.2756 2.10438L20.643 3.78789L8.85721 9.68017L1.28066 5.89228L4.64802 4.20877Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden>
      <path d="M4.92601 6.82581L9.4923 9.10904L18.6249 4.54257L22.2779 6.36916L9.4923 12.7622L1.27297 8.65239L4.92601 6.82581Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 6.50354L9.4923 8.78677L18.6249 4.22031L22.2779 6.04689L9.4923 12.4399L1.27297 8.33013L4.92601 6.50354Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 5.53528L9.4923 7.81851L18.6249 3.25204L22.2779 5.07863L9.4923 11.4717L1.27297 7.36187L4.92601 5.53528Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 4.88879L9.4923 7.17203L18.6249 2.60556L22.2779 4.43215L9.4923 10.8252L1.27297 6.71538L4.92601 4.88879Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round" />
      <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round" />
    </svg>
  );
}

function Hero() {
  const marqueeLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Resources</span>
          <span>/</span>
          <strong>Comparison</strong>
        </nav>

        <ScrollReveal direction="up">
          <h1>
            <span>DGlide vs Freshdesk:</span>
            <br />
            A Helpdesk or an Operations Platform?
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.08}>
          <p className={styles.heroSubtext}>
            See where Freshdesk&apos;s helpdesk ends and DGlide&apos;s operations platform begins: channels,
            workflows, field service, pricing, and total cost.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.14}>
          <div className={styles.heroActions}>
            <Link href="/schedule-demo" className={`${styles.primaryButton} dg-btn-fill`}>
              Book a Demo <Arrow />
            </Link>
            <a href="#full-comparison" className={`${styles.secondaryButton} dg-btn-outline`}>
              See the Full Comparison <Arrow />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <div className={styles.logoMarquee} aria-label="Teams using DGlide">
        <div className={styles.logoTrack}>
          {marqueeLogos.map((logo, index) => (
            <div className={styles.logoPill} key={`${logo.src}-${index}`}>
              <Image src={logo.src} alt={index < LOGOS.length ? logo.alt : ""} width={212} height={68} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section className={styles.sectionCompact}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleSmall}`}>
            What DGlide Does That Freshdesk Doesn&apos;t
          </h2>
        </ScrollReveal>
        <StaggerReveal className={styles.differentiatorGrid}>
          {differentiators.map((item) => (
            <StaggerItem key={item.title}>
              <article className={styles.differentiatorCard}>
                <Image src={item.icon} alt="" width={74} height={42} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

function FitSection() {
  return (
    <section className={styles.fitSection}>
      <div className={styles.container}>
        <div className={styles.splitHeading}>
          <ScrollReveal direction="left">
            <h2 className={styles.sectionTitle}>Choose by What Your Tickets Are</h2>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p>Two good products, two different jobs. Here is where DGlide earns the demo, and where Freshdesk serves you better.</p>
          </ScrollReveal>
        </div>

        <div className={styles.fitCards}>
          {fitCards.map((card, index) => (
            <ScrollReveal direction={index === 0 ? "left" : "right"} key={card.title}>
              <article className={`${styles.fitCard} ${card.kind === "dglide" ? styles.fitCardDglide : styles.fitCardFreshdesk}`}>
                <div className={styles.fitBrand}>
                  <Image
                    src={card.kind === "dglide" ? "/comparison/fit-dglide-icon.png" : "/comparison/fit-freshdesk-icon.png"}
                    alt=""
                    width={88}
                    height={48}
                  />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.bullets.map((bullet) => (
                    <li key={bullet}><Tick variant={card.kind} /><span>{bullet}</span></li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WinsSection() {
  return (
    <section className={styles.winsSection}>
      <div className={styles.container}>
        <ScrollReveal direction="up">
          <div className={styles.centerHeading}>
            <h2 className={styles.sectionTitle}>How DGlide Wins the Work</h2>
            <p>A closer look at where an operations platform outruns a helpdesk, with the mechanics behind each difference.</p>
          </div>
        </ScrollReveal>

        <div className={styles.winRows}>
          {winRows.map((row, index) => (
            <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} key={row.title}>
              <article className={`${styles.winRow} ${index % 2 === 1 ? styles.winRowReverse : ""}`}>
                <div className={styles.winCopy}>
                  <h3>{row.title}</h3>
                  <p>{row.description}</p>
                </div>
                <div className={styles.winImage}>
                  <Image src={row.image} alt="" width={490} height={276} />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FullComparison() {
  return (
    <section id="full-comparison" className={styles.comparisonSection}>
      <div className={styles.container}>
        <div className={styles.comparisonStickyHeader} data-comparison-sticky-header>
          <div className={styles.comparisonHeading}>
            <ScrollReveal direction="up">
              <h2 className={styles.sectionTitle}>DGlide vs Freshdesk Full Comparison</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.06}>
              <p>The complete matrix, including the rows Freshdesk wins. Add-on means the capability exists, but as a separate paid product.</p>
            </ScrollReveal>
          </div>
          <div className={styles.matrixProductHeader} aria-label="DGlide and Freshworks comparison columns">
            <Image
              src="/comparison/comparison-product-header.png"
              alt="DGlide compared with Freshworks"
              width={369}
              height={53}
            />
          </div>
        </div>
        <ComparisonMatrix />
        <p className={styles.comparisonFootnote}>
          Freshdesk pricing verified on freshworks.com, June 2026. For comparable operations teams,
          DGlide typically comes in lower than Freshdesk plus its Omni and AI add-ons. Exact pricing by
          custom quote, with a free trial available.
        </p>
      </div>
    </section>
  );
}

function ValueCards() {
  return (
    <section className={styles.valueCardsSection}>
      <div className={`${styles.container} ${styles.valueCards}`}>
        <article className={`${styles.valueCard} ${styles.valueCardPrimary}`}>
          <strong>~30%</strong>
          <h3>Lower cost than Freshdesk</h3>
          <p>For comparable operations teams, DGlide typically comes in around 30% under Freshdesk with Omni and AI add-ons.</p>
          <Link href="/contact-us" className="dg-btn-outline">Get a Quote <Arrow /></Link>
        </article>
        <article className={styles.valueCard}>
          <strong>Weeks</strong>
          <h3>From kickoff to go-live</h3>
          <p>You start on a working system shaped to your workflows, so value lands this quarter, not next year.</p>
        </article>
      </div>
    </section>
  );
}

export default function ComparisonPage({ homepageSections }: { homepageSections: HomepageSections }) {
  return (
    <AnimatedPublicPage staticFirstCount={1}>
      <div className={styles.page}>
        <Hero />
        <Differentiators />
        <FitSection />
        <WinsSection />
        <FullComparison />

        <div className="solutions-page solutions-page--fsm solutions-page--shared-mobile-ui">
          <IntegrationsHubSection
            heading={fsmIntegrationsHeading}
            description={fsmIntegrationsDescription}
            mobileDescription="DGlide is designed to work with your existing business environment."
            nodes={integrationNodes}
          />
        </div>

        <div className={styles.howItWorksNoBackground}>
          <HowItWorksSection data={howItWorksData} smoothProgress />
        </div>
        <TestimonialsSection data={homepageSections.testimonials} />
        <CaseStudiesSection data={caseStudyData} />
        <ValueCards />
        <div className={styles.sectionSpacing130}>
          <WDFAQSection data={comparisonFaqData} />
        </div>
        <div className={styles.sectionSpacing130}>
          <CTASection data={ctaData} />
        </div>
      </div>
    </AnimatedPublicPage>
  );
}
