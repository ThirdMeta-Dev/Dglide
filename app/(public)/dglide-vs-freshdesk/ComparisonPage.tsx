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

function Tick() {
  return (
    <svg viewBox="0 0 22 14" aria-hidden>
      <path d="M2 7.2 7.4 10 20 3.5 16.7 2 7.4 6.8 5 5.6Z" fill="currentColor" />
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
                    <li key={bullet}><Tick /><span>{bullet}</span></li>
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

        <HowItWorksSection data={howItWorksData} />
        <TestimonialsSection data={homepageSections.testimonials} />
        <CaseStudiesSection data={caseStudyData} />
        <ValueCards />
        <WDFAQSection data={comparisonFaqData} />
        <CTASection data={ctaData} />
      </div>
    </AnimatedPublicPage>
  );
}
