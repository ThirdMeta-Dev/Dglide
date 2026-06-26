export default function AUPeopleSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-5 md:px-12">
        <div className="flex max-w-[792px] flex-col items-center gap-4">
          <h2
            className="text-center text-[36px] font-normal leading-[44px] md:text-[48px] md:leading-[58px]"
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
            className="text-center text-[16px] leading-[26px] tracking-[0.2px] text-[#555555]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A team that has spent its careers inside enterprise software, and
            learned firsthand why it stops fitting.
          </p>
        </div>

        <div className="flex max-w-[970px] flex-col items-center gap-2">
          <p
            className="text-center text-[16px] leading-[26px] tracking-[0.2px] text-[#414141]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            The people behind DGlide bring more than 100 years of combined
            experience in enterprise software. We have built it, implemented it
            for Fortune 500s and growing businesses, and been called in to fix it
            when it stopped keeping up.
          </p>
          <p
            className="text-center text-[16px] leading-[26px] tracking-[0.2px] text-[#414141]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            That history shapes how we work. Our team spans operations, workflow
            systems, product engineering, and customer implementation, united by
            one belief: software should adapt to your business, not the other way
            around.
          </p>
        </div>
      </div>
    </section>
  );
}
