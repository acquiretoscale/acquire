import type { Metadata } from "next";
import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/acquiretoscale/45min";

export const metadata: Metadata = {
  title: "Clarity Call",
  description:
    "A high-level discussion for buyers or sellers considering a transaction. Surface-level review, positioning, and next steps.",
  alternates: { canonical: "/clarity-call" },
};

export default function ClarityCallPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            Clarity Call
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Clarity Call
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              A high-level discussion for buyers or sellers considering a transaction.
              The call is intended for surface-level review, positioning, and next steps.
            </p>
            <p>
              This is not a replacement for formal due diligence.
              For full due diligence, visit our{" "}
              <Link href="/due-diligence" className="font-medium text-[var(--accent)] underline-offset-4 hover:underline">
                Due Diligence section
              </Link>
              .
            </p>
          </div>
          <div className="mt-10">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Book a call
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
