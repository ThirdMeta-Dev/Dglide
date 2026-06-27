"use client";

import { Fragment, FunctionComponent, useState } from "react";
import Image from "next/image";
import SolutionsContainer from "@/components/solutions/shared/SolutionsContainer";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

const FIT_ITEMS = [
  { label: "Service desk and support teams" },
  { label: "Internal IT and helpdesk" },
  { label: "HR, admin, and finance approvals" },
  { label: "Teams outgrowing rigid ticketing tools" },
  { label: "Requests that span more than one department" },
];

const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden>
    <path d="M4.92601 6.82587L9.4923 9.1091L18.6249 4.54263L22.2779 6.36922L9.4923 12.7623L1.27297 8.65245L4.92601 6.82587Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.5036L9.4923 8.78683L18.6249 4.22037L22.2779 6.04695L9.4923 12.44L1.27297 8.33019L4.92601 6.5036Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 6.18121L9.4923 8.46445L18.6249 3.89798L22.2779 5.72457L9.4923 12.1176L1.27297 8.0078L4.92601 6.18121Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.85883L9.4923 8.14206L18.6249 3.57559L22.2779 5.40218L9.4923 11.7952L1.27297 7.68541L4.92601 5.85883Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.53522L9.4923 7.81845L18.6249 3.25198L22.2779 5.07857L9.4923 11.4716L1.27297 7.3618L4.92601 5.53522Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 5.211L9.4923 7.49423L18.6249 2.92776L22.2779 4.75435L9.4923 11.1474L1.27297 7.03759L4.92601 5.211Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.88873L9.4923 7.17197L18.6249 2.6055L22.2779 4.43209L9.4923 10.8251L1.27297 6.71532L4.92601 4.88873Z" fill="#FFF0E5" stroke="#FFF0E5" strokeWidth="1.42302" strokeLinecap="round"/>
    <path d="M4.92601 4.56647L9.4923 6.8497L18.6249 2.28323L22.2779 4.10982L9.4923 10.5029L1.27297 6.39305L4.92601 4.56647Z" fill="white" stroke="#FF7F1C" strokeWidth="1.18585" strokeLinecap="round"/>
  </svg>
);

const INDUSTRY_ITEMS = [
  {
    icon: "/solutions/built-for/card-customer-support.svg",
    title: "Customer Support & Service Desks",
    description:
      "Requests, tickets, and escalations pile up across channels. DGlide gives every request one structured path, with SLA tracking and clean handoffs.",
  },
  {
    icon: "/solutions/built-for/card-internal-it.svg",
    title: "Internal IT & Helpdesk",
    description:
      "Employee requests, incidents, and a service catalog need structure without enterprise ITIL weight. DGlide runs IT service workflows configured to how your team actually works.",
  },
  {
    icon: "/solutions/built-for/card-internal-ops.svg",
    title: "Internal Operations Teams",
    description:
      "HR, admin, and finance run on requests and approvals trapped in email. DGlide turns them into tracked workflows with clear ownership and timelines.",
  },
  {
    icon: "/solutions/built-for/card-hybrid-ops.svg",
    title: "Hybrid Service + Ops Teams",
    description:
      "When a ticket has to trigger work in another team, ticketing tools stop. DGlide carries the request across departments all the way to closure.",
  },
];

type BuiltForSectionProps = {
  heading?: string;
  description?: string;
  fitItems?: { label: string }[];
  industryItems?: { icon: string; title: string; description: string }[];
  centerImage?: string;
};

const BuiltForSection: FunctionComponent<BuiltForSectionProps> = ({
  heading = "Service Breaks When Workflows Outgrow the Ticketing Tool",
  description = "DGlide ITSM fits service and internal teams that have outgrown rigid ticketing and manual approvals.",
  fitItems = FIT_ITEMS,
  industryItems = INDUSTRY_ITEMS,
  centerImage = "/solutions/built-for/center-illustration.png",
}) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id="who-built-for" className="sol-section sol-built-for-section">
      <SolutionsContainer>
        <div className="sol-built-for-inner">
          <ScrollReveal direction="up">
            <header className="sol-built-for-header">
              <h2 className="sol-built-for-heading">
                {heading}
              </h2>
              <p className="sol-built-for-description">
                {description}
              </p>
            </header>
          </ScrollReveal>

          <div className="sol-built-for-panel">
            <div className="sol-built-for-row">
              {/* Left — Best Fit For card */}
              <ScrollReveal direction="left">
                <article className="sol-built-for-fit-card">
                  <div className="sol-built-for-fit-body">
                    <h3 className="sol-built-for-fit-heading">Best Fit For</h3>
                    <ul className="sol-built-for-fit-list">
                      {fitItems.map((item) => (
                        <li key={item.label} className="sol-built-for-fit-item">
                          <span className="sol-built-for-fit-icon-wrap">
                            <TickIcon />
                          </span>
                          <span className="sol-built-for-fit-text">{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>

              <div className="sol-built-for-columns">
                {/* Center — illustration */}
                <div className="sol-built-for-media">
                  <Image
                    src={centerImage}
                    alt="DGlide service management illustration"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority={false}
                  />
                </div>

                {/* Right — accordion industry cards */}
                <ScrollReveal direction="right">
                  <div className="sol-built-for-industries">
                    <div className="sol-built-for-industries-list">
                      {industryItems.map((item, index) => {
                        const isExpanded = activeIndex === index;

                        return (
                          <Fragment key={item.title}>
                            {index > 0 &&
                              (isExpanded ? (
                                <div className="sol-built-for-active-bar" aria-hidden>
                                  <span className="sol-built-for-active-bar-fill" />
                                </div>
                              ) : (
                                <hr className="sol-built-for-divider" />
                              ))}

                            {isExpanded ? (
                              <div className="sol-built-for-industry-expanded">
                                <div className="sol-built-for-industry-expanded-inner">
                                  <div className="sol-built-for-industry-row">
                                    <img
                                      src={item.icon}
                                      alt=""
                                      className="sol-built-for-industry-icon"
                                      width={73}
                                      height={40}
                                      aria-hidden
                                    />
                                    <h4 className="sol-built-for-industry-title sol-built-for-industry-title--active">
                                      {item.title}
                                    </h4>
                                  </div>
                                  <p className="sol-built-for-industry-description">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="sol-built-for-industry-trigger"
                                aria-expanded={false}
                                onClick={() => setActiveIndex(index)}
                              >
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="sol-built-for-industry-icon"
                                  width={36}
                                  height={36}
                                  aria-hidden
                                />
                                <span className="sol-built-for-industry-title">
                                  {item.title}
                                </span>
                              </button>
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </SolutionsContainer>
    </section>
  );
};

export default BuiltForSection;
