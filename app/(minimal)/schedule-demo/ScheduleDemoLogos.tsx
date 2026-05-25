"use client";

import Image from "next/image";

const LOGO_SRCS = [
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
];

export default function ScheduleDemoLogos({ data }: { data?: Record<string, string> }) {
  const headingLine1 = data?.heading_line_1 ?? "Who's Already Running";
  const headingLine2 = data?.heading_line_2 ?? "on DGlide";

  const logos = LOGO_SRCS.map((src, i) => ({
    src: data?.[`logo_${i + 1}_image`] || src,
    alt: data?.[`logo_${i + 1}_alt`]   || "Client Logo",
  }));

  const doubled = [...logos, ...logos, ...logos];

  return (
    <div style={{ background: "#F3F3F3", padding: "40px 0 48px", overflow: "hidden" }}>
      <div className="sd-logos-row" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", display: "flex", alignItems: "center", gap: 60 }}>
        {/* Left label */}
        <div className="sd-logos-label" style={{ flexShrink: 0 }}>
          <p style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 18, fontWeight: 400, lineHeight: "1.4", color: "#000", margin: 0 }}>{headingLine1}</p>
          <p style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 18, fontWeight: 400, lineHeight: "1.4", color: "#000", margin: 0 }}>{headingLine2}</p>
        </div>
        {/* Scrolling logos */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <style>{`
            @keyframes sd-marquee { from { transform: translateX(0); } to { transform: translateX(calc(-${logos.length * (160 + 16)}px)); } }
            .sd-marquee-track:hover { animation-play-state: paused !important; }
          `}</style>
          <div
            className="sd-marquee-track"
            style={{ display: "flex", gap: 16, width: "max-content", animation: `sd-marquee 28s linear infinite` }}
          >
            {doubled.map((logo, i) => (
              <div key={i} style={{ flexShrink: 0 }}>
                <Image src={logo.src} alt={logo.alt} width={160} height={48} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
