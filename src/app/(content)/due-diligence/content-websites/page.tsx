import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Due Diligence for Content Websites",
  description:
    "Operator-level due diligence for content websites: red flags, traffic & SEO health, monetization, financials. 15–25 page report in 48–72h. Optional 60-min Clarity Call.",
  alternates: { canonical: "/due-diligence/content-websites" },
};

export default function ContentWebsitesPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Back + Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--card)] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/due-diligence"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Due Diligence
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Content Website Due Diligence
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]">
            We focus on uncovering hidden risks, validating sustainability. Our goal is to help you
            make a confident <strong>go / no-go decision before wiring the money</strong>.
          </p>
        </div>
      </section>

      {/* What you get — one block, one line per item */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] md:text-2xl">
            What you get
          </h2>
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <ul className="space-y-3 text-[var(--foreground)]" role="list">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                Clear red flags, risks, and deal-breakers
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                Practical insights on ease of operation and scalability
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What We Review — one block, styled */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            What We Review
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
            <ul className="divide-y divide-white/10" role="list">
              <li className="flex gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Niche & Business Quality</p>
                  <ul className="mt-2 space-y-1 text-[var(--muted)]" role="list">
                    <li>Niche durability and competitive landscape</li>
                    <li>Monetization depth and expansion opportunities</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Traffic & SEO Health</p>
                  <ul className="mt-2 space-y-1 text-[var(--muted)]" role="list">
                    <li>Traffic trends and volatility</li>
                    <li>SEO quality and risk factors</li>
                    <li>Signs of manipulation, shortcuts, or past penalties</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Content & Operations</p>
                  <ul className="mt-2 space-y-1 text-[var(--muted)]" role="list">
                    <li>Content quality</li>
                    <li>Author dependency</li>
                    <li>Ease of delegation and automation post-acquisition</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Monetization & Revenue</p>
                  <ul className="mt-2 space-y-1 text-[var(--muted)]" role="list">
                    <li>Monetization models, longevity and risks</li>
                    <li>Opportunities to improve RPM and diversify income</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">Financials & Valuation</p>
                  <ul className="mt-2 space-y-1 text-[var(--muted)]" role="list">
                    <li>P&L review and earnings quality</li>
                    <li>Validation of add-backs and expenses</li>
                    <li>Valuation multiple vs comparable deals</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-4 px-6 py-5 md:gap-6 md:px-8 md:py-6">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <p className="font-semibold text-[var(--foreground)]">
                    60 Minutes Clarity Call — Walkthrough of the report
                  </p>
                  <ul className="mt-2 space-y-1 text-[var(--muted)]" role="list">
                    <li>Negotiation angle</li>
                    <li>Post-acquisition priorities</li>
                    <li>Risk mitigation plan</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works — numbered steps */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            How It Works
          </h2>
          <div className="mt-10 space-y-6">
            {[
              {
                title: "Submit the Asset & Place the Order",
                body: "You complete a short intake form with details about the content website you're evaluating and place your order.",
              },
              {
                title: "Access & Clarification",
                body: "Our team reaches out to request any additional information and analytics access (if available), and to clarify key points related to the asset.",
              },
              {
                title: "Due Diligence Review",
                body: "Once all required elements are received, we perform a full operator-level review of the business.",
              },
                {
                title: "Report Delivery (48–72h)",
                body: "You receive a 15–25 page written report within 48 to 72 hours after all elements are provided.",
                highlight: true,
              },
              {
                title: "1-on-1 Clarity Call (60 minutes)",
                body: "We walk through the findings and what's next.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm md:gap-8 md:p-8"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-bold text-white"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className={`mt-2 leading-relaxed ${step.highlight ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
                    {step.highlight ? (
                      <>
                        You receive a <strong>15–25 page written report</strong> within{" "}
                        <strong>48 to 72 hours</strong> after all elements are provided.
                      </>
                    ) : (
                      step.body
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-10">
            <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
              Pricing
            </p>
            <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-5xl">$1,997</p>
            <Link
              href="/buyer-form"
              className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-8 py-4 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Place the order
            </Link>
          </div>
        </div>
      </section>

      {/* Footer link */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4">
          <Link
            href="/due-diligence"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:underline"
          >
            View all asset types
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
