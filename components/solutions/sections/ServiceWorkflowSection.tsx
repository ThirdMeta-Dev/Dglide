"use client";

import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { workflowSteps as defaultWorkflowSteps } from "@/data/solutionsPageData";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

type WorkflowStep = {
  title: string;
  description: string;
  icon?: string;
  active: boolean;
};

type ServiceWorkflowSectionProps = {
  heading?: string;
  steps?: WorkflowStep[];
  ctaLabel?: string;
  showCta?: boolean;
  sectionId?: string;
};

const WorkflowStepIcon: FunctionComponent<{ icon?: string; active: boolean }> = ({ icon, active }) => (
  <img
    src={icon ?? (active ? "/solutions/orange-bg.svg" : "/solutions/white-bg-section.svg")}
    alt=""
    className="sol-workflow-step-icon"
    width={88}
    height={48}
    aria-hidden
  />
);

const ServiceWorkflowSection: FunctionComponent<ServiceWorkflowSectionProps> = ({
  heading = "From Service Request to Closure, Without Losing Control",
  steps = defaultWorkflowSteps,
  ctaLabel = "See this workflow in action",
  showCta = true,
  sectionId,
}) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const DURATION = 8000;
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = (timestamp - startTime) % DURATION;
      setProgress(elapsed / DURATION);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const progressWidth = `${progress * 100}%`;
  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <section
      id={sectionId}
      className="sol-section sol-workflow-section"
    >
       <div className="sol-workflow-bg-container-wrapper-left"></div>
       <div className="sol-workflow-bg-container-wrapper-right"></div>
       <img
            src="/solutions/from-service-bg.svg"
            alt=""
            className="sol-workflow-bg"
            width={1200}
            height={693}
            aria-hidden
          />
       <div className="sol-workflow-inner">

          <div className="sol-workflow-content">
            <header className="sol-workflow-header">
              <ScrollReveal direction="up">
                <h2 className="sol-workflow-heading">{heading}</h2>
              </ScrollReveal>
            </header>

            <div className="sol-workflow-steps-wrap">
              <div className="sol-workflow-progress" aria-hidden>
                <div className="sol-workflow-progress-track" />
                <div className="sol-workflow-progress-active" style={{ width: progressWidth }} />
              </div>

              <StaggerReveal className="sol-workflow-steps">
                {steps.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <article className="sol-workflow-step">
                      <WorkflowStepIcon icon={step.icon} active={step.active} />
                      <div className="sol-workflow-step-text">
                        <h3
                          className={`sol-workflow-step-title ${
                            index === activeStep ? "sol-workflow-step-title--active" : ""
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="sol-workflow-step-description">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>

            {showCta && (
              <div className="sol-workflow-cta">
                <SolutionsButton
                  variant="workflow-cta"
                  onClick={() => scrollToContact(router)}
                >
                  {ctaLabel}
                </SolutionsButton>
              </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default ServiceWorkflowSection;
