import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { EDITABLE_PAGES, getPageDefaults } from "@/lib/page-content";
import type { PageBlock } from "@/lib/page-content";
import { PageBlockEditor } from "./PageBlockEditor";
import type { BlockData } from "./PageBlockEditor";

export async function generateStaticParams() {
  return EDITABLE_PAGES.map((p) => ({ slug: p.slug }));
}

export default async function AdminPageEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageMeta = EDITABLE_PAGES.find((p) => p.slug === slug);
  if (!pageMeta) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Load blocks from DB, fall back to defaults for any missing
  const { data: dbBlocks } = await supabase
    .from("page_blocks")
    .select("block_key, block_type, content, sort_order")
    .eq("page_slug", slug)
    .order("sort_order", { ascending: true });

  const defaults = getPageDefaults(slug);
  const dbMap: Record<string, { block_type: string; content: PageBlock; sort_order: number }> = {};
  for (const b of dbBlocks ?? []) {
    dbMap[b.block_key] = {
      block_type: b.block_type,
      content: { ...(defaults[b.block_key] as Record<string, unknown> ?? {}), ...(b.content as Record<string, unknown>) } as PageBlock,
      sort_order: b.sort_order,
    };
  }

  // Merge with defaults — include any blocks only in defaults (not yet in DB)
  const blocks: BlockData[] = [];
  const seen = new Set<string>();

  // First: DB blocks in order
  for (const b of dbBlocks ?? []) {
    blocks.push({
      blockKey: b.block_key,
      blockType: b.block_type,
      sortOrder: b.sort_order,
      content: dbMap[b.block_key].content,
    });
    seen.add(b.block_key);
  }

  // Then: defaults not yet in DB
  let i = (dbBlocks?.length ?? 0);
  for (const [blockKey, content] of Object.entries(defaults)) {
    if (!seen.has(blockKey)) {
      blocks.push({
        blockKey,
        blockType: inferBlockType(blockKey, content),
        sortOrder: i++,
        content,
      });
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6">
        <Link href="/admin/pages" className="inline-flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All pages
        </Link>
      </div>

      <PageBlockEditor
        pageSlug={slug}
        pageLabel={pageMeta.label}
        pagePath={pageMeta.path}
        blocks={blocks}
      />
    </section>
  );
}

function inferBlockType(blockKey: string, content: PageBlock): string {
  if ("social" in content) return "founder";
  if ("text" in content) return "quote";
  if ("cta_primary" in content) return "hero";
  if ("button" in content) return "cta";
  if ("cards" in content) return "cards";
  if ("rows" in content) return "table";
  if ("items" in content) return "list";
  return "rich_text";
}
