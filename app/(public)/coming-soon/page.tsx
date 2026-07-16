import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon | DGlide",
  description: "This DGlide resource is being prepared.",
};

export default function ComingSoonPage() {
  return (
    <section className="min-h-[70vh] bg-[#F3F3F3] px-5 py-20 md:px-12">
      <div className="relative mx-auto flex min-h-[520px] max-w-[1104px] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-white bg-white px-6 text-center shadow-[0_20px_60px_rgba(28,43,255,0.08)]">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(circle_at_50%_100%,rgba(28,43,255,0.16),transparent_68%)]" />
        <span className="relative mb-5 inline-flex items-center gap-2 text-sm text-[#FF7F1C] [font-family:var(--font-sora)]">
          <span className="h-4 w-0.5 rounded-full bg-[#FF7F1C]" />
          Something useful is on the way
        </span>
        <h1 className="relative max-w-[760px] bg-gradient-to-b from-[#FF7F1C] via-black to-black bg-clip-text text-[42px] leading-[1.12] text-transparent md:text-[64px] [font-family:var(--font-tasa-orbiter)]">
          We&apos;re Building This Next
        </h1>
        <p className="relative mt-5 max-w-[600px] text-base leading-7 text-[#555]">
          This page is still being shaped. Explore the platform now, or book a walkthrough to see how DGlide fits your operation.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/platform" className="dg-btn-fill rounded-full bg-gradient-to-br from-[#1C2BFF] to-[#141FB5] px-8 py-3.5 font-semibold text-white [font-family:var(--font-sora)]">Explore Platform</Link>
          <Link href="/schedule-demo" className="dg-btn-outline rounded-full border border-[#1C2BFF] bg-white px-8 py-3.5 text-[#1C2BFF] [font-family:var(--font-sora)]">Book a Demo</Link>
        </div>
      </div>
    </section>
  );
}
