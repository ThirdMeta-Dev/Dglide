"use client";

const LOGO_DEFAULTS = ["Husqvarna", "TechCorp", "BuildFast", "Nexus Ltd", "Apex Systems", "CoreFlow", "Virenxia"];

export default function ScheduleDemoLogos({ data }: { data?: Record<string, string> }) {
  const headingLine1 = data?.heading_line_1 ?? "Who's Already Running";
  const headingLine2 = data?.heading_line_2 ?? "on DGlide";
  const logos = LOGO_DEFAULTS.map((d, i) => data?.[`logo_${i + 1}`] ?? d);
  const doubled = [...logos, ...logos];

  return (
    <div style={{ background: "#F3F3F3", padding: "40px 0 48px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 64px", display: "flex", alignItems: "center", gap: 60 }}>
        {/* Left label */}
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 18, fontWeight: 400, lineHeight: "1.4", color: "#000", margin: 0 }}>{headingLine1}</p>
          <p style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 18, fontWeight: 400, lineHeight: "1.4", color: "#000", margin: 0 }}>{headingLine2}</p>
        </div>
        {/* Scrolling pills */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              width: "max-content",
              animation: "scrollLeft 28s linear infinite",
            }}
          >
            {doubled.map((name, i) => (
              <div
                key={i}
                style={{ flexShrink: 0, width: 160, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 40, border: "1px solid #FF7F1C", background: "#FFF", backdropFilter: "blur(12.5px)" }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#7E7E7E" }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
