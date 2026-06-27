import Image from "next/image";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const BUILT_FOR_YOU_BULLETS = [
  "Your work runs on field service, installs, or maintenance",
  "Your workflows are too specific for off-the-shelf tools",
  "You coordinate today across Excel, WhatsApp, calls, and follow-ups",
  "You need visibility and structure, not another rigid tool",
  "You want to go live fast, without a custom build",
  "Your process keeps changing as you grow",
];

const NOT_RIGHT_BULLETS = [
  "You only need a basic CRM",
  "You want a DIY app builder",
  "You're looking for a full enterprise suite",
  "Your workflows are simple and already well-managed",
  "You only want a one-time custom development project",
  "You need the deepest feature set in one narrow category",
];

export default function WDRightFitSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10 lg:gap-14 px-6 md:px-10 lg:px-12">
        {/* Decorative background ellipses (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-267px] top-[42px] hidden h-[610px] w-[611px] rounded-full opacity-50 lg:block"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #F3F3F3 50%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-236px] top-[73px] hidden h-[547px] w-[548px] rounded-full lg:block"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #F3F3F3 50%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[262px] top-[201px] hidden h-[222px] w-[231px] rounded-full opacity-30 lg:block"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[256px] top-[460px] hidden h-[222px] w-[231px] rounded-full opacity-30 lg:block"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
          }}
        />

        {/* Heading row */}
        <ScrollReveal direction="up">
        <div className="relative z-[1] flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
          <h2
            className="bg-clip-text text-[32px] leading-[1.2] text-transparent lg:text-[48px] lg:leading-[56px]"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontWeight: 400,
              backgroundImage:
                "linear-gradient(270deg, #000000 39.77%, #FF7F1C 100%)",
            }}
          >
            Is DGlide the Right Fit for You?
          </h2>
          <p className="text-base leading-7 tracking-[0.2px] text-[#6F7276] lg:max-w-[309px] lg:text-right">
            We&apos;d rather tell you upfront. Here&apos;s exactly when DGlide
            is the right call, and when it isn&apos;t
          </p>
        </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="relative z-[1] flex flex-col gap-4 lg:flex-row">
          {/* Built For You card */}
          <ScrollReveal direction="left" className="lg:w-[577px] lg:shrink-0">
          <div
            className="flex flex-col gap-[22px] rounded-2xl border border-white px-6 pb-6 pt-9 lg:w-[577px] lg:shrink-0 lg:px-8 lg:pb-8 lg:pt-11"
            style={{
              background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
            }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <Image
                  src="/why-dglide/right-fit/badge-built-for-you.svg"
                  alt=""
                  width={88}
                  height={48}
                  className="h-12 w-[88px]"
                />
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[24px] leading-[34px] text-white lg:text-[28px] lg:leading-10"
                    style={{
                      fontFamily: "var(--font-tasa-orbiter)",
                      fontWeight: 600,
                    }}
                  >
                    DGlide Is Built For You If:
                  </h3>
                  <p className="text-[15px] font-medium leading-6 tracking-[0.2px] text-white">
                    DGlide fits best when your operation is real, messy, and
                    growing faster than standard software can keep up.
                  </p>
                </div>
              </div>
              <ul className="flex flex-col gap-3 pl-[11px]">
                {BUILT_FOR_YOU_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Image
                      src="/why-dglide/right-fit/check-built-for-you.svg"
                      alt=""
                      width={22}
                      height={11}
                      className="mt-1.5 h-auto w-[19px] shrink-0"
                    />
                    <span className="text-[15px] font-medium leading-6 text-white">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </ScrollReveal>

          {/* May Not Be Right card */}
          <ScrollReveal direction="right" className="lg:flex-1">
          <div
            className="flex flex-col gap-[22px] rounded-2xl border border-white px-6 pb-6 pt-9 lg:flex-1 lg:px-8 lg:pb-8 lg:pt-11"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
            }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <Image
                  src="/why-dglide/right-fit/badge-not-right.svg"
                  alt=""
                  width={88}
                  height={48}
                  className="h-12 w-[88px]"
                />
                <div className="flex flex-col gap-3">
                  <h3
                    className="text-[24px] leading-[34px] text-black lg:text-[28px] lg:leading-10"
                    style={{
                      fontFamily: "var(--font-tasa-orbiter)",
                      fontWeight: 600,
                    }}
                  >
                    DGlide May Not Be Right If:
                  </h3>
                  <p className="text-[15px] leading-6 tracking-[0.2px] text-[#555555]">
                    DGlide isn&apos;t for everyone. It&apos;s not the right
                    call when your needs point clearly to a single, simpler
                    category.
                  </p>
                </div>
              </div>
              <ul className="flex flex-col gap-3 pl-[11px]">
                {NOT_RIGHT_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Image
                      src="/why-dglide/right-fit/check-not-right.svg"
                      alt=""
                      width={24}
                      height={12}
                      className="mt-1.5 h-auto w-[21px] shrink-0"
                    />
                    <span className="text-[15px] font-medium leading-6 text-black">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
