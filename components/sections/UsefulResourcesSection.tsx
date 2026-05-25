"use client";

import Image from "next/image";
import { useState } from "react";

const TABS = ["Case Studies", "Blogs", "Glossary"];

const STATIC_RESOURCE = {
  image: null,
  title: "We finally have visibility in our lorem is operations Your system",
  body: "We Finally Have Visibility In Our Lorem Is Operations Your System Adapts To How You Work Start With Working",
  href: "#",
};

export default function UsefulResourcesSection() {
  const [active, setActive] = useState("Blogs");

  return (
    <section style={{ width: "100%", background: "#F3F3F3", padding: "80px 0 60px" }}>
      <div className="usr-outer" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontSize: 48,
              fontWeight: 400,
              lineHeight: "60px",
              margin: "0 0 12px",
              background: "linear-gradient(180deg, #FF7F1C 0%, #000 82.08%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Useful Resources To Check
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "28px",
              color: "#6F7276",
              margin: 0,
            }}
          >
            Dig Into Case Studies, Articles, And Operations Terms Explained Simply.
          </p>
        </div>

        {/* Content row */}
        <div className="usr-content" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

          {/* Left — tab buttons */}
          <div className="usr-tabs" style={{ display: "flex", flexDirection: "column", gap: 16, width: 244, flexShrink: 0 }}>
            {TABS.map((tab) => {
              const isActive = tab === active;
              return (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  style={{
                    width: "100%",
                    padding: "10px 24px",
                    borderRadius: 40,
                    border: `1.5px solid #FF7F1C`,
                    background: isActive ? "#FF7F1C" : "transparent",
                    fontFamily: "Sora, sans-serif",
                    fontSize: 16,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#FFF" : "#FF7F1C",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Right — card */}
          <div
            className="usr-card"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "stretch",
              gap: 0,
              borderRadius: 20,
              background: "#FFF",
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            {/* Featured image */}
            <div
              className="usr-card-img"
              style={{
                width: "48%",
                flexShrink: 0,
                minHeight: 240,
                borderRadius: "20px 0 0 20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/useful-resources/featured.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="usr-card-text" style={{ flex: 1, padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              <h3
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 18,
                  fontWeight: 500,
                  lineHeight: "28px",
                  color: "#000",
                  margin: 0,
                }}
              >
                {STATIC_RESOURCE.title}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: "26px",
                  color: "#545454",
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {STATIC_RESOURCE.body}
              </p>
              <a
                href={STATIC_RESOURCE.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "Sora, sans-serif",
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#1C2BFF",
                  textDecoration: "none",
                  marginTop: 4,
                }}
              >
                Read More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 5l3 3-3 3" stroke="#1C2BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
