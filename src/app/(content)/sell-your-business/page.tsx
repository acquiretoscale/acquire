import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/lib/page-content";
import type { HeroBlock } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Sell Your Business",
  description:
    "Submit your profitable digital business for review. Acquire To Scale reviews a limited number of assets for potential acquisition or introduction to serious buyers.",
  alternates: { canonical: "/sell-your-business" },
};

export default async function SellYourBusinessPage() {
  const content = await getPageContent("for-sellers");
  const hero = content.hero as HeroBlock;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section data-cms-block="for-sellers/hero" className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            {hero.label}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {hero.heading}
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              Acquire To Scale reviews a limited number of profitable digital businesses for potential acquisition or private introduction to serious buyers within our network. We focus on cash-flowing, scalable assets and apply an operator-led lens to every opportunity.
            </p>
            <p>
              If your business generates $500+ in monthly profit or $200+ MRR (SaaS / subscription models) and fits our acquisition criteria, you may submit it for confidential review.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href={hero.cta_primary.href}
              className="inline-flex items-center gap-2 font-semibold text-[var(--accent)] transition hover:text-[var(--accent-hover)] hover:underline"
            >
              {hero.cta_primary.label}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
