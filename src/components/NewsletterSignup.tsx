import { site } from "@/lib/site";

export function NewsletterSignup() {
  return (
    <div className="space-y-3">
      <div className="font-semibold text-[var(--on-dark)]">Newsletter</div>
      <p className="text-sm leading-relaxed">
        Practical insights on buying and scaling digital assets.
      </p>
      <a
        href={site.newsletterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-500 px-5 text-base font-semibold text-white transition hover:bg-blue-600"
      >
        Our Substack Newsletter →
      </a>
    </div>
  );
}
