"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STEP_DEFAULTS = [
  { title: "Start With a Working System",  desc: "Begin on a ready-to-run system" },
  { title: "Configure to Your Workflow",   desc: "Set up your stages, approvals, and roles" },
  { title: "Launch Fast",                  desc: "Deploy fast, without long Dev cycles." },
  { title: "Change It Anytime",            desc: "No rebuild projects. Just ongoing fit." },
];

export default function HowItWorksSection({ data }: { data?: Record<string, string> }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = STEP_DEFAULTS.map((d, i) => ({
    title: data?.[`step_${i + 1}_title`] ?? d.title,
    desc:  data?.[`step_${i + 1}_desc`]  ?? d.desc,
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section
      className="w-full py-24 overflow-hidden relative"
      style={{ backgroundImage: `url('${data?.bg_image ?? "/how-it-works-bg.png"}')`, backgroundSize: "cover", backgroundPosition: "center" }}
    >

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl leading-tight"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontWeight: 400,
              background: "linear-gradient(90deg, #FF7F1C 0%, #000000 55%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {data?.title ?? "How DGlide Works"}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200">
            <div
              className="h-full bg-[#FF7F1C] transition-all duration-700"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center text-center group transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 mb-4 transition-all duration-300 ${isActive ? "" : "opacity-40"}`}
                  >
                    <Image src={`/how-it-works/step-${i + 1}.png`} alt="" width={97} height={49} className="object-contain" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base mb-1.5 transition-colors duration-300 ${isActive ? "text-black" : "text-gray-400"}`}
                    style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
                  >
                    {step.title}
                  </h3>

                  {/* Desc */}
                  <p
                    className={`text-[14px] leading-snug transition-colors duration-300 ${isActive ? "text-[#545454]" : "text-gray-300"}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {step.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
