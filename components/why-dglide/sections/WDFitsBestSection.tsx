"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/* Data — exact strings from Figma node 1099:636                       */
/* ------------------------------------------------------------------ */

type Row = {
  icon: string;
  label: string;
  uppercase?: boolean;
  desc: string;
  descLineHeight: number; // px, from Figma
};

const STANDARD_ROWS: Row[] = [
  {
    icon: "/why-dglide/fits-best/icon-standard-fit.png",
    label: "Fit",
    desc: "Rigid. You bend to the tool.",
    descLineHeight: 23,
  },
  {
    icon: "/why-dglide/fits-best/icon-standard-speed.png",
    label: "Speed",
    desc: "Fast to switch on.",
    descLineHeight: 26,
  },
  {
    icon: "/why-dglide/fits-best/icon-standard-burden.png",
    label: "Burden",
    desc: "Low, but you live in workarounds.",
    descLineHeight: 23,
  },
];

const DGLIDE_ROWS: Row[] = [
  {
    icon: "/why-dglide/fits-best/icon-dglide-fit.png",
    label: "Fit",
    desc: "Live in weeks, not quarters.",
    descLineHeight: 29,
  },
  {
    icon: "/why-dglide/fits-best/icon-dglide-speed.png",
    label: "Speed",
    uppercase: true,
    desc: "Live in weeks, not quarters.",
    descLineHeight: 29,
  },
  {
    icon: "/why-dglide/fits-best/icon-dglide-burden.png",
    label: "Burden",
    desc: "Low. No dev team, no rebuilds.",
    descLineHeight: 29,
  },
];

const CUSTOM_ROWS: Row[] = [
  {
    icon: "/why-dglide/fits-best/icon-custom-fit.png",
    label: "Fit",
    desc: "Exact, fully tailored.",
    descLineHeight: 23,
  },
  {
    icon: "/why-dglide/fits-best/icon-custom-speed.png",
    label: "Speed",
    desc: "Months to build.",
    descLineHeight: 23,
  },
  {
    icon: "/why-dglide/fits-best/icon-custom-burden.png",
    label: "Burden",
    desc: "High. You own it forever.",
    descLineHeight: 23,
  },
];

/* ------------------------------------------------------------------ */
/* Sub-pieces                                                          */
/* ------------------------------------------------------------------ */

function RowItem({ row, dark }: { row: Row; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={row.icon}
        alt=""
        width={66}
        height={36}
        className="w-[66px] h-[36px] flex-shrink-0 object-contain"
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {/* Label badge: orange/white tick + Sora label */}
        <div className="flex items-center gap-2">
          <span
            className={`w-[2px] h-[11px] rounded-full flex-shrink-0 ${
              dark ? "bg-white" : "bg-[#FF7F1C]"
            }`}
          />
          <span
            className={`text-[14px] leading-[17.64px] ${
              dark ? "text-white" : "text-[#FF7F1C]"
            } ${row.uppercase ? "uppercase" : ""}`}
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {row.label}
          </span>
        </div>
        <p
          className={
            dark
              ? "text-white text-[18px] font-semibold"
              : "text-black text-[16px] font-normal"
          }
          style={{
            fontFamily: "var(--font-tasa-orbiter)",
            lineHeight: `${row.descLineHeight}px`,
          }}
        >
          {row.desc}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function WDFitsBestSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("is-visible");
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#F3F3F3] py-20 overflow-hidden">
      <div
        ref={ref}
        className="max-w-[1152px] mx-auto px-6 opacity-0 translate-y-8 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        {/* ---------- Heading row ---------- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-2 mb-10 lg:mb-14">
          <h2
            className="text-[36px] leading-[44px] md:text-[48px] md:leading-[56px] font-normal"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              background: "linear-gradient(90deg, #FF7F1C 0%, #000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Where DGlide Fits Best
          </h2>
          <p
            className="text-[#6F7276] text-[16px] leading-[28px] tracking-[0.2px] md:text-right md:max-w-[384px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            See how DGlide compares to the two extremes most teams get stuck
            choosing between, across the three things that actually matter.
          </p>
        </div>

        {/* ---------- Cards row ---------- */}
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-3">
          {/* Decorative radial glow behind the center card (Ellipse 470) */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-[532px] top-[40px] w-[231px] h-[422px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
            }}
          />

          {/* ---- Card 1: Standard Tools ---- */}
          <div
            className="relative z-10 w-full lg:w-[348px] lg:h-[465px] flex-shrink-0 rounded-2xl border border-white p-8 flex flex-col gap-7"
            style={{
              background: "linear-gradient(90deg, #F6F6F6 0%, #FFFFFF 100%)",
            }}
          >
            <h3
              className="text-black text-[22px] leading-[26px] font-medium"
              style={{ fontFamily: "var(--font-tasa-orbiter)" }}
            >
              Standard Tools
            </h3>
            <div
              className="h-px w-full"
              style={{
                background: "linear-gradient(90deg, #EAEAEA 0%, #FFFFFF 100%)",
              }}
            />
            <div className="flex flex-col gap-[52px]">
              <div className="flex flex-col gap-7">
                {STANDARD_ROWS.map((row) => (
                  <RowItem key={row.label} row={row} />
                ))}
              </div>
              <p
                className="text-[#FF7F1C] text-[15px] leading-[25px] italic"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Verdict: Great until your workflow gets specific.
              </p>
            </div>
          </div>

          {/* ---- Card 2: DGlide ---- */}
          <div
            className="relative z-10 w-full lg:w-[384px] lg:h-[500px] flex-shrink-0 rounded-2xl border border-white p-8 flex flex-col gap-7"
            style={{
              background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
            }}
          >
            <h3
              className="text-white text-[28px] leading-[40px] font-semibold"
              style={{ fontFamily: "var(--font-tasa-orbiter)" }}
            >
              DGlide
            </h3>
            <div
              className="h-px w-full"
              style={{
                background: "linear-gradient(90deg, #1B29EE 0%, #FFFFFF 100%)",
              }}
            />
            <div className="flex flex-col gap-[52px]">
              <div className="flex flex-col gap-7">
                {DGLIDE_ROWS.map((row) => (
                  <RowItem key={row.label} row={row} dark />
                ))}
              </div>
              <p
                className="text-white text-[15px] leading-[25px] italic"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Verdict: Fit, speed, and low burden in one system.
              </p>
            </div>
          </div>

          {/* ---- Card 3: Custom Build ---- */}
          <div
            className="relative z-10 w-full lg:w-[348px] lg:h-[475px] flex-shrink-0 rounded-2xl border border-white p-8 flex flex-col lg:justify-center gap-7"
            style={{
              background: "linear-gradient(90deg, #F6F6F6 0%, #FFFFFF 100%)",
            }}
          >
            <h3
              className="text-black text-[22px] leading-[26px] font-medium"
              style={{ fontFamily: "var(--font-tasa-orbiter)" }}
            >
              Custom Build
            </h3>
            <div
              className="h-px w-full"
              style={{
                background: "linear-gradient(90deg, #EAEAEA 0%, #FFFFFF 100%)",
              }}
            />
            <div className="flex flex-col gap-[52px]">
              <div className="flex flex-col gap-7">
                {CUSTOM_ROWS.map((row) => (
                  <RowItem key={row.label} row={row} />
                ))}
              </div>
              <p
                className="text-[#FF7F1C] text-[15px] leading-[25px] italic"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Verdict: A perfect fit you maintain forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
