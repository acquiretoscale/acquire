import Link from "next/link";

export default function SellerFormThankYouPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Thank you for your inquiry.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
          We&apos;ve received your submission and will review it carefully.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
          You can expect a response within the next 24 hours.
        </p>
        <Link
          href="/"
          className="mt-12 inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
