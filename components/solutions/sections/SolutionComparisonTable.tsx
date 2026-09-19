import Image from 'next/image';
import type { ReactNode } from 'react';
import { ScrollReveal } from '@/components/animations/MotionPrimitives';
import {
  solutionComparisonFootnote,
  type SolutionComparisonContent,
} from '@/data/solutionComparisonData';

export default function SolutionComparisonTable({ content }: { content: SolutionComparisonContent }) {
  return (
    <section className="w-full bg-[#F3F3F3] px-6 py-20 md:px-10 lg:px-16 lg:py-24">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-[1104px]">
          <div className="mb-11 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:px-5">
            <h2
              className="max-w-[557px] bg-clip-text text-[36px] font-normal leading-[1.12] text-transparent md:text-[48px] md:leading-[56px]"
              style={{
                fontFamily: 'var(--font-tasa-orbiter)',
                backgroundImage: 'linear-gradient(90deg, #FF7F1C 0%, #000000 82%)',
              }}
            >
              {content.title}
            </h2>
            <p className="max-w-[423px] text-left text-base leading-6 tracking-[0.2px] text-[#6F7276] lg:text-right">
              {content.subtitle}
            </p>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <div className="min-w-[720px] overflow-hidden rounded-2xl bg-white shadow-[inset_0_-2px_3px_rgba(0,0,0,0.1)] md:min-w-0">
              <div className="grid grid-cols-[38%_31%_31%] bg-[rgba(255,127,28,0.1)] shadow-[inset_0_-2px_3px_rgba(0,0,0,0.1)]">
                <TableHeading>{content.challengeHeading}</TableHeading>
                <TableHeading accent>{content.dglideHeading}</TableHeading>
                <TableHeading accent>{content.rigidHeading}</TableHeading>
              </div>
              <div>
                {content.rows.map((row, index) => (
                  <div
                    key={row.challenge}
                    className={`grid grid-cols-[38%_31%_31%] ${index < content.rows.length - 1 ? 'border-b border-[#E3E3E3]' : ''}`}
                  >
                    <div className="flex items-center gap-3 px-4 py-4 md:gap-4 md:px-5 md:py-5 lg:px-9">
                      <Image src="/comparison/row-bullet.svg" alt="" width={21} height={12} className="h-3 w-[21px] shrink-0" />
                      <p className="text-[13px] font-medium leading-5 text-black md:text-sm md:leading-[23px] lg:text-base">{row.challenge}</p>
                    </div>
                    <div className="flex items-center bg-[#FFF7F0] px-4 py-4 md:px-5 md:py-5 lg:px-9">
                      <p className="text-[13px] font-semibold leading-5 text-black md:text-sm md:leading-[23px] lg:text-base">{row.dglide}</p>
                    </div>
                    <div className="flex items-center px-4 py-4 md:px-5 md:py-5 lg:px-9">
                      <p className="text-[13px] font-normal leading-5 text-black md:text-sm md:leading-[23px] lg:text-base">{row.rigid}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-[#6F7276] md:text-sm">{solutionComparisonFootnote}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}

function TableHeading({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <div className="flex min-h-[64px] items-center px-4 py-3 md:min-h-[72px] md:px-5 md:py-4 lg:px-9">
      <p
        className={`text-[13px] font-semibold leading-5 md:text-sm md:leading-7 lg:text-xl ${accent ? 'text-[#FF7F1C]' : 'text-black'}`}
        style={{ fontFamily: 'var(--font-tasa-orbiter)' }}
      >
        {children}
      </p>
    </div>
  );
}
