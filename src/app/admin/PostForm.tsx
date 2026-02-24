"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { QuillEditor } from "@/components/editor/QuillEditor";
import { sanitizeBlogHtmlForSave as sanitizeBlogHtml } from "@/lib/sanitize-blog-html";

/* ------------------------------------------------------------------ */
/*  Autosave helpers                                                   */
/* ------------------------------------------------------------------ */

const DRAFT_KEY_NEW = "admin-post-draft-new";

type DraftData = {
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  featured_image: string;
  featured: boolean;
  savedAt?: string;
};

function loadDraft(): DraftData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY_NEW);
    if (!raw) return null;
    const d = JSON.parse(raw) as DraftData;
    return {
      title: d.title ?? "",
      slug: d.slug ?? "",
      content: d.content ?? "",
      meta_description: d.meta_description ?? "",
      featured_image: d.featured_image ?? "",
      featured: d.featured ?? false,
      savedAt: d.savedAt,
    };
  } catch {
    return null;
  }
}

function saveDraftToStorage(data: DraftData) {
  try {
    localStorage.setItem(
      DRAFT_KEY_NEW,
      JSON.stringify({ ...data, savedAt: new Date().toISOString() })
    );
  } catch {
    // ignore
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY_NEW);
  } catch {
    // ignore
  }
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PostRow = {
  id: string;
  title: string;
  slug: string;
  content: string;
  meta_description: string | null;
  featured_image: string | null;
  featured?: boolean;
  status?: string;
  author_name?: string | null;
  author_bio?: string | null;
  author_image?: string | null;
  published_at?: string | null;
};

/* ------------------------------------------------------------------ */
/*  PostForm component                                                 */
/* ------------------------------------------------------------------ */

export function PostForm({
  post,
  demoMode = false,
}: {
  post?: PostRow;
  demoMode?: boolean;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [content, setContent] = useState(
    () => sanitizeBlogHtml(post?.content ?? "")
  );
  const [metaDescription, setMetaDescription] = useState(
    post?.meta_description ?? ""
  );
  const [featuredImage, setFeaturedImage] = useState(
    post?.featured_image ?? ""
  );
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [publishedAt, setPublishedAt] = useState(() => {
    if (post?.published_at) {
      return new Date(post.published_at).toISOString().slice(0, 16);
    }
    return new Date().toISOString().slice(0, 16);
  });
  const [authorName, setAuthorName] = useState(post?.author_name ?? "");
  const [authorBio, setAuthorBio] = useState(post?.author_bio ?? "");
  const [authorImage, setAuthorImage] = useState(post?.author_image ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingAs, setSavingAs] = useState<"draft" | "published" | "archived" | null>(null);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);

  /* Autosave state */
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  const resolvedSlug =
    slug.trim() ||
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") ||
    "post";

  /* ---- Restore draft for new posts ---- */
  useEffect(() => {
    if (post) return;
    const draft = loadDraft();
      if (draft && (draft.title || draft.content || draft.slug)) {
      setTitle(draft.title);
      setSlug(draft.slug);
      setContent(sanitizeBlogHtml(draft.content));
      setMetaDescription(draft.meta_description);
      setFeaturedImage(draft.featured_image);
      setFeatured(draft.featured);
      if (draft.savedAt) setLastSavedAt(draft.savedAt);
    }
  }, [post]);

  /* ---- Autosave draft (new posts only, debounced 2s) ---- */
  useEffect(() => {
    if (post) return;
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      saveDraftToStorage({
        title,
        slug,
        content: sanitizeBlogHtml(content),
        meta_description: metaDescription,
        featured_image: featuredImage,
        featured,
      });
      setLastSavedAt(new Date().toISOString());
      autosaveTimerRef.current = null;
    }, 2000);
    return () => {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    };
  }, [post, title, slug, content, metaDescription, featuredImage, featured]);

  /* ---- Image upload helper ---- */
  const uploadImage = useCallback(
    async (file: File): Promise<string> => {
      if (demoMode) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Could not read image"));
          reader.readAsDataURL(file);
        });
      }
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      return data.url as string;
    },
    [demoMode]
  );

  /* ---- Featured image file upload ---- */
  const handleFeaturedImageUpload = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploadingFeatured(true);
      try {
        const url = await uploadImage(file);
        setFeaturedImage(url);
      } catch {
        setError("Failed to upload featured image");
      }
      setUploadingFeatured(false);
    };
    input.click();
  }, [uploadImage]);

  /* ---- Submit (draft or publish) ---- */
  async function handleSubmit(status: "draft" | "published" | "archived") {
    setError(null);
    setSaving(true);
    setSavingAs(status);

    if (demoMode) {
      try {
        const res = await fetch("/api/admin/save-demo-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            slug: resolvedSlug,
            content: sanitizeBlogHtml(content),
            meta_description: metaDescription || undefined,
            featured_image: featuredImage || undefined,
            featured,
            isEdit: !!post,
            status,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to save");
          setSaving(false);
          setSavingAs(null);
          return;
        }
        if (!post) clearDraft();
        router.push("/admin");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
      setSaving(false);
      setSavingAs(null);
      return;
    }

    const supabase = createClient();
    const sanitizedContent = sanitizeBlogHtml(content);
    const core = {
      title,
      slug: resolvedSlug,
      content: sanitizedContent,
      meta_description: metaDescription || null,
      featured_image: featuredImage || null,
      featured,
      status,
    };
    const base = {
      ...core,
      published_at: new Date(publishedAt).toISOString(),
      author_name: authorName.trim() || null,
      author_bio: authorBio.trim() || null,
      author_image: authorImage.trim() || null,
    };
    const baseWithoutAuthor = { ...core };
    const isSchemaError = (msg: string) =>
      /author_name|author_bio|author_image|published_at|schema cache/i.test(msg);

    if (post) {
      const { error: err } = await supabase
        .from("blog_posts")
        .update({ ...base, updated_at: new Date().toISOString() })
        .eq("id", post.id);
      if (err && isSchemaError(err.message)) {
        const { error: retryErr } = await supabase
          .from("blog_posts")
          .update({ ...baseWithoutAuthor, updated_at: new Date().toISOString() })
          .eq("id", post.id);
        if (retryErr) {
          setError(retryErr.message);
        } else {
          setError(
            "Post saved, but author fields were not saved. Run the SQL below in Supabase → SQL Editor, then edit this post again to save author."
          );
        }
        setSaving(false);
        setSavingAs(null);
        return;
      }
      if (err) {
        setError(err.message);
        setSaving(false);
        setSavingAs(null);
        return;
      }
      clearDraft();
      router.push("/admin");
    } else {
      const { error: err } = await supabase.from("blog_posts").insert(base);
      if (err && isSchemaError(err.message)) {
        const { error: retryErr } = await supabase.from("blog_posts").insert(baseWithoutAuthor);
        if (retryErr) {
          setError(retryErr.message);
        } else {
          setError(
            "Post saved, but author fields were not saved. Run the SQL below in Supabase → SQL Editor, then edit this post again to save author."
          );
        }
        setSaving(false);
        setSavingAs(null);
        return;
      }
      if (err) {
        setError(err.message);
        setSaving(false);
        setSavingAs(null);
        return;
      }
      clearDraft();
      router.push("/admin");
    }
    router.refresh();
    setSaving(false);
    setSavingAs(null);
  }

  /* ---- Formatted autosave time ---- */
  const savedLabel = lastSavedAt
    ? `Autosaved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : null;

  /* ---- Render ---- */
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit("published");
      }}
      className="mt-6 space-y-6"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="post-title"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>

      {/* Slug */}
      <div>
        <label
          htmlFor="post-slug"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Slug
        </label>
        <input
          id="post-slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="url-friendly-name"
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 font-mono text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          Used in URL: /blog/[slug]
        </p>
      </div>

      {/* Published date */}
      <div>
        <label
          htmlFor="post-published-at"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Publish date
        </label>
        <input
          id="post-published-at"
          type="datetime-local"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="mt-1 w-full max-w-xs rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          Controls the displayed date on the blog. Defaults to now.
        </p>
      </div>

      {/* Meta description */}
      <div>
        <label
          htmlFor="post-meta"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Meta description
        </label>
        <input
          id="post-meta"
          type="text"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          maxLength={160}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          {metaDescription.length}/160
        </p>
      </div>

      {/* Featured image — upload or paste URL */}
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)]">
          Featured image
        </label>
        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            onClick={handleFeaturedImageUpload}
            disabled={uploadingFeatured}
            className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
          >
            {uploadingFeatured ? "Uploading…" : "Upload image"}
          </button>
          <span className="text-xs text-[var(--muted)]">or</span>
          <input
            type="url"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="Paste image URL…"
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        {featuredImage && (
          <div className="relative mt-2 inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featuredImage}
              alt="Featured preview"
              className="h-24 w-auto rounded-lg border border-[var(--border)] object-cover"
            />
            <button
              type="button"
              onClick={() => setFeaturedImage("")}
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
              title="Remove"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Featured on homepage */}
      <div className="flex items-center gap-3">
        <input
          id="post-featured"
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
        />
        <label
          htmlFor="post-featured"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Featured on homepage — show this article in the Featured Articles section
        </label>
      </div>

      {/* Author block */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Author</p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">Shown at the bottom of the post. Leave blank to hide the author block.</p>
        </div>
        <div>
          <label htmlFor="author-name" className="block text-sm font-medium text-[var(--foreground)]">
            Name
          </label>
          <input
            id="author-name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="e.g. Adil Maf"
            className="mt-1 w-full max-w-sm rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <label htmlFor="author-bio" className="block text-sm font-medium text-[var(--foreground)]">
            Short bio <span className="text-[var(--muted)] font-normal">(optional)</span>
          </label>
          <textarea
            id="author-bio"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            placeholder="Founder & Business architect at Acquire To Scale."
            rows={2}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <label htmlFor="author-image" className="block text-sm font-medium text-[var(--foreground)]">
            Photo URL <span className="text-[var(--muted)] font-normal">(optional — leave blank to use default founder photo)</span>
          </label>
          <input
            id="author-image"
            type="text"
            value={authorImage}
            onChange={(e) => setAuthorImage(e.target.value)}
            placeholder="/images/adilmaf.png"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-mono text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      {/* Content editor */}
      <div>
        <label className="block text-sm font-medium text-[var(--foreground)]">
          Content
        </label>
        <div className="mt-1">
          <QuillEditor
            value={content}
            onChange={setContent}
            onImageUpload={uploadImage}
            placeholder="Write your post…"
          />
        </div>
      </div>

      {/* Current status badge (edit mode only) */}
      {post && (
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>Status:</span>
          {post.status === "published" && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Published
            </span>
          )}
          {post.status === "draft" && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
              Draft
            </span>
          )}
          {post.status === "archived" && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Archived
            </span>
          )}
        </div>
      )}

      {/* Action bar: error (next to buttons so it's visible when saving) + buttons */}
      <div className="flex flex-col gap-4">
        {error && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            role="alert"
          >
            <p className="font-semibold">Save failed</p>
            <p className="mt-1">{error}</p>
            {(error.includes("author_") || error.includes("schema cache") || error.includes("author fields were not saved")) && (
              <p className="mt-3 text-xs">
                Run this in Supabase → SQL Editor to add the Author columns:{" "}
                <code className="mt-1 block rounded bg-red-100 p-2 font-mono text-[10px]">
                  alter table public.blog_posts add column if not exists author_name text, add column if not exists author_bio text, add column if not exists author_image text;
                </code>
              </p>
            )}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
        {/* Publish */}
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[var(--accent)] px-6 py-2.5 font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-50"
        >
          {saving && savingAs === "published"
            ? "Publishing…"
            : post
              ? "Update & publish"
              : "Publish"}
        </button>

        {/* Save Draft */}
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSubmit("draft")}
          className="rounded-full border border-[var(--border)] px-5 py-2.5 font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)] disabled:opacity-50"
        >
          {saving && savingAs === "draft"
            ? "Saving…"
            : post?.status === "published"
              ? "Unpublish"
              : "Save draft"}
        </button>

        {/* Archive (edit mode only) */}
        {post && post.status !== "archived" && (
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("archived")}
            className="rounded-full border border-red-200 px-5 py-2.5 font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {saving && savingAs === "archived" ? "Archiving…" : "Archive"}
          </button>
        )}

        {/* Unarchive (edit mode, archived posts only) */}
        {post && post.status === "archived" && (
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit("draft")}
            className="rounded-full border border-amber-300 px-5 py-2.5 font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-50"
          >
            {saving && savingAs === "draft" ? "Restoring…" : "Restore to draft"}
          </button>
        )}

        {/* Cancel */}
        <Link
          href="/admin"
          className="rounded-full border border-[var(--border)] px-5 py-2.5 font-medium text-[var(--muted)] hover:bg-[var(--card)]"
        >
          Cancel
        </Link>

        {/* Autosave indicator */}
        {!post && savedLabel && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            {savedLabel}
          </span>
        )}
        </div>
      </div>
    </form>
  );
}
