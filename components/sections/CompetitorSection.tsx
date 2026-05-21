"use client";

const COMP_DEFAULTS = [
  { label: "Enterprise Suites",  bullets: ["Heavy, slow to roll out", "Powerful, complex, and overkill"],   marginLeft: 28 },
  { label: "Standard Software",  bullets: ["Fixed workflows you cannot change", "Cheap upfront"],            marginLeft: 0  },
  { label: "Custom Build",       bullets: ["Months to build", "You get fit and a permanent IT burden"],     marginLeft: 56 },
];

const RIGHT_FEAT_DEFAULTS = [
  "Fits your workflows from day one",
  "Live in weeks, not months",
  "Never goes out of date",
  "No IT project to maintain",
];

export default function CompetitorSection({ data }: { data?: Record<string, string> }) {
  const sectionTitle = data?.title      ?? "DGlide Vs. Everything Else You've Tried";
  const rightTitle   = data?.right_title ?? "With DGlide";
  const rightBody    = data?.right_body  ?? "DGlide is not a heavier suite, a rigid tool, or a build you maintain forever. It is a platform shaped to how you work, and adjusted as your operation changes.";

  const competitors = COMP_DEFAULTS.map((c, i) => ({
    label:     data?.[`comp_${i + 1}_label`]    ?? c.label,
    bullet1:   data?.[`comp_${i + 1}_bullet_1`] ?? c.bullets[0],
    bullet2:   data?.[`comp_${i + 1}_bullet_2`] ?? c.bullets[1],
    marginLeft: c.marginLeft,
  }));

  const rightFeats = RIGHT_FEAT_DEFAULTS.map((f, i) => data?.[`right_feat_${i + 1}`] ?? f);

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
      <div className="sec-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Title */}
        <div style={{ marginBottom: 56, position: "relative", display: "inline-block" }}>
          <h2
            className="sec-h2"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: "56px",
              color: "#000",
              margin: 0,
            }}
          >
            {sectionTitle}
          </h2>
          <h2
            aria-hidden
            className="sec-h2"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: "56px",
              margin: 0,
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #FF7F1C 0%, #000000 32%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              pointerEvents: "none",
            }}
          >
            {sectionTitle}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="comp-two-col" style={{ display: "flex", gap: 24, alignItems: "stretch" }}>

          {/* LEFT — 3 staggered cards */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {competitors.map((comp, i) => (
              <div
                key={i}
                className="comp-card"
                style={{
                  display: "flex",
                  padding: "24px 28px",
                  alignItems: "center",
                  gap: 48,
                  borderRadius: 16,
                  border: "1px solid #FFF",
                  background: "linear-gradient(270deg, #FFF 0%, #F6F6F6 100%)",
                  marginLeft: comp.marginLeft,
                }}
              >
                {/* Icon + Label */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16, flexShrink: 0, width: 130 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: "#FFF",
                      border: "1.5px solid #FF7F1C",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 3,
                      flexShrink: 0,
                    }}
                  >
                    <img src="/dglide-icon-orange.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#000",
                      lineHeight: "20px",
                    }}
                  >
                    {comp.label}
                  </span>
                </div>

                {/* Bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                  {[comp.bullet1, comp.bullet2].map((b, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src="/dglide-icon-orange.png" alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#555", lineHeight: "24px" }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — DGlide card */}
          <div
            className="comp-right"
            style={{
              width: 432,
              flexShrink: 0,
              borderRadius: 16,
              border: "1px solid #FFF",
              background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
              padding: "44px 36px 36px 36px",
              display: "flex",
              flexDirection: "column",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                width: 48, height: 48, borderRadius: 10, background: "#FF7F1C",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: 3, flexShrink: 0, marginBottom: 20,
              }}
            >
              <img src="/dglide-icon.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>

            <h3 style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 28, fontWeight: 600, color: "#FFF", lineHeight: "40px", margin: "0 0 8px" }}>
              {rightTitle}
            </h3>

            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, color: "#FFF", lineHeight: "24px", letterSpacing: "0.2px", textTransform: "capitalize" as const, margin: "0 0 32px" }}>
              {rightBody}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 11 }}>
              {rightFeats.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src="/dglide-icon.svg" alt="" style={{ width: 20, height: 20, flexShrink: 0, filter: "brightness(0) invert(1)" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 500, color: "#FFF", lineHeight: "24px" }}>
                    {f}
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
