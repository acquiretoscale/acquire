"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const STORAGE_KEY = "acquiretoscale_cookie_consent";

type ConsentState = {
  marketing: boolean;
  essential: boolean;
} | null;

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (marketingValue: boolean, essentialValue: boolean) => {
    const state: ConsentState = { marketing: marketingValue, essential: essentialValue };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setIsVisible(false);
    // Dispatch event for analytics scripts to respect consent
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: state }));
  };

  const handleSave = () => saveConsent(marketing, true); // Essential always on
  const handleDeny = () => saveConsent(false, true); // Essential only
  const handleAcceptAll = () => saveConsent(true, true);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] w-[calc(100vw-2rem)] max-w-xs rounded-lg border border-slate-200 bg-white p-4 shadow-xl"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="cookie-consent-title" className="text-lg font-bold text-slate-800">
          Privacy Settings
        </h2>
        <Link
          href="/cookie-policy"
          className="shrink-0 rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="More information"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </Link>
      </div>

      <p id="cookie-consent-desc" className="mt-2 text-sm leading-relaxed text-slate-600">
        This site uses third-party website tracking technologies to provide and continually improve our services, and to display advertisements according to users&apos; interests. I agree and may revoke or change my consent at any time with effect for the future.
      </p>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <Link href="/privacy" className="text-[var(--accent)] underline-offset-2 hover:underline">
          Privacy Policy
        </Link>
        <Link href="/cookie-policy" className="text-[var(--accent)] underline-offset-2 hover:underline">
          More Information
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="cookie-marketing" className="text-sm font-medium text-slate-800">
            Marketing
          </label>
          <button
            id="cookie-marketing"
            type="button"
            role="switch"
            aria-checked={marketing}
            onClick={() => setMarketing((v) => !v)}
            className={`relative h-6 w-10 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-1 ${
              marketing ? "bg-[var(--accent)]" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                marketing ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="cookie-essential" className="text-sm font-medium text-slate-800">
            Essential
          </label>
          <div
            id="cookie-essential"
            role="img"
            aria-label="Essential cookies always on"
            className="relative h-6 w-10 shrink-0 rounded-full bg-[var(--accent)]"
          >
            <span className="absolute top-0.5 left-5 block h-4 w-4 rounded-full bg-white shadow" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-300"
        >
          Save Settings
        </button>
        <button
          type="button"
          onClick={handleDeny}
          className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Deny
        </button>
        <button
          type="button"
          onClick={handleAcceptAll}
          className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Accept All
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Powered by{" "}
        <Link
          href="https://usercentrics.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline-offset-1 hover:underline"
        >
          Usercentrics
        </Link>{" "}
        Consent Management
      </p>
    </div>
  );
}
