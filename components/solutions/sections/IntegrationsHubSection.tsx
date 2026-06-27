import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  integrationNodes,
  integrationSectionDescription,
} from "@/data/solutionsPageData";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

type IntegrationNode = { label: string; icon: string };

type IntegrationsHubSectionProps = {
  heading?: string;
  description?: string;
  nodes?: typeof integrationNodes;
};

const IntegrationsHubSection: FunctionComponent<IntegrationsHubSectionProps> = ({
  heading = "Connect ITSM With the Systems You Already Use",
  description = integrationSectionDescription,
  nodes = integrationNodes,
}) => (
  <section id="integrations" className="sol-section sol-integrations-section">
    <SolutionsContainer>
      <div className="sol-integrations-inner">
        <header className="sol-integrations-header">
          <ScrollReveal direction="up" style={{ width: "100%" }}>
            <h2 className="sol-integrations-heading">{heading}</h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} style={{ width: "100%" }}>
            <p className="sol-integrations-description">{description}</p>
          </ScrollReveal>
        </header>

        <ScrollReveal direction="up" delay={0.1} style={{ width: "100%" }}>
          <div className="sol-integrations-diagram">
            {/* Center image spans full diagram width, behind the tube columns */}
            <div className="sol-integrations-center-img" aria-hidden>
              <Image
                src="/solutions/integrations-hub-center.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <div className="sol-integrations-nodes">
              <div className="sol-integrations-nodes-col sol-integrations-nodes-col--left">
                {nodes.left.map((tube: IntegrationNode, index: number) => (
                  <div
                    key={`left-${tube.label}-${index}`}
                    className="sol-integrations-node-wrap"
                  >
                    <div className="sol-integrations-pill sol-integrations-pill--left">
                      <span className="sol-integrations-pill-label">{tube.label}</span>
                      <span className="sol-integrations-pill-icon" aria-hidden>
                        <Image
                          src={tube.icon}
                          alt=""
                          width={88}
                          height={48}
                          style={{ objectFit: "contain" }}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sol-integrations-nodes-col sol-integrations-nodes-col--right">
                {nodes.right.map((tube: IntegrationNode, index: number) => (
                  <div
                    key={`right-${tube.label}-${index}`}
                    className="sol-integrations-node-wrap"
                  >
                    <div className="sol-integrations-pill sol-integrations-pill--right">
                      <span className="sol-integrations-pill-icon" aria-hidden>
                        <Image
                          src={tube.icon}
                          alt=""
                          width={88}
                          height={48}
                          style={{ objectFit: "contain" }}
                        />
                      </span>
                      <span className="sol-integrations-pill-label">{tube.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SolutionsContainer>
  </section>
);

export default IntegrationsHubSection;
