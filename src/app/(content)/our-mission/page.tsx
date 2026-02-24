import type { Metadata } from "next";
import { ShimmerLink } from "@/components/ShimmerLink";
import { getPageContent } from "@/lib/page-content";
import type { HeroBlock, RichTextBlock, TableBlock, CardsBlock, CtaBlock } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Acquire To Scale's mission: democratizing institutional-grade due diligence for small online business acquisitions.",
  alternates: {
    canonical: "/our-mission",
  },
};

export default async function OurMissionPage() {
  const content = await getPageContent("our-mission");
  const hero = content.hero as HeroBlock;
  const mission = content.mission as RichTextBlock;
  const comparison = content.comparison_table as TableBlock;
  const philosophy = content.philosophy as RichTextBlock;
  const whyChoose = content.why_choose as CardsBlock;
  const clarityCta = content.clarity_cta as CtaBlock;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section data-cms-block="our-mission/hero" className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">{hero.label}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {hero.heading}
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
        </div>
      </section>

      {/* Mission */}
      <section data-cms-block="our-mission/mission" className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            {mission.heading}
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            {mission.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section data-cms-block="our-mission/comparison_table" className="border-t border-[var(--border)] bg-[var(--card)] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-[var(--muted)] leading-relaxed">
            {comparison.intro}
          </p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-[var(--border)] bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--card-hover)]">
                  {comparison.headers.map((header, i) => (
                    <th key={i} className={`px-3 py-2.5 font-semibold text-[13px] ${i === comparison.headers.length - 1 ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, i) => (
                  <tr key={i} className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-[var(--card-hover)]/50"}`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-3 py-2.5 text-[13px] ${j === 0 ? "font-medium text-[var(--foreground)]" : j === row.length - 1 ? "font-medium text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {comparison.footer_note && (
            <p className="mt-4 text-sm italic text-[var(--muted)]">{comparison.footer_note}</p>
          )}
        </div>
      </section>

      {/* Philosophy */}
      <section data-cms-block="our-mission/philosophy" className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            {philosophy.heading}
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            {philosophy.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section data-cms-block="our-mission/why_choose" className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            {whyChoose.heading}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2" role="list">
            {whyChoose.cards.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clarity Call CTA */}
      <section data-cms-block="our-mission/clarity_cta" className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col rounded-xl border border-[var(--border-strong)] bg-white shadow-xl md:flex-row md:items-center md:gap-12 md:px-10 md:py-10 lg:gap-16 lg:px-12 lg:py-12">
            <div className="flex-1 px-6 py-8 md:px-0 md:py-0">
              {clarityCta.label && (
                <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                  {clarityCta.label}
                </p>
              )}
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl lg:text-[1.75rem]">
                {clarityCta.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
                {clarityCta.body}
              </p>
            </div>
            <div className="shrink-0 border-t border-[var(--border)] px-6 py-8 md:border-l md:border-t-0 md:px-0 md:py-0 lg:pl-12">
              <ShimmerLink
                href={clarityCta.button.href}
                className="group inline-flex h-12 min-h-[44px] w-full items-center justify-center gap-2 px-8 font-semibold text-white md:w-auto"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #2563eb)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                {clarityCta.button.label}
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </ShimmerLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
