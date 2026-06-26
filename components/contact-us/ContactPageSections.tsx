import Image from "next/image";
import Link from "next/link";
import {
  MotionButtonShell,
  MotionReveal,
} from "@/components/animations/MotionPrimitives";
import ContactDemoForm from "./ContactDemoForm";
import ContactFaqAccordion from "./ContactFaqAccordion";

const fontTasa = { fontFamily: "var(--font-tasa-orbiter)" };
const fontInter = { fontFamily: "var(--font-inter)" };
const fontSora = { fontFamily: "var(--font-sora)" };

const contactCards = [
  {
    icon: "/contact-us/icon-book-demo.svg",
    title: "Book a Demo",
    body: "See how DGlide fits your service, sales, process, or internal workflows.",
    cta: "Book a Demo",
    href: "#book-demo",
  },
  {
    icon: "/contact-us/icon-general-enquiry.svg",
    title: "General Enquiry",
    body: "Ask us anything about DGlide, the platform, or how it could work for you.",
    cta: "Send Enquiry",
    href: "#book-demo",
  },
  {
    icon: "/contact-us/icon-partnership.svg",
    title: "Partnership Enquiry",
    body: "Explore channel, implementation, integration, or business partnerships.",
    cta: "Partner With Us",
    href: "#partnership",
  },
  {
    icon: "/contact-us/icon-support.svg",
    title: "Existing Customer Support",
    body: "Already running DGlide? Reach the support team for help with your setup.",
    cta: "Contact Support",
    href: "mailto:support@dglide.com",
  },
  {
    icon: "/contact-us/icon-media.svg",
    title: "Media / Press",
    body: "For interviews, media requests, or company information.",
    cta: "Contact Media Team",
    href: "mailto:hello@dglide.com",
  },
  {
    icon: "/contact-us/icon-careers.svg",
    title: "Careers / Hiring",
    body: "Want to work with DGlide, or share your profile for later?",
    cta: "Reach Hiring Team",
    href: "mailto:hello@dglide.com",
  },
];

const directContacts = [
  {
    icon: "/contact-us/icon-direct-general.svg",
    title: "General Enquiries",
    value: "hello@dglide.com",
    href: "mailto:hello@dglide.com",
    body: "For company, platform, or general business questions.\nCompany, platform, or anything general.",
  },
  {
    icon: "/contact-us/icon-direct-sales.svg",
    title: "Sales / Demo Requests",
    value: "sales@dglide.com",
    href: "mailto:sales@dglide.com",
    body: "For solution questions and live product walkthroughs.\nSolution enquiries and demo requests.",
  },
  {
    icon: "/contact-us/icon-direct-support.svg",
    title: "Customer Support",
    value: "support@dglide.com",
    href: "mailto:support@dglide.com",
    body: "For existing customers who need help with DGlide.\nAlready using DGlide and need a hand? Start here.",
  },
  {
    icon: "/contact-us/icon-direct-phone.svg",
    title: "Phone",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91",
    body: "Monday to Friday, 10:00 AM to 6:00 PM IST.\nCall us, Mon-Fri, 10:00 AM to 6:00 PM IST.",
  },
];

const partnerCards = [
  {
    icon: "/contact-us/icon-tech-partner.svg",
    title: "Technology and integration partners",
    body: "Connect your product to DGlide and give shared customers one connected workflow.",
    align: "left",
  },
  {
    icon: "/contact-us/icon-channel-partner.svg",
    title: "Channel and growth partners",
    body: "Resell or refer DGlide and earn from every operation you help streamline.",
    align: "left",
  },
  {
    icon: "/contact-us/icon-implementation-partner.svg",
    title: "Implementation partners",
    body: "Configure and deploy DGlide for clients who need a system that fits their operations.",
    align: "right",
  },
];

const nextSteps = [
  {
    icon: "/contact-us/icon-step-enquiry.svg",
    title: "You Send the Enquiry",
    body: "Send it via the form, email, or phone, whatever's easiest.",
  },
  {
    icon: "/contact-us/icon-step-route.svg",
    title: "We Route It to the Right Team",
    body: "Sales, support, partnerships, media, or general business: it reaches the team that owns it.",
  },
  {
    icon: "/contact-us/icon-step-next.svg",
    title: "You hear back with a clear next step",
    body: "You get the right information or a clear action path, not a generic auto-reply.",
  },
];

const trustedLogos = [
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
];

function ArrowIcon({ color = "#1C2BFF" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h12M10 4l5 5-5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8.4" stroke="#FF7F1C" strokeWidth="1.5" />
        <path d="m7.4 11.2 2.3 2.3 4.9-5" stroke="#1C2BFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function DirectContactGlow({ id, className }: { id: string; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="188"
      height="171"
      viewBox="0 0 188 171"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
    >
      <ellipse
        cx="94"
        cy="85.5"
        rx="85.5"
        ry="94"
        transform="rotate(-90 94 85.5)"
        fill={`url(#${id})`}
        fillOpacity="0.3"
      />
      <defs>
        <radialGradient
          id={id}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(94 85.5) rotate(90) scale(94 85.5)"
        >
          <stop stopColor="#8ABFFB" />
          <stop offset="1" stopColor="#F3F3F3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function MovingNextConnector() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="808"
      height="2"
      viewBox="0 0 808 2"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-6 hidden h-0.5 w-[808px] -translate-x-1/2 md:block"
    >
      <path d="M0 1H808" stroke="#EAEAEA" />
      <path
        d="M0 1H808"
        stroke="#FF7F1C"
        strokeLinecap="round"
        strokeDasharray="170 978"
        strokeDashoffset="978"
      >
        <animate attributeName="stroke-dashoffset" values="978;-170" dur="3.2s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function GradientTitle({
  children,
  className = "",
  align = "center",
  gradient = "linear-gradient(180deg, #FF7F1C 0%, #000000 100%)",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  gradient?: string;
}) {
  return (
    <h2
      className={`m-0 w-full max-w-full whitespace-normal break-words bg-clip-text text-transparent ${className}`}
      style={{
        ...fontTasa,
        fontWeight: 400,
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textAlign: align,
      }}
    >
      {children}
    </h2>
  );
}

function BlueButton({
  href,
  children,
  invert = false,
}: {
  href: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <MotionButtonShell>
      <Link
        href={href}
        className="inline-flex h-12 w-fit items-center justify-center gap-2.5 rounded-full px-8 text-base transition-opacity hover:opacity-90"
        style={{
          ...fontSora,
          fontWeight: invert ? 400 : 600,
          color: invert ? "#1C2BFF" : "#FFFFFF",
          background: invert ? "#FFFFFF" : "linear-gradient(135deg, #1C2BFF 0%, #141FB5 100%)",
          border: invert ? "1px solid #1420B5" : "1.5px solid #1C2BFF",
        }}
      >
        {children}
        <ArrowIcon color={invert ? "#1C2BFF" : "#FFFFFF"} />
      </Link>
    </MotionButtonShell>
  );
}

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <MotionButtonShell>
      <Link href={href} className="inline-flex items-center gap-2.5 text-[15px] text-[#1C2BFF]" style={fontSora}>
        {children}
        <ArrowIcon />
      </Link>
    </MotionButtonShell>
  );
}

function ContactHeroSection() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F3F3F3 100%)" }}
    >
      <div className="mx-auto flex max-w-[1104px] flex-col items-center gap-12 px-5 py-14 lg:flex-row lg:gap-[60px] lg:px-0 lg:py-[60px]">
        <div className="flex w-full flex-col gap-12 lg:w-[532px]">
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1
                  className="m-0 bg-clip-text text-[38px] leading-[46px] text-transparent lg:text-[44px] lg:leading-[54px]"
                  style={{
                    ...fontTasa,
                    fontWeight: 400,
                    textTransform: "capitalize",
                    backgroundImage: "linear-gradient(90deg, #FF7F1C 0%, #000000 40%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Let&apos;s talk about how your operations actually run
                </h1>
                <p className="m-0 text-base leading-[160.8%] text-[#555555]" style={fontInter}>
                  Have a question, partnership enquiry, support request, or something operational? You&apos;ll reach the right DGlide team, not a generic inbox.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {["See work in real time", "Route jobs automatically", "Keep every team in sync"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-[15px] leading-6 text-[#555555]" style={fontInter}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/contact-us/hero-operations-ce8953.png"
          alt="DGlide operational workflow dashboard"
          width={512}
          height={365}
          priority
          className="h-auto w-full max-w-[512px]"
        />
      </div>
    </section>
  );
}

function ContactMethodsSection() {
  return (
    <section className="relative box-border w-full overflow-hidden bg-[#F3F3F3] px-5 py-12 lg:px-0 lg:pb-12 lg:pt-[60px]">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2">
        <Image
          src="/contact-us/contact-methods-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-fill"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] min-w-0 flex-col items-center gap-12">
        <div className="flex w-full max-w-[914px] min-w-0 flex-col items-center gap-2 text-center">
          <GradientTitle className="max-w-[calc(100vw-40px)] text-[36px] leading-[46px] lg:max-w-none lg:text-[48px] lg:leading-[58px]">
            Choose the right way to reach us
          </GradientTitle>
          <p className="m-0 max-w-full break-words text-base leading-7 tracking-[0.0125em] text-[#6F7276]" style={fontInter}>
            Every message lands with the team that owns it, so you skip the back-and-forth.
          </p>
        </div>
        <div className="grid w-full max-w-[1104px] min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="flex min-h-[232px] min-w-0 max-w-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white p-6"
              style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)" }}
            >
              <div className="flex min-w-0 flex-col gap-9">
                <Image src={card.icon} alt="" width={88} height={48} className="h-12 w-[88px]" />
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="m-0 max-w-full break-words text-xl font-medium leading-[26px] text-black" style={fontTasa}>
                    {card.title}
                  </h3>
                  <p className="m-0 max-w-full break-words text-[15px] leading-6 tracking-[0.0133em] text-[#555555]" style={fontInter}>
                    {card.body}
                  </p>
                </div>
              </div>
              <CardLink href={card.href}>{card.cta}</CardLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoSection() {
  return (
    <section id="book-demo" className="mx-auto w-full max-w-[1200px]">
      <div className="relative min-h-[707px] overflow-hidden px-5 py-8 lg:px-0">
        <div className="relative z-10 mx-auto flex max-w-[1069px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-[49px]">
          <div className="flex w-full flex-col gap-[60px] lg:w-[467px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 text-sm text-[#FF7F1C]" style={fontSora}>
                  <span className="h-[11px] w-px bg-[#FF7F1C]" />
                  Book a live DGlide walkthrough
                </div>
                <GradientTitle
                  align="left"
                  className="text-[38px] leading-[46px] lg:text-[44px] lg:leading-[54px]"
                  gradient="linear-gradient(270deg, #000000 39%, #FF7F1C 100%)"
                >
                  Tell us what&apos;s slowing you down
                </GradientTitle>
                <p className="m-0 text-base leading-[160.8%] text-[#555555]" style={fontInter}>
                  Answer a few quick questions and we&apos;ll walk you through DGlide on the workflow you actually care about.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {["See your workflow run live", "Watch jobs route themselves", "See every team in one view"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-[15px] leading-6 text-[#555555]" style={fontInter}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl p-px" style={{ background: "linear-gradient(122deg, #F6F6F6 0%, #FF7F1C 81%)" }}>
              <div className="relative flex flex-col gap-5 rounded-3xl bg-[#F4F4F4] px-5 pb-5 pt-9">
                <p className="m-0 text-sm leading-6 text-[#555555]" style={fontInter}>
                  &quot;We were spending lakhs to generate leads, then losing them because nobody saw the alert in time. DGlide closed that gap.&quot;
                </p>
                <div className="flex items-center gap-2.5">
                  <Image src="/contact-us/testimonial-avatar.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                  <span className="h-8 w-[3px] rounded bg-[#FABF5A]" />
                  <p className="m-0 text-sm leading-5 text-[#555555]" style={fontInter}>
                    <span className="font-medium text-black">Mr. Lorem ipsum</span>
                    <br />
                    <span className="font-light">Prompt Lasers, Prompt Lasers</span>
                  </p>
                </div>
                <div className="absolute bottom-5 right-5 flex gap-[5px] rounded-full bg-[#F4F4F4] px-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DADADA]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1C2BFF]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DADADA]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DADADA]" />
                </div>
              </div>
            </div>
            <div className="flex min-w-0 items-center gap-4 md:gap-7">
              <p className="m-0 w-[132px] shrink-0 text-[15px] leading-[22px] text-black md:w-[152px]" style={fontTasa}>
                Teams That Trust DGlide
              </p>
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="flex w-max gap-3" style={{ animation: "scrollLeft 24s linear infinite" }}>
                  {trustedLogos.map((src, index) => (
                    <div key={`${src}-${index}`} className="flex h-12 w-[160px] shrink-0 items-center justify-center rounded-full bg-white">
                      <Image src={src} alt="Client logo" width={160} height={48} className="h-12 w-[160px] object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full min-w-0 max-w-full rounded-2xl bg-white px-5 py-8 shadow-[0_0_12px_rgba(0,0,0,0.1)] lg:w-[571px] lg:px-10">
            <ContactDemoForm />
            <div className="mt-4 flex min-w-0 flex-wrap items-start justify-center gap-2.5 px-0 sm:flex-nowrap sm:px-4">
              <Image src="/dglide-icon-orange.png" alt="" width={24} height={24} className="mt-0.5 shrink-0" />
              <p className="m-0 min-w-0 max-w-full flex-1 basis-[220px] break-words text-center text-sm leading-[22.65px] text-black" style={fontInter}>
                Book Now, Only <strong>8 Demo Slots</strong> Left This Week!
              </p>
            </div>
            <div className="my-4 h-px bg-[#F3F3F3]" />
            <p className="m-0 text-center text-sm font-light italic leading-[20.83px] text-[#48586A]" style={fontInter}>
              All your data stays private and secure with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DirectContactSection() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] min-w-0 flex-col items-center gap-12 px-5 lg:px-0">
      <GradientTitle className="w-full max-w-[942px] text-[36px] leading-[46px] lg:text-[48px] lg:leading-[58px]">
        Prefer to reach us directly?
      </GradientTitle>
      <div className="relative w-full max-w-[1104px] min-w-0">
        <DirectContactGlow id="direct-contact-glow-1" className="left-[16%] top-[63px]" />
        <DirectContactGlow id="direct-contact-glow-2" className="left-[42%] top-[63px]" />
        <DirectContactGlow id="direct-contact-glow-3" className="right-[16%] top-[63px]" />
        <div className="relative z-10 grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {directContacts.map((item) => (
            <article
              key={item.title}
              className="flex min-h-[270px] min-w-0 max-w-full flex-col justify-between overflow-hidden rounded-2xl border border-white p-6"
              style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)" }}
            >
              <div className="flex min-w-0 flex-col gap-12">
                <Image src={item.icon} alt="" width={88} height={48} className="h-12 w-[88px]" />
                <div className="flex min-w-0 flex-col gap-5">
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="m-0 max-w-full break-words text-base font-medium leading-[25px] text-black" style={fontTasa}>
                      {item.title}
                    </h3>
                    <a href={item.href} className="max-w-full break-all text-lg leading-[26px] tracking-[0.011em] text-[#1C2BFF]" style={fontInter}>
                      {item.value}
                    </a>
                  </div>
                  <p className="m-0 max-w-full whitespace-pre-line break-words text-[15px] leading-[25px] tracking-[0.0133em] text-[#555555]" style={fontInter}>
                    {item.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExistingCustomerSection() {
  return (
    <section id="support" className="mx-auto w-full max-w-[1104px] px-5 lg:px-0">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-[60px]">
        <Image
          src="/contact-us/customer-support.png"
          alt="Customer support team"
          width={426}
          height={426}
          className="h-auto w-full max-w-[426px] rounded-[20px] border border-white object-cover shadow-[4px_4px_0_#E0E0E0]"
        />
        <div className="flex flex-1 flex-col gap-12">
          <div className="flex flex-col gap-3">
            <GradientTitle
              align="left"
              className="text-[38px] leading-[48px] lg:text-[48px] lg:leading-[60px]"
              gradient="linear-gradient(180deg, #FF7F1C 15%, #000000 95%)"
            >
              Already Using Dglide?
            </GradientTitle>
            <p className="m-0 text-base leading-[160.8%] text-[#555555]" style={fontInter}>
              If you&apos;re an existing customer and need help with your system, workflow, access, configuration, or support request, please contact our support team.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
              <BlueButton href="mailto:support@dglide.com">Contact Support</BlueButton>
              <div className="flex flex-wrap gap-2 text-sm leading-[25px] tracking-[0.0143em]" style={fontInter}>
                <span className="text-[#555555]">Direct email:</span>
                <a className="break-all text-lg font-medium leading-[25px] text-[#1C2BFF]" style={fontTasa} href="mailto:support@dglide.com">
                  support@dglide.com
                </a>
              </div>
            </div>
            <p className="m-0 text-center text-sm font-light italic leading-[20.83px] text-[#48586A]" style={fontInter}>
              For faster help, include your company name, issue type, and a short description
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnershipSection() {
  return (
    <section id="partnership" className="mx-auto grid w-full max-w-[1104px] grid-cols-1 gap-4 px-5 lg:grid-cols-[1fr_402px_268px] lg:px-0">
      <div className="grid gap-4">
        {partnerCards.slice(0, 2).map((card) => (
          <article key={card.title} className="rounded-2xl border border-white px-7 py-6" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)" }}>
            <div className="flex flex-col gap-7">
              <Image src={card.icon} alt="" width={88} height={48} className="h-12 w-[88px]" />
              <div className="flex flex-col gap-2">
                <h3 className="m-0 text-lg font-medium leading-[26px] text-black" style={fontTasa}>
                  {card.title}
                </h3>
                <p className="m-0 text-[15px] leading-[26px] tracking-[0.0133em] text-[#555555]" style={fontInter}>
                  {card.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex min-h-[330px] flex-col justify-end gap-11 rounded-2xl px-9 pb-9 pt-[68px]" style={{ background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)" }}>
        <h2 className="m-0 text-[32px] font-semibold leading-[42px] text-white" style={{ ...fontTasa, textTransform: "capitalize" }}>
          Want to partner with DGlide? Technology, channel, or implementation: there&apos;s a way to build with us.
        </h2>
        <BlueButton href="#book-demo" invert>
          Send Partnership Enquiry
        </BlueButton>
      </div>
      <article className="rounded-2xl border border-white px-7 py-6 lg:text-right" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)" }}>
        <div className="flex flex-col gap-7 lg:items-end">
          <Image src={partnerCards[2].icon} alt="" width={88} height={48} className="h-12 w-[88px]" />
          <div className="flex flex-col gap-2">
            <h3 className="m-0 text-lg font-medium leading-[26px] text-black" style={fontTasa}>
              {partnerCards[2].title}
            </h3>
            <p className="m-0 text-[15px] leading-[26px] tracking-[0.0133em] text-[#555555]" style={fontInter}>
              {partnerCards[2].body}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

function VisitSection() {
  return (
    <section className="mx-auto w-full max-w-[1104px] px-5 lg:px-0">
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:gap-[100px]">
        <h2
          className="m-0 shrink-0 bg-clip-text text-[38px] leading-[50px] text-transparent lg:text-[44px] lg:leading-[58px]"
          style={{
            ...fontTasa,
            fontWeight: 400,
            backgroundImage: "linear-gradient(0deg, #000000 0%, #FF7F1C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textTransform: "capitalize",
          }}
        >
          Visit us
        </h2>
        <div className="flex flex-1 flex-col justify-center gap-12">
          <div className="flex flex-col items-stretch gap-9 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col justify-center gap-10">
              <div className="flex flex-col gap-7">
                <Image src="/contact-us/icon-visit-office.svg" alt="" width={88} height={48} className="h-12 w-[88px]" />
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 text-lg font-medium leading-[26px] text-[#FF0000]" style={fontTasa}>
                      Office Address 1
                    </h3>
                    <p className="m-0 text-[15px] leading-[26px] tracking-[0.0133em] text-[#555555]" style={{ ...fontInter, textTransform: "capitalize" }}>
                      Your system adapts to how you work Start with a working system, a lorem
                    </p>
                  </div>
                  <p className="m-0 whitespace-pre-line text-[15px] leading-[26px] tracking-[0.0133em] text-[#555555]" style={{ ...fontInter, textTransform: "capitalize" }}>
                    {"[City, State, PIN]\nIndia"}
                  </p>
                </div>
              </div>
              <p className="m-0 w-full whitespace-pre-line text-base leading-[26px] text-black lg:w-[332px]" style={fontTasa}>
                {"Business Hours:\nMonday to Friday\n10:00 AM to 6:00 PM IST"}
              </p>
            </div>
            <div className="min-h-[340px] rounded-2xl bg-[rgba(186,186,186,0.2)] pb-10 pl-7 pr-10 pt-8 backdrop-blur-[60px] lg:min-h-full lg:w-[426px] lg:shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

function NextStepsSection() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] overflow-hidden px-5 lg:px-0">
      <div className="flex flex-col items-center gap-[68px]">
        <div className="flex flex-col items-center gap-2 text-center">
          <GradientTitle className="w-full max-w-[1008px] text-[38px] leading-[48px] lg:text-[48px] lg:leading-[60px]">
            What Happens Next?
          </GradientTitle>
          <p className="m-0 text-base leading-[26px] tracking-[0.0125em] text-[#6F7276]" style={{ ...fontInter, textTransform: "capitalize" }}>
            Send a message and here&apos;s what to expect, start to reply.
          </p>
        </div>
        <div className="relative grid w-full max-w-[1104px] gap-10 md:grid-cols-3 md:gap-12">
          <MovingNextConnector />
          {nextSteps.map((step) => (
            <div key={step.title} className="relative z-10 flex flex-col items-center gap-7 text-center">
              <Image src={step.icon} alt="" width={88} height={48} className="h-12 w-[88px]" />
              <div className="flex flex-col gap-2">
                <h3 className="m-0 text-[17px] leading-[25px] text-black" style={fontTasa}>
                  {step.title}
                </h3>
                <p className="m-0 text-[15px] leading-6 tracking-[0.0133em] text-[#555555]" style={fontInter}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="relative mx-auto w-[calc(100%-32px)] max-w-[1168px] overflow-hidden rounded-[30px] border border-white px-5 py-[68px]" style={{ background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)" }}>
      <Image src="/contact-us/cta-waves.svg" alt="" width={1832} height={695} className="pointer-events-none absolute left-1/2 top-[-19px] h-auto w-auto max-w-none -translate-x-1/2 opacity-100" />
      <div className="relative z-10 mx-auto flex max-w-[1104px] flex-col items-center gap-[60px] text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 text-base leading-6 text-white" style={fontSora}>
            <span className="h-[11px] w-px bg-white" />
            Still deciding?
          </div>
          <h2
            className="m-0 max-w-[892px] bg-clip-text text-[36px] leading-[46px] text-transparent lg:text-[48px] lg:leading-[60px]"
            style={{
              ...fontTasa,
              fontWeight: 400,
              backgroundImage: "linear-gradient(90deg, #FF7F1C 0%, #FFFFFF 8%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            See a working system on your real workflow. In weeks, not a build project.
          </h2>
        </div>
        <BlueButton href="#book-demo" invert>
          Get A Free Demo
        </BlueButton>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 lg:px-0">
      <div className="mx-auto flex max-w-[1104px] flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="relative w-full max-w-[360px]">
          <h2 className="m-0 text-[38px] leading-[50px] text-black lg:text-[44px] lg:leading-[58px]" style={fontTasa}>
            Frequently Asked questions
          </h2>
          <h2
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 m-0 bg-clip-text text-[38px] leading-[50px] text-transparent lg:text-[44px] lg:leading-[58px]"
            style={{
              ...fontTasa,
              backgroundImage: "linear-gradient(90deg, #FF7F1C 0%, #000000 68%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frequently Asked questions
          </h2>
        </div>
        <div className="flex flex-1 flex-col gap-[22px]">
          <ContactFaqAccordion />
        </div>
      </div>
    </section>
  );
}

export default function ContactPageSections() {
  return (
    <div className="flex max-w-full flex-col items-center gap-[130px] overflow-x-hidden bg-[#F3F3F3] pb-[130px]">
      <div className="flex w-full flex-col items-center gap-[100px]">
        <MotionReveal hero>
          <ContactHeroSection />
        </MotionReveal>
        <MotionReveal>
          <ContactMethodsSection />
        </MotionReveal>
      </div>
      <MotionReveal>
        <DemoSection />
      </MotionReveal>
      <MotionReveal>
        <DirectContactSection />
      </MotionReveal>
      <MotionReveal>
        <ExistingCustomerSection />
      </MotionReveal>
      <MotionReveal>
        <PartnershipSection />
      </MotionReveal>
      <MotionReveal>
        <VisitSection />
      </MotionReveal>
      <MotionReveal>
        <NextStepsSection />
      </MotionReveal>
      <MotionReveal>
        <FinalCtaSection />
      </MotionReveal>
      <MotionReveal>
        <FAQSection />
      </MotionReveal>
    </div>
  );
}
