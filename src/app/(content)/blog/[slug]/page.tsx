import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { site } from "@/lib/site";
import { getPostBySlug, getAllSlugs, getArticleSchema } from "@/lib/blog";
import { getSupabasePostBySlug, getAllSupabasePosts } from "@/lib/supabase-blog";

type Props = { params: Promise<{ slug: string }> };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function supabaseContentToHtml(content: string): string {
  const trimmed = content.trim();
  if (trimmed.startsWith("<")) return content;
  return trimmed
    .split(/\n\n+/)
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function readingTimeFromHtml(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const fileSlugs = getAllSlugs();
  const supabasePosts = await getAllSupabasePosts();
  const supabaseSlugs = supabasePosts.map((p) => p.slug);
  const allSlugs = [...new Set([...fileSlugs, ...supabaseSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabasePost = await getSupabasePostBySlug(slug);
  if (supabasePost) {
    return {
      title: supabasePost.title,
      description: supabasePost.meta_description || undefined,
      alternates: { canonical: `/blog/${supabasePost.slug}` },
      openGraph: {
        title: supabasePost.title,
        description: supabasePost.meta_description || undefined,
        type: "article",
        url: `${site.url}/blog/${supabasePost.slug}`,
        publishedTime: supabasePost.created_at,
        modifiedTime: supabasePost.updated_at,
      },
      twitter: {
        card: "summary_large_image",
        title: supabasePost.title,
        description: supabasePost.meta_description || undefined,
      },
    };
  }
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const supabasePost = await getSupabasePostBySlug(slug);
  if (supabasePost) {
    const html = supabaseContentToHtml(supabasePost.content);
    const readingTimeMinutes = readingTimeFromHtml(html);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: supabasePost.title,
      description: supabasePost.meta_description || supabasePost.title,
      datePublished: supabasePost.created_at,
      dateModified: supabasePost.updated_at,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${supabasePost.slug}` },
      url: `${site.url}/blog/${supabasePost.slug}`,
    };

    return (
      <div className="bg-[var(--background)] text-[var(--foreground)]">
        <Script
          id="ld-article"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <article className="border-b border-[var(--border)] py-16">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                ← Back to blog
              </Link>
            </div>
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-base text-[var(--muted)]">
                <time dateTime={supabasePost.created_at}>
                  {new Date(supabasePost.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden>·</span>
                <span>{readingTimeMinutes} min read</span>
                <span aria-hidden>·</span>
                <span>
                  Updated{" "}
                  {new Date(supabasePost.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {supabasePost.title}
              </h1>
              {supabasePost.meta_description && (
                <p className="text-xl text-[var(--muted)]">{supabasePost.meta_description}</p>
              )}
            </header>
            <div
              className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-p:text-[var(--muted)] prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </article>
        <section className="border-t border-[var(--border)] py-16">
          <div className="mx-auto max-w-3xl px-4">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--surface-dark)] px-8 py-10 text-white md:flex-row md:items-center">
              <div>
                <div className="text-xl font-bold">Ready to explore acquisitions?</div>
                <p className="mt-2 text-[var(--on-dark-muted)]">
                  Get a buyer profile and matching plan tailored to your situation.
                </p>
              </div>
              <Link
                href="/buyer-form"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
              >
                Book a call
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = getArticleSchema(post);
  const isHtmlContent = post.content.trim().startsWith("<");
  const readingTimeMinutes = isHtmlContent ? readingTimeFromHtml(post.content) : post.readingTimeMinutes;
  const bodyContent = isHtmlContent ? (
    <div dangerouslySetInnerHTML={{ __html: post.content }} />
  ) : (
    await MDXRemote({
      source: post.content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
          ],
        },
      },
    })
  );

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <Script
        id="ld-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="border-b border-[var(--border)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              ← Back to blog
            </Link>
          </div>
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>{readingTimeMinutes} min read</span>
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
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-xl text-[var(--muted)]">{post.description}</p>
            )}
          </header>
          <div className="prose prose-lg mt-10 max-w-none prose-headings:font-semibold prose-p:text-[var(--muted)] prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg">
            {bodyContent}
          </div>
        </div>
      </article>
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[var(--foreground)] px-8 py-10 text-[var(--on-dark)] md:flex-row md:items-center">
            <div>
              <div className="text-xl font-bold">Ready to explore acquisitions?</div>
              <p className="mt-2 text-[var(--on-dark-muted)]">
                Get a buyer profile and matching plan tailored to your situation.
              </p>
            </div>
            <Link
              href="/buyer-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
