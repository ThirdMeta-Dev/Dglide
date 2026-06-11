import { FunctionComponent } from "react";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  integrationNodes,
  integrationSectionDescription,
} from "@/data/solutionsPageData";

const IntegrationPillIcon: FunctionComponent = () => (
  <span className="sol-integrations-pill-icon" aria-hidden>
    <img src="/solutions/orange-bg.svg" alt="" width={44} height={44} />
  </span>
);

type IntegrationsHubSectionProps = {
  heading?: string;
  description?: string;
  nodes?: typeof integrationNodes;
};

const IntegrationsHubSection: FunctionComponent<IntegrationsHubSectionProps> = ({
  heading = "Connect FSM with the Systems You Already Use",
  description = integrationSectionDescription,
  nodes = integrationNodes,
}) => (
  <section id="integrations" className="sol-section sol-integrations-section">
    <SolutionsContainer>
      <div className="sol-integrations-inner">
        <span className="sol-integrations-outer-ring" aria-hidden />

        <header className="sol-integrations-header">
          <h2 className="sol-integrations-heading">{heading}</h2>
          <p className="sol-integrations-description">{description}</p>
        </header>

        <div className="sol-integrations-diagram">
          <span
            className="sol-integrations-band sol-integrations-band--base"
            aria-hidden
          />
          <span
            className="sol-integrations-band sol-integrations-band--glow"
            aria-hidden
          />

          <div className="sol-integrations-hub-wrap">
            <span className="sol-integrations-hub-ring" aria-hidden />
            <div className="sol-integrations-hub">
              <span className="sol-integrations-hub-text">Dglide Platform</span>
            </div>
          </div>

          <div className="sol-integrations-nodes">
            <div className="sol-integrations-nodes-col sol-integrations-nodes-col--left">
              {nodes.left.map((label, index) => (
                <div
                  key={`left-${label}-${index}`}
                  className={`sol-integrations-node-wrap${
                    index === 1 ? " sol-integrations-node-wrap--left-inset" : ""
                  }`}
                >
                  <div className="sol-integrations-pill sol-integrations-pill--left">
                    <span className="sol-integrations-pill-label">{label}</span>
                    <IntegrationPillIcon />
                  </div>
                </div>
              ))}
            </div>

            <div className="sol-integrations-nodes-col sol-integrations-nodes-col--right">
              {nodes.right.map((label, index) => (
                <div
                  key={`right-${label}-${index}`}
                  className={`sol-integrations-node-wrap${
                    index === 1 ? " sol-integrations-node-wrap--right-inset" : ""
                  }`}
                >
                  <div className="sol-integrations-pill sol-integrations-pill--right">
                    <IntegrationPillIcon />
                    <span className="sol-integrations-pill-label">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <span className="sol-integrations-dot sol-integrations-dot--1" aria-hidden />
          <span className="sol-integrations-dot sol-integrations-dot--2" aria-hidden />
          <span className="sol-integrations-dot sol-integrations-dot--3" aria-hidden />
          <span className="sol-integrations-dot sol-integrations-dot--4" aria-hidden />
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default IntegrationsHubSection;
