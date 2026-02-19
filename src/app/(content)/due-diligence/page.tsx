import type { Metadata } from "next";
import Link from "next/link";
import { ASSET_TYPES } from "@/lib/due-diligence";
import { AssetIcon } from "@/components/AssetIcon";

export const metadata: Metadata = {
  title: "Due Diligence",
  description:
    "Operator-led due diligence by asset type, deal sourcing & private deals vault, and 1-on-1 advisory calls. Your path to confident online business acquisition.",
  alternates: {
    canonical: "/due-diligence",
  },
};

export default function DueDiligencePage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Intro — your exact copy, no hero */}
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            Due Diligence
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Your Path to Confident Online Business Acquisition
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            At Acquire To Scale, we provide operator-led expertise to help you navigate the online
            business acquisition market with clarity and confidence. Whether you&apos;re seeking to
            vet a specific asset, find your next opportunity, or strategize your growth, our
            services are designed to ensure you acquire a business that truly scales.
          </p>
          <p className="mt-4 font-medium text-[var(--foreground)]">
            Choose your path below to learn more about how we can support your acquisition journey:
          </p>
        </div>
      </section>

      {/* 1. Due Diligence by Asset Type — card grid, your text */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            Due Diligence by Asset Type
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Select an asset type to see how we evaluate deals and what you can expect.
          </p>
          <ul className="mt-8 space-y-2" role="list">
            {ASSET_TYPES.map((asset) => (
              <li key={asset.slug}>
                <Link
                  href={`/due-diligence/${asset.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-4 shadow-sm transition hover:border-[var(--accent)]/40 hover:shadow-md md:gap-6 md:px-6 md:py-4"
                >
                  <AssetIcon slug={asset.slug} />
                  <span className="min-w-0 flex-1 font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                    {asset.title}
                  </span>
                  <span className="shrink-0 text-base font-medium text-[var(--accent)]">
                    View details
                    <svg className="ml-1 inline h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Deal Sourcing & Private Deals Vault — your exact paragraph */}
      <section id="deal-sourcing" className="border-t border-[var(--border)] bg-[var(--card-hover)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm md:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Deal Sourcing & Private Deals Vault
              </h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-[var(--muted)]">
                Struggling to find quality deals? Leverage our extensive network and insights to
                access exclusive opportunities. Our Private Deals Vault offers hand-picked,
                screened, and vetted market and off-market deals that align with your investment
                criteria.
              </p>
              <Link
                href="/buyer-form"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
              >
                Access Private Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — your exact copy */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-8 py-10 text-[var(--foreground)] md:flex-row md:items-center">
            <div>
              <div className="text-xl font-bold tracking-tight text-[var(--foreground)]">Ready to start?</div>
              <p className="mt-2 text-[var(--muted)]">
                Get a buyer profile and matching plan tailored to your situation.
              </p>
            </div>
            <Link
              href="/buyer-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
