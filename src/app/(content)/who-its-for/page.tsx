import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who it's for",
  description:
    "Acquiretoscale is built for first-time buyers, entrepreneurs, investors, and operators looking to acquire and scale small online businesses.",
  alternates: {
    canonical: "/who-its-for",
  },
};

export default function WhoItsForPage() {
  const audiences = [
    {
      title: "First-time buyers",
      description:
        "You want clarity and protection. You're considering buying an online business but need guidance on what to look for, how to evaluate deals, and how to avoid common pitfalls.",
      benefits: [
        "Clear, jargon-free explanations",
        "Protection from bad deals",
        "Step-by-step guidance",
        "Risk assessment and mitigation",
      ],
    },
    {
      title: "Entrepreneurs",
      description:
        "You prefer buying traction over starting from zero. You want to acquire a business with existing revenue and customers, then scale it rather than building from scratch.",
      benefits: [
        "Skip the initial build phase",
        "Acquire proven revenue streams",
        "Focus on growth, not validation",
        "Faster path to scale",
      ],
    },
    {
      title: "Investors",
      description:
        "You're looking for small digital assets with upside. You want to acquire online businesses that can be improved and scaled, creating value through operational improvements.",
      benefits: [
        "Small asset acquisition opportunities",
        "Clear scaling potential assessment",
        "Operational improvement focus",
        "Value creation through execution",
      ],
    },
    {
      title: "Operators",
      description:
        "You want businesses you can realistically improve. You have the skills and time to operate and scale a business, but need help finding the right acquisition target.",
      benefits: [
        "Skills-matched opportunities",
        "Realistic improvement potential",
        "Operational complexity assessment",
        "Post-acquisition scaling support",
      ],
    },
  ];

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            <p className="text-sm font-medium text-[var(--muted)]">
              Who we serve
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Built for buyers who want the right fit
            </h1>
            <p className="text-lg text-[var(--muted)]">
              Acquiretoscale is designed for different types of buyers, each with
              unique needs and goals. We match you with opportunities that align
              with your profile, not just any available deal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-12">
            {audiences.map((audience, idx) => (
              <div
                key={audience.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {audience.title}
                  </h2>
                  <p className="text-lg text-[var(--muted)]">
                    {audience.description}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {audience.benefits.map((benefit, benefitIdx) => (
                      <div
                        key={benefitIdx}
                        className="flex items-start gap-2 text-base text-[var(--muted)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-hover)] p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                What makes us different
              </h2>
              <p className="text-[var(--muted)]">
                Unlike brokers or marketplaces, we work exclusively for buyers:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Buyer-first",
                    desc: "We work for you, not sellers. Our job is to protect your interests and improve outcomes.",
                  },
                  {
                    title: "Fit over volume",
                    desc: "We prioritize the right deal for your profile, even if that means passing on 'good looking' opportunities.",
                  },
                  {
                    title: "Independent",
                    desc: "We're not a marketplace and not a broker. We don't push deals—we find the right fit.",
                  },
                  {
                    title: "Execution-focused",
                    desc: "After closing, we help you focus on practical, proven improvements with the highest leverage.",
                  },
                ].map((item) => (
                  <div key={item.title} className="space-y-1">
                    <div className="font-semibold text-[var(--foreground)]">
                      {item.title}
                    </div>
                    <p className="text-sm text-[var(--muted)]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card-hover)] p-8 md:flex-row md:items-center">
            <div>
              <div className="text-lg font-semibold">
                Think you might be a fit?
              </div>
              <p className="mt-1 text-base text-[var(--muted)]">
                Get a buyer profile assessment and see what opportunities match
                your situation.
              </p>
            </div>
            <Link
              href="/buyer-form"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-5 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
