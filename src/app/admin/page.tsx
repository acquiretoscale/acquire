import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/admin-demo";
import { getAllPosts } from "@/lib/blog";
import { PostsList } from "./posts/PostsList";

export default async function AdminPage() {
  const demoMode = isDemoMode();

  if (demoMode) {
    const posts = getAllPosts();
    return (
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Blog posts</h1>
        <p className="mt-2 text-[var(--muted)]">
          Demo mode: create and edit posts. They are saved as files in <code className="text-sm bg-[var(--card)] px-1 rounded">content/blog/</code> and appear on the blog.
        </p>
        <Link
          href="/admin/posts/new"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[var(--accent)] px-4 font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          New post
        </Link>
        {posts.length > 0 && (
          <ul className="mt-8 space-y-3" role="list">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
                <div>
                  <span className="font-medium text-[var(--foreground)]">{post.title}</span>
                  <span className="ml-2 text-sm text-[var(--muted)]">/blog/{post.slug}</span>
                </div>
                <Link
                  href={`/admin/posts/edit/${post.slug}`}
                  className="text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, status, featured, created_at")
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold text-[var(--foreground)]">Blog posts</h1>
      <p className="mt-2 text-[var(--muted)]">
        Create and edit posts. Drafts stay private; published posts appear on the blog.
      </p>
      <Link
        href="/admin/posts/new"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[var(--accent)] px-4 font-medium text-white hover:bg-[var(--accent-hover)]"
      >
        New post
      </Link>
      {posts && posts.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <p className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-8 text-center text-[var(--muted)]">
          No blog posts yet. Click <strong className="text-[var(--foreground)]">New post</strong> to create one.
        </p>
      )}
    </section>
  );
}
