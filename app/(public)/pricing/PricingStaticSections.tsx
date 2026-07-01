import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./PricingPage.module.css";

type Plan = {
  name: string;
  description: string;
  items: string[];
  intro?: string;
  featured?: boolean;
  variant: "starter" | "advanced" | "enterprise";
  icon: string;
};

type Principle = {
  title: string;
  body: string;
  icon: string;
  wide?: boolean;
};

const HERO_STATS = [
  "Up to 70% faster to go live",
  "~40% lower IT cost",
  "Predictable pricing, no surprise bills",
];

const PLANS: Plan[] = [
  {
    name: "Starter",
    variant: "starter",
    icon: "/pricing/icon-starter.png",
    description: "For small teams that need structure without complexity.",
    items: [
      "Core workflows, forms, and approvals",
      "Assignment rules and SLA tracking",
      "Reports and dashboards",
      "Self-service portal",
      "Up to 5 groups, 1 email account",
    ],
  },
  {
    name: "Advanced",
    variant: "advanced",
    featured: true,
    icon: "/pricing/icon-advanced.png",
    description:
      "For growing operations that need automation,integrations, and custom workflows.",
    intro: "Everything in Starter, plus:",
    items: [
      "Custom workflows and process automation",
      "Integrations and external API access",
      "CPQ, projects, and inventory management",
      "Unlimited groups and email accounts, all marketplace extensions",
    ],
  },
  {
    name: "Enterprise",
    variant: "enterprise",
    icon: "/pricing/icon-enterprise.png",
    description:
      "For complex, multi-team operations that need scale, control, and tailored AI.",
    intro: "Everything in Advanced, plus:",
    items: [
      "Customer portals and journey orchestration",
      "Territory management and form wizards",
      "Custom AI/ML models",
      "Priority support",
      "Tailored onboarding",
    ],
  },
];

const PRINCIPLES: Principle[] = [
  {
    title: "Fit Before Features",
    body: "You pay for a system shaped around your workflow, not a long feature list you'll use a fraction of.",
    icon: "/about/how-we-work/icon-fit-before-features.png",
  },
  {
    title: "Clarity Over Complexity",
    body: "Simple for your team to run, even on Enterprise. No bloated setup that needs consultants just to operate.",
    icon: "/about/how-we-work/icon-clarity-over-complexity.png",
  },
  {
    title: "Adaptation Over Rigidity",
    body: "When your process changes, the system changes with it. No new license, no six-month change-request invoice.",
    icon: "/about/how-we-work/icon-adaptation-over-rigidity.png",
  },
  {
    title: "Partnership After Go-Live",
    body: "Every plan includes people who stay involved after launch, not a vendor who disappears once you've paid.",
    icon: "/about/how-we-work/icon-partnership-after-go-live.png",
    wide: true,
  },
  {
    title: "Proof Before Promises",
    body: "We'd rather show the system running on your real workflow than win you with a deck. See it before you commit.",
    icon: "/about/how-we-work/icon-proof-before-promises.png",
    wide: true,
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`${styles.planCard} ${
        plan.featured ? styles.planCardFeatured : ""
      } ${styles[`planCard${plan.variant[0].toUpperCase()}${plan.variant.slice(1)}`]}`}
    >
      {plan.featured ? (
        <Image
          src="/pricing/most-subscribed-badge.svg"
          alt="Most Subscribed"
          width={161}
          height={35}
          className={styles.planBadge}
        />
      ) : null}

      <div className={styles.planTop}>
        <Image src={plan.icon} alt="" width={88} height={48} className={styles.planIcon} />
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
        {!plan.featured ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="295" height="1" viewBox="0 0 295 1" fill="none" style={{ width: "100%", flexShrink: 0 }}>
            <path d="M294.5 0.5H0.499991" stroke="#E8EAFF" strokeLinecap="round"/>
          </svg>
        ) : null}
      </div>

      <div className={styles.planFeatures}>
        {plan.intro ? <p className={styles.planIntro}>{plan.intro}</p> : null}
        <ul>
          {plan.items.map((item) => (
            <li key={item}>
              <span className={styles.planCheck} aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none">
                  <path d="M4.92601 6.82587L9.4923 9.1091L18.6249 4.54263L22.2779 6.36922L9.4923 12.7623L1.27297 8.65245L4.92601 6.82587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 5.21106L9.4923 7.49429L18.6249 2.92783L22.2779 4.75441L9.4923 11.1475L1.27297 7.03765L4.92601 5.21106Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/schedule-demo" className={styles.planButton}>
        Get a Quote
        <ArrowRight size={18} strokeWidth={1.7} />
      </Link>
    </article>
  );
}

function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <article
      className={`${styles.principleCard} ${
        principle.wide ? styles.principleCardWide : ""
      }`}
    >
      <Image
        src={principle.icon}
        alt=""
        width={176}
        height={96}
        className={styles.principleIcon}
      />
      <div className={styles.principleText}>
        <h3>{principle.title}</h3>
        <p>{principle.body}</p>
      </div>
    </article>
  );
}

export function PricingHeroSection() {
  return (
    <section className={styles.heroSection}>
      <Image
        src="/pricing/pricing-hero-lines.svg"
        alt=""
        width={1377}
        height={523}
        className={styles.heroLines}
        priority
      />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTitleGroup}>
            <h1>Stop Paying Enterprise Prices for Software That Doesn&apos;t Fit</h1>
            <p>
              One platform for service, sales, and process, scoped to your team and
              your workflows. You pay for what you build, with no surprise bills
              and no modules you&apos;ll never touch.
            </p>
          </div>

          <div className={styles.heroStats}>
            {HERO_STATS.map((stat) => (
              <span key={stat}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden>
                  <path d="M4.92601 6.82587L9.4923 9.1091L18.6249 4.54263L22.2779 6.36922L9.4923 12.7623L1.27297 8.65245L4.92601 6.82587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 5.21106L9.4923 7.49429L18.6249 2.92783L22.2779 4.75441L9.4923 11.1475L1.27297 7.03765L4.92601 5.21106Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
                  <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
                </svg>
                {stat}
              </span>
            ))}
          </div>

          <h2>One Platform. Three Ways to Start.</h2>
        </div>

        <div className={styles.planGrid}>
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <Link href="/platform" className={styles.exploreLink}>
          Explore DGlide Platform
          <ArrowRight size={18} strokeWidth={1.7} />
        </Link>
      </div>
    </section>
  );
}

export function PricingPrinciplesSection() {
  return (
    <section className={styles.principlesSection}>
      <div className={styles.principlesHeader}>
        <h2>The Same Principles, Whatever You Pay</h2>
        <p>
          Every plan, from Starter to Enterprise, is built the same way: around
          how you actually work, not around how much you spend.
        </p>
      </div>

      <div className={styles.principlesGrid}>
        <span className={styles.principleGlowOne} aria-hidden />
        <span className={styles.principleGlowTwo} aria-hidden />
        {PRINCIPLES.map((principle) => (
          <PrincipleCard key={principle.title} principle={principle} />
        ))}
      </div>
    </section>
  );
}
