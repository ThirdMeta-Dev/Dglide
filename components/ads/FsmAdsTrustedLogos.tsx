"use client";

import Image from "next/image";

const BASE_LOGOS = [
  "/logos/logo-1.png",
  "/logos/logo-2.png",
  "/logos/logo-3.png",
  "/logos/logo-4.png",
  "/logos/logo-5.png",
  "/logos/client-jsw.svg",
  "/logos/client-rolcon.svg",
  "/logos/client-sharplaser.svg",
  "/logos/client-tgt.svg",
];

const LOGOS = [...BASE_LOGOS, ...BASE_LOGOS, ...BASE_LOGOS];

export default function FsmAdsTrustedLogos() {
  return (
    <section className="bg-[#F3F3F3] pb-12 pt-10" aria-label="Trusted by">
      <div className="hero-logos-row mx-auto flex max-w-[1280px] items-center gap-[60px] px-6 md:px-10 lg:px-16">
        <div className="hero-logos-label flex-shrink-0">
          <p
            className="text-[18px] leading-[1.4] text-black"
            style={{ fontFamily: "var(--font-tasa-orbiter)", fontWeight: 400 }}
          >
            Trusted by
          </p>
        </div>

        <div className="flex-1 overflow-hidden">
          <div
            className="flex w-max gap-3"
            style={{ animation: "scrollLeft 28s linear infinite" }}
          >
            {LOGOS.map((src, index) => (
              <div key={`${src}-${index}`} className="flex-shrink-0">
                {src.endsWith(".svg") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={src}
                    alt="Client logo"
                    width={160}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={src}
                    alt="Client logo"
                    width={160}
                    height={48}
                    className="object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
