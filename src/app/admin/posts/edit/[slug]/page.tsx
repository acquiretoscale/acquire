import { redirect, notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { PostForm } from "../../../PostForm";
import { isDemoMode } from "@/lib/admin-demo";

export default async function EditPostBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!isDemoMode()) redirect("/admin");

  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Edit post</h1>
      <PostForm
        demoMode
        post={{
          id: `slug:${post.slug}`,
          title: post.title,
          slug: post.slug,
          content: post.content,
          meta_description: post.description || null,
          featured_image: post.featuredImage || null,
          featured: post.featured ?? false,
        }}
      />
    </section>
  );
}
