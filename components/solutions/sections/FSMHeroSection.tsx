"use client";

import { FunctionComponent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";

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
};

const FSMHeroSection: FunctionComponent<FSMHeroSectionProps> = ({
  eyebrow = "IT & Service Management",
  heading = "Service Management That Fits Your Workflows, Not Just Your Tickets",
  description = "DGlide ITSM helps service, IT, and internal teams run requests, approvals, SLAs, and resolution in one configurable system.",
  bullets = DEFAULT_BULLETS,
  primaryCta = "Book a Demo",
  secondaryCta = "ITSM Capabilities",
}) => {
  const router = useRouter();

  return (
    <section className="relative overflow-x-clip bg-[var(--sol-bg)] pb-0 pt-16 lg:pt-20">
      <SolutionsContainer className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div className="space-y-6 lg:space-y-7">
            <div className="sol-hero-eyebrow">
              <span className="sol-hero-eyebrow-bar" aria-hidden />
              <span className="sol-hero-eyebrow-text">{eyebrow}</span>
            </div>

            <h1 className="sol-hero-heading">{heading}</h1>

            <p className="sol-hero-description">{description}</p>

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
          </div>

          {/* Right column — hero illustration */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/solutions/itsm-hero-illustration.png"
              alt="DGlide ITSM — service management dashboard"
              width={1024}
              height={732}
              className="w-full max-w-[560px] h-auto object-contain"
              priority
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
