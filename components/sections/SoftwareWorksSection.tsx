"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const INTERVAL = 6000;

const DEFAULTS = [
  {
    num: "01",
    title: "You Work Around The Software",
    body:  "Every workaround costs time. Your team builds habits around software limits instead of around your actual goals.",
    image: "/accordion/accordion-1.png",
  },
  {
    num: "02",
    title: "Every Task Needs A Workaround Because The Software Won't Do It Your Way.",
    body:  "Updates, Approvals, And Follow-Ups Live In Chats And Spreadsheets No One Can Track.",
    image: "/accordion/accordion-2.png",
  },
  {
    num: "03",
    title: "What Worked At 10 People Fails At 50",
    body:  "Processes that felt seamless when your team was small start breaking down as headcount grows and complexity compounds.",
    image: "/accordion/accordion-3.png",
  },
  {
    num: "04",
    title: "You Find Out Too Late",
    body:  "By the time a bottleneck surfaces, it has already cost you days. Visibility gaps turn small issues into serious setbacks.",
    image: "/accordion/accordion-4.png",
  },
];

export default function SoftwareWorksSection({ data }: { data?: Record<string, string> }) {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = DEFAULTS.map((d, i) => ({
    num:   d.num,
    title: data?.[`item_${i + 1}_title`] ?? d.title,
    body:  data?.[`item_${i + 1}_body`]  ?? d.body,
    image: data?.[`item_${i + 1}_image`] || d.image,
  }));

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % items.length);
    }, INTERVAL);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, goTo, items.length]);

  const activeImage = items[active]?.image;

  return (
    <section className="w-full py-24">
      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <ScrollReveal direction="up">
          <h2
            className="[font-family:var(--font-tasa-orbiter)] sec-h2"
            style={{
              fontSize: "48px",
              fontWeight: 400,
              lineHeight: "58px",
              background: "linear-gradient(180deg, #FF7F1C 0%, #000 55.42%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {data?.badge_text ?? "Your Software Works."}
            <br />
            {data?.title ?? "Just Not the Way You Do."}
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <p
            className="mt-5 [font-family:var(--font-inter)] max-w-[660px] mx-auto capitalize"
            style={{ color: "#6F7276", fontSize: "16px", fontWeight: 400, lineHeight: "26px", letterSpacing: "0.2px" }}
          >
            {data?.subtitle ?? "Every Tool You Bought Solved One Thing And Ignored How The Rest Of Your Operation Works."}
          </p>
        </ScrollReveal>
      </div>

      {/* Two-column layout */}
      <div className="max-w-[1200px] mx-auto px-12 flex gap-12 items-start sw-two-col">
        {/* Left: image */}
        <div
          className="sw-image-col flex-shrink-0 rounded-2xl overflow-hidden"
          style={{
            width: "55%",
            aspectRatio: "4 / 3",
            background: "#E8E8E8",
            boxShadow: "4px 4px 0 0 #E0E0E0",
          }}
        >
          {activeImage && (
            <Image
              key={activeImage}
              src={activeImage}
              alt={items[active]?.title}
              width={608}
              height={401}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Right: accordion */}
        <StaggerReveal className="flex-1 flex flex-col">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <StaggerItem key={i}>
              <div className="cursor-pointer" onMouseEnter={() => goTo(i)}>
                <div className="flex items-start gap-5 py-5">
                  <span
                    className="[font-family:var(--font-tasa-orbiter)] flex-shrink-0 w-6"
                    style={{
                      color: isActive ? "#FF7F1C" : "#AAAAAA",
                      fontSize: isActive ? "18px" : "16px",
                      fontWeight: isActive ? 500 : 400,
                      lineHeight: "26px",
                    }}
                  >
                    {item.num}
                  </span>
                  <span
                    className="[font-family:var(--font-tasa-orbiter)]"
                    style={{
                      color: isActive ? "#FF7F1C" : "#000",
                      fontSize: isActive ? "18px" : "16px",
                      fontWeight: isActive ? 500 : 400,
                      lineHeight: "26px",
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {isActive && item.body && (
                  <p
                    className="pl-11 pb-4 [font-family:var(--font-inter)] capitalize"
                    style={{ color: "#555", fontSize: "15px", fontWeight: 400, lineHeight: "26px", letterSpacing: "0.2px" }}
                  >
                    {item.body}
                  </p>
                )}

                <div className="relative h-[2px] w-full bg-[#E5E5E5] overflow-hidden">
                  {isActive && (
                    <div
                      key={animKey}
                      className="absolute inset-y-0 left-0 bg-[#FF7F1C]"
                      style={{ animation: `fillBar ${INTERVAL}ms linear forwards` }}
                    />
                  )}
                </div>
              </div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
