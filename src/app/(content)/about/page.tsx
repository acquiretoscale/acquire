import type { Metadata } from "next";
import { ShimmerLink } from "@/components/ShimmerLink";

export const metadata: Metadata = {
  title: "About",
  description:
    "Acquire To Scale democratizes institutional-grade due diligence for online business acquisitions under $100K. Operator-led, practical, and built for scalability.",
  alternates: {
    canonical: "/about",
  },
};

const COMPARISON_ROWS = [
  { component: "Minimum Deal Size", traditional: "$100K+", diy: "N/A", ats: "Under $100K" },
  { component: "Advisory Fees", traditional: "$10K – $125K+", diy: "$0", ats: "Flat, Performance-Based" },
  { component: "Due Diligence", traditional: "Institutional / Slow", diy: "Surface-level / Guessed", ats: "Practical / Operational" },
  { component: "Timeline", traditional: "1 – 3 Months", diy: "Instant (High Risk)", ats: "2 – 7 Days" },
  { component: "Main Risk Source", traditional: "Financing & Structure", diy: "Scams & Bad Assets", ats: "Mitigated Risk & Growth" },
  { component: "Post-Purchase", traditional: "Hands-off", diy: '"Figure it out"', ats: "30-Day Transition Plan" },
];

const WHY_CHOOSE = [
  {
    title: "Operator-Led Expertise",
    desc: "Benefit from real-world experience in building, growing, and exiting digital businesses.",
  },
  {
    title: "Unbiased Due Diligence",
    desc: "We work exclusively for buyers, ensuring our analysis is focused solely on your best interests.",
  },
  {
    title: "Focus on Scalability",
    desc: "Our insights go beyond initial profitability, guiding you toward assets with long-term growth potential.",
  },
  {
    title: "Personalized Support",
    desc: "From initial review to post-acquisition strategy, we are your trusted partner in the acquisition journey.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">About</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            About Acquire To Scale
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
        </div>
      </section>

      {/* Our Mission */}
      <section id="our-mission" className="scroll-mt-20 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            Our Mission: Empowering Confident Acquisitions in the Digital Age
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              The acquisition ecosystem is often designed for large transactions, where M&A firms, lawyers, and complex financial institutions are necessary. This infrastructure makes sense when millions are at stake. However, for online businesses under $100K, that same elaborate framework becomes friction, not protection.
            </p>
            <p>
              Most sub-$100K deals don&apos;t fail due to complex legal structures; they fail because buyers misjudge risk, overpay, or fundamentally misunderstand the asset they are acquiring. What these deals truly need isn&apos;t more paperwork, but rather clear, practical risk assessment and a smooth transition plan.
            </p>
            <p>
              At Acquire To Scale, our mission is to democratize institutional-grade due diligence for online business acquisitions under $100K. We believe that every aspiring entrepreneur and seasoned investor deserves the clarity, confidence, and strategic roadmap needed to make informed buying decisions and build a truly scalable portfolio. We exist to help you navigate the complexities of the digital acquisition landscape, uncover hidden risks, and identify assets with genuine growth potential.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t border-[var(--border)] bg-[var(--card)] py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            Why Traditional M&A Fails Sub-$100K Deals
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--muted)] leading-relaxed">
            Traditional advisory services are ill-equipped for the unique dynamics of smaller online business acquisitions. Here&apos;s how Acquire To Scale offers a tailored, effective alternative:
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--border)] bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--card-hover)]">
                  <th className="px-4 py-4 font-semibold text-[var(--foreground)]">Component</th>
                  <th className="px-4 py-4 font-semibold text-[var(--foreground)]">Traditional M&A Firm</th>
                  <th className="px-4 py-4 font-semibold text-[var(--foreground)]">DIY / Unassisted</th>
                  <th className="px-4 py-4 font-semibold text-[var(--accent)]">Acquire To Scale (&lt;$100k)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.component}
                    className={`border-b border-[var(--border)] ${i % 2 === 0 ? "bg-white" : "bg-[var(--card-hover)]/50"}`}
                  >
                    <td className="px-4 py-4 font-medium text-[var(--foreground)]">{row.component}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{row.traditional}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{row.diy}</td>
                    <td className="px-4 py-4 font-medium text-[var(--foreground)]">{row.ats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-base italic text-[var(--muted)]">
            Costs vary, figures shown are indicative. At smaller deal sizes, risk isn&apos;t legal — it&apos;s operational. If you&apos;re buying a $50K online business, spending $40K on advisors doesn&apos;t reduce risk — it just shifts it.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            Our Philosophy: Operators for Operators
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              We are not just advisors; we are operators. Our team understands the nuances of running and scaling online businesses because we&apos;ve been in your shoes. This deep, practical experience informs every aspect of our service, from spotting subtle red flags that others miss to identifying overlooked opportunities for post-acquisition growth.
            </p>
            <p>
              We believe that a successful acquisition isn&apos;t just about buying a good deal—it&apos;s about acquiring an asset that scales. Our commitment is to provide you with the strategic foresight and actionable intelligence to transform your acquisition into a thriving, automated, and scalable venture.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
            Why Choose Acquire To Scale?
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2" role="list">
            {WHY_CHOOSE.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{item.title}</h3>
                  <p className="mt-2 text-[var(--muted)] leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clarity Call CTA */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col rounded-xl border border-[var(--border-strong)] bg-white shadow-xl md:flex-row md:items-center md:gap-12 md:px-10 md:py-10 lg:gap-16 lg:px-12 lg:py-12">
            <div className="flex-1 px-6 py-8 md:px-0 md:py-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
                Clarity Call
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl lg:text-[1.75rem]">
                First time buying an online business? Start here.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
                Buying or selling a digital asset can feel overwhelming.
                In a 1-on-1 Clarity Call, we&apos;ll evaluate your goals, review your investor profile, and outline the right acquisition strategy for you.
              </p>
            </div>
            <div className="shrink-0 border-t border-[var(--border)] px-6 py-8 md:border-l md:border-t-0 md:px-0 md:py-0 lg:pl-12">
              <ShimmerLink
                href="/clarity-call"
                className="group inline-flex h-12 min-h-[44px] w-full items-center justify-center gap-2 px-8 font-semibold text-white md:w-auto"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #2563eb)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                Book Your Clarity Call
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
