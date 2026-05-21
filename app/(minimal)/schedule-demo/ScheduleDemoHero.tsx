"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TESTIMONIALS_DEFAULT = [
  {
    quote: "We were spending lakhs to generate leads, then losing them because nobody saw the alert in time. DGlide closed that gap.",
    name: "Mr. Lorem ipsum",
    role: "Prompt Lasers, Prompt Lasers",
  },
  {
    quote: "Our field team went from WhatsApp chaos to a single dashboard. Coordination that used to take hours now happens automatically.",
    name: "Ms. Priya Sharma",
    role: "Operations Head, NexGen Services",
  },
  {
    quote: "We configured DGlide in two weeks. No dev cycles, no delays. It just mapped to how we actually work.",
    name: "Mr. Arjun Mehta",
    role: "Director, FastTrack Logistics",
  },
];

const BULLETS_DEFAULT = [
  "Live operational visibility",
  "Automated work routing",
  "Cross-team coordination",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 52,
  padding: "0 16px",
  borderRadius: 8,
  border: "none",
  background: "#F3F3F3",
  fontFamily: "Inter, sans-serif",
  fontSize: 15,
  color: "#222",
  outline: "none",
  boxSizing: "border-box",
};

export default function ScheduleDemoHero({ data }: { data?: Record<string, string> }) {
  const [form, setForm] = useState({ name: "", email: "", contact: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [tIdx, setTIdx] = useState(0);

  const testimonials = [1, 2, 3].map((n) => ({
    quote: data?.[`testimonial_${n}_quote`] ?? TESTIMONIALS_DEFAULT[n - 1].quote,
    name: data?.[`testimonial_${n}_name`] ?? TESTIMONIALS_DEFAULT[n - 1].name,
    role: data?.[`testimonial_${n}_role`] ?? TESTIMONIALS_DEFAULT[n - 1].role,
  }));

  const bullets = [1, 2, 3].map((n) => data?.[`bullet_${n}`] ?? BULLETS_DEFAULT[n - 1]);

  const label = data?.label ?? "Book a Live DGlide Walkthrough";
  const titleRaw = data?.title ?? "One System To Run\nYour Whole Operation";
  const titleLines = titleRaw.split("\n");
  const description = data?.description ?? "No long forms. Tell us how you run things in 30 seconds, and we will show you DGlide built around it.";
  const formIntroText = data?.form_intro_text ?? "Hi, I'm Vinayak from DGlide. Answer a couple of quick questions, and I'll tailor your demo.";
  const formSubmitLabel = data?.form_submit_label ?? "Get the full story";
  const formSlotsText = data?.form_slots_text ?? "Book Now, Only 8 Demo Slots Left This Week!";
  const formPrivacyText = data?.form_privacy_text ?? "All your data stays private and secure with us.";
  const successHeading = data?.success_heading ?? "Demo Booked!";
  const successBody = data?.success_body ?? "We'll reach out within 1 business day to confirm your walkthrough slot.";

  const t = testimonials[tIdx];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>

      {/* Decorative waves — Figma node 765-112, full viewport width, shifted down to testimonial area */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",
          zIndex: 0,
        }}
        viewBox="0 0 1568 596"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1505.2 106.652C1505.2 106.652 1405.81 -143.611 1201.7 124.394C997.58 392.4 878.662 39.196 710.049 252.192C541.436 465.187 372.822 56.956 255.67 321.413C138.518 585.87 0.0756476 564.579 0.0756476 564.579" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.95" d="M1508.32 117.138C1508.32 117.138 1407.36 -124.887 1200.37 139.232C993.387 403.35 880.782 49.5041 715.7 252.282C550.207 455.043 387.585 80.9051 267.33 328.44C146.434 575.654 11.3968 566.114 5.83342 566.114" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.9" d="M1511.44 127.622C1511.44 127.622 1408.91 -106.165 1199.06 154.083C989.199 414.314 882.889 59.8268 721.354 252.388C559 444.931 402.975 105.19 278.976 335.464C154.959 565.774 22.7038 567.646 11.5592 567.646" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.86" d="M1514.57 138.09C1514.57 138.09 1410.49 -87.4586 1197.74 168.903C985.015 425.246 885.017 70.1172 727.013 252.443C567.779 434.751 418.031 129.317 290.644 342.455C163.168 555.736 34.0507 569.146 17.307 569.146" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.81" d="M1517.7 148.573C1517.7 148.573 1412.05 -68.7201 1196.43 183.736C980.813 436.193 887.59 80.8315 732.672 252.53C577.022 425.03 433.069 153.494 302.294 349.479C171.323 545.749 45.3619 570.659 23.037 570.659" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.76" d="M1520.84 159.058C1520.84 159.058 1413.62 -49.9969 1195.15 198.572C976.658 447.141 889.837 91.2453 738.36 252.619C585.937 414.991 448.101 177.71 313.991 356.487C179.489 535.781 56.7205 572.175 28.8145 572.175" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.71" d="M1523.96 169.545C1523.96 169.545 1415.19 -31.272 1193.83 213.41C972.474 458.092 892.054 101.661 744.019 252.71C594.806 404.972 463.05 201.944 325.641 363.514C187.573 525.869 68.0318 573.71 34.5623 573.71" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.67" d="M1527.08 180.011C1527.08 180.011 1416.74 -12.5679 1192.51 228.227C968.282 469.021 894.228 112.056 749.669 252.781C603.648 394.914 477.937 226.176 337.301 370.521C195.613 515.936 79.3528 575.225 40.3021 575.225" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.62" d="M1530.21 190.496C1530.21 190.496 1418.3 6.15538 1191.2 243.063C964.101 479.97 896.414 122.469 755.332 252.87C612.503 384.893 492.765 250.427 348.955 377.529C203.558 506.04 90.6679 576.741 46.036 576.741" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.57" d="M1533.33 200.98C1533.33 200.98 1419.87 24.8777 1189.88 257.898C959.913 490.918 898.573 132.864 760.986 252.959C621.331 374.854 507.514 274.677 360.619 384.554C211.442 496.143 101.993 578.274 51.7799 578.274" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.52" d="M1536.45 211.465C1536.45 211.465 1421.42 43.6005 1188.56 272.733C955.703 501.866 900.711 143.26 766.637 253.048C630.138 364.815 522.152 298.892 372.261 391.579C219.215 486.21 113.296 579.807 57.5021 579.807" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.48" d="M1539.6 221.931C1539.6 221.931 1423 62.3225 1187.28 287.568C951.553 512.814 902.873 153.655 772.33 253.118C638.969 354.739 536.759 323.035 383.963 398.568C226.957 476.188 124.659 581.304 63.3013 581.304" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.43" d="M1542.72 232.418C1542.72 232.418 1424.57 81.0479 1185.97 302.406C947.364 523.765 904.979 164.035 777.984 253.21C647.726 344.685 551.258 347.11 395.609 405.596C234.574 466.116 135.966 582.84 69.0272 582.84" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.38" d="M1545.85 242.901C1545.85 242.901 1426.13 99.7688 1184.66 317.24C943.184 534.711 907.075 174.393 783.647 253.297C656.491 334.608 565.712 371.073 407.28 412.62C242.18 455.914 147.299 584.372 74.779 584.372" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.33" d="M1548.97 253.384C1548.97 253.384 1427.68 118.49 1183.33 332.074C938.992 545.658 909.124 184.733 789.298 253.384C665.191 324.496 580.154 394.894 418.94 419.626C249.756 445.588 158.62 585.868 80.519 585.868" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.29" d="M1552.09 263.85C1552.09 263.85 1429.23 137.194 1182.01 346.891C934.8 556.587 911.138 195.003 794.948 253.454C673.891 314.348 594.613 418.608 430.582 426.632C257.351 435.12 169.924 587.382 86.2412 587.382" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.24" d="M1555.23 274.337C1555.23 274.337 1430.82 155.919 1180.72 361.729C930.617 567.538 913.178 205.276 800.627 253.546C682.583 304.169 609.171 442.219 442.27 433.66C265.044 424.566 181.272 588.918 92.0262 588.918" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.19" d="M1558.35 284.82C1558.35 284.82 1432.38 174.64 1179.4 376.562C926.429 578.485 915.16 215.492 806.281 253.633C691.233 293.95 623.795 465.773 453.916 440.684C272.785 413.937 192.579 590.45 97.7523 590.45" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.14" d="M1561.47 295.308C1561.47 295.308 1433.93 193.384 1178.1 391.401C922.255 589.436 917.155 225.641 811.968 253.725C699.898 283.646 638.54 489.277 465.611 447.695C280.665 403.223 203.936 591.968 103.528 591.968" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.1" d="M1564.6 305.776C1564.6 305.776 1435.5 212.09 1176.79 406.22C918.074 600.367 919.144 235.68 817.63 253.797C708.556 273.233 653.35 512.744 477.265 454.703C288.61 392.507 215.251 593.484 109.262 593.484" stroke="#DBDBDB" strokeMiterlimit="10"/>
        <path opacity="0.05" d="M1567.73 316.262C1567.73 316.262 1437.06 230.814 1175.47 421.074C913.886 611.335 921.179 245.703 823.285 253.888C717.242 262.768 668.224 536.247 488.929 461.73C296.654 381.81 226.577 595.019 115.006 595.019" stroke="#DBDBDB" strokeMiterlimit="10"/>
      </svg>

      {/* ── Main two-column section ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px 0", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 68, alignItems: "flex-start" }}>

          {/* ── LEFT column ── */}
          <div style={{ flex: "0 0 530px", display: "flex", flexDirection: "column", gap: 38 }}>

            {/* Logo */}
            <Link href="/" style={{ display: "inline-block" }}>
              <div style={{ position: "relative", width: 160, height: 28 }}>
                <Image src="/logo.png" alt="DGlide" fill style={{ objectFit: "contain", objectPosition: "left" }} />
              </div>
            </Link>

            {/* Heading + bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 3, height: 18, background: "#FF7F1C", borderRadius: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-sora), Sora, sans-serif", fontSize: 14, fontWeight: 400, color: "#FF7F1C" }}>
                  {label}
                </span>
              </div>

              {/* Heading — two lines, gradient text */}
              <h1
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontSize: 44,
                  fontWeight: 400,
                  lineHeight: "54px",
                  textTransform: "capitalize",
                  margin: 0,
                  background: "linear-gradient(90deg, #FF7F1C 0%, #000 29.71%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {titleLines.map((line, i) => (
                  <span key={i}>{line}{i < titleLines.length - 1 && <br />}</span>
                ))}
              </h1>

              {/* Description */}
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: "160.8%", color: "#555", margin: 0 }}>
                {description}
              </p>

              {/* Bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {bullets.map((b, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Image src="/dglide-icon-orange.png" alt="" width={28} height={28} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "#545454" }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider line */}
            <svg xmlns="http://www.w3.org/2000/svg" width="469" height="1" viewBox="0 0 469 1" fill="none">
              <path d="M0.5 0.500031L467.676 0.49999" stroke="white" strokeLinecap="round"/>
            </svg>

            {/* Testimonial card — gradient border + dots on bottom border */}
            <div style={{ position: "relative", paddingBottom: 12 }}>
              {/* Gradient border wrapper */}
              <div style={{ borderRadius: 24, padding: 1, background: "linear-gradient(180deg, #F6F6F6 0%, #FF7F1C 100%)" }}>
                <div style={{ borderRadius: 23, background: "#F4F4F4", padding: "24px 20px 32px" }}>
                  {/* Quote SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="29" viewBox="0 0 50 29" fill="none" style={{ display: "block", marginBottom: 16 }}>
                    <path d="M0 28.764L1.71444 21.1946C2.21449 18.8957 3.25029 16.4566 4.82187 13.8774C6.42916 11.2701 8.48291 8.76099 10.9832 6.34995C13.5191 3.9109 16.4301 1.79425 19.7161 0L24.1093 3.57448C20.9662 6.01353 18.1445 8.74698 15.6443 11.7747C13.144 14.7745 11.5546 17.8724 10.876 21.0684L9.16157 28.764H0ZM25.1273 28.764L26.8417 21.1946C27.3418 18.8957 28.3776 16.4566 29.9492 13.8774C31.5565 11.2701 33.6102 8.76099 36.1105 6.34995C38.6464 3.9109 41.5574 1.79425 44.8434 0L49.2366 3.57448C46.0935 6.01353 43.2719 8.74698 40.7716 11.7747C38.2713 14.7745 36.6819 17.8724 36.0033 21.0684L34.2889 28.764H25.1273Z" fill="url(#quoteGrad)"/>
                    <defs>
                      <linearGradient id="quoteGrad" x1="24.6183" y1="0" x2="24.6183" y2="28.764" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F3F3F3" stopOpacity="0"/>
                        <stop offset="1" stopColor="#FF7F1C"/>
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Quote text */}
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "24px", color: "#545454", margin: "0 0 20px" }}>
                    {t.quote}
                  </p>

                  {/* Person row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#DDD", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#999"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
                    </div>
                    <div style={{ width: 3, height: 36, background: "#FABF5A", borderRadius: 2, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#545454", margin: 0, lineHeight: "20px" }}>{t.name}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 400, color: "#888", margin: 0, lineHeight: "18px" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dots — centred on the bottom border line */}
              <div style={{
                position: "absolute",
                bottom: 4,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "#FFF",
                padding: "0 10px",
              }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIdx(i)}
                    style={{ width: i === tIdx ? 20 : 8, height: 8, borderRadius: 4, background: i === tIdx ? "#FF7F1C" : "#CCC", border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT column: Form card ── */}
          <div style={{ flex: 1, background: "#FFF", borderRadius: 16, padding: "32px 40px", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 24 }}>

            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 480, gap: 20, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#FF7F1C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 style={{ fontFamily: "var(--font-tasa-orbiter)", fontSize: 28, fontWeight: 400, color: "#000", margin: 0 }}>{successHeading}</h2>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, color: "#6F7276", lineHeight: "28px", maxWidth: 360, margin: 0 }}>
                  {successBody}
                </p>
              </div>
            ) : (
              <>
                {/* Avatar + chat bubble */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#E8E8E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="#AAAAAA"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" /></svg>
                  </div>
                  <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid #F3F3F3" }} />
                  <div style={{ width: "100%", background: "#F3F3F3", borderRadius: 12, padding: "16px 20px" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 400, lineHeight: "24px", color: "#222222", margin: 0, textAlign: "center" }}>
                      &ldquo;{formIntroText}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Name *" required style={inputStyle} />
                  <div style={{ display: "flex", gap: 12 }}>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email ID *" required style={{ ...inputStyle, flex: 1 }} />
                    <input type="tel" name="contact" value={form.contact} onChange={handleChange} placeholder="Contact No. *" style={{ ...inputStyle, flex: 1 }} />
                  </div>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="Your company name *" required style={inputStyle} />
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help" rows={4} style={{ ...inputStyle, height: "auto", resize: "none", paddingTop: 14, paddingBottom: 14 }} />

                  {error && <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#E53E3E", margin: 0 }}>{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 32px", borderRadius: 40, border: "none", background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)", color: "#fff", fontFamily: "var(--font-sora), Sora, sans-serif", fontSize: 16, fontWeight: 600, lineHeight: "20.16px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: 4 }}
                  >
                    {loading ? "Submitting..." : formSubmitLabel}
                    {!loading && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginTop: 4 }}>
                    <Image src="/dglide-icon-orange.png" alt="" width={24} height={24} />
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: "22.65px", color: "#000", margin: 0 }}>
                      {formSlotsText}
                    </p>
                  </div>
                </form>

                <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 300, lineHeight: "20.83px", color: "#48586A", margin: 0, textAlign: "center", fontStyle: "italic" }}>
                  {formPrivacyText}
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
