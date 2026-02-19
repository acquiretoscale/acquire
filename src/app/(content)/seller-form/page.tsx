"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

const INPUT_CLASS =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20";

export default function SellerFormPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/seller-form", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/seller-form/thank-you");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to submit. Please try again.");
    }
  }

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-base font-medium uppercase tracking-wider text-[var(--muted)]">
            Seller intake
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Start your exit journey
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            Please share as many details as possible to help us evaluate your situation and deliver the best help.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4">
          {status === "error" && (
            <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
              <p className="font-semibold">Something went wrong</p>
              <p className="mt-2">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[var(--foreground)]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input id="fullName" name="fullName" type="text" required className={INPUT_CLASS} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input id="email" name="email" type="email" required className={INPUT_CLASS} />
              </div>
              <div>
                <label htmlFor="linkedIn" className="block text-sm font-medium text-[var(--foreground)]">
                  LinkedIn Profile <span className="text-[var(--muted)]">(Optional)</span>
                </label>
                <input
                  id="linkedIn"
                  name="linkedIn"
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="assetUrl" className="block text-sm font-medium text-[var(--foreground)]">
                  Digital asset URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="assetUrl"
                  name="assetUrl"
                  type="url"
                  required
                  placeholder="https://..."
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Primary Asset Class <span className="text-red-500">*</span>
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  "SaaS / Web Apps",
                  "Content Sites (Affiliate, Ad-Based)",
                  "Newsletters / Substacks",
                  "E-commerce (Shopify, Amazon)",
                  "YouTube / Video Channels",
                  "KDP / Digital Products",
                  "Other",
                ].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="primaryAsset"
                      value={opt}
                      required
                      className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span>{opt}</span>
                    {opt === "Other" && (
                      <input
                        type="text"
                        name="primaryAssetOther"
                        placeholder="Please specify"
                        className="ml-2 flex-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400"
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Project age</h3>
              <div className="mt-4 space-y-3">
                {["Less than a year", "2 to 5 years", "5 years +"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="projectAge"
                      value={opt}
                      className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Avg. Monthly Profit</h3>
              <div className="mt-4 space-y-3">
                {["Under $500", "$500 – $2K", "$2K – $5K", "$5K – $30K", "$30K+"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="avgMonthlyProfit"
                      value={opt}
                      className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Are you planning to sell?</h3>
              <div className="mt-4 space-y-3">
                {[
                  "Now",
                  "3–6 months",
                  "6–12 months",
                  "Just exploring",
                ].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="planningToSell"
                      value={opt}
                      className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">What do you need help with?</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">Select all that apply</p>
              <div className="mt-4 space-y-3">
                {[
                  "Listing optimization",
                  "Listing readiness audit",
                  "Pre-sale fixes",
                  "Pre-exit scaling",
                  "Strategic buyer positioning",
                  "General exit planning",
                ].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="helpWith"
                      value={opt}
                      className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-[var(--foreground)]">
                Any detail that helps us understand better the situation?
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={5}
                placeholder="Share any relevant details..."
                className={INPUT_CLASS}
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
