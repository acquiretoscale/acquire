import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Operations & Infrastructure",
  description:
    "Offshore incorporation & tax optimization, expert banking and payment processing for high-volume, high-risk merchant accounts and global banking solutions.",
  alternates: { canonical: "/global-operations" },
};

export default function GlobalOperationsPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            For Scalers
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Global Operations & Infrastructure
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            Strategically structuring entities for international compliance and maximized fiscal efficiency. Seamless setup and optimization of high-volume, high-risk merchant accounts and global banking solutions.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Offshore Incorporation & Tax Optimization
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Strategically structuring entities for international compliance and maximized fiscal efficiency. We help you navigate offshore incorporation and tax optimization so your global operations run smoothly and compliantly.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Expert Banking & Payment Processing
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
              Seamless setup and optimization of high-volume, high-risk merchant accounts and global banking solutions. From payment gateways to multi-currency accounts, we help you access the right financial infrastructure for your scale.
            </p>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
