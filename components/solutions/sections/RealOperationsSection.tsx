import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  realOpsChallengeBullets,
  realOpsChallengeQuote,
  realOpsFooterQuote,
  realOpsMetrics,
  realOpsMetricsDescription,
  realOpsSolutionItems,
} from "@/data/solutionsPageData";

const ListIcon: FunctionComponent = () => (
  <img
    src="/solutions/section-1-icon.svg"
    alt=""
    width={22}
    height={22}
    className="sol-real-ops-list-icon"
    aria-hidden
  />
);

const SolutionListIcon: FunctionComponent = () => (
  <span className="sol-real-ops-solution-list-icon" aria-hidden>
    <img src="/solutions/section-1-icon.svg" alt="" width={20} height={20} />
  </span>
);

const RealOperationsSection: FunctionComponent = () => (
  <section className="sol-section sol-real-ops-section">
    <SolutionsContainer>
      <div className="sol-real-ops-inner">
        <header className="sol-real-ops-header">
          <h2 className="sol-real-ops-heading">
            How Dglide Works in Real Operations
          </h2>
        </header>

        <div className="sol-real-ops-body">
          <div className="sol-real-ops-left">
            <div className="sol-real-ops-panel">
              <div className="sol-real-ops-block sol-real-ops-block--challenge">
                <div className="sol-real-ops-block-intro">
                  <h3 className="sol-real-ops-block-title sol-real-ops-block-title--orange">
                    The Challenge
                  </h3>
                  <blockquote className="sol-real-ops-quote">
                    &ldquo;{realOpsChallengeQuote}&rdquo;
                  </blockquote>
                </div>

                <ul className="sol-real-ops-bullets">
                  {realOpsChallengeBullets.map((item) => (
                    <li key={item} className="sol-real-ops-bullet">
                      <ListIcon />
                      <span className="sol-real-ops-bullet-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sol-real-ops-block sol-real-ops-block--metrics">
                <div className="sol-real-ops-block-intro sol-real-ops-block-intro--metrics">
                  <h3 className="sol-real-ops-block-title sol-real-ops-block-title--blue">
                    The Success Metrics
                  </h3>
                  <p className="sol-real-ops-metrics-description">
                    {realOpsMetricsDescription}
                  </p>
                </div>

                <div className="sol-real-ops-metrics">
                  {realOpsMetrics.map((metric) => (
                    <div key={metric.value} className="sol-real-ops-metric">
                      <p className="sol-real-ops-metric-value">{metric.value}</p>
                      <p className="sol-real-ops-metric-label">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sol-real-ops-footer-quote">
              <span className="sol-real-ops-footer-avatar" aria-hidden />
              <blockquote className="sol-real-ops-footer-text">
                &ldquo;{realOpsFooterQuote}&rdquo;
              </blockquote>
            </div>
          </div>

          <aside className="sol-real-ops-solution-wrap">
            <article className="sol-real-ops-solution-card">
              <img
                src="/solutions/orange-bg.svg"
                alt=""
                width={48}
                height={48}
                className="sol-real-ops-solution-icon"
                aria-hidden
              />

              <div className="sol-real-ops-solution-content">
                <div className="sol-real-ops-solution-header">
                  <h3 className="sol-real-ops-solution-title">Dglide Solution</h3>
                  <span className="sol-real-ops-solution-divider" aria-hidden />
                </div>

                <ul className="sol-real-ops-solution-list">
                  {realOpsSolutionItems.map((item) => (
                    <li key={item} className="sol-real-ops-solution-item">
                      <SolutionListIcon />
                      <span className="sol-real-ops-solution-item-text">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default RealOperationsSection;
