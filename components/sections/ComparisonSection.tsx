"use client";

import { useEffect, useRef } from "react";

const LEFT_DEFAULTS  = ["Fast to start. Your business bends to fit the software.", "Cheap to start, expensive in workarounds.", "Fits the category, not your business."];
const RIGHT_DEFAULTS = ["Fits at first. Becomes a software project you own forever.", "Months to build, years to maintain, yours to fix.", "Custom fit comes with a custom headache."];
const FEATURE_DEFAULTS = ["Speed and fit, together", "Low cost, no dev team", "No maintenance, no upkeeps", "Fully customized to your needs"];
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
  const dglideFeatures = FEATURE_DEFAULTS.map((d, i) => data?.[`center_feature_${i + 1}`] ?? d);
  const bottomBar    = BOTTOM_DEFAULTS.map((d, i)   => data?.[`bottom_${i + 1}`]       ?? d);
  const leftTitle    = data?.left_title    ?? "Fixed-Category Tools";
  const rightTitle   = data?.right_title   ?? "Custom Builds";
  const centerTitle  = data?.center_title  ?? "With\nDGlide";

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

          {/* 3-column layout */}
          <div className="grid grid-cols-[1fr_320px_1fr] gap-10 items-center">

            {/* LEFT column */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <img src="/dglide-icon-orange.png" className="w-12 h-12" alt="" />
                <h3
                  className="text-xl text-[#FF7F1C]"
                  style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
                >
                  {leftTitle}
                </h3>
              </div>
              <div className="relative flex flex-col">
                <div
                  className="absolute left-[17px] top-9 w-px bg-[#FF7F1C]/30"
                  style={{ bottom: "36px" }}
                />
                {leftItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 last:pb-0">
                    <div className="flex-shrink-0 relative z-10">
                      <img src="/dglide-icon-orange.png" className="w-9 h-9" alt="" />
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

            {/* CENTER — blue oval */}
            <div className="flex items-center justify-center relative">
              <div
                className="absolute border border-[#1C2BFF]/20"
                style={{ width: "395px", height: "446px", borderRadius: "220px", animation: "subtlePulse 3.5s ease-in-out infinite" }}
              />
              <div
                className="absolute border border-[#1C2BFF]/15"
                style={{ width: "365px", height: "416px", borderRadius: "200px", animation: "subtlePulse 3.5s ease-in-out infinite 0.8s" }}
              />
              <div
                className="relative flex flex-col items-center z-10"
                style={{
                  width: "335px", height: "386px", borderRadius: "180px",
                  background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
                  paddingLeft: "48px", paddingRight: "48px", paddingTop: "40px", paddingBottom: "80px",
                }}
              >
                <p
                  className="text-white text-center mb-5"
                  style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 600, fontSize: "32px", lineHeight: 1.2 }}
                >
                  {centerTitle.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </p>
                <div className="flex flex-col gap-3 w-full">
                  {dglideFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-[8px] bg-white flex items-center justify-center flex-shrink-0">
                        <img src="/dglide-icon-orange.png" className="w-[18px] h-[18px]" alt="" />
                      </div>
                      <span className="text-white text-base leading-snug" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT column (mirrored) */}
            <div className="flex flex-col gap-6 items-end">
              <div className="flex flex-col gap-3 items-end">
                <img src="/dglide-icon-orange.png" className="w-12 h-12" alt="" />
                <h3
                  className="text-xl text-[#FF7F1C] text-right"
                  style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
                >
                  {rightTitle}
                </h3>
              </div>
              <div className="relative flex flex-col items-end">
                <div
                  className="absolute right-[17px] top-9 w-px bg-[#FF7F1C]/30"
                  style={{ bottom: "36px" }}
                />
                {rightItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-6 last:pb-0 flex-row-reverse">
                    <div className="flex-shrink-0 relative z-10">
                      <img src="/dglide-icon-orange.png" className="w-9 h-9" alt="" />
                    </div>
                    <p
                      className="text-[#0D0D0D] text-[15px] leading-relaxed pt-1.5 text-right"
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

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ maxWidth: 1200, margin: "48px auto 0", padding: "0 48px" }}>
          <div
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
                {/* Icon: orange ring + blue dot */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="18" cy="18" r="13" stroke="#FF7F1C" strokeWidth="2" />
                  <circle cx="18" cy="18" r="5" stroke="#FF7F1C" strokeWidth="2" />
                  <circle cx="26" cy="10" r="3.5" stroke="#1C2BFF" strokeWidth="2" />
                </svg>
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
