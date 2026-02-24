"use client";

/**
 * ImageUpload — drag-and-drop image uploader for admin block editors.
 * Uploads to Supabase Storage bucket "page-images" and returns the public URL.
 */

import { useRef, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type Props = {
  label?: string;
  currentUrl?: string;
  onUploaded: (publicUrl: string) => void;
};

export function ImageUpload({ label = "Image", currentUrl, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const ext = file.name.split(".").pop() ?? "jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("page-images")
        .upload(filename, file, { upsert: false, contentType: file.type });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("page-images").getPublicUrl(filename);
      const url = data.publicUrl;
      setPreview(url);
      onUploaded(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</label>

      {/* Current image preview */}
      {preview && (
        <div className="relative w-40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="h-24 w-40 rounded-lg border border-[var(--border)] object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(null); onUploaded(""); }}
            className="absolute right-1 top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] px-4 py-6 text-center hover:border-[var(--accent)]/50 hover:bg-[var(--card)] transition-colors"
      >
        <svg className="h-6 w-6 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="text-sm text-[var(--muted)]">
          {uploading ? "Uploading…" : "Click or drag an image here"}
        </p>
        <p className="text-xs text-[var(--muted)] opacity-60">PNG, JPG, WebP — max 5 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
