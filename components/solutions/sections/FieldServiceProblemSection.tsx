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
  mobileDescription?: string;
}> = ({ icon, title, description, mobileDescription }) => (
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
        <p className="sol-problem-card-description">
          <span className={mobileDescription ? "sol-copy-desktop" : ""}>{description}</span>
          {mobileDescription ? <span className="sol-copy-mobile">{mobileDescription}</span> : null}
        </p>
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
  cards?: ((typeof problemCards)[number] & { mobileDescription?: string })[];
  footerText?: string;
  mobileFooterText?: string;
  ctaLabel?: string;
  mobileCtaLabel?: string;
};

const FieldServiceProblemSection: FunctionComponent<FieldServiceProblemSectionProps> = ({
  sectionId = "field-service-problem",
  sectionClassName = "",
  heading = "Your Ticketing Tool Stops Where Your Real Work Begins",
  mobileHeading,
  description = "When your system only handles tickets, everything around them falls back into email and guesswork.",
  cards = problemCards,
  footerText = "Your team isn't slow. Your tool just stops where your real workflows begin.",
  mobileFooterText,
  ctaLabel = "Explore DGlide For You",
  mobileCtaLabel,
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
              <span className={mobileFooterText ? "sol-copy-desktop" : ""}>{footerText}</span>
              {mobileFooterText ? <span className="sol-copy-mobile">{mobileFooterText}</span> : null}
            </p>
            <SolutionsButton
              variant="get-started-now"
              onClick={() => scrollToContact(router)}
            >
              <span className={mobileCtaLabel ? "sol-copy-desktop" : ""}>{ctaLabel}</span>
              {mobileCtaLabel ? <span className="sol-copy-mobile">{mobileCtaLabel}</span> : null}
            </SolutionsButton>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default FieldServiceProblemSection;
