"use client";

import Image from "next/image";
import { useState } from "react";

/*
 * "More Resources From DGlide" — About Us page
 * Figma node 1118:2233 (1200x392 desktop frame, 1104px content)
 */

const TABS = ["Ebooks", "Blogs", "Case Studiesz"];

const FEATURED = {
  image: "/about/resources/featured-article.png",
  title: "Why Standard Software Fails Real Operations",
  body: "We finally have visibility in our lorem is operations Your system adapts to how you work Start with working",
  href: "#",
};

export default function AUResourcesSection() {
  const [active, setActive] = useState("Blogs");

  return (
    <section className="w-full md:mt-0">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col gap-10">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-[36px] leading-[44px] md:text-[48px] md:leading-[60px] font-normal"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              background: "linear-gradient(90deg, #FF7F1C 0%, #000000 45%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            More Resources From DGlide
          </h2>
          <p
            className="max-w-[584px] text-[16px] leading-[28px] tracking-[0.2px] text-[#6F7276]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Ideas on operations, workflow fit, and software that adapts.
          </p>
        </div>

        {/* ---------- Content row: tabs left, featured card right ---------- */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-[60px]">
          {/* Tab buttons */}
          <div className="w-full lg:w-[244px] lg:flex-shrink-0 lg:pt-5 flex flex-col gap-3">
            {TABS.map((tab) => {
              const isActive = tab === active;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className={`h-[44px] px-5 rounded-[30px] border border-[#FF7F1C] flex items-center justify-center text-[16px] leading-[1.26] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#FF7F1C] text-white font-semibold"
                      : "bg-transparent text-[#FF7F1C] font-normal"
                  }`}
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Featured article card */}
          <div
            className="flex-1 rounded-2xl border border-white pl-2 pt-2 pb-2 pr-2 md:pr-7"
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-9">
              <Image
                src={FEATURED.image}
                alt="Why Standard Software Fails Real Operations"
                width={364}
                height={239}
                className="w-full h-auto md:w-[364px] md:h-[239px] md:flex-shrink-0 object-cover"
              />

              <div className="flex-1 flex flex-col gap-7 px-2 pb-4 md:p-0">
                <div className="flex flex-col gap-2">
                  <h3
                    className="text-black text-[18px] leading-[26px] font-medium"
                    style={{ fontFamily: "var(--font-tasa-orbiter)" }}
                  >
                    {FEATURED.title}
                  </h3>
                  <p
                    className="text-[#555555] text-[15px] leading-[25px] tracking-[0.2px]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {FEATURED.body}
                  </p>
                </div>

                <a
                  href={FEATURED.href}
                  className="inline-flex items-center gap-[10px] text-[#1C2BFF] text-[15px] leading-[1.26] font-normal"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  Read More
                  <svg
                    width="17"
                    height="11"
                    viewBox="0 0 17 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M1.05324 5.31353L15.9505 5.3131"
                      stroke="#1C2BFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6925 9.56989L15.949 5.31341"
                      stroke="#1C2BFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6926 1.05324L15.9489 5.30948"
                      stroke="#1C2BFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
