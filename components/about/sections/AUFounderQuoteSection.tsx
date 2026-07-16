import Image from "next/image";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

type FounderQuote = {
  paragraphs: string[];
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

const SAMIR_QUOTE: FounderQuote = {
  paragraphs: [
    "“We built DGlide because we kept seeing businesses struggle with the same problem. Their operations were growing, but their software could not keep up. Standard tools forced compromise.",
    "DGlide was created to give businesses a practical middle path: systems that start fast, fit real workflows, and continue adapting after go-live.”",
  ],
  name: "Mr Samir",
  role: "Customer Success",
  image: "/about/founder-quote/mr-samir.png",
  imageAlt: "Mr Samir",
  imageWidth: 736,
  imageHeight: 920,
};

const ANURAG_QUOTE: FounderQuote = {
  paragraphs: [
    "Every conversation with a customer reinforced one belief: businesses don't need more software—they need clarity. I kept seeing teams juggling spreadsheets, disconnected systems, endless follow-ups, and decisions delayed because the right information wasn't available at the right time.",
    "That's why we built DGlide. Not to add another software platform, but to eliminate operational complexity, connect every function, and give organizations the real-time visibility they need to make confident decisions. Because when businesses have clarity, they move faster, serve better, and grow stronger.”",
  ],
  name: "Anurag Mishra",
  role: "Co-Founder, DGlide",
  image: "/about/founder-quote/anurag-mishra.jpeg",
  imageAlt: "Anurag Mishra",
  imageWidth: 1086,
  imageHeight: 1448,
};

function FounderQuoteCard({ quote, reverse = false }: { quote: FounderQuote; reverse?: boolean }) {
  return (
    <article className="relative w-full overflow-hidden rounded-[16px] bg-white/45 backdrop-blur-[15px]">
      <Image
        aria-hidden
        src="/about/founder-quote/orange-glow.svg"
        alt=""
        width={876}
        height={282}
        className={`pointer-events-none absolute -top-[185px] h-[282px] w-[876px] max-w-none -rotate-[15deg] opacity-[0.18] ${
          reverse ? "-left-[410px]" : "-right-[410px]"
        }`}
      />

      <div
        className={`relative flex flex-col items-center gap-8 lg:min-h-[460px] lg:gap-16 ${
          reverse ? "lg:flex-row-reverse lg:items-stretch lg:pl-12" : "lg:flex-row lg:pr-12"
        }`}
      >
        <ScrollReveal direction={reverse ? "right" : "left"} className="w-full shrink-0 lg:w-[368px]">
          <Image
            src={quote.image}
            alt={quote.imageAlt}
            width={quote.imageWidth}
            height={quote.imageHeight}
            className="mx-auto h-auto w-full max-w-[368px] rounded-[16px] object-cover lg:mx-0 lg:h-[460px] lg:w-[368px]"
          />
        </ScrollReveal>

        <ScrollReveal
          direction={reverse ? "left" : "right"}
          delay={0.1}
          className="w-full min-w-0 flex-1"
        >
          <div
            className={`flex w-full flex-col items-end px-5 pb-8 lg:px-0 ${
              reverse ? "gap-6 lg:py-6" : "gap-9 lg:py-7"
            }`}
          >
            <div className="flex w-full flex-col gap-[10px]">
              {quote.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 36)}
                  className="text-[18px] leading-[28px] tracking-[0.2px] text-[#414141] lg:text-[20px] lg:leading-[32px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className={`flex flex-wrap items-center gap-3 ${
                reverse ? "self-start justify-start" : "justify-end pr-0 lg:pr-11"
              }`}
            >
              <span
                className="text-[18px] leading-[25px] text-black"
                style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
              >
                {quote.name}
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
                {quote.role}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}

export default function AUFounderQuoteSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-4 md:px-8">
        <FounderQuoteCard quote={SAMIR_QUOTE} />
        <FounderQuoteCard quote={ANURAG_QUOTE} reverse />
      </div>
    </section>
  );
}
