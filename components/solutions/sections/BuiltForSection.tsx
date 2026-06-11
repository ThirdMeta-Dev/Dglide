"use client";

import { Fragment, FunctionComponent, useState } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  bestFitForItems,
  industryItems,
} from "@/data/solutionsPageData";

const IndustryIcon: FunctionComponent = () => (
  <img
    src="/solutions/orange-bg.svg"
    alt=""
    className="sol-built-for-industry-icon"
    width={36}
    height={36}
    aria-hidden
  />
);

const BuiltForSection: FunctionComponent = () => {
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(1);

  return (
    <section id="who-built-for" className="sol-section sol-built-for-section">
      <SolutionsContainer>
        <div className="sol-built-for-inner">
          <header className="sol-built-for-header">
            <h2 className="sol-built-for-heading">
              Service Operations Break When Coordination Is Manual
            </h2>
            <p className="sol-built-for-description">
              Lorem ipsim is simply model is not one product. It is a connected
            </p>
          </header>

          <div className="sol-built-for-panel">
            <div className="sol-built-for-row">
              <article className="sol-built-for-fit-card">
                <div className="sol-built-for-fit-body">
                  <h3 className="sol-built-for-fit-heading">Best Fit For</h3>
                  <ul className="sol-built-for-fit-list">
                    {bestFitForItems.map((item, index) => (
                      <li
                        key={`${item}-${index}`}
                        className={`sol-built-for-fit-item ${
                          index === 0
                            ? "sol-built-for-fit-item--start"
                            : "sol-built-for-fit-item--center"
                        }`}
                      >
                        <span className="sol-built-for-fit-icon-wrap">
                          <img
                            src="/solutions/section-1-icon.svg"
                            alt=""
                            className="sol-built-for-fit-icon"
                            width={24}
                            height={24}
                            aria-hidden
                          />
                        </span>
                        <span className="sol-built-for-fit-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <div className="sol-built-for-columns">
                <div className="sol-built-for-media" aria-hidden />

                <div className="sol-built-for-industries">
                  <div className="sol-built-for-industries-list">
                    {industryItems.map((item, index) => {
                      const isExpanded = activeIndustryIndex === index;

                      return (
                        <Fragment key={item.title}>
                          {index > 0 &&
                            (isExpanded ? (
                              <div
                                className="sol-built-for-active-bar"
                                aria-hidden
                              >
                                <span className="sol-built-for-active-bar-fill" />
                              </div>
                            ) : (
                              <hr className="sol-built-for-divider" />
                            ))}

                          {isExpanded ? (
                            <div className="sol-built-for-industry-expanded">
                              <div className="sol-built-for-industry-expanded-inner">
                                <div className="sol-built-for-industry-row">
                                  <IndustryIcon />
                                  <h4 className="sol-built-for-industry-title sol-built-for-industry-title--active">
                                    {item.title}
                                  </h4>
                                </div>
                                <p className="sol-built-for-industry-description">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="sol-built-for-industry-trigger"
                              aria-expanded={false}
                              onClick={() => setActiveIndustryIndex(index)}
                            >
                              <IndustryIcon />
                              <span className="sol-built-for-industry-title">
                                {item.title}
                              </span>
                            </button>
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default BuiltForSection;
