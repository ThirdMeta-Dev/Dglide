"use client";

import { Fragment, FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { technicianFeatures } from "@/data/solutionsPageData";

const FeatureIcon: FunctionComponent = () => (
  <img
    src="/solutions/orange-bg.svg"
    alt=""
    className="sol-technician-feature-icon"
    width={36}
    height={36}
    aria-hidden
  />
);

const TechnicianMobileSection: FunctionComponent = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="sol-section sol-technician-section">
      <SolutionsContainer>
        <div className="sol-technician-inner">
          <header className="sol-technician-header">
            <h2 className="sol-technician-heading">
              Give Technicians a Clear Field Workflow
            </h2>
            <p className="sol-technician-description">
              Field teams should not depend on calls and manual updates to know
              what to do next. Dglide gives technicians a mobile-first workflow
              for daily service execution. Field teams should not
            </p>
          </header>

          <div className="sol-technician-panel">
            <div className="sol-technician-row">
              <div className="sol-technician-features">
                <div className="sol-technician-features-list">
                  {technicianFeatures.map((feature, index) => {
                    const isExpanded = activeIndex === index;

                    return (
                      <Fragment key={feature.title}>
                        {index > 0 &&
                          (isExpanded ? (
                            <div
                              className="sol-technician-active-bar"
                              aria-hidden
                            >
                              <span className="sol-technician-active-bar-fill" />
                            </div>
                          ) : (
                            <hr className="sol-technician-divider" />
                          ))}

                        {isExpanded ? (
                          <div className="sol-technician-feature-expanded">
                            <div className="sol-technician-feature-expanded-inner">
                              <div className="sol-technician-feature-row">
                                <FeatureIcon />
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
                            <FeatureIcon />
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
                <img
                  src="/solutions/phone.svg"
                  alt=""
                  width={441}
                  height={647}
                  className="sol-technician-phone"
                  aria-hidden
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
