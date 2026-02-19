import type { Metadata } from "next";
import Link from "next/link";
import { searchSite } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Acquire To Scale website.",
  alternates: { canonical: "/search" },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query.length >= 2 ? await searchSite(query) : [];

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Search
        </h1>
        <form
          action="/search"
          method="GET"
          className="mt-6 flex gap-2"
          role="search"
        >
          <label htmlFor="footer-search-input" className="sr-only">
            Search website
          </label>
          <input
            id="footer-search-input"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search pages and blog…"
            className="min-w-0 flex-1 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
            aria-label="Search website"
          />
          <button
            type="submit"
            className="rounded-full bg-[var(--accent)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
          >
            Search
          </button>
        </form>

        {query.length > 0 && (
          <div className="mt-10">
            {query.length < 2 ? (
              <p className="text-[var(--muted)]">
                Type at least 2 characters to search.
              </p>
            ) : results.length === 0 ? (
              <p className="text-[var(--muted)]">
                No results for &ldquo;{query}&rdquo;. Try different words.
              </p>
            ) : (
              <>
                <p className="mb-4 text-base text-[var(--muted)]">
                  {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                </p>
                <ul className="space-y-3" role="list">
                  {results.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-[var(--accent)]/30 hover:shadow-md"
                      >
                        <span className="font-semibold text-[var(--foreground)]">
                          {item.title}
                        </span>
                        {item.description && (
                          <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <span className="mt-2 inline-block text-sm font-medium text-[var(--accent)]">
                          {item.type === "blog" ? "Blog" : "Page"} → {item.href}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <p className="mt-10">
          <Link
            href="/"
            className="font-medium text-[var(--accent)] transition hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
