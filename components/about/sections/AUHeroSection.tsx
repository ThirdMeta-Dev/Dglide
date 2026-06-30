import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

/* ------------------------------------------------------------------ */
/* Data — exact strings from Figma node 1118:1276                      */
/* ------------------------------------------------------------------ */

const BULLETS = [
  "More flexible than fixed software",
  "More ready than a blank platform",
  "Lower burden than custom development",
];

export default function AUHeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(0deg, #F3F3F3 0%, #FFFFFF 81.7%)",
        marginBottom: "130px",
      }}
    >
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-5 pb-16 pt-12 md:px-12 lg:flex-row lg:items-start lg:gap-0 lg:pb-0 lg:pt-[60px]">
        {/* ---------- Left column ---------- */}
        <div className="relative z-10 flex w-full flex-col gap-5 lg:w-[576px] lg:shrink-0">
          {/* Badge */}
          <ScrollReveal direction="up" delay={0}>
            <div className="flex items-center gap-2">
              <span className="h-[11px] w-0.5 shrink-0 bg-[#FF7F1C]" />
              <span
                className="text-sm leading-[18px] text-[#FF7F1C]"
                style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
              >
                Why DGlide Exists
              </span>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-10 lg:gap-[60px]">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                {/* Heading — horizontal orange→black gradient (orange on the left) */}
                <ScrollReveal direction="up" delay={0.08}>
                  <h1
                    className="bg-clip-text text-[36px] leading-[1.15] text-transparent lg:text-[52px] lg:leading-[58px]"
                    style={{
                      fontFamily: "var(--font-tasa-orbiter)",
                      fontWeight: 400,
                      backgroundImage:
                        "linear-gradient(to left, #000000 53%, #FF7F1C 100%)",
                    }}
                  >
                    Software Should Adapt to You, Not the Other Way Around
                  </h1>
                </ScrollReveal>

                {/* Subtext */}
                <ScrollReveal direction="up" delay={0.16}>
                  <p
                    className="max-w-[495px] text-base leading-[27.5px] text-[#545454]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    We built DGlide for businesses stuck between rigid software
                    that never fits and a custom build they can&apos;t afford.
                  </p>
                </ScrollReveal>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2">
                {BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <Image
                      src="/about/hero/bullet-chevrons.svg"
                      alt=""
                      width={21}
                      height={11}
                      className="w-[21px] shrink-0"
                    />
                    <span
                      className="text-[15px] leading-6 text-[#545454]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#capabilities"
                className="dg-btn-fill inline-flex h-12 items-center gap-2.5 rounded-full px-8 text-base font-semibold text-white"
                style={{
                  fontFamily: "var(--font-sora), Sora, sans-serif",
                  background:
                    "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
                }}
              >
                Explore Capabilities
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M1 9h14M11 5l4 4-4 4"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/demo"
                className="dg-btn-outline inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-[#141FB5] px-8 text-base font-normal text-[#141FB5]"
                style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
              >
                Book a Demo
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M1 9h14M11 5l4 4-4 4"
                    stroke="#141FB5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ---------- Right illustration ---------- */}
        {/* Figma: 620x465 at x=486 within the 1106px content row — overlaps the
            left column by 90px (transparent edges), top offset 19px */}
        <div className="w-full lg:-ml-[90px] lg:mt-[19px] lg:w-[620px] lg:shrink-0">
          <Image
            src="/about/hero/hero-journey-illustration.png"
            alt="Journey from Start Ready through Configure, Adapt, and Optimize to hitting the target with DGlide"
            width={1240}
            height={930}
            className="mx-auto h-auto w-full max-w-[620px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
