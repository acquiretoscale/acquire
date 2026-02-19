import Link from "next/link";
import { ASSET_TYPES } from "@/lib/due-diligence";
import { CookiePreferencesLink } from "@/components/CookiePreferencesLink";


export function SiteFooter() {
  return (
    <footer className="bg-[var(--surface-dark)] text-[var(--on-dark-muted)]">
      <div className="mx-auto max-w-6xl px-3 py-14 md:py-16 sm:px-4">
        {/* Brand + Incorporation Partner + Search */}
        <div className="mb-12 grid grid-cols-1 items-start gap-6 pb-10 border-b border-white/10 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <div className="font-bold text-[var(--on-dark)] text-xl">
              Acquire To Scale
            </div>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[var(--on-dark-muted)]">
              The missing layer between online business marketplaces and M&A firms.
              <br />
              Big&#8209;deal standards, built for small acquisitions.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[var(--on-dark-muted)]">
              Incorporation Partner
            </span>
            <a
              href="https://www.1stformations.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-white px-3 py-2 transition opacity-90 hover:opacity-100"
              aria-label="1st Formations – Incorporation Partner"
            >
              <img
                src="/images/partners/1st-formations.png"
                alt="1st Formations"
                className="h-8 w-auto object-contain"
              />
            </a>
          </div>
          <div className="flex flex-col items-end justify-center">
            <form action="/search" method="GET" className="w-full max-w-[240px]" role="search">
              <label htmlFor="footer-search-q" className="sr-only">
                Search
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-search-q"
                  type="search"
                  name="q"
                  placeholder="Search"
                  className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-[13px] text-[var(--on-dark)] placeholder:text-[var(--on-dark-muted)]/70 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
                  aria-label="Search"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-white/10 px-4 py-2 text-[13px] font-medium text-[var(--on-dark)] transition hover:bg-white/15"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Four columns at same level */}
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--on-dark)]">
              Get in touch
            </div>
            <address className="not-italic">
              <p className="text-[13px] leading-relaxed text-[var(--on-dark-muted)]">
                128, City Road EC1V 2NX London,
              </p>
              <p className="mt-2 text-[13px]">
                <span className="text-[var(--on-dark-muted)]">GLOBAL: </span>
                <a href="mailto:contact@acquiretoscale.com" className="transition hover:text-[var(--on-dark)]">
                  contact@acquiretoscale.com
                </a>
              </p>
              <p className="mt-1 text-[13px]">
                <span className="text-[var(--on-dark-muted)]">LATAM </span>
                <a href="mailto:latam@acquiretoscale.com" className="transition hover:text-[var(--on-dark)]">
                  latam@acquiretoscale.com
                </a>
              </p>
            </address>
          </div>
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--on-dark)]">
              For buyers
            </div>
            <ul className="space-y-2.5 text-[13px]" role="list">
              <li>
                <Link href="/due-diligence" className="transition hover:text-[var(--on-dark)]">
                  Due Diligence
                </Link>
              </li>
              {ASSET_TYPES.map((asset) => (
                <li key={asset.slug}>
                  <Link
                    href={`/due-diligence/${asset.slug}`}
                    className="transition hover:text-[var(--on-dark)]"
                  >
                    {asset.title.replace(/^Due Diligence for /, "")}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/due-diligence#deal-sourcing" className="transition hover:text-[var(--on-dark)]">
                  Deal Sourcing
                </Link>
              </li>
              <li>
                <Link href="/clarity-call" className="transition hover:text-[var(--on-dark)]">
                  Clarity Call
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--on-dark)]">
              For sellers
            </div>
            <ul className="space-y-2.5 text-[13px]" role="list">
              <li>
                <Link href="/seller-form" className="transition hover:text-[var(--on-dark)]">
                  Sell your business
                </Link>
              </li>
              <li>
                <Link href="/clarity-call" className="transition hover:text-[var(--on-dark)]">
                  Clarity Call
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--on-dark)]">
              For scalers
            </div>
            <ul className="space-y-2.5 text-[13px]" role="list">
              <li>
                <Link href="/scaling" className="transition hover:text-[var(--on-dark)]">
                  Scaling Advisory & Mentorship
                </Link>
              </li>
              <li>
                <Link href="/global-operations" className="transition hover:text-[var(--on-dark)]">
                  Global Operations & Infrastructure
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--on-dark)]">
                Resources
              </div>
              <ul className="space-y-2.5 text-[13px]" role="list">
                <li>
                  <Link href="/blog" className="transition hover:text-[var(--on-dark)]">
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://acquiretoscale.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-orange-500/60 bg-orange-500 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-orange-600 hover:border-orange-600"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                    </svg>
                    Substack Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-[var(--on-dark)]">
                Company
              </div>
              <ul className="space-y-2.5 text-[13px]" role="list">
                <li>
                  <Link href="/about" className="transition hover:text-[var(--on-dark)]">
                    About Us
                  </Link>
                </li>
              <li>
                <Link href="/career" className="transition hover:text-[var(--on-dark)]">
                  Career (We&apos;re hiring)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-[var(--on-dark)]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-6 text-[13px]">
          <Link href="/privacy" className="transition hover:text-[var(--on-dark)]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-[var(--on-dark)]">
            Terms of Use
          </Link>
          <Link href="/modern-slavery-act" className="transition hover:text-[var(--on-dark)]">
            Modern Slavery Act
          </Link>
          <Link href="/cookie-policy" className="transition hover:text-[var(--on-dark)]">
            Cookie Policy
          </Link>
          <CookiePreferencesLink />
        </div>
      </div>
      <div className="border-t border-white/10 bg-[var(--surface-dark-2)] px-3 py-4 sm:px-4">
        <div className="mx-auto max-w-6xl text-center text-[13px] text-[var(--on-dark-muted)]">
          <a
            href="https://www.acquiretoscale.com"
            className="hover:text-white hover:underline"
          >
            Acquiretoscale.com
          </a>
          {" is part of Quantum Humans Lab LTD (UK Company No: "}
          <a
            href="https://find-and-update.company-information.service.gov.uk/company/16289499"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline"
          >
            16289499
          </a>
          {")"}
        </div>
      </div>
    </footer>
  );
}
