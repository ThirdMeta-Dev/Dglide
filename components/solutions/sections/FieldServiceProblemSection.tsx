"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { problemCards } from "@/data/solutionsPageData";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const ProblemCard: FunctionComponent<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <article className="sol-problem-card">
    <div className="sol-problem-card-inner">
      <img
        src={icon}
        alt=""
        className="sol-problem-card-icon"
        width={88}
        height={48}
        aria-hidden
      />
      <div className="sol-problem-card-text">
        <h3 className="sol-problem-card-title">{title}</h3>
        <p className="sol-problem-card-description">{description}</p>
      </div>
    </div>
  </article>
);

type FieldServiceProblemSectionProps = {
  sectionId?: string;
  sectionClassName?: string;
  heading?: string;
  mobileHeading?: string;
  description?: string;
  cards?: typeof problemCards;
  footerText?: string;
  ctaLabel?: string;
};

const FieldServiceProblemSection: FunctionComponent<FieldServiceProblemSectionProps> = ({
  sectionId = "field-service-problem",
  sectionClassName = "",
  heading = "Your Ticketing Tool Stops Where Your Real Work Begins",
  mobileHeading,
  description = "When your system only handles tickets, everything around them falls back into email and guesswork.",
  cards = problemCards,
  footerText = "Your team isn't slow. Your tool just stops where your real workflows begin.",
  ctaLabel = "Explore DGlide For You",
}) => {
  const router = useRouter();

  return (
    <section id={sectionId} className={`sol-section sol-problem-section${sectionClassName ? ` ${sectionClassName}` : ""}`}>
      <SolutionsContainer>
        <ScrollReveal direction="up">
          <h2 className="sol-problem-heading">
            <span className={mobileHeading ? "sol-copy-desktop" : ""}>{heading}</span>
            {mobileHeading ? <span className="sol-copy-mobile">{mobileHeading}</span> : null}
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.1}>
          <p className="sol-problem-description">
            {description}
          </p>
        </ScrollReveal>

        <div className="sol-problem-body">
          <StaggerReveal className="sol-problem-grid">
            <div className="sol-problem-grid-row">
              {cards.slice(0, 3).map((card) => (
                <StaggerItem key={card.title}>
                  <ProblemCard {...card} />
                </StaggerItem>
              ))}
            </div>
            <div className="sol-problem-grid-row sol-problem-grid-row--two">
              {cards.slice(3).map((card) => (
                <StaggerItem key={card.title}>
                  <ProblemCard {...card} />
                </StaggerItem>
              ))}
            </div>
          </StaggerReveal>

          <div className="sol-problem-footer">
            <p className="sol-problem-footer-text">
              {footerText}
            </p>
            <SolutionsButton
              variant="get-started-now"
              onClick={() => scrollToContact(router)}
            >
              {ctaLabel}
            </SolutionsButton>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default FieldServiceProblemSection;
