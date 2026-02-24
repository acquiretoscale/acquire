import Link from "next/link";
import { LayoutGroup } from "motion/react";
import { ShimmerLink } from "@/components/ShimmerLink";
import { TextRotate } from "@/components/ui/text-rotate";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { PartnerLogos } from "@/components/PartnerLogos";
import { AssetIcon } from "@/components/AssetIcon";
import { ASSET_TYPES } from "@/lib/due-diligence";
import { getPageContent } from "@/lib/page-content";
import type {
  HeroBlock,
  QuoteBlock,
  CtaBlock,
  ServiceListBlock,
  BulletCardBlock,
  AssetFocusBlock,
  WhyUsBlock,
} from "@/lib/page-content";

export default async function Home() {
  const content = await getPageContent("home");
  const hero = content.hero as HeroBlock;
  const quote = content.quote as QuoteBlock;
  const clarityCta = content.clarity_cta as CtaBlock;
  const buyerSide = content.buyer_side as ServiceListBlock;
  const sellerSide = content.seller_side as ServiceListBlock;
  const assetFocus = content.asset_focus as AssetFocusBlock;
  const buyersScenario = content.buyers_scenario as BulletCardBlock;
  const sellersScenario = content.sellers_scenario as BulletCardBlock;
  const whyUs = content.why_us as WhyUsBlock;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section
        data-cms-block="home/hero"
        className="relative flex min-h-[45vh] flex-col justify-center overflow-hidden bg-[var(--surface-dark)] hero-pattern py-16 sm:py-20 md:min-h-[55vh] md:py-24 lg:py-28"
      >
        <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-16">
            <div className="min-w-0 flex-1 shrink-0 basis-auto text-center">
              <LayoutGroup>
                <h1 className="flex flex-col items-center text-center text-2xl font-bold tracking-tight text-[var(--on-dark)] sm:text-4xl md:text-5xl lg:text-6xl">
                  <span>{hero.heading}</span>
                  <span className="mt-1 inline-flex items-baseline justify-center sm:mt-0 sm:inline">
                    <span className="whitespace-nowrap">for{" "}
                      <TextRotate
                        texts={hero.rotating_texts ?? ["Content Websites", "SaaS", "Youtube Channel", "Newsletter"]}
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
                {hero.subheading}
                {hero.subheading_2 && <><br />{hero.subheading_2}</>}
              </p>
              <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
                <ShimmerLink
                  href={hero.cta_primary.href}
                  className="inline-flex h-12 min-h-[44px] items-center justify-center px-6 font-semibold text-white"
                  shimmerColor="rgba(76, 209, 227, 0.8)"
                  background="linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #2563eb)"
                  shimmerDuration="8s"
                  borderRadius="9999px"
                >
                  {hero.cta_primary.label}
                </ShimmerLink>
                {hero.cta_secondary && (
                  <ShimmerLink
                    href={hero.cta_secondary.href}
                    className="inline-flex h-12 min-h-[44px] items-center justify-center border border-white/40 px-6 font-semibold text-[var(--on-dark)]"
                    shimmerColor="rgba(76, 209, 227, 0.2)"
                    background="transparent"
                    shimmerDuration="8s"
                    borderRadius="9999px"
                  >
                    {hero.cta_secondary.label}
                  </ShimmerLink>
                )}
              </div>
            </div>
            <div className="flex shrink-0 justify-center lg:order-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.image_src ?? "/images/hero-listings.png"}
                alt={hero.image_alt ?? "Business listings"}
                className="h-auto w-[160px] max-w-full rounded-lg border border-white/10 shadow-lg sm:w-[200px] lg:w-[240px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner logos */}
      <PartnerLogos />

      {/* Quote */}
      <section
        data-cms-block="home/quote"
        className="relative overflow-hidden border-y border-white/10 bg-[var(--surface-dark-2)] py-16 md:py-20"
      >
        <div className="relative mx-auto max-w-7xl px-3 py-4 text-center sm:px-4 md:px-6">
          <blockquote className="relative px-12 text-2xl font-medium leading-snug text-white md:px-16 md:text-3xl md:leading-snug">
            <span className="absolute left-2 top-0 font-serif text-7xl leading-none text-[var(--accent)]/50 md:left-4 md:text-8xl">&ldquo;</span>
            <span className="relative block text-center">
              {quote.text}
              <span className="ml-1 inline-block font-serif align-baseline text-5xl leading-none text-[var(--accent)]/50 md:text-6xl">&rdquo;</span>
            </span>
          </blockquote>
        </div>
      </section>

      {/* Start Here CTA */}
      <section
        data-cms-block="home/clarity_cta"
        className="border-y border-white/10 bg-[var(--surface-dark-2)] py-16 md:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8">
          <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xl md:flex-row md:items-center md:gap-12 md:px-10 md:py-10 lg:gap-16 lg:px-12 lg:py-12">
            <div className="flex-1 px-6 py-8 md:px-0 md:py-0">
              {clarityCta.label && (
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  {clarityCta.label}
                </p>
              )}
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl lg:text-[1.75rem]">
                {clarityCta.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                {clarityCta.body}
              </p>
            </div>
            <div className="shrink-0 border-t border-slate-200 px-6 py-8 md:border-l md:border-t-0 md:px-0 md:py-0 lg:pl-12">
              <ShimmerLink
                href={clarityCta.button.href}
                className="group inline-flex h-12 min-h-[44px] w-full items-center justify-center gap-2 px-8 font-semibold text-white md:w-auto"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #2563eb)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                {clarityCta.button.label}
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
          {/* Offer for Buyers */}
          <div
            id="offer-for-the-buyer"
            data-cms-block="home/buyer_side"
            className="flex flex-col items-center scroll-mt-20 rounded-xl border border-white/20 p-8 md:p-10"
          >
            <h3 className="mb-3 text-center text-2xl font-bold uppercase tracking-wider text-white md:text-3xl lg:text-4xl">
              <span className="text-[var(--accent)]">{buyerSide.title}</span>
            </h3>
            {buyerSide.intro && (
              <p className="mb-12 max-w-2xl text-center text-lg leading-relaxed text-[var(--on-dark-muted)]">
                {buyerSide.intro}
              </p>
            )}
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-12">
              <ul className="min-w-0 flex-1 space-y-6" role="list">
                {buyerSide.items.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                    <div>
                      <span className="text-base font-bold uppercase tracking-wide text-white">{item.title}</span>
                      <p className="mt-1 text-base leading-relaxed text-[var(--on-dark-muted)]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {buyerSide.image_src && (
                <div className="shrink-0 md:w-80 lg:w-96">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={buyerSide.image_src}
                    alt={buyerSide.image_alt ?? ""}
                    className="h-auto w-full rounded-lg object-contain"
                  />
                </div>
              )}
            </div>
            <div className="mt-12 text-center">
              <ShimmerLink
                href={buyerSide.cta.href}
                className="inline-flex h-12 items-center justify-center px-8 font-bold uppercase tracking-wider text-white"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="var(--surface-dark-2)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                {buyerSide.cta.label}
              </ShimmerLink>
            </div>
          </div>

          {/* Offer for Sellers */}
          <div
            id="offer-for-the-seller"
            data-cms-block="home/seller_side"
            className="flex flex-col items-center scroll-mt-20 rounded-xl border border-white/20 p-8 md:p-10"
          >
            <h3 className="mb-12 text-center text-2xl font-bold uppercase tracking-wider text-white md:text-3xl lg:text-4xl">
              <span className="text-[var(--accent)]">{sellerSide.title}</span>
            </h3>
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-12">
              {sellerSide.image_src && (
                <div className="shrink-0 md:w-80 lg:w-96">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sellerSide.image_src}
                    alt={sellerSide.image_alt ?? ""}
                    className="h-auto w-full rounded-lg object-contain"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <ul className="space-y-6" role="list">
                  {sellerSide.items.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      <div>
                        <span className="text-base font-bold uppercase tracking-wide text-white">{item.title}</span>
                        <p className="mt-1 text-base leading-relaxed text-[var(--on-dark-muted)]">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                {sellerSide.note && (
                  <p className="mt-6 text-base leading-relaxed text-[var(--on-dark-muted)]">
                    <span className="font-semibold text-white">Selective introductions</span> — {sellerSide.note}{" "}
                    <Link href="/seller-form" className="italic text-[var(--accent)] underline-offset-2 hover:underline">
                      (click here for details)
                    </Link>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-12 text-center">
              <ShimmerLink
                href={sellerSide.cta.href}
                className="inline-flex h-12 items-center justify-center px-8 font-bold uppercase tracking-wider text-white"
                shimmerColor="rgba(76, 209, 227, 0.8)"
                background="var(--surface-dark-2)"
                shimmerDuration="8s"
                borderRadius="9999px"
              >
                {sellerSide.cta.label}
              </ShimmerLink>
            </div>
          </div>
        </div>
      </section>

      {/* What we focus on */}
      <section
        data-cms-block="home/asset_focus"
        className="border-b border-white/10 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
          <p className="text-base font-semibold uppercase tracking-widest text-[var(--on-dark-muted)] md:text-lg">
            {assetFocus.label}
          </p>
          <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-base font-medium text-white">
            {assetFocus.body}
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

      {/* Content blocks — When buyers/sellers come to us */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-6 px-3 md:space-y-8 sm:px-4 md:px-6">
          <div
            data-cms-block="home/buyers_scenario"
            className="rounded-2xl border border-slate-200 bg-[var(--surface-dark-2)] p-8 shadow-lg md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{buyersScenario.label}</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              When <span className="text-[var(--accent)]">BUYERS</span> usually come to us
            </h2>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
            <ul className="mt-6 list-inside list-disc space-y-3 text-base text-[var(--on-dark-muted)] leading-relaxed" role="list">
              {buyersScenario.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div
            data-cms-block="home/sellers_scenario"
            className="rounded-2xl border border-slate-200 bg-[var(--surface-dark-2)] p-8 shadow-lg md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{sellersScenario.label}</p>
            <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
              When <span className="text-[var(--accent)]">SELLERS</span> usually come to us
            </h2>
            <div className="mt-4 h-0.5 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
            <ul className="mt-6 list-inside list-disc space-y-3 text-base text-[var(--on-dark-muted)] leading-relaxed" role="list">
              {sellersScenario.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section
        data-cms-block="home/why_us"
        className="border-t border-white/10 bg-[var(--surface-dark-2)] py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
          <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-8 shadow-xl md:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              {whyUs.heading}
            </h2>
            <ul className="mt-6 list-inside list-disc space-y-3 text-base text-[var(--on-dark-muted)] leading-relaxed" role="list">
              {whyUs.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <p className="mt-8 text-lg font-semibold text-white">
              {whyUs.bold_statement}
            </p>
            <p className="mt-4 text-base text-[var(--on-dark-muted)] leading-relaxed">
              {whyUs.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={whyUs.cta_primary.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
              >
                {whyUs.cta_primary.label}
              </Link>
              <Link
                href={whyUs.cta_secondary.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/40 px-6 font-semibold text-white transition hover:bg-white/10"
              >
                {whyUs.cta_secondary.label}
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
