import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scaling Advisory & Mentorship",
  description:
    "Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth.",
  alternates: { canonical: "/scaling" },
};

export default function ScalingPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            For Scalers
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Scaling Advisory & Mentorship
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            Strategic guidance on what breaks, what to fix first, and where to focus for rapid post-acquisition growth.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-8 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              After you acquire an online business, the real work begins. Our scaling advisory and mentorship helps you navigate the first 90 days and beyond—identifying bottlenecks, prioritizing fixes, and building systems that support sustainable growth.
            </p>
            <p>
              We focus on operational clarity: what breaks, what to fix first, and where to focus your energy for maximum impact. Whether you&apos;re running content sites, SaaS, or digital products, we help you avoid common pitfalls and accelerate your path to scaling.
            </p>
          </div>
          <div className="mt-12">
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
