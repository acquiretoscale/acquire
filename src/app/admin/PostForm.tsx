"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { QuillEditor } from "@/components/editor/QuillEditor";

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
  const [content, setContent] = useState(post?.content ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.meta_description ?? ""
  );
  const [featuredImage, setFeaturedImage] = useState(
    post?.featured_image ?? ""
  );
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingAs, setSavingAs] = useState<"draft" | "published" | null>(null);
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
      setContent(draft.content);
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
        content,
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
  async function handleSubmit(status: "draft" | "published") {
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
            content,
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
    const base = {
      title,
      slug: resolvedSlug,
      content,
      meta_description: metaDescription || null,
      featured_image: featuredImage || null,
      featured,
      status,
    };
    if (post) {
      const { error: err } = await supabase
        .from("blog_posts")
        .update({ ...base, updated_at: new Date().toISOString() })
        .eq("id", post.id);
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
      {error && (
        <p
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

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

      {/* Action bar: autosave indicator + buttons */}
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
          {saving && savingAs === "draft" ? "Saving…" : "Save draft"}
        </button>

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
    </form>
  );
}
