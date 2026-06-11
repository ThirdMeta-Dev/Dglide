"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import { scrollToContact } from "@/lib/scroll-to-contact";
import SolutionsButton from "@/components/solutions/shared/SolutionsButton";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";

const PlatformOrbitCTA: FunctionComponent = () => {
  const router = useRouter();

  return (
    <section className="bg-[var(--sol-white)] py-10">
      <SolutionsContainer className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <p className="max-w-xl text-[17px] font-medium leading-relaxed text-[var(--sol-text)]">
          Every workflow can be configured around how your service team actually
          operates.
        </p>
        <SolutionsButton onClick={() => scrollToContact(router)}>
          Get Started Now
        </SolutionsButton>
      </SolutionsContainer>
    </section>
  );
};

export default PlatformOrbitCTA;
