import Link from "next/link";
import { getFeaturedFilePosts } from "@/lib/blog";
import { getFeaturedSupabasePosts } from "@/lib/supabase-blog";

type FeaturedItem = {
  slug: string;
  title: string;
  description: string;
  featuredImage?: string | null;
  date: string;
};

export async function FeaturedArticles() {
  const filePosts = getFeaturedFilePosts();
  const supabasePosts = await getFeaturedSupabasePosts();

  const fileItems: FeaturedItem[] = filePosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    featuredImage: p.featuredImage ?? null,
    date: p.date,
  }));

  const supabaseItems: FeaturedItem[] = supabasePosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.meta_description || "",
    featuredImage: p.featured_image ?? null,
    date: p.created_at,
  }));

  const posts: FeaturedItem[] = [...fileItems, ...supabaseItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (posts.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 md:text-base">
          Featured articles
        </p>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          Insights from the blog
        </h2>
        <div className="mt-3 h-1 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-[var(--accent)]/50 hover:shadow-lg"
              >
                {post.featuredImage && (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage}
                      alt=""
                      className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-3">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-[var(--accent)]">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {post.description}
                    </p>
                  )}
                  <span className="mt-auto pt-2 text-sm font-medium text-[var(--accent)]">
                    Read article
                    <svg
                      className="ml-1 inline h-3 w-3 transition group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View all articles
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
