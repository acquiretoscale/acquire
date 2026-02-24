import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/lib/page-content";
import type { HeroBlock, RichTextBlock } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Scaling Advisory & Mentorship",
  description:
    "Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth.",
  alternates: { canonical: "/scaling" },
};

export default async function ScalingPage() {
  const content = await getPageContent("for-scalers");
  const hero = content.hero as HeroBlock;
  const body = content.content as RichTextBlock;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section data-cms-block="for-scalers/hero" className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            {hero.label}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {hero.heading}
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            {hero.subheading}
          </p>
        </div>
      </section>

      <section data-cms-block="for-scalers/content" className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-8 text-lg leading-relaxed text-[var(--muted)]">
            {body?.paragraphs?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href={hero.cta_primary.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
            >
              {hero.cta_primary.label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
