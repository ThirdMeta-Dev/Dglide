import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";
import {
  platformMultiSystemsCards,
  platformMultiSystemsDescription,
  platformMultiSystemsHeading,
} from "@/data/platformPageData";

const PlatformMultiSystemsSection: FunctionComponent = () => (
  <section id="platform-multi-systems" className="sol-section">
    <SolutionsContainer>
      <ScrollReveal direction="up">
        <header className="sol-plat-multi-systems-header">
          <h2 className="sol-plat-multi-systems-heading">
            {platformMultiSystemsHeading}
          </h2>
          <p className="sol-plat-multi-systems-description">
            {platformMultiSystemsDescription}
          </p>
        </header>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="sol-plat-multi-systems-diagram">
          <Image
            src="/platform/multi-systems-bg.png"
            alt=""
            width={1104}
            height={742}
            className="sol-plat-multi-systems-bg"
            aria-hidden
            priority
          />

          <StaggerReveal className="sol-plat-multi-systems-grid">
            {platformMultiSystemsCards.map((card) => (
              <StaggerItem key={card.title}>
              <article className="sol-plat-multi-systems-card">
              <Image
                src={card.icon}
                alt=""
                width={88}
                height={48}
                className="sol-plat-multi-systems-card-icon"
                aria-hidden
              />

              <div className="sol-plat-multi-systems-card-body">
                <h3 className="sol-plat-multi-systems-card-title">{card.title}</h3>
                <p className="sol-plat-multi-systems-card-desc">{card.description}</p>
              </div>

              <a
                href={card.href}
                className="sol-plat-multi-systems-link"
              >
                {card.link}&nbsp;→
              </a>
              </article>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </ScrollReveal>
    </SolutionsContainer>
  </section>
);

export default PlatformMultiSystemsSection;
