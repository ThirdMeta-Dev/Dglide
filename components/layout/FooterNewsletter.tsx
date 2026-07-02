"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  heading: string;
  placeholder: string;
  buttonLabel: string;
}

export default function FooterNewsletter({ heading, placeholder, buttonLabel }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe() {
    const trimmed = email.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed");
      }
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="footer-newsletter">
      <p
        style={{
          fontFamily: "var(--font-tasa-orbiter)",
          fontSize: 20,
          fontWeight: 400,
          lineHeight: "28px",
          color: "#000",
          margin: 0,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {heading}
      </p>

      <div className="footer-nl-actions" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            className="footer-nl-input"
            style={{
              width: 370,
              height: 48,
              background: "#FFF",
              borderRadius: 35,
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
              placeholder={placeholder}
              disabled={loading}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: 14,
                lineHeight: "21px",
                color: "#333",
              }}
            />
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="dg-btn-fill"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 32px",
              borderRadius: 40,
              border: "1.5px solid #141FB5",
              background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
              color: "#FFF",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Subscribing..." : buttonLabel}
            {!loading && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {error && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#D92D20", margin: 0 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
