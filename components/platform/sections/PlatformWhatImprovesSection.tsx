import { FunctionComponent } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/animations/MotionPrimitives";

const CARDS = [
  {
    title: "Workflow Visibility",
    description:
      "See every job, request, and exception live, so nothing moves without you knowing.",
    icon: "/platform/what-improves/workflow-visibility.png",
  },
  {
    title: "Cross-Team Coordination",
    description:
      "Service, sales, and operations work off one system, so handoffs stop falling through the gaps.",
    icon: "/platform/what-improves/cross-team-coordination.png",
  },
  {
    title: "Execution Control",
    description:
      "Work moves through clear stages and owners, so things get done instead of stalling.",
    icon: "/platform/what-improves/execution-control.png",
  },
  {
    title: "Faster Go-Live",
    description:
      "Start on a working system and go live in weeks, not a multi-quarter build.",
    icon: "/platform/what-improves/faster-go-live.png",
  },
  {
    title: "Lower Software Burden",
    description:
      "Get custom-level operations without a dev team, a backlog, or software to maintain.",
    icon: "/platform/what-improves/lower-software-burden.png",
  },
  {
    title: "Change Without Rebuilds",
    description:
      "When your process changes, the system is reconfigured to match, with no rebuild.",
    icon: "/platform/what-improves/change-without-rebuilds.png",
  },
];

const PlatformWhatImprovesSection: FunctionComponent = () => (
  <section className="sol-section sol-plat-what-improves-section">
    <SolutionsContainer>
      <ScrollReveal direction="up">
        <header className="sol-plat-what-improves-header">
          <h2 className="sol-plat-what-improves-heading">
            What the Platform Helps You Improve
          </h2>
          <p className="sol-plat-what-improves-desc">
            Real, daily improvements across how your operation runs, not just another tool to manage.
          </p>
        </header>
      </ScrollReveal>

      <div className="sol-plat-what-improves-grid-wrap">
        {/* Radial gradient glow at the center cross of the 6-card grid */}
        <div className="sol-plat-what-improves-glow" aria-hidden />

        <StaggerReveal className="sol-plat-what-improves-grid">
        {CARDS.map((card) => (
          <StaggerItem key={card.title}>
          <article className="sol-plat-what-improves-card">
            <Image
              src={card.icon}
              alt=""
              width={73}
              height={40}
              className="sol-plat-what-improves-icon"
              aria-hidden
            />
            <div>
              <h3 className="sol-plat-what-improves-card-title">{card.title}</h3>
              <p className="sol-plat-what-improves-card-desc">{card.description}</p>
            </div>
          </article>
          </StaggerItem>
        ))}
        </StaggerReveal>
      </div>
    </SolutionsContainer>
  </section>
);

export default PlatformWhatImprovesSection;
