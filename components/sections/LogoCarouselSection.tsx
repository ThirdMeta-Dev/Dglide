"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const LOGO_COUNT = 9;
const LOGO_SRCS = [
  "/logos/logo-1.png", "/logos/logo-2.png", "/logos/logo-3.png", "/logos/logo-4.png", "/logos/logo-5.png",
  "/logos/client-jsw.svg", "/logos/client-rolcon.svg", "/logos/client-sharplaser.svg", "/logos/client-tgt.svg",
];
const LOGO_ALTS = [
  "Client Logo", "Client Logo", "Client Logo", "Client Logo", "Client Logo",
  "JSW", "Rolcon", "Sharp Laser Component", "TGT",
];

function LogoPill({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="logo-pill" style={{ flexShrink: 0 }}>
      {src.endsWith(".svg") ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={160} height={48} className="object-contain" />
      ) : (
        <Image src={src} alt={alt} width={160} height={48} className="object-contain" />
      )}
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
  const heading = title ?? data?.title ?? "Trusted by";

  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => ({
    src: data?.[`logo_${i + 1}_image`] || LOGO_SRCS[i % LOGO_SRCS.length],
    alt: data?.[`logo_${i + 1}_alt`]   || LOGO_ALTS[i % LOGO_ALTS.length],
  }));

  const displayLogos = logos;
  const duplicated = [...displayLogos, ...displayLogos, ...displayLogos];
  const trackWidth = displayLogos.length * (212 + 16);

  return (
    <section className="dg-logo-carousel-section" style={{ width: "100%", background: "transparent", padding: "48px 0 24px", overflow: "hidden" }}>
      {heading && (
        <ScrollReveal direction="up">
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
        </ScrollReveal>
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
