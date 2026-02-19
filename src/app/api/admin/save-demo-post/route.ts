import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// Only allow when Supabase is not configured (demo mode)
function isDemoMode() {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function frontmatter(data: {
  title: string;
  slug: string;
  description: string;
  date: string;
  updated?: string;
  featuredImage?: string;
  featured?: boolean;
}) {
  const lines = [
    "---",
    `title: ${JSON.stringify(data.title)}`,
    `slug: ${JSON.stringify(data.slug)}`,
    `description: ${JSON.stringify(data.description)}`,
    `date: ${data.date}`,
  ];
  if (data.updated) lines.push(`updated: ${data.updated}`);
  if (data.featuredImage) lines.push(`featuredImage: ${JSON.stringify(data.featuredImage)}`);
  if (data.featured) lines.push("featured: true");
  lines.push("---", "");
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  if (!isDemoMode()) {
    return NextResponse.json({ error: "Demo mode only" }, { status: 403 });
  }
  let body: { title: string; slug: string; content: string; meta_description?: string; featured_image?: string; featured?: boolean; isEdit?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { title, slug, content, meta_description, featured_image, featured, isEdit } = body;
  if (!title || !slug || typeof content !== "string") {
    return NextResponse.json({ error: "Missing title, slug, or content" }, { status: 400 });
  }
  const safeSlug = slug.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "post";
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${safeSlug}.md`);
  const now = new Date().toISOString();
  const fm = frontmatter({
    title,
    slug: safeSlug,
    description: meta_description ?? "",
    date: now,
    updated: isEdit ? now : undefined,
    featuredImage: featured_image ?? undefined,
    featured: featured ?? false,
  });
  fs.writeFileSync(filePath, fm + content.trimEnd() + "\n", "utf-8");
  return NextResponse.json({ ok: true, slug: safeSlug });
}
