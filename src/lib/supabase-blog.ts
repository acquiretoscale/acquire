import { createClient } from "@/lib/supabase/server";

export type SupabasePost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string | null;
  featured_image: string | null;
  featured?: boolean;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
};

export type SupabasePostListItem = {
  slug: string;
  title: string;
  meta_description: string | null;
  featured_image?: string | null;
  created_at: string;
  updated_at: string;
};

export async function getSupabasePostBySlug(slug: string): Promise<SupabasePost | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, content, meta_description, featured_image, featured, tags, created_at, updated_at")
      .eq("slug", slug)
      .single();
    if (error || !data) return null;
    return data as SupabasePost;
  } catch {
    return null;
  }
}

export async function getAllSupabasePosts(): Promise<SupabasePostListItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, meta_description, featured_image, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as SupabasePostListItem[];
  } catch {
    return [];
  }
}

export async function getFeaturedSupabasePosts(): Promise<SupabasePostListItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, meta_description, featured_image, created_at, updated_at")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as SupabasePostListItem[];
  } catch {
    return [];
  }
}
