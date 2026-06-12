import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Data — exact strings from Figma node 1118:1975                      */
/* ------------------------------------------------------------------ */

type Principle = {
  icon: string;
  title: string;
  body: string;
};

const TOP_ROW: Principle[] = [
  {
    icon: "/about/how-we-work/icon-fit-before-features.png",
    title: "Fit Before Features",
    body: "We start with how your operation actually runs, then decide what the system should do.",
  },
  {
    icon: "/about/how-we-work/icon-clarity-over-complexity.png",
    title: "Clarity Over Complexity",
    body: "Simple for your team to use, even when the workflow underneath is sophisticated.",
  },
  {
    icon: "/about/how-we-work/icon-adaptation-over-rigidity.png",
    title: "Adaptation Over Rigidity",
    body: "When your process changes, the system changes with it. We treat change as normal, not a problem.",
  },
];

const BOTTOM_ROW: Principle[] = [
  {
    icon: "/about/how-we-work/icon-partnership-after-go-live.png",
    title: "Partnership After Go-Live",
    body: "Go-live is the start, not the finish. We stay involved as your operation grows and shifts.",
  },
  {
    icon: "/about/how-we-work/icon-proof-before-promises.png",
    title: "Proof Before Promises",
    body: "We'd rather show the system running on your real workflow than win you over with a deck.",
  },
];

/* ------------------------------------------------------------------ */
/* Sub-pieces                                                          */
/* ------------------------------------------------------------------ */

function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <div
      className="relative z-10 h-full rounded-2xl border border-white p-6 flex flex-col justify-end"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
      }}
    >
      <div className="flex flex-col gap-8 h-full">
        <Image
          src={principle.icon}
          alt=""
          width={176}
          height={96}
          className="w-[88px] h-[48px] object-contain flex-shrink-0"
        />
        <div className="flex flex-col gap-[6px]">
          <h3
            className="text-black text-[16px] leading-[25px] font-medium"
            style={{ fontFamily: "var(--font-tasa-orbiter)" }}
          >
            {principle.title}
          </h3>
          <p
            className="text-[#555555] text-[15px] leading-[25px] tracking-[0.2px]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            {principle.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section — Figma node 1118:1975 "How We Work"                        */
/* ------------------------------------------------------------------ */

export default function AUHowWeWorkSection() {
  return (
    <section className="w-full bg-[#F3F3F3] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col items-center gap-12">
        {/* ---------- Heading + subtitle ---------- */}
        <div className="flex flex-col items-center gap-4">
          <h2
            className="text-center text-[36px] leading-[44px] md:text-[48px] md:leading-[58px]"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontWeight: 400,
              background: "linear-gradient(180deg, #FF7F1C 0%, #000 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            How We Work
          </h2>
          <p
            className="text-center text-[15px] leading-[26px] tracking-[0.2px] text-[#555555] max-w-[542px]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontWeight: 400,
            }}
          >
            The principles behind how we build, deploy, and stay with every
            customer.
          </p>
        </div>

        {/* ---------- Principle cards ---------- */}
        <div className="relative w-full flex flex-col gap-4">
          {/* Decorative radial glows (Ellipse 470 / 471) */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-[272px] top-[151px] w-[188px] h-[171px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
            }}
          />
          <div
            aria-hidden
            className="hidden lg:block absolute left-[644px] top-[151px] w-[188px] h-[171px] rounded-full opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
            }}
          />

          {/* Row 1 — three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {TOP_ROW.map((principle) => (
              <PrincipleCard key={principle.title} principle={principle} />
            ))}
          </div>

          {/* Row 2 — two wide cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {BOTTOM_ROW.map((principle) => (
              <PrincipleCard key={principle.title} principle={principle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
