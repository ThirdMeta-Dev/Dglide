import Image from "next/image";
import Link from "next/link";

const CARDS = [
  {
    image: "/about/same-problem/card-rigid-tools.png",
    title: "Rigid Tools",
    body: "Quick to buy, but you bend your process to fit the software instead of the other way around.",
    tag: "Constant Workarounds",
  },
  {
    image: "/about/same-problem/card-custom-builds.png",
    title: "Custom Builds",
    body: "Fits perfectly on day one, then you own the upkeep and every change slows to a crawl.",
    tag: "Velocity Decay",
  },
  {
    image: "/about/same-problem/card-heavy-suites.png",
    title: "Heavy Suites",
    body: "Does everything on paper, but it's slow, costly, and overbuilt for how you actually work.",
    tag: "Cost and Complexity",
  },
];

export default function AUSameProblemSection() {
  return (
    <section className="relative w-full overflow-hidden px-4 md:px-6">
      <div className="relative mx-auto max-w-[1200px] lg:px-12">
        {/* Decorative wave lines, bottom-left (Figma group 1118:1439) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-184px] top-[99px] hidden lg:block"
        >
          <Image
            src="/about/same-problem/bg-lines.svg"
            alt=""
            width={1248}
            height={474}
          />
        </div>

        <div className="relative flex flex-col gap-6">
          {/* Heading block */}
          <div className="flex flex-col gap-5">
            <h2
              className="bg-clip-text text-[32px] leading-[1.2] text-transparent md:text-[48px] md:leading-[58px]"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                backgroundImage:
                  "linear-gradient(to left, #000000 73%, #FF7F1C 100%)",
              }}
            >
              We Saw the Same Problem Everywhere
            </h2>
            <p
              className="max-w-[587px] text-base leading-[27px] tracking-[0.2px] text-[#6F7276]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Businesses were not failing because they lacked software. They
              were struggling because their software did not fit how their
              operations actually worked.
            </p>
          </div>

          {/* Cards + CTA bar — right-aligned 932px block on desktop */}
          <div className="aus-problem-outer flex w-full flex-col items-end gap-4">
            {/* Problem cards */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:w-[932px] lg:grid-cols-3">
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col rounded-2xl border border-white lg:h-[388px]"
                  style={{
                    background: "linear-gradient(180deg, #FFF 0%, #F6F6F6 100%)",
                  }}
                >
                  <Image
                    src={card.image}
                    alt={`${card.title} illustration`}
                    width={600}
                    height={337}
                    className="h-[169px] w-full rounded-t-2xl object-cover"
                  />
                  <div className="mt-10 flex flex-col gap-8 px-6 pb-6">
                    <div className="flex flex-col gap-1.5">
                      <h3
                        className="text-lg leading-[26px] text-black"
                        style={{
                          fontFamily: "var(--font-tasa-orbiter)",
                          fontWeight: 500,
                        }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="text-[15px] leading-6 tracking-[0.2px] text-[#555555]"
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {card.body}
                      </p>
                    </div>
                    {/* Problem tag */}
                    <div className="inline-flex w-fit items-center gap-2 rounded-[40px]">
                      <span className="h-[11px] w-0.5 shrink-0 bg-black" />
                      <span
                        className="whitespace-nowrap text-[15px] font-light leading-[18.9px] text-black"
                        style={{
                          fontFamily: "var(--font-sora), Sora, sans-serif",
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA bar */}
            <div
              className="flex w-full flex-col gap-6 rounded-2xl px-7 py-6 lg:h-[110px] lg:w-[932px] lg:flex-row lg:items-center lg:justify-between lg:py-6 lg:pl-10 lg:pr-5"
              style={{
                background: "linear-gradient(to left, #F3F3F3 0%, #F6D9C3 100%)",
              }}
            >
              <div className="flex max-w-[451px] flex-col gap-0.5">
                <p
                  className="text-2xl leading-[34px] text-black"
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    fontWeight: 400,
                  }}
                >
                  DGlide was built to create a better path
                </p>
                <p
                  className="text-[15px] leading-[26px] text-[#555555]"
                  style={{
                    fontFamily: "var(--font-tasa-orbiter)",
                    fontWeight: 400,
                  }}
                >
                  A working system from day one that keeps adapting as you grow.
                </p>
              </div>
              <Link
                href="/platform"
                className="inline-flex h-12 w-fit shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-8 text-base font-semibold leading-[20px] text-white transition-opacity hover:opacity-90"
                style={{
                  fontFamily: "var(--font-sora), Sora, sans-serif",
                  background:
                    "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
                }}
              >
                Explore Features
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M2.5 9h13M10.5 4l5 5-5 5"
                    stroke="#FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
