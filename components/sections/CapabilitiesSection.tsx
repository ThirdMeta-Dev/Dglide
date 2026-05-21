"use client";

const CAP_DEFAULTS = [
  { title: "Automated Workflows",     desc: "Cut the manual steps between every stage." },
  { title: "Approvals & SLA Tracking", desc: "Stage-based approvals, escalations, and SLA logic built in." },
  { title: "Real-Time Dashboards",    desc: "Role-based views of every job, request, and exception." },
  { title: "Mobile Access",           desc: "Field teams update jobs and visits from the site." },
];

export default function CapabilitiesSection({ data }: { data?: Record<string, string> }) {
  const sectionTitle = data?.title    ?? "One Platform. Every Capability Your Operation Needs";
  const subtitle     = data?.subtitle ?? "One set of capabilities, working across your whole operation.";

  const caps = CAP_DEFAULTS.map((c, i) => ({
    title: data?.[`cap_${i + 1}_title`] ?? c.title,
    desc:  data?.[`cap_${i + 1}_desc`]  ?? c.desc,
    icon:  data?.[`cap_${i + 1}_icon`],
  }));

  return (
    <section style={{ width: "100%", background: "#F3F3F3", padding: "80px 0 96px" }}>
      <div className="sec-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Title + subtitle */}
        <div style={{ textAlign: "center", marginBottom: 68 }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 18 }}>
            <h2
              className="sec-h2"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "58px",
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
                lineHeight: "58px",
                margin: 0,
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, #FF7F1C 0%, #000000 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
              }}
            >
              {sectionTitle}
            </h2>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: "26px", color: "#6F7276", margin: 0 }}>
            {subtitle}
          </p>
        </div>

        {/* 4-column cards */}
        <div className="cap-grid" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
          {caps.map((cap, i) => (
            <div key={i} className="cap-item" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: 10, background: "#FF7F1C",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginBottom: 28, overflow: "hidden",
                }}
              >
                {cap.icon ? (
                  <img src={cap.icon} alt="" style={{ width: 40, height: 40, objectFit: "cover" }} />
                ) : (
                  <img src="/dglide-icon.svg" alt="" style={{ width: 24, height: 24, filter: "brightness(0) invert(1)" }} />
                )}
              </div>
              <h3 style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 17, fontWeight: 400, lineHeight: "25px", color: "#000", margin: "0 0 8px" }}>
                {cap.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "#545454", margin: 0 }}>
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
