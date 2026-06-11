"use client";

import { FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  workflowChangeBullets,
  workflowChangeSubtitle,
  workflowTimelineItems,
} from "@/data/solutionsPageData";

const WorkflowChangeSection: FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="sol-section sol-workflow-change-section">
      <SolutionsContainer>
        <div className="sol-workflow-change-inner">
          <div className="sol-workflow-change-left">
            <div className="sol-workflow-change-intro">
              <h2 className="sol-workflow-change-heading">
                Your Service Workflow Will Change. Your FSM Should Too.
              </h2>
              <p className="sol-workflow-change-subtitle">
                {workflowChangeSubtitle}
              </p>
            </div>

            <ul className="sol-workflow-change-bullets">
              {workflowChangeBullets.map((bullet) => (
                <li key={bullet} className="sol-workflow-change-bullet">
                  <img
                    src="/solutions/section-1-icon.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="sol-workflow-change-bullet-icon"
                    aria-hidden
                  />
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
              {workflowTimelineItems.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div key={item.title} className="sol-workflow-change-row">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`sol-workflow-change-node sol-workflow-change-node-${index} ${
                        isActive ? " sol-workflow-change-node--active" : ""
                      }`}
                      aria-label={item.title}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {isActive ? (
                        <img
                          src="/solutions/orange-bg.svg"
                          alt=""
                          width={48}
                          height={48}
                          className="sol-workflow-change-node-icon"
                          aria-hidden
                        />
                      ) : (
                        <img
                          src="/solutions/orange-blue-icon.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="sol-workflow-change-node-icon"
                          aria-hidden
                        />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`sol-workflow-change-item${
                        isActive ? " sol-workflow-change-item--active" : ""
                      }`}
                      style={{ width: item.width, maxWidth: "100%" }}
                      aria-expanded={isActive}
                    >
                      <span
                        className={`sol-workflow-change-item-title${
                          isActive
                            ? " sol-workflow-change-item-title--active"
                            : ""
                        }`}
                      >
                        {item.title}
                      </span>
                      {isActive && item.description && (
                        <p className="sol-workflow-change-item-description">
                          {item.description}
                        </p>
                      )}
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
