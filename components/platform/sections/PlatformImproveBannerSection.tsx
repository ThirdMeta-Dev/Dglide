"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import {
  platformImproveBannerCta,
  platformImproveBannerText,
} from "@/data/platformPageData";

const PlatformImproveBannerSection: FunctionComponent = () => {
  const router = useRouter();

  return (
    <section className="sol-section">
      <SolutionsContainer>
        <div className="sol-plat-improve-banner">
          <p className="sol-plat-improve-banner-text">{platformImproveBannerText}</p>
          <SolutionsButton
            variant="book-demo"
            onClick={() => router.push("/coming-soon")}
          >
            {platformImproveBannerCta}
          </SolutionsButton>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformImproveBannerSection;
