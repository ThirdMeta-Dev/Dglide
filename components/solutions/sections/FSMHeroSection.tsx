"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { heroBullets } from "@/data/solutionsPageData";

type FSMHeroSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  bullets?: string[];
  primaryCta?: string;
  secondaryCta?: string;
};

const FSMHeroSection: FunctionComponent<FSMHeroSectionProps> = ({
  eyebrow = "Get Started Now",
  heading = "Field Service That Fits Your Real Operations",
  description = "Dglide FSM helps service-heavy businesses manage requests, work orders, technician scheduling, field execution",
  bullets = heroBullets,
  primaryCta = "Book a Demo",
  secondaryCta = "See FSM Workflow",
}) => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[var(--sol-bg)] pb-0 pt-16 lg:pt-20">
      <SolutionsContainer className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 lg:space-y-7">
            <div className="sol-hero-eyebrow">
              <span className="sol-hero-eyebrow-bar" aria-hidden />
              <span className="sol-hero-eyebrow-text">{eyebrow}</span>
            </div>

            <h1 className="sol-hero-heading">{heading}</h1>

            <p className="sol-hero-description">{description}</p>

            <ul className="space-y-3.5">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <img
                    src="/solutions/section-1-icon.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="mt-0.5 shrink-0"
                    loading="lazy"
                  />
                  <span className="text-[15px] leading-snug text-[var(--sol-text-body)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div
              className="aspect-[4/3] w-full max-w-[560px] rounded-[var(--sol-card-radius)] bg-[#EEEEEE]"
              aria-hidden
            />
          </div>
        </div>
      </SolutionsContainer>

      <div className="relative z-10 mt-10 pb-14 pt-8 lg:mt-14 lg:pb-16">
        <SolutionsContainer>
          <div className="sol-hero-actions">
            <SolutionsButton
              variant="book-demo"
              onClick={() => scrollToContact(router)}
            >
              {primaryCta}
            </SolutionsButton>
            <SolutionsButton
              variant="outline"
              onClick={() => scrollToContact(router)}
            >
              {secondaryCta}
            </SolutionsButton>
          </div>
        </SolutionsContainer>
      </div>
    </section>
  );
};

export default FSMHeroSection;
