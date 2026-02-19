import Link from "next/link";
import { LayoutGroup } from "motion/react";
import { ShimmerLink } from "@/components/ShimmerLink";
import { TextRotate } from "@/components/ui/text-rotate";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { PartnerLogos } from "@/components/PartnerLogos";
import { AssetIcon } from "@/components/AssetIcon";
import { ASSET_TYPES } from "@/lib/due-diligence";

export default function Home() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero - Mobile: stacked content first, image below. Desktop: content left, image right */}
      <section className="relative flex min-h-[45vh] flex-col justify-center overflow-hidden bg-[var(--surface-dark)] hero-pattern py-16 sm:py-20 md:min-h-[55vh] md:py-24 lg:py-28">
        <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            {/* Content - top on mobile, left on desktop */}
            <div className="min-w-0 flex-1 shrink-0 basis-auto text-center">
              <LayoutGroup>
                <h1 className="flex flex-col items-center text-center text-2xl font-bold tracking-tight text-[var(--on-dark)] sm:text-4xl md:text-5xl lg:text-6xl">
                  <span>Institutional-grade due diligence</span>
                  <span className="mt-1 inline-flex items-baseline justify-center sm:mt-0 sm:inline">
                    <span className="whitespace-nowrap">for{" "}
                      <TextRotate
                        texts={["Content Websites", "SaaS", "Youtube Channel", "Newsletter"]}
                        mainClassName="overflow-hidden px-1.5 py-0.5 text-[var(--on-dark)] sm:px-2 sm:py-1 shrink-0 inline"
                        splitBy="words"
                        splitLevelClassName="overflow-hidden"
                        staggerDuration={0.033}
                        staggerFrom="first"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 364 }}
                        rotationInterval={7013}
                      />
                    </span>.
                  </span>
                </h1>
              </LayoutGroup>
              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[var(--accent)] accent-line-on-dark sm:mt-4" aria-hidden />
              <p className="mt-4 text-base leading-relaxed text-[var(--on-dark-muted)] sm:mt-5 sm:text-lg md:text-xl">
                The missing layer between online business marketplaces and M&A firms.
                <br />
                Big-deal standards, built for small acquisitions.
              </p>
              {/* Buttons: full-width stacked on mobile for touch-friendly layout */}
              <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <ShimmerLink
                  href="#offer-for-the-buyer"
                  className="inline-flex h-12 min-h-[44px] items-center justify-center px-6 font-semibold text-white"
                  shimmerColor="rgba(76, 209, 227, 0.8)"
                  background="linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #2563eb)"
                  shimmerDuration="8s"
                  borderRadius="9999px"
                >
                  I&apos;m buying a business
                </ShimmerLink>
                <ShimmerLink
                  href="/seller-form"
                  className="inline-flex h-12 min-h-[44px] items-center justify-center border border-white/40 px-6 font-semibold text-[var(--on-dark)]"
                  shimmerColor="rgba(76, 209, 227, 0.2)"
                  background="transparent"
                  shimmerDuration="8s"
                  borderRadius="9999px"
                >
                  I&apos;m selling a business
                </ShimmerLink>
              </div>
            </div>
            {/* Image - below content on mobile, right on desktop */}
            <div className="flex shrink-0 justify-center lg:order-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-listings.png"
                alt="E-commerce and SaaS business listings with buy buttons"
                className="h-auto w-[160px] max-w-full rounded-lg border border-white/10 shadow-lg sm:w-[200px] lg:w-[240px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos - visible on landing */}
      <PartnerLogos />

      {/* Quote */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[var(--surface-dark-2)] py-16 md:py-20">
        <div className="relative mx-auto max-w-7xl px-3 py-4 text-center sm:px-4 md:px-6">
          <blockquote className="relative px-12 text-2xl font-medium leading-snug text-white md:px-16 md:text-3xl md:leading-snug">
            <span className="absolute left-2 top-0 font-serif text-7xl leading-none text-[var(--accent)]/50 md:left-4 md:text-8xl">&ldquo;</span>
            <span className="relative block text-center">
              Most sub-$100K online acquisitions don&apos;t need heavy legal frameworks—they need fast risk assessment, clean handover, and execution support. That&apos;s our focus.
              <span className="ml-1 inline-block font-serif align-baseline text-5xl leading-none text-[var(--accent)]/50 md:text-6xl">&rdquo;</span>
            </span>
          </blockquote>
        </div>
      </section>

      {/* Start Here CTA */}
      <section className="border-y border-white/10 bg-[var(--surface-dark-2)] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xl md:flex-row md:items-center md:gap-12 md:px-10 md:py-10 lg:gap-16 lg:px-12 lg:py-12">
            <div className="flex-1 px-6 py-8 md:px-0 md:py-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Clarity Call
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-[1.75rem]">
                First time buying an online business? Start here.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Buying or selling a digital asset can feel overwhelming.
                In a 1-on-1 Clarity Call, we&apos;ll evaluate your goals, review your investor profile, and outline the right acquisition strategy for you.
              </p>
            </div>
            <div className="shrink-0 border-t border-slate-200 px-6 py-8 md:border-l md:border-t-0 md:px-0 md:py-0 lg:pl-12">
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

      {/* Offer for Buyers & Sellers */}
      <section className="offer-section-bg relative overflow-hidden py-20 md:py-28">
        <div className="relative mx-auto max-w-7xl px-3 space-y-24 md:space-y-28 sm:px-4 md:px-6">
          {/* First: Offer for Buyers — list left, image right */}
          <div id="offer-for-the-buyer" className="flex flex-col items-center scroll-mt-20 rounded-xl border border-white/20 p-8 md:p-10">
            <h3 className="mb-3 text-center text-2xl font-bold uppercase tracking-wider text-white md:text-3xl lg:text-4xl">
              <span className="text-[var(--accent)]">BUYER-SIDE</span>
            </h3>
            <p className="mb-12 max-w-2xl text-center text-lg leading-relaxed text-[var(--on-dark-muted)]">
              Buy your first (or next) online business without the expensive lesson. We find the red flags marketplaces ignore and brokers hide.
            </p>
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-12">
              <ul className="min-w-0 flex-1 space-y-6" role="list">
                {[
                  { title: "Buyer fit assessment", desc: "Ensuring the deal matches your capital, skills, and risk tolerance" },
                  { title: "Deal review & due diligence", desc: "Filter bad deals fast: sanity checks, red flags, and risk assessment" },
                  { title: "Tech stack & traffic", desc: "Scalability, automation potential, and ease of delegation post-acquisition" },
                  { title: "P&L & valuation", desc: "Monetization quality, margins, and owner dependency" },
                  { title: "Post-acquisition operations & scaling", desc: "What breaks, what to fix first, and where to focus" },
                  { title: "Deal sourcing", desc: "Access to private and off-market opportunities" },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                    <div>
                      <span className="text-base font-bold uppercase tracking-wide text-white">{item.title}</span>
                      <p className="mt-1 text-base leading-relaxed text-[var(--on-dark-muted)]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="shrink-0 md:w-80 lg:w-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/due-diligence-report.png"
                  alt="Comprehensive due diligence report showing SEO, P&amp;L, MRR, and tech stack analysis"
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
            </div>
            <div className="mt-12 text-center">
              <ShimmerLink
                href="/due-diligence"
                className="inline-flex h-12 items-center justify-center px-8 font-bold uppercase tracking-wider text-white"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="var(--surface-dark-2)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                BUYER SERVICES
              </ShimmerLink>
            </div>
          </div>

          {/* Second: Offer for Sellers — image left, list right */}
          <div id="offer-for-the-seller" className="flex flex-col items-center scroll-mt-20 rounded-xl border border-white/20 p-8 md:p-10">
            <h3 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-white md:text-3xl lg:text-4xl">
              <span className="text-[var(--accent)]">SELLER-SIDE</span>
            </h3>
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-12">
              <div className="shrink-0 md:w-80 lg:w-96">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/seller-services.png"
                  alt="Comprehensive seller services: documentation audit, pre-exit scaling, listing readiness, strategic buyer access"
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
              <ul className="space-y-6" role="list">
                {[
                  { title: "Listing optimization", desc: "Helping serious buyers see the real opportunity faster" },
                  { title: "Listing readiness audit", desc: "Fixing documentation gaps that scare off buyers" },
                  { title: "Pre-sale fixes", desc: "Quick wins to improve multiples before listing" },
                  { title: "Pre-exit scaling", desc: "Mentorship to grow, structure, and scale your digital asset for an eventual exit" },
                  { title: "Strategic buyers", desc: "Access to strategic buyers paying higher multiples" },
                  { title: "Network access (with conditions)*", desc: "Anonymous introductions to qualified buyers in our network who are actively searching" },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                    <div>
                      <span className="text-base font-bold uppercase tracking-wide text-white">{item.title}</span>
                      <p className="mt-1 text-base leading-relaxed text-[var(--on-dark-muted)]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed text-[var(--on-dark-muted)]">
                <span className="font-semibold text-white">Selective introductions</span> — We only introduce a limited number of businesses that pass our in-depth screening and meet our investment criteria.{" "}
                <Link href="/seller-form" className="italic text-[var(--accent)] underline-offset-2 hover:underline">
                  (click here for details)
                </Link>
              </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <ShimmerLink
                href="/seller-form"
                className="inline-flex h-12 items-center justify-center px-8 font-bold uppercase tracking-wider text-white"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="var(--surface-dark-2)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                SELLER SERVICES
              </ShimmerLink>
            </div>
          </div>
        </div>
      </section>

      {/* What we focus on */}
      <section className="border-b border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
          <p className="text-base font-semibold uppercase tracking-widest text-[var(--on-dark-muted)] md:text-lg">
            What we focus on
          </p>
          <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-base font-medium text-white">
            We focus on assets with low to medium operational complexity that are easy to automate & scale:
          </p>
          <ul className="mt-8 space-y-3" role="list">
            {[
              "content-websites",
              "youtube-channels",
              "kdp-digital-products",
              "newsletters",
              "saas-apps",
            ].map((slug) => {
              const asset = ASSET_TYPES.find((a) => a.slug === slug);
              if (!asset) return null;
              const shortTitle = asset.title.replace(/^Due Diligence for /, "");
              return (
                <li key={asset.slug}>
                  <Link
                    href={`/due-diligence/${asset.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-[var(--card)] px-5 py-5 shadow-sm transition hover:border-[var(--accent)]/40 hover:shadow-lg md:gap-6 md:px-6 md:py-5"
                  >
                    <AssetIcon slug={asset.slug} />
                    <span className="min-w-0 flex-1 font-semibold text-white group-hover:text-[var(--accent)]">
                      {shortTitle}
                    </span>
                    <span className="shrink-0 text-base font-medium text-[var(--accent)]">
                      View details
                      <svg className="ml-1 inline h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Content blocks */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-6 px-3 md:space-y-8 sm:px-4 md:px-6">
          <div className="rounded-2xl border border-slate-200 bg-[var(--surface-dark-2)] p-8 shadow-lg md:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">For buyers</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              When <span className="text-[var(--accent)]">BUYERS</span> usually come to us
            </h2>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
            <ul className="mt-6 list-inside list-disc space-y-3 text-base text-[var(--on-dark-muted)] leading-relaxed" role="list">
              <li>First-time buyers who need expert assistance through the process</li>
              <li>You&apos;ve found a &quot;perfect&quot; deal on a marketplace, but the numbers look a little too clean</li>
              <li>You&apos;re tired of losing good deals to faster buyers because you&apos;re stuck in analysis paralysis and need expert help</li>
              <li>You have found a good deal but are not sure how to grow it</li>
              <li>You want an institutional-grade deal dissection before wiring the money</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-[var(--surface-dark-2)] p-8 shadow-lg md:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">For sellers</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              When <span className="text-[var(--accent)]">SELLERS</span> usually come to us
            </h2>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
            <ul className="mt-6 list-inside list-disc space-y-3 text-base text-[var(--on-dark-muted)] leading-relaxed" role="list">
              <li>You want to sell in the next 6–18 months and need a <strong>clear pre-exit plan</strong></li>
              <li>You&apos;re worried hidden risks or weak documentation will <strong>kill deals during diligence</strong></li>
              <li>You&apos;re open to strategic buyers but don&apos;t know <strong>how to position the business for them</strong></li>
              <li><em>You&apos;ve tried listing before but deals died in diligence and you don&apos;t know why</em></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-white/10 bg-[var(--surface-dark-2)] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
          <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-8 shadow-xl md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Why us?
            </h2>
            <ul className="mt-6 list-inside list-disc space-y-3 text-base text-[var(--on-dark-muted)] leading-relaxed" role="list">
              <li>Brokers work for sellers</li>
              <li>M&A firms won&apos;t touch deals under $1M and charge five-figure fees</li>
              <li>First-time buyers are left alone with spreadsheets and risk</li>
            </ul>
            <p className="mt-8 text-lg font-semibold text-white">
              M&A firms, marketplaces, and brokers want you to buy a deal. At Acquire To Scale, we want you to buy a deal that scales.
            </p>
            <p className="mt-4 text-base text-[var(--on-dark-muted)] leading-relaxed">
              At Acquire To Scale, we don&apos;t just read spreadsheets; we&apos;ve built, scaled, and exited the same assets you&apos;re buying. We offer clarity, confidence, and a roadmap for growth.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/due-diligence"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
              >
                Due Diligence
              </Link>
              <Link
                href="/buyer-form"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 px-6 font-semibold text-white transition hover:bg-white/10"
              >
                Get a Deal Reviewed
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Articles */}
      <FeaturedArticles />
    </div>
  );
}
