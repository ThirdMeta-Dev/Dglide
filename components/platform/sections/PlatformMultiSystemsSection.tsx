import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformMultiSystemsCards,
  platformMultiSystemsDescription,
  platformMultiSystemsHeading,
} from "@/data/platformPageData";

const PlatformMultiSystemsSection: FunctionComponent = () => (
  <section id="platform-multi-systems" className="sol-section">
    <SolutionsContainer>
      <header className="sol-plat-multi-systems-header">
        <h2 className="sol-plat-multi-systems-heading">
          {platformMultiSystemsHeading}
        </h2>
        <p className="sol-plat-multi-systems-description">
          {platformMultiSystemsDescription}
        </p>
      </header>

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

        <div className="sol-plat-multi-systems-grid">
          {platformMultiSystemsCards.map((card) => (
            <article key={card.title} className="sol-plat-multi-systems-card">
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
          ))}
        </div>
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformMultiSystemsSection;
