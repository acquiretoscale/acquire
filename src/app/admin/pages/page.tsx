import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EDITABLE_PAGES } from "@/lib/page-content";

const PAGE_ICONS: Record<string, string> = {
  home: "🏠",
  about: "ℹ️",
  "for-buyers": "🔍",
  "for-sellers": "💼",
  "for-scalers": "📈",
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  home: "Hero, quote, buyer/seller offers, asset focus, why us",
  about: "Mission, comparison table, philosophy, why choose us",
  "for-buyers": "Due diligence hero, deal sourcing, CTA",
  "for-sellers": "Hero section",
  "for-scalers": "Hero, content paragraphs",
};

export default async function AdminPagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Get last updated timestamps per page
  const { data: blocks } = await supabase
    .from("page_blocks")
    .select("page_slug, updated_at")
    .order("updated_at", { ascending: false });

  const lastUpdated: Record<string, string> = {};
  for (const b of blocks ?? []) {
    if (!lastUpdated[b.page_slug]) {
      lastUpdated[b.page_slug] = b.updated_at;
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Page Content</h1>
      <p className="mt-2 text-[var(--muted)]">
        Edit text, images, and CTAs on each page. Changes go live within seconds.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
        {EDITABLE_PAGES.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/admin/pages/${page.slug}`}
              className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition hover:border-[var(--accent)]/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                  {page.label}
                </span>
                <svg className="h-5 w-5 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {PAGE_DESCRIPTIONS[page.slug] ?? "Editable content blocks"}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-[var(--card-hover)] px-2 py-0.5 font-mono text-xs text-[var(--muted)]">
                  {page.path}
                </span>
                {lastUpdated[page.slug] && (
                  <span className="text-xs text-[var(--muted)]">
                    Updated {new Date(lastUpdated[page.slug]).toLocaleDateString()}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="font-semibold text-[var(--foreground)]">How it works</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">1.</span>
            Click on a page above to open its content editor.
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">2.</span>
            Click <strong className="text-[var(--foreground)]">Edit</strong> on any section and update the text, images, or links.
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">3.</span>
            Hit <strong className="text-[var(--foreground)]">Save</strong> — the live page updates within seconds. No deployment needed.
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">4.</span>
            You can also click the <strong className="text-[var(--foreground)]">Edit</strong> button floating on each section when you visit the live site while logged in.
          </li>
        </ul>
      </div>
    </section>
  );
}
