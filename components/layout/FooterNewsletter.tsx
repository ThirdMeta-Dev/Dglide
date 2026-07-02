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
      {/* Heading */}
      <p className="footer-nl-title">
        {heading}
      </p>

      {/* Input + button row */}
      <div className="footer-nl-actions">
        <div className="footer-nl-row">
          <div className="footer-nl-input">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubscribe(); }}
              placeholder={placeholder}
              disabled={loading}
            />
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="footer-nl-btn dg-btn-fill"
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
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#D92D20", margin: "6px 0 0" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
