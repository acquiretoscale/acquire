import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "../../../PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, content, meta_description, featured_image, featured, status")
    .eq("id", id)
    .single();

  if (error || !post) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit post</h1>
      <PostForm post={post} />
    </section>
  );
}
