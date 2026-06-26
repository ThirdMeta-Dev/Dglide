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

type RealOperationsSectionProps = {
  heading?: string;
  challengeQuote?: string;
  challengeBullets?: string[];
  metricsDescription?: string;
  metrics?: { value: string; label: string }[];
  footerQuote?: string;
  solutionItems?: string[];
};

const TickSvg: FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21.005"
    height="12.762"
    viewBox="0 0 24 14"
    fill="none"
    aria-hidden
  >
    <path d="M4.92601 6.82587L9.4923 9.1091L18.6249 4.54263L22.2779 6.36922L9.4923 12.7623L1.27297 8.65245L4.92601 6.82587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.5036L9.4923 8.78683L18.6249 4.22037L22.2779 6.04695L9.4923 12.44L1.27297 8.33019L4.92601 6.5036Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.85883L9.4923 8.14206L18.6249 3.57559L22.2779 5.40218L9.4923 11.7952L1.27297 7.68541L4.92601 5.85883Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
  </svg>
);

const ListIcon: FunctionComponent = () => (
  <span className="sol-real-ops-list-icon" aria-hidden>
    <TickSvg />
  </span>
);

const SolutionListIcon: FunctionComponent = () => (
  <span className="sol-real-ops-solution-list-icon" aria-hidden>
    <TickSvg />
  </span>
);

const RealOperationsSection: FunctionComponent<RealOperationsSectionProps> = ({
  heading = "How Dglide Works in Real Operations",
  challengeQuote = realOpsChallengeQuote,
  challengeBullets = realOpsChallengeBullets,
  metricsDescription = realOpsMetricsDescription,
  metrics = realOpsMetrics,
  footerQuote = realOpsFooterQuote,
  solutionItems = realOpsSolutionItems,
}) => (
  <section className="sol-section sol-real-ops-section">
    <SolutionsContainer>
      <div className="sol-real-ops-inner">
        <header className="sol-real-ops-header">
          <h2 className="sol-real-ops-heading">
            {heading}
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
                    &ldquo;{challengeQuote}&rdquo;
                  </blockquote>
                </div>

                <ul className="sol-real-ops-bullets">
                  {challengeBullets.map((item) => (
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
                    {metricsDescription}
                  </p>
                </div>

                <div className="sol-real-ops-metrics">
                  {metrics.map((metric) => (
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
                {footerQuote}
              </blockquote>
            </div>
          </div>

          <aside className="sol-real-ops-solution-wrap">
            <article className="sol-real-ops-solution-card">
              <img
                src="/solutions/dglide-logo.svg"
                alt="Dglide"
                width={160}
                height={28}
                className="sol-real-ops-solution-logo"
              />

              <div className="sol-real-ops-solution-content">
                <div className="sol-real-ops-solution-header">
                  <h3 className="sol-real-ops-solution-title">Dglide Solution</h3>
                  <span className="sol-real-ops-solution-divider" aria-hidden />
                </div>

                <ul className="sol-real-ops-solution-list">
                  {solutionItems.map((item) => (
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
