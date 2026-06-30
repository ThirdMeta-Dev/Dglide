import Link from "next/link";
import { ScrollReveal } from "@/components/animations/MotionPrimitives";

/* ------------------------------------------------------------------ */
/* Data — exact strings from Figma node 1118:2261                      */
/* ------------------------------------------------------------------ */

const BADGE_TEXT = "See DGlide in Action";
const HEADING = "Run Your Operations on a System That Adapts With You";
const CTA_LABEL = "Explore the Platform";
const CTA_HREF = "/platform";

type AUFinalCTASectionProps = {
  badgeText?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function AUFinalCTASection({
  badgeText = BADGE_TEXT,
  heading = HEADING,
  ctaLabel = CTA_LABEL,
  ctaHref = CTA_HREF,
}: AUFinalCTASectionProps = {}) {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1200px] px-4">
        <div
          className="relative flex min-h-[360px] flex-col items-center justify-center gap-[22px] overflow-hidden rounded-[30px] border border-white px-6 py-12 lg:min-h-[400px] lg:px-9 lg:py-[68px]"
          style={{
            background: "linear-gradient(180deg, #1C2BFF 0%, #141FB5 100%)",
          }}
        >
          {/* Decorative wave lines (Figma group, extends past card bounds) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 z-0 h-auto w-full -translate-y-1/2 lg:left-[-342px] lg:top-[-19px] lg:h-[695px] lg:w-[1832px] lg:max-w-none lg:translate-y-0"
            viewBox="0 0 1829 695"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1755.79 124.325C1755.79 124.325 1639.85 -167.605 1401.75 145.021C1163.65 457.647 1024.94 45.6382 828.251 294.096C631.565 542.553 434.879 66.3552 298.222 374.842C161.565 683.329 0.0730822 658.493 0.0730822 658.493" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.95" d="M1759.44 136.557C1759.44 136.557 1641.67 -145.763 1400.22 162.329C1158.77 470.42 1027.42 57.6624 834.849 294.202C641.803 530.72 452.106 94.2915 311.83 383.039C170.805 671.412 13.2858 660.284 6.79617 660.284" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.9" d="M1763.08 148.786C1763.08 148.786 1643.48 -123.925 1398.68 179.653C1153.89 483.21 1029.88 69.7036 841.448 294.324C652.062 518.924 470.061 122.619 325.417 391.232C180.752 659.887 26.4775 662.071 13.4774 662.071" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.86" d="M1766.72 160.998C1766.72 160.998 1645.31 -102.103 1397.14 196.94C1149 495.963 1032.35 81.7077 848.042 294.389C662.297 507.05 487.617 150.764 339.021 399.388C190.321 648.178 39.7072 663.82 20.1759 663.82" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.81" d="M1770.37 173.225C1770.37 173.225 1647.13 -80.245 1395.61 214.243C1144.09 508.732 1035.35 94.2057 854.64 294.49C673.076 495.711 505.157 178.966 352.608 407.58C199.831 636.528 52.8993 665.585 26.8575 665.585" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.76" d="M1774.03 185.456C1774.03 185.456 1648.96 -58.4046 1394.12 231.549C1139.25 521.503 1037.98 106.353 861.279 294.594C683.48 484 522.694 207.213 366.257 415.755C209.361 624.9 66.1523 667.353 33.6001 667.353" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.71" d="M1777.68 197.689C1777.68 197.689 1650.79 -36.5621 1392.58 248.857C1134.37 534.277 1040.56 118.503 867.877 294.701C693.822 472.313 540.13 235.483 379.844 423.953C218.789 613.338 79.3444 669.145 40.3026 669.145" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.67" d="M1781.32 209.898C1781.32 209.898 1652.61 -14.7435 1391.05 266.141C1129.49 547.026 1043.1 130.629 874.476 294.783C704.143 460.581 557.502 263.749 393.452 432.127C228.174 601.752 92.5571 670.912 47.0048 670.912" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.62" d="M1784.97 222.128C1784.97 222.128 1654.43 7.09639 1389.52 283.447C1124.61 559.798 1045.65 142.776 881.078 294.887C714.469 448.891 574.796 292.037 407.043 440.301C237.439 590.207 105.753 672.68 53.6903 672.68" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.57" d="M1788.61 234.358C1788.61 234.358 1656.25 28.9363 1387.97 300.752C1119.71 572.569 1048.16 154.902 887.668 294.991C724.762 437.181 591.995 320.325 420.643 448.496C246.629 578.663 118.958 674.468 60.3847 674.468" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.52" d="M1792.25 246.588C1792.25 246.588 1658.07 50.776 1386.44 318.058C1114.81 585.339 1050.66 167.028 894.267 295.094C735.042 425.47 609.076 348.571 434.23 456.691C255.703 567.077 132.15 676.257 67.0665 676.257" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.48" d="M1795.91 258.797C1795.91 258.797 1659.9 72.6147 1384.95 335.362C1109.97 598.109 1053.18 179.153 900.906 295.176C745.341 413.716 626.115 376.733 447.879 464.843C264.733 555.386 145.403 678.003 73.8299 678.003" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.43" d="M1799.56 271.031C1799.56 271.031 1661.74 94.4581 1383.41 352.671C1105.08 610.884 1055.64 191.262 907.504 295.283C755.559 401.988 643.03 404.817 461.466 473.041C273.62 543.637 158.595 679.795 80.5114 679.795" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.38" d="M1803.21 283.258C1803.21 283.258 1663.56 116.296 1381.88 369.974C1100.2 623.653 1058.08 203.344 914.106 295.385C765.78 390.233 659.887 432.77 475.078 481.234C282.489 531.737 171.812 681.581 87.2175 681.581" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.33" d="M1806.84 295.487C1806.84 295.487 1665.36 138.134 1380.34 387.278C1095.31 636.422 1060.47 215.407 920.697 295.487C775.928 378.438 676.732 460.557 488.678 489.407C291.326 519.692 185.017 683.327 93.9121 683.327" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.29" d="M1810.49 307.696C1810.49 307.696 1667.18 159.953 1378.8 404.562C1090.43 649.172 1062.83 227.387 927.295 295.57C786.083 366.602 693.605 488.221 502.265 497.581C300.192 507.481 198.209 685.094 100.594 685.094" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.24" d="M1814.15 319.928C1814.15 319.928 1669.03 181.794 1377.29 421.87C1085.55 661.945 1065.2 239.369 933.913 295.675C796.216 354.727 710.582 515.761 515.892 505.777C309.16 495.169 211.441 686.884 107.336 686.884" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.19" d="M1817.8 332.157C1817.8 332.157 1670.85 203.632 1375.75 439.173C1080.66 674.714 1067.52 251.286 940.511 295.777C806.309 342.806 727.643 543.236 529.48 513.971C318.192 482.77 224.633 688.671 114.018 688.671" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.14" d="M1821.43 344.391C1821.43 344.391 1672.65 225.497 1374.23 456.483C1075.79 687.489 1069.84 263.125 947.139 295.885C816.41 330.787 744.837 570.655 543.117 522.149C327.378 470.273 237.875 690.443 120.75 690.443" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.1" d="M1825.09 356.602C1825.09 356.602 1674.49 247.318 1372.71 473.769C1070.92 700.241 1072.16 274.836 953.749 295.969C826.515 318.641 762.118 598.029 556.716 530.324C336.651 457.774 251.079 692.212 127.443 692.212" stroke="#4955FF" strokeMiterlimit="10" />
            <path opacity="0.05" d="M1828.73 368.833C1828.73 368.833 1676.31 269.159 1371.17 491.096C1066.03 713.034 1074.54 286.527 960.344 296.074C836.645 306.433 779.466 625.444 570.32 538.52C346.033 445.294 264.288 694.001 134.142 694.001" stroke="#4955FF" strokeMiterlimit="10" />
          </svg>

          {/* Inner content */}
          <div className="relative z-[1] flex w-full flex-col items-center gap-10 lg:gap-[60px]">
            {/* Text group */}
            <div className="flex w-full max-w-[796px] flex-col items-center gap-3">
              {/* Eyebrow badge */}
              <ScrollReveal direction="up">
              <div className="flex items-center justify-center gap-2">
                <span
                  aria-hidden
                  className="h-[11px] w-[2px] shrink-0 bg-white"
                />
                <span
                  className="text-base leading-6 text-white"
                  style={{
                    fontFamily: "var(--font-sora), Sora, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {badgeText}
                </span>
              </div>
              </ScrollReveal>

              {/* Heading */}
              <ScrollReveal direction="up" delay={0.1}>
              <h2
                className="au-final-heading bg-clip-text text-center text-[32px] leading-[1.25] text-transparent lg:text-[48px] lg:leading-[60px]"
                style={{
                  fontFamily: "var(--font-tasa-orbiter)",
                  fontWeight: 500,
                  backgroundImage:
                    "linear-gradient(90deg, #FF7F1C 0%, #FFFFFF 8.47%)",
                  whiteSpace: "pre-line",
                }}
              >
                {heading}
              </h2>
              </ScrollReveal>
            </div>

            {/* Button */}
            <ScrollReveal direction="up" delay={0.2}>
            <Link
              href={ctaHref}
              className="dg-btn-outline au-final-cta-btn inline-flex items-center gap-2.5 rounded-[40px] bg-white px-6 py-3.5 text-base text-[#1C2BFF] no-underline"
              style={{
                fontFamily: "var(--font-sora), Sora, sans-serif",
                fontWeight: 400,
                lineHeight: "20.16px",
              }}
            >
              {ctaLabel}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9h13M10 5l4 4-4 4"
                  stroke="#1C2BFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
