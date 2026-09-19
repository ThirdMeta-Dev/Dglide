import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";
import processLines from "@/components/homepage-assets/keep-process-lines.svg";

type KeepYourProcessSectionProps = {
  titleLines?: [string, string];
  description?: string;
  ctaLabel?: string;
};

export default function KeepYourProcessSection({
  titleLines = ["Keep Your Process.", "Change The Software Instead."],
  description = "In One Demo We'll Map DGlide To A Workflow Your Team Runs Today. If It Doesn't Fit, You'll Know In 30 Minutes — Not 6 Months Into A Rollout.",
  ctaLabel = "Book a Demo",
}: KeepYourProcessSectionProps) {
  return (
    <section className="w-full bg-[#F3F3F3] px-6 py-16 md:px-10 lg:px-16 lg:py-20">
      <ScrollReveal direction="up">
        <div className="relative mx-auto min-h-[276px] max-w-[1168px] overflow-hidden rounded-[30px] border border-white bg-gradient-to-b from-[#1C2BFF] to-[#141FB5] px-7 py-10 md:px-11 md:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute flex items-center justify-center"
            style={{
              inset: "calc(-6.88% - 1.14px) calc(-27.59% - 1.55px) calc(-145.01% - 3.9px) calc(-29.28% - 1.59px)",
            }}
          >
            <div className="relative h-full w-full -scale-x-100">
              <Image src={processLines} alt="" fill className="object-fill" />
            </div>
          </div>

          <div className="relative z-10 flex min-h-[178px] flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-[60px]">
            <div className="flex min-w-0 flex-col gap-3">
              <h2
                className="max-w-full bg-clip-text text-[36px] font-medium leading-[1.2] text-transparent md:w-[883px] md:max-w-none md:text-[48px] md:leading-[60px]"
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  backgroundImage: "linear-gradient(90deg, #FF7F1C 0%, #FFFFFF 8.469%)",
                }}
              >
                {titleLines[0]}
                <br />
                {titleLines[1]}
              </h2>
              <p className="max-w-full text-[16px] font-normal leading-6 tracking-[0.2px] text-white md:w-[754px] md:max-w-none md:text-[17px]">
                {description}
              </p>
            </div>

            <Link
              href="/schedule-demo"
              className="dg-btn-outline inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#1C2BFF] bg-white px-8 py-3.5 text-base font-normal text-[#1C2BFF] transition-colors hover:bg-[#1C2BFF]/5 lg:self-auto"
              style={{ fontFamily: "var(--font-sora), sans-serif" }}
            >
              {ctaLabel}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="#1C2BFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
