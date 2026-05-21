"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const STATIC_TESTIMONIALS = [
  { quote: "We finally have visibility in our operations. Your system adapts to how you work and the results speak for themselves.", name: "Infrastructure Team",  company: "Scaleops International", image: "" },
  { quote: "DGlide replaced five different tools for us. Now my entire team works from one place — no confusion, no dropped tasks.",  name: "Operations Director",   company: "Virenxia Group",       image: "" },
  { quote: "Our field teams update jobs in real time. No more end-of-day catch-up calls or missed service windows.",                  name: "Operations Manager",    company: "Nexus Field Services",  image: "" },
  { quote: "We went live in three weeks. The team stopped asking about the software after day two — it just fit.",                    name: "General Manager",       company: "Aero Precision Works",  image: "" },
];

const CARD_GAP     = 24;
const LEFT_COL     = 257;
const LEFT_COL_GAP = 48;

function parseTestimonials(data: Record<string, string>) {
  const nums = new Set<number>();
  Object.keys(data).forEach((k) => {
    const m = k.match(/^testimonial_(\d+)_quote$/);
    if (m) nums.add(parseInt(m[1]));
  });
  if (nums.size === 0) return null;
  return Array.from(nums)
    .sort((a, b) => a - b)
    .map((n) => ({
      quote:   data[`testimonial_${n}_quote`]   ?? "",
      name:    data[`testimonial_${n}_name`]    ?? "",
      company: data[`testimonial_${n}_company`] ?? "",
      image:   data[`testimonial_${n}_image`]   ?? "",
    }));
}

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="76" height="56" viewBox="0 0 76 56" fill="none">
      <g clipPath="url(#clip0_336_934)">
        <path d="M0 55.8665L2.61363 41.1648C3.37594 36.6998 4.95501 31.9626 7.35085 26.9531C9.80113 21.8892 12.932 17.0159 16.7436 12.3331C20.6096 7.59588 25.0473 3.48484 30.0568 0L36.7542 6.94247C31.9626 11.6797 27.6609 16.9887 23.8494 22.8693C20.0378 28.6956 17.6148 34.7124 16.5802 40.9198L13.9666 55.8665H0ZM38.3061 55.8665L40.9197 41.1648C41.682 36.6998 43.2611 31.9626 45.6569 26.9531C48.1072 21.8892 51.2381 17.0159 55.0497 12.3331C58.9157 7.59588 63.3534 3.48484 68.3629 0L75.0603 6.94247C70.2687 11.6797 65.9671 16.9887 62.1555 22.8693C58.3439 28.6956 55.9209 34.7124 54.8863 40.9198L52.2727 55.8665H38.3061Z" fill="url(#paint0_linear_336_934)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_336_934" x1="37.5302" y1="0" x2="37.5302" y2="55.8665" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F3F3F3" stopOpacity="0" />
          <stop offset="1" stopColor="#FF7F1C" />
        </linearGradient>
        <clipPath id="clip0_336_934"><rect width="76" height="56" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export default function TestimonialsSection({ data }: { data?: Record<string, string> }) {
  const sectionTitle = data?.section_title ?? "Hear It From The Teams Using DGlide";
  const subtitle     = data?.subtitle      ?? "These Are Operations Teams That Stopped Fighting Their Software Once They Picked DGlide";

  const testimonials = (data && parseTestimonials(data)) ?? STATIC_TESTIMONIALS;
  const N = testimonials.length;

  const [current, setCurrent]     = useState(0);
  const [cardWidth, setCardWidth] = useState(668);
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateCardWidth = useCallback(() => {
    if (!carouselRef.current) return;
    const w    = carouselRef.current.offsetWidth;
    const peek = window.innerWidth >= 1500 ? 2.5 : window.innerWidth >= 768 ? 1.5 : 1.0;
    const cw   = Math.min(668, Math.floor((w - (Math.ceil(peek) - 1) * CARD_GAP) / peek));
    setCardWidth(Math.max(260, cw));
  }, []);

  useEffect(() => {
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, [updateCardWidth]);

  const prev   = () => setCurrent((c) => Math.max(0, c - 1));
  const next   = () => setCurrent((c) => Math.min(N - 1, c + 1));
  const offset = current * (cardWidth + CARD_GAP);

  return (
    <section style={{ width: "100%", backgroundImage: "url(/testimonials-bg.png)", backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", marginTop: 60, overflow: "hidden" }}>
      <div className="testi-header" style={{ maxWidth: 1200, margin: "0 auto", padding: "81px 48px 0" }}>
        {/* Desktop: title + nav on one row */}
        <div className="testi-header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
          <h2
            className="testi-h2"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 56,
              fontWeight: 400,
              lineHeight: "64px",
              margin: 0,
              background: "linear-gradient(90deg, #FF7F1C 0%, #000 27.38%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {sectionTitle}
          </h2>
          <div className="testi-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 8, flexShrink: 0 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 300, color: "#6F7276", letterSpacing: "0.5px" }}>
              {current + 1}/{N}
            </span>
            <NavButton dir="prev" onClick={prev} disabled={current === 0} />
            <NavButton dir="next" onClick={next} disabled={current === N - 1} />
          </div>
        </div>

        {/* Mobile only: subtitle + nav below title */}
        <p className="testi-mobile-subtitle" style={{ display: "none", fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "22px", color: "#555", margin: "0 0 20px" }}>
          {subtitle}
        </p>
        <div className="testi-mobile-nav" style={{ display: "none", alignItems: "center", justifyContent: "flex-end", gap: 10, marginBottom: 20 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 300, color: "#6F7276" }}>
            {current + 1}/{N}
          </span>
          <NavButton dir="prev" onClick={prev} disabled={current === 0} />
          <NavButton dir="next" onClick={next} disabled={current === N - 1} />
        </div>
      </div>

      <div
        className="testi-body"
        style={{
          display: "flex",
          gap: LEFT_COL_GAP,
          alignItems: "flex-start",
          paddingLeft: "max(48px, calc((100vw - 1200px) / 2 + 48px))",
          paddingBottom: 137,
        }}
      >
        <div className="testi-left-col" style={{ width: LEFT_COL, flexShrink: 0 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "#555", margin: 0 }}>
            {subtitle}
          </p>
        </div>

        <div ref={carouselRef} style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: CARD_GAP,
              transform: `translateX(-${offset}px)`,
              transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} width={cardWidth} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, company, image, width }: { quote: string; name: string; company: string; image?: string; width: number }) {
  return (
    <div
      className="testi-card"
      style={{
        width,
        flexShrink: 0,
        padding: "44px 36px 36px 36px",
        borderRadius: "100px 16px 16px 16px",
        background: "#F3F3F3",
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <QuoteIcon />
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontStyle: "italic", fontWeight: 300, lineHeight: "30px", color: "#000", margin: 0 }}>
        {quote}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto" }}>
        <img
          src={image || "/logo.png"}
          alt={company}
          style={{ width: 64, height: 40, objectFit: "contain", borderRadius: 8, flexShrink: 0 }}
        />
        <div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, color: "#000", margin: "0 0 2px" }}>{name}</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#555", margin: 0 }}>{company}</p>
        </div>
      </div>
    </div>
  );
}

function NavButton({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled?: boolean }) {
  const isNext = dir === "next";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 44, height: 44, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: isNext ? "none" : "1.5px solid #E4E4E4",
        background: isNext ? "#FF7F1C" : "#FFFFFF",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition: "opacity 0.2s",
        boxShadow: isNext ? "0 2px 8px rgba(255,127,28,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={isNext ? "M3 8h10M9 5l3 3-3 3" : "M13 8H3M7 5l-3 3 3 3"} stroke={isNext ? "#fff" : "#555"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
