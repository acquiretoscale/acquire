"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

export default function BuyerFormPage() {
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
      const res = await fetch("/api/buyer-form", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/buyer-form/thank-you");
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
            Buyer intake
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Start your acquisition journey
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
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
                  Professional Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
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
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
              <div>
                <label htmlFor="howCanWeHelp" className="block text-sm font-medium text-[var(--foreground)]">
                  How can we help you today?
                </label>
                <p className="mt-1 text-sm text-[var(--muted)]">Don&apos;t hesitate to explain your situation.</p>
                <textarea
                  id="howCanWeHelp"
                  name="howCanWeHelp"
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                />
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Primary Asset Class <span className="text-red-500">*</span>
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">Select one</p>
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
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Target Budget</h3>
              <div className="mt-4 space-y-3">
                {["$5K–$20K", "$20K–$50K", "$50K–$100K", "$100K+"].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="targetBudget"
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
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Deal Details</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">If applicable</p>
              <div className="mt-4 space-y-6">
                <div>
                  <label htmlFor="dealUrl" className="block text-sm font-medium">Deal URL</label>
                  <input
                    id="dealUrl"
                    name="dealUrl"
                    type="url"
                    placeholder="https://..."
                    className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
                  />
                </div>
                <div>
                  <span className="block text-sm font-medium">How did you find it?</span>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {["Flippa", "Acquire.com", "Motion Invest", "Off-market", "Broker", "Other"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="howFound"
                          value={opt}
                          className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-sm font-medium">Stage</span>
                  <div className="mt-2 flex flex-wrap gap-4">
                    {[
                      "Still looking",
                      "Just found / Bidding",
                      "Under LOI",
                      "Deep in Due Diligence",
                    ].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="stage"
                          value={opt}
                          className="h-4 w-4 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-[var(--border)]" />

            <div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">Service Needed</h3>
              <div className="mt-4 space-y-3">
                {[
                  {
                    value: "Quick Deal Triage ($397)",
                    label: "Quick Deal Triage ($397) — 60-minute call with Adil: red flag assessment + go/no-go recommendation (Up to 10 deals)",
                  },
                  {
                    value: "Full Due Diligence ($1,497)",
                    label: "Full Due Diligence ($1,497) — 15–25 page DD report + 45-minute follow-up call",
                  },
                  {
                    value: "Extra Full DD ($997 each)",
                    label: "Extra Full due diligence ($997 each)",
                  },
                  {
                    value: "Deal Sourcing / Private Vault",
                    label: "Deal Sourcing / Private Vault Access — Pricing varies",
                  },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="serviceNeeded"
                      value={value}
                      className="mt-1 h-4 w-4 shrink-0 border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--muted)]">
                Something else? Drop us an email at{" "}
                <a href="mailto:hello@acquiretoscale.com" className="text-[var(--accent)] hover:underline">
                  hello@acquiretoscale.com
                </a>
              </p>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-white transition hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
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
