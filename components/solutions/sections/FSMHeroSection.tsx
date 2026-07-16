"use client";

import { FunctionComponent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const DEFAULT_BULLETS = [
  "Tickets, approvals, and SLAs in one connected flow",
  "Built for IT, support, and internal ops teams",
  "Configurable workflows without a custom build",
];

type FSMHeroSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  bullets?: string[];
  primaryCta?: string;
  secondaryCta?: string;
  /* When set, the secondary button scrolls to this element id instead of the contact form */
  secondaryScrollTargetId?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  actionsInline?: boolean;
  compactTop?: boolean;
};

const FSMHeroSection: FunctionComponent<FSMHeroSectionProps> = ({
  eyebrow = "IT & Service Management",
  heading = "Service Management That Fits Your Workflows, Not Just Your Tickets",
  description = "DGlide ITSM helps service, IT, and internal teams run requests, approvals, SLAs, and resolution in one configurable system.",
  bullets = DEFAULT_BULLETS,
  primaryCta = "Book a Demo",
  secondaryCta = "ITSM Capabilities",
  secondaryScrollTargetId,
  imageSrc = "/solutions/itsm-hero-illustration.png",
  imageAlt = "DGlide service management dashboard",
  imageClassName = "",
  actionsInline = false,
  compactTop = false,
}) => {
  const router = useRouter();

  const actionButtons = (
    <div className="sol-hero-actions">
      <SolutionsButton
        variant="book-demo"
        onClick={() => scrollToContact(router)}
      >
        {primaryCta}
      </SolutionsButton>
      <SolutionsButton
        variant="outline"
        onClick={() => {
          if (secondaryScrollTargetId) {
            document.getElementById(secondaryScrollTargetId)?.scrollIntoView({ behavior: "smooth" });
          } else {
            scrollToContact(router);
          }
        }}
      >
        {secondaryCta}
      </SolutionsButton>
    </div>
  );

  return (
    <section className={`dg-hero-outer relative overflow-x-clip bg-[var(--sol-bg)] pb-0 ${compactTop ? "pt-12 lg:pt-10" : "pt-28 lg:pt-20"}`}>
      <SolutionsContainer className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div className="space-y-6 lg:space-y-7">
            <ScrollReveal direction="up" delay={0}>
              <div className="sol-hero-eyebrow">
                <span className="sol-hero-eyebrow-bar" aria-hidden />
                <span className="sol-hero-eyebrow-text">{eyebrow}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08}>
              <h1 className="sol-hero-heading">{heading}</h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.16}>
              <p className="sol-hero-description">{description}</p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <ul className="mt-6 space-y-3.5">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <img
                      src="/solutions/hero-tick.svg"
                      alt=""
                      width={24}
                      height={14}
                      className="mt-1 shrink-0"
                      loading="lazy"
                    />
                    <span className="text-[15px] leading-snug text-[var(--sol-text-body)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {actionsInline && (
              <ScrollReveal direction="up" delay={0.24}>
                <div className="pt-2">{actionButtons}</div>
              </ScrollReveal>
            )}
          </div>

          {/* Right column — hero illustration */}
          <ScrollReveal direction="right" delay={0.1} className="flex justify-center lg:justify-end">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1024}
              height={732}
              className={`w-full max-w-[560px] h-auto object-contain${imageClassName ? ` ${imageClassName}` : ""}`}
              priority
            />
          </ScrollReveal>
        </div>
      </SolutionsContainer>

      {!actionsInline && (
        <div className="relative z-10 mt-10 pb-14 pt-8 lg:mt-14 lg:pb-16">
          <SolutionsContainer>
            <ScrollReveal direction="up" delay={0.24}>
              {actionButtons}
            </ScrollReveal>
          </SolutionsContainer>
        </div>
      )}
    </section>
  );
};

export default FSMHeroSection;
