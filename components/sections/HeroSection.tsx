"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const LOGOS = [
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
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
            className="dg-btn-fill inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90"
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
            className="dg-btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1C2BFF] text-[#1C2BFF] text-base transition-colors hover:bg-[#1C2BFF]/5"
            style={{ fontFamily: "Sora, sans-serif", fontWeight: 400 }}
          >
            {data?.cta_secondary_label ?? "See How It Works"}
            <ArrowRight stroke="#1C2BFF" />
          </Link>
        </div>

        {/* Hero image */}
        <div className="w-full">
          <Image
            src={data?.product_image ?? "/hero-product.png"}
            alt="DGlide Platform"
            width={1200}
            height={680}
            className="w-full h-auto rounded-t-2xl object-cover"
            priority
          />
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
              {LOGOS.map((src, i) => (
                <div key={i} className="flex-shrink-0">
                  <Image
                    src={src}
                    alt="Client logo"
                    width={160}
                    height={48}
                    className="object-contain"
                  />
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
