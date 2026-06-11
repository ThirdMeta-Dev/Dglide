"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { workflowSteps as defaultWorkflowSteps } from "@/data/solutionsPageData";

type WorkflowStep = {
  title: string;
  description: string;
  active: boolean;
};

type ServiceWorkflowSectionProps = {
  heading?: string;
  steps?: WorkflowStep[];
  ctaLabel?: string;
  showCta?: boolean;
  sectionId?: string;
};

const WorkflowStepIcon: FunctionComponent<{ active: boolean }> = ({ active }) =>
  active ? (
    <img
      src="/solutions/orange-bg.svg"
      alt=""
      className="sol-workflow-step-icon"
      width={48}
      height={48}
      aria-hidden
    />
  ) : (
    <img
      src="/solutions/white-bg-section.svg"
      alt=""
      className="sol-workflow-step-icon"
      width={48}
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
              <h2 className="sol-workflow-heading">{heading}</h2>
            </header>

            <div className="sol-workflow-steps-wrap">
              <div className="sol-workflow-progress" aria-hidden>
                <div className="sol-workflow-progress-track" />
                <div className="sol-workflow-progress-active" />
              </div>

              <div className="sol-workflow-steps">
                {steps.map((step) => (
                  <article key={step.title} className="sol-workflow-step">
                    <WorkflowStepIcon active={step.active} />
                    <div className="sol-workflow-step-text">
                      <h3
                        className={`sol-workflow-step-title ${
                          step.active ? "sol-workflow-step-title--active" : ""
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="sol-workflow-step-description">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
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
