import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Modern Slavery Act",
  description:
    "Modern Slavery Act statement for Quantum Humans Lab LTD and Acquire To Scale. Our commitment to preventing modern slavery and human trafficking in our business and supply chain.",
  alternates: { canonical: "/modern-slavery-act" },
};

export default function ModernSlaveryActPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Modern Slavery Act
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <article className="mx-auto max-w-3xl px-4">
          <div className="space-y-8 text-[var(--muted)] leading-relaxed">
            <p>
              Quantum Humans Lab LTD is a limited liability company registered in
              England and Wales (registered number 16289499). We are a provider of
              legal services and operate from the United Kingdom.
            </p>
            <p>
              As a provider of legal services, we do not have long or complex
              supply chains — our main suppliers are providers of office supplies
              and support services (such as reprographics, transcription
              services, printing and scanning), IT and technology services and
              equipment and facilities management. We are nevertheless committed
              to preventing acts of modern slavery and human trafficking from
              occurring within both our business and our supply chain. We expect
              all of our suppliers to conduct their business in a lawful and
              ethical manner, including adopting business practices that prevent
              or eliminate modern slavery and human trafficking from taking
              place.
            </p>
            <p>
              We develop relationships with our suppliers, and trust and
              transparency is embedded in everything we do. This is key to our
              approach to corporate responsibility, and in turn, combating modern
              slavery.
            </p>
            <p>
              We also require our suppliers, both current and prospective, to
              achieve certain standards in areas such as information risk,
              management of employees, legislative compliance, business
              continuity and environmental standards. If we identify a supplier
              or prospective supplier as being at risk of not achieving these
              standards (including in relation to compliance with the Modern
              Slavery Act 2015) then we work with them to address the risks. If
              we are not able to agree a resolution, this may lead to us ending
              our relationship with them.
            </p>
            <p>
              We have reviewed our procurement process to ensure consistency in
              our approach to engaging with suppliers and more transparency of
              their ways of working. We place a greater emphasis on corporate
              responsibility, environmental and diversity requirements. These
              reviews are ongoing so that we can ensure continuous improvement.
            </p>
            <p>
              Whilst we develop our approach to combating modern slavery and
              human trafficking we will continue to assess and manage any risks
              on an on-going basis. We will continue to apply the same high
              ethical standards to both our employees and suppliers with clear
              accountability for failing to meet them.
            </p>
          </div>
        </article>

        <div className="mx-auto mt-12 max-w-3xl px-4">
          <Link
            href="/"
            className="inline-block font-medium text-[var(--accent)] transition hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
