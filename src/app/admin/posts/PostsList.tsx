"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deletePost } from "./actions";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string | null;
  featured?: boolean;
};

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <ul className="mt-8 space-y-3" role="list">
      {posts.map((post) => (
        <PostRow key={post.id} post={post} />
      ))}
    </ul>
  );
}

function PostRow({ post }: { post: Post }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deletePost(post.id);
    });
  }

  return (
    <li className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate font-medium text-[var(--foreground)]">{post.title}</span>
        <span className="ml-1 shrink-0 text-sm text-[var(--muted)]">/blog/{post.slug}</span>
        {post.status === "draft" && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
            Draft
          </span>
        )}
        {post.status === "archived" && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
            Archived
          </span>
        )}
        {post.status !== "draft" && post.status !== "archived" && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
            Published
          </span>
        )}
        {post.featured && (
          <span className="shrink-0 rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)]">
            On homepage
          </span>
        )}
      </div>
      <div className="ml-4 flex shrink-0 items-center gap-3">
        <Link
          href={`/admin/posts/${post.id}/edit`}
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={pending}
          className="text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-40"
        >
          {pending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
