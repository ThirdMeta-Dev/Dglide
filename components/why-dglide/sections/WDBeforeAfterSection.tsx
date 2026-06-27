import Image from "next/image";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const HEADING = "Before and After DGlide";
const SUBTITLE =
  "Same team, same workload, a completely different operation. Here's what changes once the work runs on one structured system.";
const QUOTE =
  '"We went from responding in 40-plus minutes to under 8, and captured 3X more leads."';

const BEFORE = {
  icon: "/why-dglide/before-after/before-card-icon.svg",
  title: "Before Dglide",
  description:
    "Work runs on memory, phone calls, and scattered tools. Nothing connects, and nobody has the full picture.",
  bullet: "/why-dglide/before-after/bullet-arrow-before.svg",
  bullets: [
    { text: "Requests scattered across calls, chats, and inboxes", offset: 8 },
    { text: "Technicians assigned by hand, not by logic", offset: 6 },
    { text: "No live view of what's happening in the field", offset: 6 },
    { text: "SLA breaches noticed only after customers complain", offset: 8 },
  ],
};

const AFTER = {
  icon: "/why-dglide/before-after/after-card-icon.svg",
  title: "After DGlide",
  description:
    "One connected system runs the operation. Work is structured, visible, and moving without constant chasing.",
  bullet: "/why-dglide/before-after/bullet-arrow-after.svg",
  bullets: [
    { text: "Every request captured in one place", offset: 6 },
    { text: "Jobs auto-assigned by skill, location, and load", offset: 6 },
    { text: "Real-time visibility across every job", offset: 6 },
    { text: "SLAs tracked and escalated before they breach", offset: 8 },
  ],
};

function BulletRow({
  icon,
  text,
  offset,
  light,
}: {
  icon: string;
  text: string;
  offset: number;
  light: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Image
        src={icon}
        alt=""
        width={21}
        height={11}
        className="w-[21px] h-auto shrink-0"
        style={{ marginTop: offset }}
      />
      <p
        className={`text-[15px] font-medium leading-6 ${
          light ? "text-white" : "text-black"
        }`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {text}
      </p>
    </div>
  );
}

export default function WDBeforeAfterSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-12 lg:gap-20">
          {/* Heading block */}
          <ScrollReveal direction="up">
          <div className="flex flex-col gap-3">
            <h2
              className="w-full text-[36px] leading-[44px] md:text-[48px] md:leading-[58px]"
              style={{
                fontFamily: "var(--font-tasa-orbiter)",
                fontWeight: 400,
                background: "linear-gradient(90deg, #FF7F1C 0%, #000000 36.41%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {HEADING}
            </h2>
            <p
              className="max-w-[766px] text-base leading-[27px] tracking-[0.2px] text-[#6F7276]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {SUBTITLE}
            </p>
          </div>
          </ScrollReveal>

          {/* Quote + comparison cards */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            {/* Pull-quote */}
            <div className="w-full shrink-0 lg:w-[175px] lg:pt-7">
              <p
                className="text-base italic leading-[25px] text-[#FF7F1C]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {QUOTE}
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              {/* Before card */}
              <ScrollReveal direction="left" className="flex-1">
              <div
                className="flex-1 rounded-2xl border border-white px-4 md:px-8 pt-[31px] pb-8"
                style={{
                  background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
                }}
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-8">
                    <Image
                      src={BEFORE.icon}
                      alt=""
                      width={88}
                      height={48}
                      className="h-12 w-[88px]"
                    />
                    <div className="flex flex-col gap-3">
                      <h3
                        className="text-2xl leading-9 text-white"
                        style={{
                          fontFamily: "var(--font-tasa-orbiter)",
                          fontWeight: 600,
                        }}
                      >
                        {BEFORE.title}
                      </h3>
                      <p
                        className="text-[15px] leading-6 tracking-[0.2px] text-white"
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {BEFORE.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {BEFORE.bullets.map((b) => (
                      <BulletRow
                        key={b.text}
                        icon={BEFORE.bullet}
                        text={b.text}
                        offset={b.offset}
                        light
                      />
                    ))}
                  </div>
                </div>
              </div>
              </ScrollReveal>

              {/* After card */}
              <ScrollReveal direction="right" className="flex-1">
              <div
                className="flex-1 rounded-2xl border border-white px-4 md:px-8 pt-[30px] pb-[57px]"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
                }}
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-8">
                    <Image
                      src={AFTER.icon}
                      alt=""
                      width={88}
                      height={48}
                      className="h-12 w-[88px]"
                    />
                    <div className="flex flex-col gap-3">
                      <h3
                        className="text-2xl leading-9 text-black"
                        style={{
                          fontFamily: "var(--font-tasa-orbiter)",
                          fontWeight: 600,
                        }}
                      >
                        {AFTER.title}
                      </h3>
                      <p
                        className="text-[15px] leading-6 tracking-[0.2px] text-[#555555]"
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {AFTER.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {AFTER.bullets.map((b) => (
                      <BulletRow
                        key={b.text}
                        icon={AFTER.bullet}
                        text={b.text}
                        offset={b.offset}
                        light={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
