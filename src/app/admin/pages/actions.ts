"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PageBlock } from "@/lib/page-content";

const PAGE_PATH_MAP: Record<string, string> = {
  home: "/",
  about: "/about",
  "for-buyers": "/due-diligence",
  "for-sellers": "/sell-your-business",
  "for-scalers": "/scaling",
};

export async function savePageBlock(
  pageSlug: string,
  blockKey: string,
  blockType: string,
  content: PageBlock,
  sortOrder = 0
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("page_blocks").upsert(
    {
      page_slug: pageSlug,
      block_key: blockKey,
      block_type: blockType,
      content,
      sort_order: sortOrder,
      is_visible: true,
    },
    { onConflict: "page_slug,block_key" }
  );

  if (error) return { error: error.message };

  // Revalidate the live page immediately
  const path = PAGE_PATH_MAP[pageSlug];
  if (path) revalidatePath(path);

  return { error: null };
}
