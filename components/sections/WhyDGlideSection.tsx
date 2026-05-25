"use client";

import Image from "next/image";

const TOP_CARDS = [
  {
    title: "Ready to Deploy",
    desc: "DGlide is ready to run on day one, shaped to your workflows",
  },
  {
    title: "Configured to Your Operation",
    desc: "DGlide maps to your real process, so there are no workarounds",
  },
  {
    title: "Never Goes Out of Date",
    desc: "Through the Living Service Model, your system is kept in step",
  },
];

const BOTTOM_CARDS = [
  {
    title: "No Dev Team Required",
    desc: "Get the fit of custom software without the cost, the timeline, or the developers",
  },
  {
    title: "One Connected Platform",
    desc: "Service, field work, sales, and coordination run on one platform",
  },
];

export default function WhyDGlideSection({ data }: { data?: Record<string, string> } = {}) {
  const sectionTitle = data?.title ?? "Why Businesses Move to DGlide";
  const sectionSubtitle = data?.subtitle ?? "DGlide is not one more tool to manage. It is one connected system built to fit how your operation actually runs.";

  const topCards = [
    { title: data?.card_1_title ?? TOP_CARDS[0].title, desc: data?.card_1_desc ?? TOP_CARDS[0].desc },
    { title: data?.card_2_title ?? TOP_CARDS[1].title, desc: data?.card_2_desc ?? TOP_CARDS[1].desc },
    { title: data?.card_3_title ?? TOP_CARDS[2].title, desc: data?.card_3_desc ?? TOP_CARDS[2].desc },
  ];
  const bottomCards = [
    { title: data?.card_4_title ?? BOTTOM_CARDS[0].title, desc: data?.card_4_desc ?? BOTTOM_CARDS[0].desc },
    { title: data?.card_5_title ?? BOTTOM_CARDS[1].title, desc: data?.card_5_desc ?? BOTTOM_CARDS[1].desc },
  ];

  return (
    <section
      style={{
        width: "100%",
        background: "#F3F3F3",
        padding: "80px 0 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blue blob — centered behind the card grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          width: 600,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(138,191,251,0.45) 0%, rgba(243,243,243,0) 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <h2
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "60px",
                color: "#000",
                margin: 0,
              }}
            >
              {sectionTitle}
            </h2>
            <h2
              aria-hidden
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "60px",
                margin: 0,
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
              }}
            >
              {sectionTitle}
            </h2>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "28px",
              color: "#6F7276",
              margin: "10px auto 0",
              maxWidth: 760,
            }}
          >
            {sectionSubtitle}
          </p>
        </div>

        {/* Top row — 3 cards */}
        <div className="wdg-top-row" style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          {topCards.map((card, i) => (
            <div
              key={card.title}
              style={{
                flex: "1 0 0",
                borderRadius: 16,
                background: "linear-gradient(180deg, #FFF 0%, #F6F6F6 100%)",
                padding: "48px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 22,
              }}
            >
              <Image src={`/why-dglide/icon-${i + 1}.png`} alt="" width={85} height={42} className="object-contain" style={{ flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "25px",
                    color: "#000",
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    fontWeight: 400,
                    lineHeight: "25px",
                    color: "#545454",
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — 2 wider cards */}
        <div className="wdg-bottom-row" style={{ display: "flex", gap: 16 }}>
          {bottomCards.map((card, i) => (
            <div
              key={card.title}
              style={{
                flex: "1 0 0",
                borderRadius: 16,
                background: "linear-gradient(180deg, #FFF 0%, #F6F6F6 100%)",
                padding: "28px",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 22,
              }}
            >
              <Image src={`/why-dglide/icon-${i + 4}.png`} alt="" width={85} height={42} className="object-contain" style={{ flexShrink: 0 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: "25px",
                    color: "#000",
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    fontWeight: 400,
                    lineHeight: "25px",
                    color: "#545454",
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
