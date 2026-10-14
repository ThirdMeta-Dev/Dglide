"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";
import heroPlatformFlow from "@/components/homepage-assets/hero-platform-flow.webp";
import { CUSTOMERS, LOGO_TO_SLUG } from "@/data/customersData";
import { AI_ANNOUNCEMENT } from "@/data/aiEnginePageData";
import { trackCta } from "@/components/ai-engine/TrackedLink";

const BASE_LOGOS = [
  "/logos/power2u.png",
  "/logos/armadillo.png",
  "/logos/lead-controls.png",
  "/logos/clarion.png",
  "/logos/indo-tech.png",
  "/logos/jsw.svg",
  "/logos/rolcon.svg",
  "/logos/sharp-laser-component.svg",
  "/logos/tgt.svg",
];
const LOGOS = [...BASE_LOGOS, ...BASE_LOGOS, ...BASE_LOGOS];

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

  const carouselLabel = data?.logo_carousel_title ?? "Trusted by";
  // Break the label before "on DGlide" for two-line display
  const labelLines = carouselLabel.includes(" on ")
    ? [carouselLabel.slice(0, carouselLabel.lastIndexOf(" on ")), carouselLabel.slice(carouselLabel.lastIndexOf(" on ") + 1)]
    : [carouselLabel];

  return (
    <section className="dg-hero-outer w-full overflow-hidden" style={{ background: "linear-gradient(0deg, #F3F3F3 0%, #FFF 81.7%)" }}>
      <div
        ref={sectionRef}
        className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 pt-20 pb-0 opacity-0 translate-y-8 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        {/* AI engine announcement: a small link to the new page, the hero itself keeps its positioning */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex justify-center mb-5">
            <Link
              href="/ai-engine"
              data-cta="home-hero-ai-announcement"
              onClick={() => trackCta("home-hero-ai-announcement")}
              className="group inline-flex max-w-full items-center gap-2 rounded-full border border-[#E6E8FF] bg-white py-1.5 pl-1.5 pr-4 text-[13px] text-[#333] shadow-[0_6px_18px_rgba(28,43,255,0.08)] transition-colors hover:border-[#1C2BFF] hover:text-[#1C2BFF]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <span className="rounded-full bg-[#FF7F1C] px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.06em] text-white">
                New
              </span>
              <span className="hidden sm:inline">{AI_ANNOUNCEMENT.full}</span>
              <span className="sm:hidden">{AI_ANNOUNCEMENT.short}</span>
              <ArrowRight stroke="currentColor" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Badge — centered */}
        <ScrollReveal direction="up" delay={0}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-0.5 h-5 bg-[#FF7F1C] rounded-full flex-shrink-0" />
            <span className="text-[#FF7F1C] text-sm" style={{ fontFamily: "Sora, sans-serif" }}>
              {data?.badge_text ?? "Configurable Operations Platform"}
            </span>
          </div>
        </ScrollReveal>

        {/* Title — centered, vertical orange→black gradient */}
        <ScrollReveal direction="up" delay={0.08}>
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
        </ScrollReveal>

        {/* Subtitle — centered */}
        <ScrollReveal direction="up" delay={0.16}>
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
        </ScrollReveal>

        {/* CTAs — centered */}
        <ScrollReveal direction="up" delay={0.24}>
          <div className="dg-hero-ctas relative z-10 flex flex-wrap gap-4 mb-0 justify-center">
            <Link
              href="/schedule-demo"
              className="dg-btn-fill inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-base"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
              }}
            >
              {data?.cta_primary_label ?? "Book a Demo"}
              <ArrowRight stroke="white" />
            </Link>
            <Link
              href={data?.cta_secondary_href ?? "/platform#platform-backbone"}
              className="dg-btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1C2BFF] text-[#1C2BFF] text-base transition-colors hover:bg-[#1C2BFF]/5"
              style={{ fontFamily: "Sora, sans-serif", fontWeight: 400 }}
            >
              {data?.cta_secondary_label ?? "See How It Works"}
              <ArrowRight stroke="#1C2BFF" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Hero image */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="dg-hero-img-wrap w-full" style={{ marginTop: "-80px" }}>
            <Image
              src={heroPlatformFlow}
              alt="DGlide Platform"
              width={1200}
              height={680}
              className="hidden md:block w-full h-auto rounded-t-2xl object-cover"
              priority
              unoptimized
            />
            {/* Portrait variant for mobile — desktop image is too wide to read small */}
            <Image
              src="/hero-product-mobile.png"
              alt="DGlide Platform"
              width={1066}
              height={1600}
              className="md:hidden w-full h-auto"
              priority
            />
          </div>
        </ScrollReveal>
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
            {data?.logo_carousel_link_href && (
              <Link
                href={data.logo_carousel_link_href}
                className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-[#1C2BFF] hover:underline"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {data.logo_carousel_link_label ?? "See Our Customers"}
                <ArrowRight stroke="currentColor" />
              </Link>
            )}
          </div>

          {/* Scrolling logo pills */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-3 w-max"
              style={{ animation: "scrollLeft 28s linear infinite" }}
            >
              {LOGOS.map((src, i) => {
                const customer = CUSTOMERS.find((c) => c.slug === LOGO_TO_SLUG[src]);
                const alt = customer ? customer.name : "Client logo";
                return (
                  <a
                    key={i}
                    href={customer ? `/customers#${customer.slug}` : "/customers"}
                    className="flex-shrink-0"
                    aria-label={customer ? `See how ${customer.name} uses DGlide` : "See DGlide customers"}
                    tabIndex={i < BASE_LOGOS.length ? undefined : -1}
                  >
                    {src.endsWith(".svg") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={alt} width={160} height={48} className="object-contain" />
                    ) : (
                      <Image
                        src={src}
                        alt={alt}
                        width={160}
                        height={48}
                        className="object-contain"
                      />
                    )}
                  </a>
                );
              })}
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
