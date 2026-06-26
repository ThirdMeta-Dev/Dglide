import Image from "next/image";

const STEP_DEFAULTS = [
  {
    icon: "/why-dglide/problem-to-system/step-real-workflow.svg",
    title: "Start With Your Real Workflow",
    desc: "DGlide maps how your operation actually runs today, before any software is touched.",
    // Figma: x=632 w=520 y=40 (rel card offsets vs right column origin 506,40)
    pos: "lg:top-0 lg:w-[520px]",
  },
  {
    icon: "/why-dglide/problem-to-system/step-ready-system.svg",
    title: "Configure a Ready System",
    desc: "DGlide shapes a ready-to-run system to your process. You're not building from a blank canvas.",
    pos: "lg:top-[120px] lg:w-[555px]",
  },
  {
    icon: "/why-dglide/problem-to-system/step-go-live.svg",
    title: "Go Live in Weeks",
    desc: "You start running on a working operational system fast, not after a long build project.",
    pos: "lg:top-[240px] lg:w-[582px]",
  },
  {
    icon: "/why-dglide/problem-to-system/step-adapt.svg",
    title: "Adapt as You Use It",
    desc: "As real requirements surface, the system bends to fit. No rebuild, no IT ticket backlog.",
    pos: "lg:top-[360px] lg:w-[613px]",
  },
  {
    icon: "/why-dglide/problem-to-system/step-keep-fitting.svg",
    title: "Keep Fitting as You Grow",
    desc: "Through the Living Service Model, the system stays aligned as your business changes.",
    pos: "lg:top-[480px] lg:w-[646px]",
  },
];

const DEFAULTS = {
  title: "How You Get From Problem to a System That Works",
  subtitle:
    "No blank canvas, no endless build. Here's how DGlide takes you from a messy operational problem to a working system that fits.",
};

export default function WDProblemToSystemSection({
  data,
}: {
  data?: Record<string, string>;
}) {
  const title = data?.title ?? DEFAULTS.title;
  const subtitle = data?.subtitle ?? DEFAULTS.subtitle;
  const steps = STEP_DEFAULTS.map((d, i) => ({
    ...d,
    title: data?.[`step_${i + 1}_title`] ?? d.title,
    desc: data?.[`step_${i + 1}_desc`] ?? d.desc,
  }));

  return (
    <section
      className="w-full"
      style={{
        backgroundImage: "url(/why-dglide/problem-to-system/section-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative mx-auto w-full max-w-[1200px] py-10 px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Left column */}
          <div className="flex w-full max-w-[467px] shrink-0 flex-col gap-4 lg:pt-8">
            <h2
              className="text-[32px] leading-[1.2] lg:text-[48px] lg:leading-[58px]"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000000 45.76%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h2>
            <p
              className="max-w-[415px] text-base leading-[26px] text-[#6F7276]"
              style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.2px" }}
            >
              {subtitle}
            </p>
          </div>

          {/* Right column — staircase of step cards */}
          <div className="relative flex w-full flex-col gap-4 lg:block lg:h-[616px] lg:w-[646px] lg:shrink-0">
            {steps.map((step) => (
              <div
                key={step.title}
                className={`relative flex flex-col justify-center rounded-2xl pb-8 pl-5 pr-7 pt-6 lg:absolute lg:right-0 lg:h-[136px] ${step.pos}`}
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
                  border: "1px solid #FF7F1C",
                }}
              >
                <div className="flex items-center gap-6">
                  <Image
                    src={step.icon}
                    alt=""
                    width={73}
                    height={40}
                    className="h-10 w-[73px] shrink-0 object-contain"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3
                      className="text-lg leading-[26px] text-black"
                      style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 500 }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[15px] leading-[25px] text-[#555555]"
                      style={{ fontFamily: "var(--font-inter)", letterSpacing: "0.2px" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
