import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { site } from "@/lib/site";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  featuredImage?: string;
  featured?: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  readingTimeMinutes: number;
};

function getContentDir(): string {
  return CONTENT_DIR;
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getAllSlugs(): string[] {
  const dir = getContentDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map(slugFromFilename);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const dir = getContentDir();
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const title = (data.title as string) || slug;
  const description = (data.description as string) || "";
  const date = (data.date as string) || new Date().toISOString();
  const updated = (data.updated as string) || undefined;
  const featuredImage = (data.featuredImage as string) || undefined;
  const featured = (data.featured as boolean) ?? false;

  const stats = readingTime(content);
  const readingTimeMinutes = Math.max(1, Math.ceil(stats.minutes));

  return {
    slug,
    title,
    description,
    date,
    updated,
    featuredImage,
    featured,
    content,
    readingTimeMinutes,
  };
}

export type BlogPostListItem = BlogPostMeta & { readingTimeMinutes: number };

export function getAllPosts(): BlogPostListItem[] {
  const slugs = getAllSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => p !== null)
    .map(({ content: _c, ...rest }) => rest);
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedFilePosts(): BlogPostListItem[] {
  return getAllPosts().filter((p) => p.featured);
}

export function getArticleSchema(post: BlogPostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
    url: `${site.url}/blog/${post.slug}`,
  };
}
