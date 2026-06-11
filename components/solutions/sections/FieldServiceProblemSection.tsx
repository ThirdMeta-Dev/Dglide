"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { problemCards } from "@/data/solutionsPageData";

const ProblemCard: FunctionComponent<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <article className="sol-problem-card">
    <div className="sol-problem-card-inner">
      <img
        src="/solutions/orange-bg.svg"
        alt=""
        className="sol-problem-card-icon"
        width={48}
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

const FieldServiceProblemSection: FunctionComponent = () => {
  const router = useRouter();

  return (
    <section id="field-service-problem" className="sol-section sol-problem-section">
      <SolutionsContainer>
        <h2 className="sol-problem-heading">
          Most Businesses Don&apos;t Lack Software. They Lack Fit.
        </h2>
        <p className="sol-problem-description">
          Lorem ipsim is simply model is not one product. It is a connected
        </p>

        <div className="sol-problem-body">
          <div className="sol-problem-grid">
            <div className="sol-problem-grid-row">
              {problemCards.slice(0, 3).map((card) => (
                <ProblemCard key={card.title} {...card} />
              ))}
            </div>
            <div className="sol-problem-grid-row">
              {problemCards.slice(3).map((card) => (
                <ProblemCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          <div className="sol-problem-footer">
            <p className="sol-problem-footer-text">
              Your service team is not the problem. The lack of a structured
              service system is.
            </p>
            <SolutionsButton
              variant="get-started-now"
              onClick={() => scrollToContact(router)}
            >
              Get Started Now
            </SolutionsButton>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default FieldServiceProblemSection;
