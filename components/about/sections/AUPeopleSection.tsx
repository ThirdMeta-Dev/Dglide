import Image from "next/image";

/* ------------------------------------------------------------------ */
/* Data — exact strings from Figma node 1118:2050                      */
/* ------------------------------------------------------------------ */

type TeamCard = {
  photo: string;
  name: string;
  role: string;
};

const CARDS: TeamCard[] = [
  {
    photo: "/about/people/team-photo-1.jpg",
    name: "Product & Engineering Team",
    role: "Platform Development",
  },
  {
    // Figma draws this card in its hover state (no photo present);
    // photo reused from card 4 so the default state has an image.
    photo: "/about/people/team-photo-4.jpg",
    name: "Implementation Team",
    role: "Customer Success",
  },
  {
    photo: "/about/people/team-photo-3.jpg",
    name: "Product & Engineering Team",
    role: "Platform Development",
  },
  {
    photo: "/about/people/team-photo-4.jpg",
    name: "Product & Engineering Team",
    role: "Platform Development",
  },
];

/* Hover-overlay copy — verbatim from Figma (node 1118:2086 / 1118:2087) */
const HOVER_PARAGRAPHS = [
  "Dglide is built by a team focused on operations, workflow systems, product engineering, and customer implementation.",
  "Dglide is built by a team focused on operations",
];

const SOCIAL_ICONS = [
  { src: "/about/people/icon-linkedin.svg", alt: "LinkedIn" },
  { src: "/about/people/icon-twitter.svg", alt: "Twitter" },
  { src: "/about/people/icon-whatsapp.svg", alt: "WhatsApp" },
  { src: "/about/people/icon-instagram.svg", alt: "Instagram" },
];

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

function PersonCard({ card }: { card: TeamCard }) {
  return (
    <div className="group relative w-full max-w-[264px] h-[430px]">
      {/* Card body: 402px tall (28px top offset) by default, grows to the
          full 430px slot on hover — matches Figma's hover-state frame. */}
      <div
        className="absolute inset-x-0 bottom-0 top-7 group-hover:top-0 rounded-2xl border border-white overflow-hidden transition-all duration-300 ease-out"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #F6F6F6 100%)",
        }}
      >
        {/* Photo (default state) */}
        <Image
          src={card.photo}
          alt={card.name}
          width={264}
          height={308}
          className="w-full h-[308px] object-cover"
        />

        {/* Glassmorphism overlay (hover state) */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          {/* Blurred colour blobs (Vectors 6799 / 6800 / 6801) */}
          <div
            aria-hidden
            className="absolute left-[-125px] top-[232px] w-[402px] h-[202px] rounded-full bg-[#FF7F1C] blur-[90px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute left-[76px] top-[201px] w-[419px] h-[227px] rounded-full bg-[#FF7F1C] blur-[90px] pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute left-[160px] top-[405px] w-[149px] h-[75px] rounded-full bg-[#1C2BFF] blur-[90px] pointer-events-none"
          />

          {/* Overlay content */}
          <div className="relative flex flex-col gap-5 pt-7 px-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_ICONS.map((icon) => (
                <Image
                  key={icon.alt}
                  src={icon.src}
                  alt={icon.alt}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              ))}
            </div>

            {/* Description paragraphs */}
            <div className="flex flex-col gap-1.5">
              {HOVER_PARAGRAPHS.map((p) => (
                <p
                  key={p}
                  className="text-[#555555] text-[15px] leading-[25px] tracking-[0.2px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Name + role (shared between both states; role turns white on hover) */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 px-5 pb-5">
          <h3
            className="text-black text-[16px] leading-[25px] font-medium"
            style={{ fontFamily: "var(--font-tasa-orbiter)" }}
          >
            {card.name}
          </h3>
          <p
            className="text-[#555555] group-hover:text-white text-[15px] leading-[25px] tracking-[0.2px] transition-colors duration-300"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {card.role}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function AUPeopleSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex flex-col items-center gap-12">
        {/* ---------- Heading + subtitle ---------- */}
        <div className="flex flex-col items-center gap-4 max-w-[923px]">
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
            The People Behind the Platform
          </h2>
          <p
            className="text-center text-[#555555] text-[16px] leading-[26px] tracking-[0.2px]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Dglide is built by a team focused on operations, workflow systems,
            product engineering, and customer implementation.
          </p>
        </div>

        {/* ---------- Team cards ---------- */}
        <div className="w-full max-w-[1104px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
          {CARDS.map((card, i) => (
            <PersonCard key={`${card.name}-${i}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
