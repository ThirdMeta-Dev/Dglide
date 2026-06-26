"use client";

import { FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  workflowChangeBullets,
  workflowChangeSubtitle,
  workflowChangeTitle,
  workflowTimelineItems,
} from "@/data/solutionsPageData";

type WorkflowChangeSectionProps = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
  timelineItems?: typeof workflowTimelineItems;
};

const TickIcon = () => (
  <span className="sol-workflow-change-tick-icon-wrap" aria-hidden>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21.005"
      height="12.762"
      viewBox="0 0 24 14"
      fill="none"
      aria-hidden
    >
      <path d="M4.92601 6.82574L9.4923 9.10898L18.6249 4.54251L22.2779 6.3691L9.4923 12.7622L1.27297 8.65233L4.92601 6.82574Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 6.50348L9.4923 8.78671L18.6249 4.22024L22.2779 6.04683L9.4923 12.4399L1.27297 8.33007L4.92601 6.50348Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.85895L9.4923 8.14218L18.6249 3.57571L22.2779 5.4023L9.4923 11.7954L1.27297 7.68553L4.92601 5.85895Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
      <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
    </svg>
  </span>
);

const WorkflowChangeSection: FunctionComponent<WorkflowChangeSectionProps> = ({
  title = workflowChangeTitle,
  subtitle = workflowChangeSubtitle,
  bullets = workflowChangeBullets,
  timelineItems = workflowTimelineItems,
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="sol-section sol-workflow-change-section">
      <SolutionsContainer>
        <div className="sol-workflow-change-inner">
          <div className="sol-workflow-change-left">
            <div className="sol-workflow-change-intro">
              <h2 className="sol-workflow-change-heading">
                {title}
              </h2>
              <p className="sol-workflow-change-subtitle">
                {subtitle}
              </p>
            </div>

            <ul className="sol-workflow-change-bullets">
              {bullets.map((bullet) => (
                <li key={bullet} className="sol-workflow-change-bullet">
                  <TickIcon />
                  <span className="sol-workflow-change-bullet-text">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sol-workflow-change-track">
            <img
              src="/solutions/ellipse.svg"
              alt=""
              width={527}
              height={663}
              className="sol-workflow-change-arc"
              aria-hidden
            />

            <div className="sol-workflow-change-timeline">
              {timelineItems.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div key={item.title} className="sol-workflow-change-row">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`sol-workflow-change-node sol-workflow-change-node-${index}${isActive ? " sol-workflow-change-node--active" : ""}`}
                      aria-label={item.title}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        width={73}
                        height={40}
                        className="sol-workflow-change-node-icon"
                        aria-hidden
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`sol-workflow-change-item${isActive ? " sol-workflow-change-item--active" : ""}`}
                      style={{ width: item.width, maxWidth: "100%" }}
                      aria-expanded={isActive}
                    >
                      <div className="sol-workflow-change-item-content">
                        <span
                          className={`sol-workflow-change-item-title${isActive ? " sol-workflow-change-item-title--active" : ""}`}
                        >
                          {item.title}
                        </span>
                        {isActive && item.description && (
                          <p className="sol-workflow-change-item-description">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default WorkflowChangeSection;
