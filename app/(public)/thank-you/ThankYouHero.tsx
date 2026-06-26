"use client";

import Link from "next/link";
import styles from "./ThankYouPage.module.css";

/* ─────────────────────────────────────────────────────────────
   ThankYouHero
   Source Figma: node 1371:8859 (hero body)

   Text extracted exactly from Figma TEXT nodes:
   - "Thank You." (fontSize 56, TASA Orbiter Regular)
   - "We Have Received Your Inquiry." (fontSize 44, TASA Orbiter Regular)
   - "You can book a time-slot or wait for Our Team to directly get
     in touch with you." (Inter Italic 16px, #6F7277)
   - "Pick your demo time" (Sora SemiBold 16, white, primary blue btn)
   - "Explore The Platform" (Sora Regular 16, blue, secondary btn)

   "What happens next?" 3-step section:
   Steps:
   1. "Pick your time" — "Choose a time that works for you. No
      back-and-forth emails to schedule it."
   2. "We tailor it" — "Tell us how your operation runs. We build the
      demo around your workflow, not a generic script."
   3. "See it run live" — "Meet someone who knows operations. Watch
      your real workflow run on DGlide, end to end."
   ───────────────────────────────────────────────────────────── */

const WHAT_NEXT_STEPS = [
  {
    num: "1",
    icon: "/thank-you/what-next-pick-time.svg",
    title: "Pick your time",
    desc: "Choose a time that works for you. No back-and-forth emails to schedule it.",
  },
  {
    num: "2",
    icon: "/thank-you/what-next-tailor.svg",
    title: "We tailor it",
    desc: "Tell us how your operation runs. We build the demo around your workflow, not a generic script.",
  },
  {
    num: "3",
    icon: "/thank-you/what-next-live.svg",
    title: "See it run live",
    desc: "Meet someone who knows operations. Watch your real workflow run on DGlide, end to end.",
  },
];

/* Arrow icon SVG (same as used in AUFinalCTASection) */
function ArrowIcon({ color = "#1C2BFF" }: { color?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 9h13M10 5l4 4-4 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThankYouHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>
        {/* ── Heading + subtext ── */}
        <div className={styles.heroHeadingGroup}>
          <h1 className={styles.heroHeading}>
            <span className={styles.heroHeadingLine1}>Thank You.</span>
            <br />
            <span className={styles.heroHeadingLine2}>
              We Have Received Your Inquiry.
            </span>
          </h1>

          <div className={styles.heroActionGroup}>
            {/* ── CTA buttons ── */}
            <div className={styles.heroCtas}>
              <Link href="/schedule-demo" className={styles.heroBtnPrimary}>
                Pick your demo time
                <ArrowIcon color="#fff" />
              </Link>
              <Link href="/platform" className={styles.heroBtnSecondary}>
                Explore The Platform
                <ArrowIcon color="#1C2BFF" />
              </Link>
            </div>

            <p className={styles.heroSubtext}>
              You can book a time-slot or wait for Our Team to directly get in
              touch with you.
            </p>
          </div>
        </div>

        <WhatNextSteps />
      </div>
    </section>
  );
}

function WhatNextSteps() {
  return (
    <div className={styles.whatNextWrap} aria-labelledby="what-happens-next">
      <div className={styles.whatNextBackdrop} aria-hidden />
      <div className={styles.whatNextBadge} id="what-happens-next">
        <WhatNextBadgeIcon />
        <span className={styles.whatNextBadgeText}>What happens next?</span>
      </div>

      <div className={styles.whatNextSteps}>
        {WHAT_NEXT_STEPS.map((step, index) => (
          <article
            className={`${styles.whatNextStep} ${
              index === 1 ? styles.whatNextStepOffsetSmall : ""
            } ${index === 2 ? styles.whatNextStepOffsetLarge : ""}`}
            key={step.title}
          >
            <StepIllustration variant={step.icon} />
            <div className={styles.whatNextStepBody}>
              <h2 className={styles.whatNextStepTitle}>{step.title}</h2>
              <p className={styles.whatNextStepDesc}>{step.desc}</p>
            </div>
            <span className={styles.whatNextStepNum} aria-hidden>
              {step.num}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}

function WhatNextBadgeIcon() {
  return (
    <svg
      className={styles.whatNextBadgeIcon}
      xmlns="http://www.w3.org/2000/svg"
      width="39"
      height="23"
      viewBox="0 0 39 23"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.9809 13.3226C24.1813 12.6688 24.3955 9.52995 23.9478 7.83191C22.7191 8.5413 21.8547 9.45977 21.5708 10.3265C21.3384 11.032 21.2999 12.5187 21.9809 13.3226ZM38.2715 10.3717L35.4963 8.63445C33.5903 7.45196 31.933 6.45002 29.4644 6.35179C28.5244 6.31409 26.8707 6.28725 25.799 6.96721C25.6497 7.42743 25.7751 8.7017 25.7383 9.30104C25.6381 10.8801 25.261 12.508 24.0005 13.8161C23.099 14.7538 22.2001 15.0097 21.3208 14.7897C19.6738 14.3758 19.1519 10.5601 21.3769 8.19174C22.0608 7.46136 22.9283 6.84492 23.777 6.20985C22.3062 3.48153 20.0947 1.37129 17.4892 1.38381C14.5474 1.39785 11.1349 3.61516 9.08763 5.96695C7.07368 8.28366 5.73189 10.8697 5.15865 12.9509C4.51725 15.2664 3.91663 18.4175 4.48059 20.5767C5.57167 19.4434 7.1519 16.357 8.48333 15.8626C8.85121 16.0129 8.96045 16.2763 8.81793 16.6647C8.7226 16.9215 8.45728 17.3104 8.31242 17.5278C7.43922 18.839 5.63815 22.1551 4.47305 22.6872C2.6352 23.5238 0.861512 19.6079 0.172935 18.1509C-0.176239 17.4117 -0.00668685 16.8105 0.757343 16.256C1.04948 16.7017 2.23677 18.6098 2.61718 18.703C2.86474 18.4966 2.80183 18.4989 2.77971 17.7976C2.7092 15.5009 3.21273 13.095 4.10039 10.9139C5.05763 8.55665 6.57052 6.03048 9.17262 3.69386C12.9609 0.296054 18.4092 -1.4507 22.0997 1.51046C23.5082 2.63789 24.0512 3.76852 24.9571 5.36072C25.1133 5.51537 25.5861 5.45326 25.8737 5.44138C30.2805 5.26166 31.7886 5.07789 35.8647 7.6079C36.5404 8.02714 37.7887 8.69163 38.1733 9.3764C38.2636 9.53739 38.3169 9.70386 38.3373 9.86438L38.2754 10.3739L38.2715 10.3717Z"
        fill="url(#what-next-badge-gradient)"
      />
      <defs>
        <linearGradient
          id="what-next-badge-gradient"
          x1="38.4302"
          y1="11.0456"
          x2="0.528468"
          y2="15.6869"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F3F3F3" stopOpacity="0" />
          <stop offset="1" stopColor="#FF7F1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function StepIllustration({ variant }: { variant: string }) {
  return (
    <img
      className={styles.stepIllustration}
      src={variant}
      alt=""
      width={88}
      height={48}
      aria-hidden
    />
  );
}
