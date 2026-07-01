"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const LEFT_DEFAULTS = [
  { title: "Field Service Management",      desc: "Work Orders, Scheduling, Dispatch, And Field Execution At One Place." },
  { title: "Service & Internal Operations", desc: "Handle Internal Requests And Approvals Without The Ticketing-Tool Limits." },
];
const RIGHT_DEFAULTS = [
  { title: "Process & Production Management", desc: "Track Every Stage From Raw Material To Finished Product." },
  { title: "Field Sales Management",          desc: "Plan Routes, Log Visits, Manage Territories." },
];

export default function OneSystemSection({ data }: { data?: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("is-visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full bg-[#F3F3F3] py-20 overflow-hidden">
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 opacity-0 translate-y-8 transition-all duration-700 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
      >
        {/* Heading */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl leading-tight mb-4"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000000 55%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {data?.title ?? "Run Your Whole Operation On One System"}
            </h2>
            <p className="text-[#6F7276] text-base max-w-2xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              {data?.subtitle ?? "Field Service, Production, Internal Ops, Field Sales. One Backbone, No Disconnected Tools."}
            </p>
          </div>
        </ScrollReveal>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px_1fr] gap-8 items-center">

          {/* LEFT column */}
          <StaggerReveal className="flex flex-col gap-6">
            {LEFT_DEFAULTS.map((def, i) => (
              <StaggerItem key={i}>
                <div
                  className="p-6"
                  style={{ borderRadius: "16px", background: "linear-gradient(100deg, #FFF 5.48%, rgba(243,243,243,0.00) 68.68%)" }}
                >
                  <Image src={i === 0 ? "/one-system/icon-tl.png" : "/one-system/icon-bl.png"} alt="" width={81} height={41} className="mb-4 object-contain" />
                  <h3 className="text-base font-semibold text-black mb-2" style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 600 }}>
                    {data?.[`left_${i + 1}_title`] ?? def.title}
                  </h3>
                  <p className="text-[14px] text-[#545454] leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {data?.[`left_${i + 1}_desc`] ?? def.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* CENTER — image */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex items-center justify-center">
              <img
                src={data?.center_image ?? "/solutions/platform-center-v2.png"}
                alt="DGlide Platform"
                className="w-full max-w-[360px] h-auto object-contain"
              />
            </div>
          </ScrollReveal>

          {/* RIGHT column */}
          <StaggerReveal className="flex flex-col gap-6">
            {RIGHT_DEFAULTS.map((def, i) => (
              <StaggerItem key={i}>
                <div
                  className="p-6"
                  style={{ borderRadius: "16px", background: "linear-gradient(263deg, #FFF 5.57%, rgba(243,243,243,0.00) 63.48%)" }}
                >
                  <Image src={i === 0 ? "/one-system/icon-tr.png" : "/one-system/icon-br.png"} alt="" width={81} height={41} className="mb-4 ml-auto object-contain" />
                  <h3 className="text-base font-semibold text-black mb-2 text-right" style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 600 }}>
                    {data?.[`right_${i + 1}_title`] ?? def.title}
                  </h3>
                  <p className="text-[14px] text-[#545454] leading-relaxed text-right" style={{ fontFamily: "Inter, sans-serif" }}>
                    {data?.[`right_${i + 1}_desc`] ?? def.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

        </div>
      </div>
    </section>
  );
}
