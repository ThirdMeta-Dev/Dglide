import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const CARDS_ROW_1 = [
  {
    icon: "/why-dglide/stuck-between/icon-scattered-service-requests.png",
    title: "Scattered Service Requests",
    description:
      "Requests arrive by call, email, and WhatsApp, then slip through the cracks before anyone logs them.",
  },
  {
    icon: "/why-dglide/stuck-between/icon-manual-technician-assignment.png",
    title: "Manual Technician Assignment",
    description:
      "Someone decides who goes where by hand, every time. The right tech rarely reaches the right job.",
  },
  {
    icon: "/why-dglide/stuck-between/icon-no-real-time-field-visibility.png",
    title: "No Real-Time Field Visibility",
    description:
      "Once a technician leaves, you're blind. No live status, no idea if a job is on track.",
  },
];

const CARDS_ROW_2 = [
  {
    icon: "/why-dglide/stuck-between/icon-sla-and-escalation-gaps.png",
    title: "SLA and Escalation Gaps",
    description:
      "Deadlines slip quietly because nothing flags a breach until the customer is already complaining.",
  },
  {
    icon: "/why-dglide/stuck-between/icon-weak-closure-control.png",
    title: "Weak Closure Control",
    description:
      "Jobs get marked done with no proof, no sign-off, and no clean record of what happened.",
  },
];

function PainCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="relative z-[1] flex flex-1 flex-col justify-between gap-8 lg:gap-0 rounded-2xl border border-white p-6 lg:h-[263px]"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)" }}
    >
      <Image src={icon} alt="" width={88} height={48} className="h-12 w-[88px]" />
      <div className="flex flex-col gap-1.5">
        <h3
          className="text-base font-medium leading-[25px] text-black"
          style={{ fontFamily: "var(--font-tasa-orbiter)" }}
        >
          {title}
        </h3>
        <p className="text-[15px] leading-[25px] tracking-[0.2px] text-[#555555]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WDStuckBetweenSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:gap-12 px-6 md:px-10 lg:px-12">
        {/* Heading block */}
        <ScrollReveal direction="up">
        <div className="flex flex-col items-center gap-2">
          <h2
            className="max-w-[942px] bg-clip-text text-center text-[32px] leading-[1.2] text-transparent lg:text-[48px] lg:leading-[58px]"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              fontWeight: 400,
              backgroundImage: "linear-gradient(to top, #000000 0%, #FF7F1C 100%)",
            }}
          >
            Built for Operations Stuck Between Rigid Tools and a Custom Build
          </h2>
          <p className="max-w-[995px] text-center text-base leading-7 tracking-[0.2px] text-[#6F7276]">
            If your service operation has outgrown spreadsheets and chat, but a
            custom build feels like too much, this is the gap DGlide fills.
          </p>
        </div>
        </ScrollReveal>

        {/* Cards + bottom row */}
        <div className="relative flex flex-col gap-10">
          {/* Decorative radial glows peeking through card gaps (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[272px] top-[147px] hidden h-[171px] w-[188px] rounded-full lg:block"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[649px] top-[147px] hidden h-[171px] w-[188px] rounded-full lg:block"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #8ABFFB 0%, #F3F3F3 100%)",
            }}
          />

          {/* Card grid */}
          <div className="flex flex-col gap-4">
            <StaggerReveal className="flex flex-col gap-4 lg:flex-row">
              {CARDS_ROW_1.map((card) => (
                <StaggerItem key={card.title} className="flex-1">
                  <PainCard {...card} />
                </StaggerItem>
              ))}
            </StaggerReveal>
            <StaggerReveal className="flex flex-col gap-4 lg:flex-row">
              {CARDS_ROW_2.map((card) => (
                <StaggerItem key={card.title} className="flex-1">
                  <PainCard {...card} />
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>

          {/* Bottom row: statement + CTA */}
          <div className="relative z-[1] flex flex-col gap-6 lg:h-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p
              className="text-xl leading-[1.4] text-black lg:text-2xl lg:leading-[34px]"
              style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
            >
              Your team isn&apos;t failing. The system underneath them is missing.
            </p>
            <Link
              href="/schedule-demo"
              className="dg-btn-fill inline-flex h-12 w-fit items-center gap-2.5 rounded-full px-8 py-3.5 text-base font-semibold text-white"
              style={{
                fontFamily: "Sora, sans-serif",
                background: "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
              }}
            >
              Book A Demo
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M1 9h14M11 5l4 4-4 4"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
