"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const LEFT_DEFAULTS  = ["Fast to start. Your business bends to fit the software.", "Cheap to start, expensive in workarounds.", "Fits the category, not your business."];
const RIGHT_DEFAULTS = ["Fits at first. Becomes a software project you own forever.", "Months to build, years to maintain, yours to fix.", "Custom fit comes with a custom headache."];
const BOTTOM_DEFAULTS  = ["Ready to Run", "Configured to Your Process", "Adapts as You Change"];

export default function ComparisonSection({ data }: { data?: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("is-visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const leftItems    = LEFT_DEFAULTS.map((d, i)    => data?.[`left_item_${i + 1}`]    ?? d);
  const rightItems   = RIGHT_DEFAULTS.map((d, i)   => data?.[`right_item_${i + 1}`]   ?? d);
  const bottomBar    = BOTTOM_DEFAULTS.map((d, i)   => data?.[`bottom_${i + 1}`]       ?? d);
  const leftTitle    = data?.left_title    ?? "Fixed-Category Tools";
  const rightTitle   = data?.right_title   ?? "Custom Builds";

  const fullTitle = data?.title ?? "Stuck Between Rigid Tools And Building Your Own?";
  const andMatch = fullTitle.match(/ [Aa]nd /);
  let titleLine1 = fullTitle, titleLine2 = "";
  if (andMatch?.index !== undefined) {
    titleLine1 = fullTitle.slice(0, andMatch.index + andMatch[0].length - 1);
    titleLine2 = fullTitle.slice(andMatch.index + andMatch[0].length);
  } else {
    const dot = fullTitle.lastIndexOf(". ");
    if (dot > 0) { titleLine1 = fullTitle.slice(0, dot + 1); titleLine2 = fullTitle.slice(dot + 2); }
  }

  return (
    <section className="w-full bg-[#F3F3F3] pt-20">
      <div
        ref={ref}
        className="opacity-0 translate-y-8 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Heading */}
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl leading-tight"
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontWeight: 400,
                  background: "linear-gradient(180deg, #FF7F1C 0%, #000 82.08%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {titleLine1}
                {titleLine2 && <><br />{titleLine2}</>}
              </h2>
              <p
                className="text-[#6F7276] text-base max-w-2xl mx-auto mt-5 text-center"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {data?.subtitle ?? "Until now, you had two bad options: software that does not fit, or a custom build that never ends. DGlide is the 3rd: best of all worlds."}
              </p>
            </div>
          </ScrollReveal>

          {/* 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px_1fr] gap-10 items-center cmp-grid">

            {/* LEFT column */}
            <ScrollReveal direction="left">
            <div className="flex flex-col gap-6 cmp-left-col">
              <div className="flex flex-col gap-3">
                <Image src="/comparison/col-left-header.png" alt="" width={86} height={43} className="object-contain" />
                <h3
                  className="text-xl text-[#FF7F1C]"
                  style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
                >
                  {leftTitle}
                </h3>
              </div>
              <div className="relative flex flex-col">
                {leftItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 last:pb-0">
                    <div className="flex-shrink-0 relative z-10 mt-1">
                      <Image src="/comparison/row-bullet.svg" alt="" width={31} height={18} className="object-contain" />
                    </div>
                    <p
                      className="text-[#0D0D0D] text-[15px] leading-relaxed pt-1.5"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.split('\n').map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>

            {/* CENTER — DGlide Platform oval (hidden on mobile) */}
            <div className="hidden md:flex items-center justify-center relative cmp-center-col">
              <div
                className="absolute border border-[#1C2BFF]/20"
                style={{ width: "400px", height: "486px", borderRadius: "240px", animation: "subtlePulse 3.5s ease-in-out infinite" }}
              />
              <div
                className="absolute border border-[#1C2BFF]/15"
                style={{ width: "372px", height: "458px", borderRadius: "220px", animation: "subtlePulse 3.5s ease-in-out infinite 0.8s" }}
              />
              <Image
                src="/comparison/dglide-platform-oval.png"
                alt="DGlide Platform — speed and fit together, low cost, no maintenance, fully customized"
                width={382}
                height={481}
                className="relative z-10 object-contain w-[340px] h-auto"
              />
            </div>

            {/* RIGHT column (mirrored) */}
            <ScrollReveal direction="right">
            <div className="flex flex-col gap-6 md:items-end cmp-right-col-outer">
              <div className="flex flex-col gap-3 md:items-end">
                <Image src="/comparison/col-right-header.png" alt="" width={86} height={47} className="object-contain" />
                <h3
                  className="text-xl text-[#FF7F1C] md:text-right"
                  style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
                >
                  {rightTitle}
                </h3>
              </div>
              <div className="relative flex flex-col md:items-end">
                {rightItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 last:pb-0 md:flex-row-reverse">
                    <div className="flex-shrink-0 relative z-10 mt-1">
                      <Image src="/comparison/row-bullet.svg" alt="" width={31} height={18} className="object-contain" />
                    </div>
                    <p
                      className="cmp-item-text text-[#0D0D0D] text-[15px] leading-relaxed pt-1.5 md:text-right"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {item.split('\n').map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="cmp-bottom" style={{ maxWidth: 1200, margin: "48px auto 0", padding: "0 48px" }}>
          <div
            className="cmp-bottom-bar"
            style={{
              display: "flex",
              padding: "12px 40px",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 40,
              background: "linear-gradient(270deg, #F3F3F3 0%, #F6D9C3 100%)",
            }}
          >
            {bottomBar.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Image
                  src={`/comparison/bottom-${i + 1}.png`}
                  alt=""
                  width={86}
                  height={43}
                  className="object-contain flex-shrink-0"
                />
                <span
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    fontSize: 18,
                    fontWeight: 400,
                    lineHeight: "26px",
                    color: "#000",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
