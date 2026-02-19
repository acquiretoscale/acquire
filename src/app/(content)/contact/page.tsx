import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Acquire To Scale to start your buyer profile and matching plan. Book a call or send an email.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">Get in touch</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Start your acquisition journey
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
            Book a call to discuss your buyer profile, acquisition goals, and how we can help you find and scale the right digital asset.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold">What to expect</h2>
                <p className="mt-2 text-base text-[var(--muted)]">
                  In our initial call we’ll cover:
                </p>
                <ul className="mt-4 space-y-2 text-base text-[var(--muted)]" role="list">
                  {[
                    "Your acquisition goals and budget",
                    "Experience level and skill set",
                    "Desired involvement (passive vs hands-on)",
                    "Risk tolerance and growth expectations",
                    "Types of assets you’re interested in",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-elevated rounded-2xl p-6">
                <div className="font-bold">No commitment required</div>
                <p className="mt-2 text-base text-[var(--muted)] leading-relaxed">
                  Exploratory call to see if we’re a good fit. No hype, no pressure.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold">Contact us</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-sm font-medium text-[var(--muted)]">Email</div>
                    <a
                      href={`mailto:${site.contactEmail}`}
                      className="mt-1 block font-medium text-[var(--accent)] hover:underline"
                    >
                      {site.contactEmail}
                    </a>
                  </div>
                  <div>
                    <div className="text-base font-medium text-[var(--muted)]">Book a call</div>
                    <p className="mt-1 text-base text-[var(--muted)]">
                      Email us to schedule a call. We’ll respond within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-elevated rounded-2xl p-6">
                <div className="font-bold">What happens next?</div>
                <ol className="mt-4 space-y-3 text-base text-[var(--muted)]" role="list">
                  {[
                    "We review your profile and goals",
                    "Identify matching opportunities",
                    "Provide a tailored acquisition plan",
                    "Support you through the process",
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-light)] text-sm font-bold text-[var(--accent)]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="card-elevated rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold">Ready to explore acquisitions?</h2>
            <p className="mt-3 text-[var(--muted)]">
              Email{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="font-semibold text-[var(--accent)] hover:underline"
              >
                {site.contactEmail}
              </a>{" "}
              to book a call. We’ll get back within 24 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
