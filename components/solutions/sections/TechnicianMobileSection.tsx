"use client";

import Image from "next/image";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { technicianFeatures } from "@/data/solutionsPageData";

const DURATION = 7000;

type TechnicianMobileSectionProps = {
  heading?: string;
  description?: string;
  features?: typeof technicianFeatures;
};

const TechnicianMobileSection: FunctionComponent<TechnicianMobileSectionProps> = ({
  heading = "Stop Running Service Out of an Inbox",
  description = "Agents shouldn't dig through email and chat to know what's next. DGlide gives every agent one clear workspace for daily service execution.",
  features = technicianFeatures,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fillProgress, setFillProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      setFillProgress(progress);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, features]);

  return (
    <section className="sol-section sol-technician-section">
      <SolutionsContainer>
        <div className="sol-technician-inner">
          <header className="sol-technician-header">
            <h2 className="sol-technician-heading">
              {heading}
            </h2>
            <p className="sol-technician-description">
              {description}
            </p>
          </header>

          <div className="sol-technician-panel">
            <div className="sol-technician-row">
              <div className="sol-technician-features">
                <div className="sol-technician-features-list">
                  {features.map((feature, index) => {
                    const isExpanded = activeIndex === index;

                    return (
                      <Fragment key={feature.title}>
                        {index > 0 &&
                          (isExpanded ? (
                            <div className="sol-technician-active-bar" aria-hidden>
                              <span
                                className="sol-technician-active-bar-fill"
                                style={{ width: `${fillProgress * 100}%` }}
                              />
                            </div>
                          ) : (
                            <hr className="sol-technician-divider" />
                          ))}

                        {isExpanded ? (
                          <div className="sol-technician-feature-expanded">
                            <div className="sol-technician-feature-expanded-inner">
                              <div className="sol-technician-feature-row">
                                <img
                                  src={feature.icon}
                                  alt=""
                                  className="sol-technician-feature-icon"
                                  width={73}
                                  height={40}
                                  aria-hidden
                                />
                                <h3 className="sol-technician-feature-title sol-technician-feature-title--active">
                                  {feature.title}
                                </h3>
                              </div>
                              {feature.description && (
                                <p className="sol-technician-feature-description">
                                  {feature.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="sol-technician-feature-trigger"
                            aria-expanded={false}
                            onClick={() => setActiveIndex(index)}
                          >
                            <img
                              src={feature.icon}
                              alt=""
                              className="sol-technician-feature-icon"
                              width={73}
                              height={40}
                              aria-hidden
                            />
                            <span className="sol-technician-feature-title">
                              {feature.title}
                            </span>
                          </button>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              </div>

              <div className="sol-technician-phone-wrap">
                <Image
                  src="/solutions/agent-workspace.png"
                  alt="DGlide agent workspace"
                  width={441}
                  height={647}
                  className="sol-technician-phone"
                />
              </div>
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default TechnicianMobileSection;
