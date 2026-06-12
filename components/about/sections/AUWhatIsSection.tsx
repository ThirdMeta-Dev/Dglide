import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Data — exact strings from Figma node 1118:1394                      */
/* ------------------------------------------------------------------ */

type Capability = {
  icon: string;
  title: string;
  desc: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: "/about/what-is/workflow-automation.png",
    title: "Workflow automation",
    desc: "Repeatable flows that move work forward without manual chasing.",
  },
  {
    icon: "/about/what-is/task-approval-flows.png",
    title: "Task and approval flows",
    desc: "Tasks and sign-offs reach the right people automatically.",
  },
  {
    icon: "/about/what-is/sla-escalation-logic.png",
    title: "SLA and escalation logic",
    desc: "Deadlines tracked and escalated before commitments slip.",
  },
  {
    icon: "/about/what-is/real-time-visibility.png",
    title: "Real-time visibility",
    desc: "Every job, owner, and status is visible in one place.",
  },
];

export default function AUWhatIsSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col items-center gap-12 lg:gap-[60px]">
        {/* ---------- Intro: heading + paragraphs ---------- */}
        <div className="flex flex-col items-center gap-6 max-w-[870px]">
          <h2
            className="text-center text-[36px] leading-[44px] md:text-[48px] md:leading-[58px] font-normal"
            style={{
              fontFamily: "var(--font-tasa-orbiter)",
              background: "linear-gradient(0deg, #000000 0%, #FF7F1C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            What Is DGlide?
          </h2>
          <div className="flex flex-col gap-1.5 max-w-[754px]">
            {/* Figma applies textCase: TITLE to this paragraph */}
            <p
              className="text-center capitalize text-[#6F7276] text-[16px] leading-[28px] tracking-[0.2px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              DGlide helps operationally complex businesses deploy ready-to-run
              systems that adapt to their real workflows.
            </p>
            <p
              className="text-center text-[#6F7276] text-[16px] leading-[28px] tracking-[0.2px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              From field service and CRM to ITSM, field sales, and process
              management, every DGlide solution runs on one configurable
              operations backbone.
            </p>
          </div>
        </div>

        {/* ---------- Capabilities row ---------- */}
        <div className="w-full max-w-[1104px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-12">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col items-center gap-7 lg:w-[240px]"
            >
              <Image
                src={cap.icon}
                alt=""
                width={88}
                height={48}
                className="w-[88px] h-[48px] flex-shrink-0"
              />
              <div className="flex flex-col items-center gap-2 w-full max-w-[240px]">
                <h3
                  className="text-center text-black text-[17px] leading-[25px] font-normal"
                  style={{ fontFamily: "var(--font-tasa-orbiter)" }}
                >
                  {cap.title}
                </h3>
                <p
                  className="text-center text-[#555555] text-[15px] leading-[24px] tracking-[0.2px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
