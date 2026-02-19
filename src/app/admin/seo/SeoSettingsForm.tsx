"use client";

import { useState, useEffect } from "react";

type Settings = {
  ga4MeasurementId: string | null;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  aiOptimizationEnabled: boolean;
  allowAiTraining: boolean;
  gtmContainerId: string | null;
  facebookPixelId: string | null;
  tiktokPixelId: string | null;
  googleAdsConversionId: string | null;
  googleAdsConversionLabel: string | null;
  metaTitleOverride: string | null;
  metaDescriptionOverride: string | null;
};

const DEFAULT: Settings = {
  ga4MeasurementId: null,
  googleSiteVerification: null,
  bingSiteVerification: null,
  aiOptimizationEnabled: true,
  allowAiTraining: true,
  gtmContainerId: null,
  facebookPixelId: null,
  tiktokPixelId: null,
  googleAdsConversionId: null,
  googleAdsConversionLabel: null,
  metaTitleOverride: null,
  metaDescriptionOverride: null,
};

export function SeoSettingsForm({ demoMode }: { demoMode: boolean }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          ga4MeasurementId: data.ga4MeasurementId ?? null,
          googleSiteVerification: data.googleSiteVerification ?? null,
          bingSiteVerification: data.bingSiteVerification ?? null,
          aiOptimizationEnabled: data.aiOptimizationEnabled !== false,
          allowAiTraining: data.allowAiTraining !== false,
          gtmContainerId: data.gtmContainerId ?? null,
          facebookPixelId: data.facebookPixelId ?? null,
          tiktokPixelId: data.tiktokPixelId ?? null,
          googleAdsConversionId: data.googleAdsConversionId ?? null,
          googleAdsConversionLabel: data.googleAdsConversionLabel ?? null,
          metaTitleOverride: data.metaTitleOverride ?? null,
          metaDescriptionOverride: data.metaDescriptionOverride ?? null,
        });
      })
      .catch(() => setSettings(DEFAULT))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setMessage({ type: "success", text: "Settings saved." });
    } else {
      setMessage({ type: "error", text: data.error || "Failed to save" });
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <p className="text-[var(--muted)]">Loading settings…</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {demoMode && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Demo mode.</strong> SEO settings are not persisted. Configure Supabase and run the{" "}
          <code className="rounded bg-amber-100 px-1">site_settings</code> migration to save from this dashboard.
        </div>
      )}

      {message && (
        <p
          className={`rounded-lg p-3 text-sm ${
            message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"
          }`}
          role="alert"
        >
          {message.text}
        </p>
      )}

      {/* 1. AI-Friendly Content Optimization */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          AI-Friendly Content Optimization
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Improves how search engines and AI/LLM crawlers (e.g. Google SGE, Bing Chat, ChatGPT) index and cite your site.
        </p>
        <ul className="mt-3 list-inside list-disc text-sm text-[var(--muted)]">
          <li>Structured data (JSON-LD) and clear meta are already used site-wide.</li>
          <li>Robots meta allows max-snippet and image preview for rich results.</li>
          <li>Optional: allow or disallow AI training use of your content.</li>
        </ul>
        <div className="mt-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={settings.aiOptimizationEnabled}
              onChange={(e) =>
                setSettings((s) => ({ ...s, aiOptimizationEnabled: e.target.checked }))
              }
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <span className="text-sm text-[var(--foreground)]">
              Enable AI-friendly meta and crawler hints
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={settings.allowAiTraining}
              onChange={(e) =>
                setSettings((s) => ({ ...s, allowAiTraining: e.target.checked }))
              }
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <span className="text-sm text-[var(--foreground)]">
              Allow AI/LLM training (e.g. <code className="rounded bg-[var(--card-hover)] px-1">GPTBot</code>, <code className="rounded bg-[var(--card-hover)] px-1">ClaudeBot</code>). Uncheck to disallow.
            </span>
          </label>
        </div>
      </section>

      {/* 2. Bing Webmaster Tools */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Bing Webmaster Tools
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Verify ownership and get indexing insights.{" "}
          <a
            href="https://www.bing.com/webmasters"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Bing Webmaster Tools →
          </a>
        </p>
        <label className="mt-3 block text-sm font-medium text-[var(--foreground)]">
          Verification meta content
        </label>
        <input
          type="text"
          value={settings.bingSiteVerification ?? ""}
          onChange={(e) =>
            setSettings((s) => ({ ...s, bingSiteVerification: e.target.value || null }))
          }
          placeholder="Paste the content value from the meta tag (e.g. 0A1B2C3D…)"
          className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          From: <code className="rounded bg-[var(--card-hover)] px-1">&lt;meta name=&quot;msvalidate.01&quot; content=&quot;YOUR_CODE&quot; /&gt;</code>
        </p>
      </section>

      {/* 3. Google Tag Manager */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Google Tag Manager
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Central tag management. When set, GTM loads first and handles GA4, pixels, and ads via your container. Leave blank to use direct GA4/pixel/ads config below.{" "}
          <a
            href="https://tagmanager.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            GTM →
          </a>
        </p>
        <label className="mt-3 block text-sm font-medium text-[var(--foreground)]">
          Container ID
        </label>
        <input
          type="text"
          value={settings.gtmContainerId ?? ""}
          onChange={(e) =>
            setSettings((s) => ({ ...s, gtmContainerId: e.target.value.trim() || null }))
          }
          placeholder="GTM-XXXXXXX"
          className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </section>

      {/* 4. Google Analytics 4 */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Google Analytics 4
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Track traffic and engagement. Use when GTM is not configured.{" "}
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            GA4 Admin →
          </a>
        </p>
        <label className="mt-3 block text-sm font-medium text-[var(--foreground)]">
          Measurement ID
        </label>
        <input
          type="text"
          value={settings.ga4MeasurementId ?? ""}
          onChange={(e) =>
            setSettings((s) => ({ ...s, ga4MeasurementId: e.target.value.trim() || null }))
          }
          placeholder="G-XXXXXXXXXX"
          className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </section>

      {/* 5. Facebook & TikTok Pixels */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Facebook & TikTok Pixels
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Conversion tracking and remarketing. Loaded directly when GTM is not set.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              value={settings.facebookPixelId ?? ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, facebookPixelId: e.target.value.trim() || null }))
              }
              placeholder="123456789012345"
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              TikTok Pixel ID
            </label>
            <input
              type="text"
              value={settings.tiktokPixelId ?? ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, tiktokPixelId: e.target.value.trim() || null }))
              }
              placeholder="XXXXXXXXXXXXXX"
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
        </div>
      </section>

      {/* 6. Google Ads */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Google Ads Conversion
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Track conversions from Google Ads. Use when GTM is not configured. Both ID and label are required.{" "}
          <a
            href="https://ads.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Google Ads →
          </a>
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Conversion ID
            </label>
            <input
              type="text"
              value={settings.googleAdsConversionId ?? ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, googleAdsConversionId: e.target.value.trim() || null }))
              }
              placeholder="AW-XXXXXXXXXX"
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Conversion Label
            </label>
            <input
              type="text"
              value={settings.googleAdsConversionLabel ?? ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, googleAdsConversionLabel: e.target.value.trim() || null }))
              }
              placeholder="xxxxxxxx"
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>
        </div>
      </section>

      {/* 7. SEO Meta Overrides */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          SEO Meta Overrides
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Override default meta title and description for the homepage and fallback. Leave blank to use site defaults.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Meta Title
            </label>
            <input
              type="text"
              value={settings.metaTitleOverride ?? ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, metaTitleOverride: e.target.value.trim() || null }))
              }
              placeholder="e.g. Acquire To Scale – Buy Content Websites"
              maxLength={70}
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
            <p className="mt-1 text-xs text-[var(--muted)]">
              Recommended: 50–60 chars for best display in search results.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">
              Meta Description
            </label>
            <textarea
              value={settings.metaDescriptionOverride ?? ""}
              onChange={(e) =>
                setSettings((s) => ({ ...s, metaDescriptionOverride: e.target.value.trim() || null }))
              }
              placeholder="e.g. Acquire content websites, SaaS, newsletters..."
              maxLength={160}
              rows={3}
              className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            />
            <p className="mt-1 text-xs text-[var(--muted)]">
              Recommended: 150–160 chars.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Google Search Console */}
      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          Google Search Console
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Verify your site and monitor search performance.{" "}
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Search Console →
          </a>{" "}
          Use the HTML tag method and paste the <code className="rounded bg-[var(--card-hover)] px-1">content</code> value below.
        </p>
        <label className="mt-3 block text-sm font-medium text-[var(--foreground)]">
          Verification meta content
        </label>
        <input
          type="text"
          value={settings.googleSiteVerification ?? ""}
          onChange={(e) =>
            setSettings((s) => ({ ...s, googleSiteVerification: e.target.value.trim() || null }))
          }
          placeholder="Paste the content value from the meta tag"
          className="mt-1 w-full max-w-md rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          From: <code className="rounded bg-[var(--card-hover)] px-1">&lt;meta name=&quot;google-site-verification&quot; content=&quot;YOUR_CODE&quot; /&gt;</code>
        </p>
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[var(--accent)] px-6 py-2.5 font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save SEO settings"}
        </button>
      </div>
    </form>
  );
}
