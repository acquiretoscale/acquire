import type { Metadata } from "next";
import { ShimmerLink } from "@/components/ShimmerLink";
import { getPageContent } from "@/lib/page-content";
import type { HeroBlock, RichTextBlock, CtaBlock, FounderBlock } from "@/lib/page-content";
import { FounderSection } from "@/components/FounderSection";

function renderMd(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-[var(--foreground)]'>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--accent)] underline-offset-2 hover:underline">$1</a>');
}

export const metadata: Metadata = {
  title: "About",
  description:
    "Acquire To Scale democratizes institutional-grade due diligence for small online business acquisitions. Operator-led, practical, and built for scalability.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const content = await getPageContent("about");
  const hero = content.hero as HeroBlock;
  const companyIntro = content.company_intro as RichTextBlock;
  const clarityCta = content.clarity_cta as CtaBlock;
  const founder = content.founder as FounderBlock;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section data-cms-block="about/hero" className="border-b border-[var(--border)] py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">{hero.label}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {hero.heading}
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
        </div>
      </section>

      {/* About the company */}
      <section data-cms-block="about/company_intro" className="border-t border-[var(--border)] py-8 md:py-12">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            {companyIntro.heading}
          </p>
          <div className="mt-5 space-y-5 text-lg leading-relaxed text-[var(--muted)]">
            {companyIntro.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: renderMd(p) }} />
            ))}
          </div>
        </div>
      </section>

      {/* About the Founder */}
      <FounderSection founder={founder} />

      {/* Clarity Call CTA */}
      <section data-cms-block="about/clarity_cta" className="border-t border-[var(--border)] py-12 md:py-16">
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
