"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const LOGOS = [
  "Husqvarna", "TechCorp", "BuildFast", "Nexus Ltd", "Apex Systems", "CoreFlow", "Virenxia",
  "Husqvarna", "TechCorp", "BuildFast", "Nexus Ltd", "Apex Systems", "CoreFlow", "Virenxia",
];

export default function HeroSection({ data }: { data?: Record<string, string> }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("is-visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fullTitle = data?.title ?? "Your Operations Run on Workarounds. They Shouldn’t.";
  const splitAt = fullTitle.lastIndexOf(". ");
  const titleLine1 = splitAt > 0 ? fullTitle.slice(0, splitAt + 1) : fullTitle;
  const titleLine2 = splitAt > 0 ? fullTitle.slice(splitAt + 2) : "";

  const carouselLabel = data?.logo_carousel_title ?? "Who's Already Running on DGlide";
  // Break the label before "on DGlide" for two-line display
  const labelLines = carouselLabel.includes(" on ")
    ? [carouselLabel.slice(0, carouselLabel.lastIndexOf(" on ")), carouselLabel.slice(carouselLabel.lastIndexOf(" on ") + 1)]
    : [carouselLabel];

  return (
    <section className="w-full bg-[#F3F3F3] overflow-hidden">
      <div
        ref={sectionRef}
        className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 pt-20 pb-0 opacity-0 translate-y-8 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        {/* Badge — centered */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-0.5 h-5 bg-[#FF7F1C] rounded-full flex-shrink-0" />
          <span className="text-[#FF7F1C] text-sm" style={{ fontFamily: "Sora, sans-serif" }}>
            {data?.badge_text ?? "Configurable Operations Platform"}
          </span>
        </div>

        {/* Title — centered, vertical orange→black gradient */}
        <h1
          className="hero-title text-5xl md:text-6xl lg:text-[64px] leading-[1.1] mb-6 text-center"
          style={{
            fontFamily: "var(--font-tasa-orbiter)",
            fontWeight: 400,
            background: "linear-gradient(180deg, #FF7F1C 0%, #000 55.42%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {titleLine1}
          {titleLine2 && <><br />{titleLine2}</>}
        </h1>

        {/* Subtitle — centered */}
        <p
          className="hero-subtitle mb-10"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: "160%",
            color: "#555",
            textAlign: "center",
            margin: "0 auto 40px",
          }}
        >
          {data?.subtitle ?? "DGlide gives you ready-to-run systems for field service, sales, and operations that adapt to how your business actually works."}
        </p>

        {/* CTAs — centered */}
        <div className="flex flex-wrap gap-4 mb-14 justify-center">
          <Link
            href={data?.cta_primary_href ?? "/demo"}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90"
            style={{
              fontFamily: "Sora, sans-serif",
              background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
            }}
          >
            {data?.cta_primary_label ?? "Book a Demo"}
            <ArrowRight stroke="white" />
          </Link>
          <Link
            href={data?.cta_secondary_href ?? "#how-it-works"}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1C2BFF] text-[#1C2BFF] text-base transition-colors hover:bg-[#1C2BFF]/5"
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 400 }}
          >
            {data?.cta_secondary_label ?? "See How It Works"}
            <ArrowRight stroke="#1C2BFF" />
          </Link>
        </div>

        {/* Hero image + floating stat cards */}
        <div className="relative w-full">
          <Image
            src={data?.product_image ?? "/hero-product.png"}
            alt="DGlide Platform"
            width={1200}
            height={680}
            className="w-full h-auto rounded-t-2xl object-cover"
            priority
          />

          {/* Deal Progress */}
          <div className="absolute top-[10%] left-[2%] bg-white rounded-xl shadow-lg px-4 py-3 min-w-[140px] hidden md:block">
            <p className="text-[11px] text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Deal Progress</p>
            <p className="text-2xl font-bold text-[#1C2BFF]" style={{ fontFamily: "Inter, sans-serif" }}>72%</p>
            <div className="mt-1 w-16 h-16 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F3F3F3" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1C2BFF" strokeWidth="3"
                  strokeDasharray="72 28" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Client Communication */}
          <div className="absolute top-[10%] right-[2%] bg-white rounded-xl shadow-lg px-4 py-3 hidden md:block">
            <p className="text-[11px] text-gray-400 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Client Communication</p>
            <div className="flex items-center gap-1">
              {["#FF7F1C", "#1C2BFF", "#10B981", "#F59E0B"].map((c, i) => (
                <span
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: c, marginLeft: i > 0 ? "-6px" : 0 }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
              ))}
              <span className="text-xs text-gray-500 ml-2" style={{ fontFamily: "Inter, sans-serif" }}>+5</span>
            </div>
          </div>

          {/* Next Follow-up */}
          <div className="absolute bottom-[15%] left-[2%] bg-white rounded-xl shadow-lg px-4 py-3 hidden md:block">
            <p className="text-[11px] text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Next Follow-up</p>
            <div className="flex items-center gap-2">
              <span className="text-[#FF7F1C]">📅</span>
              <span className="text-xs text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>Tomorrow, 10:30 AM</span>
            </div>
          </div>

          {/* Task Completed */}
          <div className="absolute bottom-[15%] right-[2%] bg-white rounded-xl shadow-lg px-4 py-3 hidden md:block">
            <p className="text-[11px] text-gray-400 mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Task Completed</p>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1C2BFF] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-xl font-bold text-gray-800" style={{ fontFamily: "Inter, sans-serif" }}>18</span>
            </div>
            <p className="text-[11px] text-green-500 mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>↑ 10% vs last week</p>
          </div>
        </div>
      </div>

      {/* Logo carousel strip */}
      <div className="bg-[#F3F3F3] pt-10 pb-12">
        <div className="hero-logos-row max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 flex items-center gap-[60px]">
          {/* Left label — two lines, left-aligned */}
          <div className="hero-logos-label flex-shrink-0">
            {labelLines.map((line, i) => (
              <p
                key={i}
                className="text-black text-[18px] leading-[1.4]"
                style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Scrolling logo pills */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-3 w-max"
              style={{ animation: "scrollLeft 28s linear infinite" }}
            >
              {LOGOS.map((name, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[160px] h-[48px] flex items-center justify-center"
                  style={{
                    borderRadius: "40px",
                    border: "1px solid #FF7F1C",
                    background: "#FFF",
                    backdropFilter: "blur(12.5px)",
                  }}
                >
                  <span
                    className="text-sm font-medium tracking-tight"
                    style={{ fontFamily: "Inter, sans-serif", color: "#7E7E7E" }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
