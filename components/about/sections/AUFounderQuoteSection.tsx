import Image from "next/image";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

/* ------------------------------------------------------------------ */
/* Founder quote — exact strings from Figma node 1118:2036             */
/* ------------------------------------------------------------------ */

const QUOTE_PARAGRAPHS = [
  "“We built DGlide because we kept seeing businesses struggle with the same problem. Their operations were growing, but their software could not keep up. Standard tools forced compromise.",
  "DGlide was created to give businesses a practical middle path: systems that start fast, fit real workflows, and continue adapting after go-live.”",
];

export default function AUFounderQuoteSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Card — rounded, clipped, backdrop blur 30, orange glow inside */}
        <div className="relative w-full overflow-hidden rounded-[16px] backdrop-blur-[30px]">
          {/* Blurred orange glow (Vector 6802): pill 876x282, blur 90, -15deg */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-60px] top-[-40px] h-[180px] w-[320px] rounded-full bg-[#FF7F1C] blur-[70px] -rotate-[15deg] lg:right-auto lg:left-[842px] lg:top-[-77px] lg:h-[282px] lg:w-[876px] lg:blur-[90px]"
          />

          {/* Content row: photo + quote */}
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-end gap-8 lg:gap-16 lg:pr-12 lg:h-[460px]">
            {/* Founder photo */}
            <ScrollReveal direction="left" className="shrink-0">
              <Image
                src="/about/founder-quote/mr-samir.png"
                alt="Mr Samir"
                width={736}
                height={920}
                className="w-full max-w-[368px] mx-auto lg:mx-0 lg:w-[368px] lg:h-[460px] shrink-0 rounded-[16px] object-cover"
              />
            </ScrollReveal>

            {/* Quote column */}
            <ScrollReveal direction="right" delay={0.1} className="w-full lg:w-[656px]">
            <div className="flex w-full lg:w-[656px] flex-col items-end gap-9 px-5 pb-3 lg:px-0 lg:py-7">
              {/* Quote paragraphs */}
              <div className="flex w-full flex-col gap-[10px]">
                {QUOTE_PARAGRAPHS.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="text-[18px] leading-[28px] lg:text-[20px] lg:leading-[32px] tracking-[0.2px] text-[#414141]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-3 pr-0 lg:pr-11">
                <span
                  className="text-[18px] leading-[25px] text-black"
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    fontWeight: 500,
                  }}
                >
                  Mr Samir
                </span>
                <span
                  className="text-[10px] leading-[25px] tracking-[0.2px] text-[#555555]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  |
                </span>
                <span
                  className="text-[16px] leading-[25px] tracking-[0.2px] text-[#555555]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Customer Success
                </span>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
