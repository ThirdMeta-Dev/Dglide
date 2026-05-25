"use client";

import Image from "next/image";

const LOGO_COUNT = 5;
const LOGO_SRCS = ["/logos/logo-1.png", "/logos/logo-2.png", "/logos/logo-3.png", "/logos/logo-4.png", "/logos/logo-5.png"];

function LogoPill({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="logo-pill" style={{ flexShrink: 0 }}>
      <Image src={src} alt={alt} width={160} height={48} className="object-contain" />
    </div>
  );
}

export default function LogoCarouselSection({
  data,
  title,
}: {
  data?: Record<string, string>;
  title?: string;
}) {
  const heading = title ?? data?.title ?? "Who's Already Running on DGlide";

  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => ({
    src: data?.[`logo_${i + 1}_image`] || LOGO_SRCS[i % LOGO_SRCS.length],
    alt: data?.[`logo_${i + 1}_alt`]   || "Client Logo",
  }));

  const displayLogos = logos;
  const duplicated = [...displayLogos, ...displayLogos, ...displayLogos];
  const trackWidth = displayLogos.length * (212 + 16);

  return (
    <section style={{ width: "100%", background: "transparent", padding: "48px 0 24px", overflow: "hidden" }}>
      {heading && (
        <p
          style={{
            fontFamily: "var(--font-tasa-orbiter)",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "24px",
            color: "#000",
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          {heading}
        </p>
      )}
      <style>{`
        @keyframes dg-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-${trackWidth}px - 16px)); }
        }
        @keyframes dg-marquee-right {
          from { transform: translateX(calc(-${trackWidth}px - 16px)); }
          to   { transform: translateX(0); }
        }
        .dg-marquee-row:hover .dg-marquee-track {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="dg-marquee-row" style={{ marginBottom: 20 }}>
        <div className="dg-marquee-track" style={{ display: "flex", gap: 16, width: "max-content", animation: `dg-marquee-left 28s linear infinite` }}>
          {duplicated.map((logo, i) => <LogoPill key={i} src={logo.src} alt={logo.alt} />)}
        </div>
      </div>

      <div className="dg-marquee-row">
        <div className="dg-marquee-track" style={{ display: "flex", gap: 16, width: "max-content", animation: `dg-marquee-right 32s linear infinite` }}>
          {duplicated.map((logo, i) => <LogoPill key={i} src={logo.src} alt={logo.alt} />)}
        </div>
      </div>
    </section>
  );
}
