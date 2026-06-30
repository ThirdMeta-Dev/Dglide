import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const CARDS = [
  {
    icon: "/why-dglide/tradeoff/icon-standard-tools.png",
    title: "Standard Tools",
    body: "Fast to deploy, but rigid the moment your workflow gets specific. You end up living in workarounds.",
    tag: "Rigid Fit",
  },
  {
    icon: "/why-dglide/tradeoff/icon-enterprise-suites.png",
    title: "Enterprise Suites",
    body: "Broad and trusted, but heavy, slow to roll out, and built for companies far bigger than yours.",
    tag: "Implementation Drag",
  },
  {
    icon: "/why-dglide/tradeoff/icon-low-code-platforms.png",
    title: "Low-Code Platforms",
    body: "Flexible, but you still have to design, build, and maintain the whole system yourself.",
    tag: "Build Burden",
  },
  {
    icon: "/why-dglide/tradeoff/icon-custom-build.png",
    title: "Custom Build",
    body: "Exact fit, but long timelines, high cost, and an ownership burden that never ends.",
    tag: "Ownership Burden",
  },
];

export default function WDTradeoffSection() {
  return (
    <section className="relative w-full px-4 md:px-6" style={{ zIndex: 1 }}>
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-10 lg:gap-12">
        {/* Heading block */}
        <ScrollReveal direction="up">
          <div className="flex flex-col items-center gap-2 max-w-[931px]">
            <h2
              className="text-[32px] leading-[1.2] md:text-[48px] md:leading-[58px] text-center"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                background: "linear-gradient(180deg, #FF7F1C 0%, #000 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every Software Choice Forces a Tradeoff
            </h2>
            <p
              className="text-center text-base leading-7 tracking-[0.2px] text-[#6F7276]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Every option on the market hands you one thing and quietly takes
              another. Here&apos;s the trade you&apos;ve been forced to make.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards + summary bar */}
        <div className="w-full lg:max-w-[1104px] flex flex-col gap-4">
          {/* Tradeoff cards */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CARDS.map((card) => (
              <StaggerItem key={card.title}>
                <div
                  className="flex flex-col justify-between gap-5 rounded-2xl border border-white pt-7 px-7 pb-6 lg:h-[348px]"
                  style={{
                    background: "linear-gradient(180deg, #FFF 0%, #F6F6F6 100%)",
                  }}
                >
                  <div className="flex flex-col gap-9">
                    <Image
                      src={card.icon}
                      alt={`${card.title} icon`}
                      width={88}
                      height={48}
                    />
                    <div className="flex flex-col gap-2">
                      <h3
                        className="text-[17px] leading-[26px] text-black"
                        style={{
                          fontFamily: "var(--font-tasa-orbiter)",
                          fontWeight: 500,
                        }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-[15px] leading-6 tracking-[0.2px] text-[#555]"
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {card.body}
                      </p>
                    </div>
                  </div>
                  {/* Tradeoff tag */}
                  <div className="inline-flex w-fit items-center gap-2 h-[18px]">
                    <span className="w-[2px] h-[11px] rounded-full bg-[#FF0000] shrink-0" />
                    <span
                      className="text-[14px] leading-[17.64px] font-light text-[#FF0000] whitespace-nowrap"
                      style={{ fontFamily: "var(--font-sora), Sora, sans-serif" }}
                    >
                      {card.tag}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Summary bar */}
          <ScrollReveal direction="up" delay={0.1}>
          <div
            className="w-full flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-6 lg:gap-[60px] rounded-3xl lg:rounded-[60px] border border-white px-7 py-6 lg:h-24 lg:py-4 lg:pl-[60px] lg:pr-6"
            style={{
              background: "linear-gradient(270deg, #F3F3F3 0%, #FFF 100%)",
            }}
          >
            <p
              className="max-w-[619px] text-xl leading-8 text-black"
              style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
            >
              DGlide isn&apos;t another layer on the pile. It&apos;s the
              coordinated foundation your operations have been missing.
            </p>
            <Link
              href="/platform"
              className="dg-btn-fill inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-white font-semibold text-base leading-[20px] whitespace-nowrap shrink-0"
              style={{
                fontFamily: "var(--font-sora), Sora, sans-serif",
                background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
              }}
            >
              Check Full Features
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M2.5 9h13M10.5 4l5 5-5 5"
                  stroke="#FFF"
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
    </section>
  );
}
