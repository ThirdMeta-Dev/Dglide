"use client";

import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const STEPS = [
  {
    icon: "/platform/start-fast/step-1.png",
    title: "Choose the Starting System",
    desc: "Begin with FSM, CRM, ITSM, Field Sales, or Process Management.",
  },
  {
    icon: "/platform/start-fast/step-2.png",
    title: "Map Your Workflow",
    desc: "Identify how work actually moves across your teams, approvals, and stages.",
  },
  {
    icon: "/platform/start-fast/step-3.png",
    title: "Configure and Go Live",
    desc: "Adapt workflows, forms, dashboards, and rules without writing code.",
  },
  {
    icon: "/platform/start-fast/step-4.png",
    title: "Keep Adapting",
    desc: "As your operations change, DGlide changes with them.",
  },
];

const PlatformStartFastSection: FunctionComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [fillTransition, setFillTransition] = useState({ duration: 0, ease: "linear" as const });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((s) => {
        const next = (s + 1) % STEPS.length;
        setFillTransition({ duration: next === 0 ? 0 : 2.4, ease: "linear" });
        return next;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleStepClick = (i: number) => {
    setFillTransition({ duration: 0.3, ease: "linear" });
    setActiveStep(i);
  };

  return (
    <section id="platform-start-fast" className="sol-section sol-plat-start-section">
      <SolutionsContainer>
        <ScrollReveal direction="up">
          <div className="sol-plat-start-heading-wrap">
            <h2 className="sol-plat-start-heading">
              Start Fast. Configure Around Reality. Keep Improving.
            </h2>
          </div>
        </ScrollReveal>

        <div className="sol-plat-start-timeline">
          {/* connecting line */}
          <div className="sol-plat-start-line" aria-hidden>
            <motion.div
              className="sol-plat-start-line-fill"
              animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              transition={fillTransition}
            />
          </div>

          <StaggerReveal className="sol-plat-start-steps">
            {STEPS.map((step, i) => {
              const isActive = i <= activeStep;
              return (
                <StaggerItem key={step.title}>
                <button
                  type="button"
                  className={`sol-plat-start-step${isActive ? " sol-plat-start-step--active" : ""}`}
                  onClick={() => handleStepClick(i)}
                >
                  <div className="sol-plat-start-icon-wrap">
                    <Image
                      src={step.icon}
                      alt=""
                      width={88}
                      height={48}
                      className="sol-plat-start-icon"
                      aria-hidden
                    />
                  </div>
                  <h3 className="sol-plat-start-step-title">{step.title}</h3>
                  <p className="sol-plat-start-step-desc">{step.desc}</p>
                </button>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformStartFastSection;
