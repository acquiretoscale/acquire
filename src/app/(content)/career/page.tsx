import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Join Acquire To Scale. We're hiring a Senior Analyst for SaaS Acquisitions — remote, GMT ±2.",
  alternates: { canonical: "/career" },
};

export default function CareerPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            Career
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Join the team
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
        </div>
      </section>

      {/* Job listing */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <article className="space-y-10">
            <header>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                Senior Analyst – SaaS Acquisitions
              </h2>
              <p className="mt-2 text-lg text-[var(--muted)]">
                Remote (GMT ±2) | Base + Deal Commission
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                We are looking for a Senior Analyst for SaaS Acquisition. It&apos;s
                a remote job with possibility of part time.
              </p>
            </header>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Responsibilities
              </h3>
              <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--muted)] leading-relaxed" role="list">
                <li>Lead end-to-end due diligence on SaaS acquisitions</li>
                <li>Reconstruct and verify revenue (Stripe, Paddle, Chargebee, etc.)</li>
                <li>Validate MRR, ARR, churn (gross/net), NRR, cohort retention</li>
                <li>Analyze LTV:CAC, payback period, contribution margin</li>
                <li>Detect churn manipulation, revenue concentration risk, or inflated metrics</li>
                <li>Assess product & technical risk: code quality, scalability, infra, API dependencies, vendor lock-in</li>
                <li>Review customer acquisition channels (SEO, paid, affiliates, outbound, partnerships)</li>
                <li>Conduct market research & competitor benchmarking</li>
                <li>Map TAM, positioning, pricing defensibility</li>
                <li>Produce structured investment memos with clear recommendations</li>
                <li>Present findings directly to leadership</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Requirements
              </h3>
              <ul className="mt-4 list-inside list-disc space-y-2 text-[var(--muted)] leading-relaxed" role="list">
                <li>Have built, acquired, or operated a SaaS product (even small-scale)</li>
                <li>Strong understanding of SaaS economics & subscription metrics</li>
                <li>Comfortable reviewing codebases (GitHub) and infrastructure (AWS, Vercel, Supabase, etc.)</li>
                <li>Able to distinguish MVP/Vibe coded builds from scalable architecture</li>
                <li>GMT ±2 availability</li>
                <li>Knowledge of mobile apps / ASO / subscription mobile metrics (Optional but a great+)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Compensation
              </h3>
              <p className="mt-4 text-[var(--muted)] leading-relaxed">
                Base salary (negotiable depending on experience) + commission
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
              <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                To apply
              </h3>
              <p className="mt-3 text-[var(--muted)] leading-relaxed">
                Email CV + link to a SaaS you&apos;ve built/operated/acquired to
              </p>
              <a
                href="mailto:jobs@acquiretoscale.com?subject=Senior%20SaaS%20Analyst"
                className="mt-3 inline-block font-semibold text-[var(--accent)] transition hover:underline"
              >
                jobs@acquiretoscale.com
              </a>
              <p className="mt-4 text-sm text-[var(--muted)]">
                <strong>Subject line:</strong> &quot;Senior SaaS Analyst&quot;
              </p>
            </div>
          </article>

          <Link
            href="/"
            className="mt-12 inline-block font-medium text-[var(--accent)] transition hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
