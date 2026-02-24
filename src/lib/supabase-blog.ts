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
  author_name: string | null;
  author_bio: string | null;
  author_image: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SupabasePostListItem = {
  slug: string;
  title: string;
  meta_description: string | null;
  featured_image?: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const POST_FIELDS_FULL = "id, title, slug, content, meta_description, featured_image, featured, tags, author_name, author_bio, author_image, published_at, created_at, updated_at";
const POST_FIELDS_FULL_FALLBACK = "id, title, slug, content, meta_description, featured_image, featured, tags, author_name, author_bio, author_image, created_at, updated_at";

const LIST_FIELDS = "slug, title, meta_description, featured_image, content, published_at, created_at, updated_at";
const LIST_FIELDS_FALLBACK = "slug, title, meta_description, featured_image, content, created_at, updated_at";

export async function getSupabasePostBySlug(slug: string): Promise<SupabasePost | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(POST_FIELDS_FULL)
      .eq("slug", slug)
      .single();
    if (!error && data) return data as unknown as SupabasePost;
    if (error?.code === "42703") {
      const fb = await supabase
        .from("blog_posts")
        .select(POST_FIELDS_FULL_FALLBACK)
        .eq("slug", slug)
        .single();
      if (fb.error || !fb.data) return null;
      return { ...fb.data, published_at: null } as unknown as SupabasePost;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getAllSupabasePosts(): Promise<(SupabasePostListItem & { content: string })[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    type Row = SupabasePostListItem & { content: string };
    const { data, error } = await supabase
      .from("blog_posts")
      .select(LIST_FIELDS)
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (!error && data) return data as unknown as Row[];
    if (error?.code === "42703") {
      const fb = await supabase
        .from("blog_posts")
        .select(LIST_FIELDS_FALLBACK)
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (fb.error || !fb.data) return [];
      return (fb.data as Record<string, unknown>[]).map((d) => ({ ...d, published_at: null })) as unknown as Row[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function getFeaturedSupabasePosts(): Promise<SupabasePostListItem[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  try {
    const supabase = await createClient();
    const fields = "slug, title, meta_description, featured_image, published_at, created_at, updated_at";
    const fieldsFallback = "slug, title, meta_description, featured_image, created_at, updated_at";
    const { data, error } = await supabase
      .from("blog_posts")
      .select(fields)
      .eq("featured", true)
      .order("published_at", { ascending: false });
    if (!error && data) return data as unknown as SupabasePostListItem[];
    if (error?.code === "42703") {
      const fb = await supabase
        .from("blog_posts")
        .select(fieldsFallback)
        .eq("featured", true)
        .order("created_at", { ascending: false });
      if (fb.error || !fb.data) return [];
      return (fb.data as Record<string, unknown>[]).map((d) => ({ ...d, published_at: null })) as unknown as SupabasePostListItem[];
    }
    return [];
  } catch {
    return [];
  }
}
