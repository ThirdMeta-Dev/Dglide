"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const STEP_DEFAULTS = [
  { title: "Start With a Working System",  desc: "Begin on a ready-to-run system" },
  { title: "Configure to Your Workflow",   desc: "Set up your stages, approvals, and roles" },
  { title: "Launch Fast",                  desc: "Deploy fast, without long Dev cycles." },
  { title: "Change It Anytime",            desc: "No rebuild projects. Just ongoing fit." },
];

export default function HowItWorksSection({
  data,
  smoothProgress = false,
}: {
  data?: Record<string, string>;
  smoothProgress?: boolean;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const animationStartRef = useRef<number | null>(null);

  const steps = STEP_DEFAULTS.map((d, i) => ({
    title: data?.[`step_${i + 1}_title`] ?? d.title,
    desc:  data?.[`step_${i + 1}_desc`]  ?? d.desc,
  }));

  useEffect(() => {
    if (smoothProgress) {
      const cycleDuration = 2500 * (steps.length - 1);
      let animationFrame = 0;
      let previousActiveStep = -1;

      const animateProgress = (now: number) => {
        if (animationStartRef.current === null) animationStartRef.current = now;

        const elapsed = (now - animationStartRef.current) % cycleDuration;
        const progress = elapsed / cycleDuration;
        const nextActiveStep = Math.min(steps.length - 1, Math.round(progress * (steps.length - 1)));

        if (progressLineRef.current) {
          progressLineRef.current.style.width = `${progress * 100}%`;
        }

        if (nextActiveStep !== previousActiveStep) {
          previousActiveStep = nextActiveStep;
          setActiveStep(nextActiveStep);
        }

        animationFrame = requestAnimationFrame(animateProgress);
      };

      animationFrame = requestAnimationFrame(animateProgress);
      return () => {
        cancelAnimationFrame(animationFrame);
        animationStartRef.current = null;
      };
    }

    const timer = setInterval(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [smoothProgress, steps.length]);

  const selectStep = (index: number, eventTime: number) => {
    setActiveStep(index);

    if (smoothProgress) {
      const cycleDuration = 2500 * (steps.length - 1);
      const stepProgress = index === steps.length - 1
        ? 1 - (1 / (steps.length - 1)) / 2
        : index / (steps.length - 1);
      animationStartRef.current = eventTime - stepProgress * cycleDuration;
    }
  };

  return (
    <section
      className="w-full py-24 overflow-hidden relative"
      style={{ backgroundImage: `url('${data?.bg_image ?? "/how-it-works-bg.png"}')`, backgroundSize: "cover", backgroundPosition: "center" }}
    >

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Heading */}
        <ScrollReveal direction="up">
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
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200">
            <div
              ref={progressLineRef}
              className={`h-full bg-[#FF7F1C] ${smoothProgress ? "" : "transition-all duration-700"}`}
              style={{ width: smoothProgress ? "0%" : `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              return (
                <StaggerItem key={i}>
                <button
                  onClick={(event) => selectStep(i, event.timeStamp)}
                  className="flex flex-col items-center text-center group transition-all duration-300 w-full"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 mb-4 transition-all duration-300 ${smoothProgress || isActive ? "" : "opacity-40"}`}
                  >
                    <Image src={`/how-it-works/step-${i + 1}.png`} alt="" width={97} height={49} className="object-contain" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base mb-1.5 transition-colors duration-300 ${
                      smoothProgress
                        ? isCurrent ? "text-[#FF7F1C]" : "text-black"
                        : isActive ? "text-black" : "text-gray-400"
                    }`}
                    style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
                  >
                    {step.title}
                  </h3>

                  {/* Desc */}
                  <p
                    className={`text-[14px] leading-snug transition-colors duration-300 ${smoothProgress || isActive ? "text-[#545454]" : "text-gray-300"}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {step.desc}
                  </p>
                </button>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
