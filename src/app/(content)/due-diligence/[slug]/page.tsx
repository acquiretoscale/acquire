import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ASSET_TYPES, getAssetBySlug } from "@/lib/due-diligence";

type Props = { params: Promise<{ slug: string }> };

const CUSTOM_PAGE_SLUGS = ["content-websites", "saas-apps"];

export async function generateStaticParams() {
  return ASSET_TYPES.filter((a) => !CUSTOM_PAGE_SLUGS.includes(a.slug)).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) return {};
  return {
    title: asset.title,
    description: asset.description,
    alternates: { canonical: `/due-diligence/${slug}` },
  };
}

export default async function DueDiligenceAssetPage({ params }: Props) {
  const { slug } = await params;
  const asset = getAssetBySlug(slug);
  if (!asset) notFound();

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href="/due-diligence"
            className="text-base font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            ← Due Diligence
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {asset.title}
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            {asset.description}
          </p>
          <p className="mt-6 leading-relaxed text-[var(--foreground)]">
            {asset.detailIntro}
          </p>
          <Link
            href="/buyer-form"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Get a deal reviewed
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <Link
            href="/due-diligence"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
          >
            View all asset types
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
