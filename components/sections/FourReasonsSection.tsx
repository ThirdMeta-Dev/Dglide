"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const CARD_DEFAULTS = [
  { title: "Shaped to Your Operation",  desc: "Configure the process to match how your team already works." },
  { title: "Live in Weeks, Not Months", desc: "You get a real, working setup fast, then refine it." },
  { title: "Always Up to Date",         desc: "New team, new product, new process? DGlide adjusts." },
  { title: "No IT Project to Own",      desc: "No developer dependency, no maintenance pile-up." },
];

export default function FourReasonsSection({ data }: { data?: Record<string, string> }) {
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

  return (
    <section className="four-reasons-outer w-full bg-[#F3F3F3] pt-40 pb-20 overflow-hidden">
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 opacity-0 translate-y-8 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        <ScrollReveal direction="up">
          <h2
            className="text-4xl md:text-5xl leading-tight mb-12"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontWeight: 400,
              background: "linear-gradient(90deg, #FF7F1C 0%, #000000 55%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {data?.title ?? "Four Reasons DGlide Fits Where Others Don't"}
          </h2>
        </ScrollReveal>

        <div className="relative">
          <div
            className="absolute pointer-events-none"
            style={{
              width: "340px", height: "340px",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(138,191,251,0.35) 0%, transparent 70%)",
            }}
          />
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            {CARD_DEFAULTS.map((def, i) => (
              <StaggerItem key={i} style={{ height: "100%" }}>
                <div
                  className="flex items-start gap-5 rounded-2xl p-8 shadow-sm border border-white/80"
                  style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F6F6F6 100%)", height: "100%" }}
                >
                  <Image src={`/four-reasons/icon-${i + 1}.png`} alt="" width={86} height={43} className="flex-shrink-0 object-contain" />
                  <div>
                    <h3 className="text-lg mb-2 text-black" style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}>
                      {data?.[`card_${i + 1}_title`] ?? def.title}
                    </h3>
                    <p className="text-[15px] text-[#545454] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                      {data?.[`card_${i + 1}_desc`] ?? def.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
