const PARTNERS = [
  { name: "Microns", src: "/images/partners/microns.png", href: "https://microns.io" },
  { name: "Motion Invest", src: "/images/partners/motion-invest.png", href: "https://motioninvest.com" },
  { name: "LetterTrader", src: "/images/partners/lettertrader.png", href: "https://lettertrader.com" },
  { name: "Acquire.com", src: "/images/partners/acquire.png", href: "https://acquire.com" },
  { name: "Empire Flippers", src: "/images/partners/empire-flippers.png", href: "https://empireflippers.com" },
  { name: "Flippa", src: "/images/partners/flippa.png", href: "https://flippa.com" },
] as const;

export function PartnerLogos() {
  return (
    <section
      className="border-y border-slate-200/80 bg-slate-50/95 py-6 md:py-8"
      aria-label="Trusted partners and marketplaces"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
          Ecosystem We Work In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 md:gap-x-12">
          {PARTNERS.map(({ name, src, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-7 items-center transition-opacity hover:opacity-100 md:h-8"
              style={{ opacity: 0.75 }}
            >
              <img
                src={src}
                alt={name}
                className="max-h-full w-auto max-w-[120px] object-contain object-center grayscale transition duration-200 group-hover:grayscale-0 md:max-w-[140px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
