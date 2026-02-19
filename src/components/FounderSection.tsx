import Image from "next/image";
import Link from "next/link";

type FounderSectionProps = {
  id?: string;
  imageSrc?: string;
};

export function FounderSection({ id = "about-the-founder", imageSrc = "/images/adil-mafhoum.png" }: FounderSectionProps) {
    return (
        <section id={id} className="scroll-mt-20 border-t border-[var(--border)] bg-[var(--card)] py-10 md:py-12">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
                    {/* Portrait — large, same height as text block */}
                    <div className="relative mx-auto w-full shrink-0 md:mx-0 md:h-[min(400px,60vh)] md:w-[min(400px,45%)] md:min-w-[280px]">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full md:w-full">
                            <Image
                                src={imageSrc}
                                alt="Adil Mafhoum — Founder & Lead Analyst"
                                fill
                                sizes="(max-width: 768px) 100vw, min(400px, 45vw)"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Content — do not change the copy below */}
                    <div className="min-w-0 flex-1 text-center md:text-left">
                        <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)] md:text-xl">
                            About the founder
                        </h2>
                        <p className="mt-1 text-base font-medium text-[var(--muted)]">Adil Maf — Founder & Lead Analyst</p>
                        <div className="mt-0.5 h-0.5 w-10 bg-[var(--accent)]" aria-hidden />
                        <div className="mt-4 space-y-3 text-base leading-relaxed text-[var(--muted)]">
                            <p>
                                Adil is a <strong className="font-medium text-[var(--foreground)]">serial entrepreneur and investor</strong> and Board member of 7 figures businesses. <strong className="font-medium text-[var(--foreground)]">Real-world experience building, growing, and exiting digital businesses.</strong>
                            </p>
                            <p className="italic">
                                Having mentored over 2,000 entrepreneurs across 60+ countries, Adil has built a global audience of 40,000+ subscribers across socials where he shares tactical frameworks for online business growth.
                            </p>
                            <p>
                                His approach to due diligence is <strong className="font-medium text-[var(--foreground)]">operator-led,</strong> the same framework he uses when evaluating deals for himself and consulting clients.
                            </p>
                            <p>
                                His mission with Acquire To Scale is to provide the institutional-grade due diligence he wished he had when he started <strong className="font-medium text-[var(--foreground)]">his own acquisition journey in 2011.</strong>
                            </p>
                        </div>
                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                            <Link
                                href="https://www.youtube.com/adilmaf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                YouTube
                            </Link>
                            <Link
                                href="https://acquiretoscale.substack.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-orange-500/60 bg-orange-500 px-4 text-base font-semibold text-white transition hover:bg-orange-600"
                            >
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                                </svg>
                                Substack
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
