import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const BULLETS = [
  "More flexible than fixed software",
  "More ready than a blank platform",
  "Lower burden than a custom build",
];

export default function WDHeroSection() {
  return (
    <section
      className="relative w-full"
      style={{
        background: "linear-gradient(0deg, #F3F3F3 0%, #FFFFFF 94.5%)",
        overflowX: "clip",
      }}
    >
      {/* Decorative wave lines, bottom-left (Figma group 1099:374) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-673px] top-[372px] hidden lg:block"
      >
        <Image
          src="/why-dglide/hero/wave-lines.svg"
          alt=""
          width={1377}
          height={523}
        />
      </div>

      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pb-16 pt-12 md:px-10 lg:flex-row lg:items-start lg:gap-[60px] lg:px-12 lg:pb-0 lg:pt-[60px]">
        {/* Left column */}
        <div className="flex w-full flex-col gap-5 lg:w-[576px] lg:shrink-0">
          {/* Badge */}
          <ScrollReveal direction="up" delay={0}>
            <div className="flex items-center gap-2">
              <span className="h-[11px] w-0.5 shrink-0 bg-[#FF7F1C]" />
              <span
                className="text-sm leading-[18px] text-[#FF7F1C]"
                style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
              >
                Why DGlide
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
                        "linear-gradient(to left, #000000 60%, #FF7F1C 100%)",
                    }}
                  >
                    Your operations need software that fits. Not software you fit
                    into.
                  </h1>
                </ScrollReveal>

                {/* Subtext */}
                <ScrollReveal direction="up" delay={0.16}>
                  <p className="text-base leading-[1.72] text-[#555555]">
                    DGlide starts you with a real, working system, then adapts it
                    to how you actually operate. No rigid tool. No endless build.
                  </p>
                </ScrollReveal>
              </div>

              {/* Bullets */}
              <ScrollReveal direction="up" delay={0.16}>
                <ul className="flex flex-col gap-2">
                  {BULLETS.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-4">
                      <Image
                        src="/why-dglide/hero/bullet-chevrons.svg"
                        alt=""
                        width={21}
                        height={11}
                        className="w-[21px] shrink-0"
                      />
                      <span className="text-[15px] leading-6 text-[#555555]">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/schedule-demo"
                  className="dg-btn-fill inline-flex h-12 items-center gap-2.5 rounded-full px-8 text-base font-semibold text-white"
                  style={{
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    background:
                      "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
                  }}
                >
                  Book a Demo
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
                  href="/schedule-demo"
                  className="dg-btn-outline inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-[#141FB5] bg-white px-8 text-base font-normal text-[#141FB5] transition-colors hover:bg-[#141FB5]/5"
                  style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
                >
                  Explore Capabilities
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
            </ScrollReveal>
          </div>
        </div>

        {/* Right illustration */}
        <ScrollReveal direction="right" delay={0.1}>
          <div className="w-full lg:mt-[17px] lg:w-[470px] lg:shrink-0">
            <Image
              src="/why-dglide/hero/hero-illustration.png"
              alt="DGlide modular platform illustration"
              width={940}
              height={940}
              className="mx-auto h-auto w-full max-w-[470px]"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
