import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getAllSupabasePosts } from "@/lib/supabase-blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical insights on buying and scaling digital assets. Due diligence, valuation, offshore structures, and post-acquisition playbooks.",
  alternates: {
    canonical: "/blog",
  },
};

type ListItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  readingTimeMinutes: number;
};

export default async function BlogPage() {
  const filePosts = getAllPosts();
  const supabasePosts = await getAllSupabasePosts();

  const fileItems: ListItem[] = filePosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    updated: p.updated,
    readingTimeMinutes: p.readingTimeMinutes,
  }));

  const supabaseItems: ListItem[] = supabasePosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.meta_description || "",
    date: p.created_at,
    updated: p.updated_at,
    readingTimeMinutes: 1,
  }));

  const posts: ListItem[] = [...fileItems, ...supabaseItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="border-b border-[var(--border)] py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">Blog</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Insights on acquiring and scaling digital assets
          </h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
          <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
            Practical due diligence, valuation, and post-acquisition playbooks. Operator perspective, not theory.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          {posts.length === 0 ? (
            <div className="card-elevated rounded-2xl p-12 text-center">
              <p className="text-[var(--muted)]">
                No posts yet. Check back soon for insights on acquiring and scaling digital assets.
              </p>
            </div>
          ) : (
            <ul className="space-y-6" role="list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="card-elevated rounded-2xl p-8 transition hover:shadow-md">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-base text-[var(--muted)]">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{post.readingTimeMinutes} min read</span>
                        {post.updated && (
                          <>
                            <span aria-hidden>·</span>
                            <span>
                              Updated{" "}
                              {new Date(post.updated).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold tracking-tight">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-[var(--accent)] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-[var(--muted)] leading-relaxed">{post.description}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-block text-base font-semibold text-[var(--accent)] hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
