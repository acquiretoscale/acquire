import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { site } from "@/lib/site";
import { getPostBySlug, getAllSlugs, getArticleSchema } from "@/lib/blog";
import { getSupabasePostBySlug, getAllSupabasePosts } from "@/lib/supabase-blog";
import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";

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
      publishedTime: supabasePost.published_at || supabasePost.created_at,
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
    const rawHtml = supabaseContentToHtml(supabasePost.content);
    const html = rawHtml.startsWith("<") ? sanitizeBlogHtml(rawHtml) : rawHtml;
    const readingTimeMinutes = readingTimeFromHtml(html);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: supabasePost.title,
      description: supabasePost.meta_description || supabasePost.title,
      datePublished: supabasePost.published_at || supabasePost.created_at,
      dateModified: supabasePost.updated_at,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${supabasePost.slug}` },
      url: `${site.url}/blog/${supabasePost.slug}`,
    };

    const authorName = supabasePost.author_name;
    const authorBio = supabasePost.author_bio;
    const authorImage = supabasePost.author_image || "/images/adilmaf.png";

    return (
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <ReadingProgressBar />
        <Script
          id="ld-article"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <article className="border-b border-[var(--border)] py-10 sm:py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="mb-8">
              <Link
                href="/blog"
                className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                ← Back to blog
              </Link>
            </div>
            <header className="space-y-5">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
                <time dateTime={supabasePost.published_at || supabasePost.created_at}>
                  {new Date(supabasePost.published_at || supabasePost.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden>·</span>
                <span>{readingTimeMinutes} min read</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight leading-tight sm:text-4xl md:text-5xl">
                {supabasePost.title}
              </h1>
              {supabasePost.meta_description && (
                <p className="text-lg leading-relaxed text-[var(--muted)]">
                  {supabasePost.meta_description}
                </p>
              )}
              {authorName && (
                <div className="flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--border)]">
                    <Image src={authorImage} alt={authorName} fill className="object-cover object-top" sizes="40px" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{authorName}</p>
                    {authorBio && <p className="text-xs text-[var(--muted)]">{authorBio}</p>}
                  </div>
                </div>
              )}
            </header>
            <div className="blog-article-body mt-10">
              <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </article>

        {authorName && (
          <section className="border-b border-[var(--border)] py-10 sm:py-12">
            <div className="mx-auto max-w-3xl px-6 sm:px-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--border)]">
                  <Image src={authorImage} alt={authorName} fill className="object-cover object-top" sizes="64px" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">Written by</p>
                  <p className="mt-1 text-lg font-bold text-[var(--foreground)]">{authorName}</p>
                  {authorBio && <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{authorBio}</p>}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-6 sm:px-8">
            <div className="flex flex-col items-stretch sm:items-start justify-between gap-6 rounded-2xl bg-[var(--surface-dark)] px-5 py-8 sm:px-8 sm:py-10 text-white md:flex-row md:items-center">
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
    <div dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(post.content) }} />
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <ReadingProgressBar />
      <Script
        id="ld-article"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="border-b border-[var(--border)] py-10 sm:py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              ← Back to blog
            </Link>
          </div>
          <header className="space-y-5">
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
            <h1 className="text-3xl font-bold tracking-tight leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-lg leading-relaxed text-[var(--muted)]">{post.description}</p>
            )}
          </header>
          <div className="blog-article-body mt-10">
            <div className="prose">
              {bodyContent}
            </div>
          </div>
        </div>
      </article>
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="flex flex-col items-stretch sm:items-start justify-between gap-6 rounded-2xl bg-[var(--foreground)] px-5 py-8 sm:px-8 sm:py-10 text-[var(--on-dark)] md:flex-row md:items-center">
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
