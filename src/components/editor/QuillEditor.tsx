"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function youtubeUrlToEmbed(url: string): string | null {
  const trimmed = url.trim();
  const m = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return null;
}

function buildTableHtml(rows: number, cols: number, width: string): string {
  const cell = `<td style="border:1px solid #cbd5e1;padding:8px 10px;min-width:60px">&nbsp;</td>`;
  const row = `<tr>${Array(cols).fill(cell).join("")}</tr>`;
  return `<table style="width:${width};border-collapse:collapse;table-layout:fixed"><tbody>${Array(rows).fill(row).join("")}</tbody></table><p><br></p>`;
}

/* ------------------------------------------------------------------ */
/*  Visual grid picker (like Word / Google Docs)                       */
/* ------------------------------------------------------------------ */

const MAX_GRID = 8;
const TABLE_WIDTHS = [
  { value: "100%", label: "Full width" },
  { value: "75%", label: "75%" },
  { value: "50%", label: "Half width" },
];

function TableGridPicker({
  onSelect,
  onClose,
}: {
  onSelect: (r: number, c: number, width: string) => void;
  onClose: () => void;
}) {
  const [hover, setHover] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const [width, setWidth] = useState("100%");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 rounded-lg border border-[var(--border-strong)] bg-white p-3 shadow-xl"
    >
      <p className="mb-2 text-xs font-medium text-[var(--muted)]">
        {hover.r > 0 ? `${hover.r} × ${hover.c}` : "Select size"}
      </p>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${MAX_GRID}, 1fr)`, gap: 2 }}
      >
        {Array.from({ length: MAX_GRID * MAX_GRID }, (_, i) => {
          const r = Math.floor(i / MAX_GRID) + 1;
          const c = (i % MAX_GRID) + 1;
          const active = r <= hover.r && c <= hover.c;
          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover({ r, c })}
              onClick={() => {
                onSelect(r, c, width);
                onClose();
              }}
              className={`h-5 w-5 rounded-sm border transition-colors ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent-light)]"
                  : "border-[var(--border)] bg-white hover:border-[var(--accent)]"
              }`}
              aria-label={`${r} rows × ${c} columns`}
            />
          );
        })}
      </div>
      {/* Width selector */}
      <div className="mt-3 border-t border-[var(--border)] pt-2">
        <p className="mb-1 text-xs font-medium text-[var(--muted)]">Table width</p>
        <div className="flex gap-1">
          {TABLE_WIDTHS.map((w) => (
            <button
              key={w.value}
              type="button"
              onClick={() => setWidth(w.value)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                width === w.value
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-[var(--border)]"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Video URL input (inline, not a window.prompt)                      */
/* ------------------------------------------------------------------ */

function VideoInput({
  onInsert,
  onClose,
}: {
  onInsert: (embedUrl: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [onClose]);

  const handleSubmit = () => {
    const embedUrl = youtubeUrlToEmbed(url);
    if (!embedUrl) {
      setError("Enter a valid YouTube URL");
      return;
    }
    onInsert(embedUrl);
    onClose();
  };

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-80 rounded-lg border border-[var(--border-strong)] bg-white p-3 shadow-xl"
    >
      <p className="mb-2 text-xs font-medium text-[var(--muted)]">
        Paste YouTube video URL
      </p>
      <input
        ref={inputRef}
        type="url"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
          if (e.key === "Escape") onClose();
        }}
        placeholder="https://www.youtube.com/watch?v=..."
        className="w-full rounded border border-[var(--border)] px-2 py-1.5 text-sm focus:border-[var(--accent)] focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-2 rounded bg-[var(--accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
      >
        Embed video
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main editor                                                        */
/* ------------------------------------------------------------------ */

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  placeholder?: string;
};

export function QuillEditor({
  value,
  onChange,
  onImageUpload,
  placeholder = "Write your post…",
}: QuillEditorProps) {
  const quillRef = useRef<QuillRefType>(null);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);

  /* ---- undo / redo via Quill history module ---- */
  const handleUndo = useCallback(() => {
    const editor = quillRef.current?.getEditor?.();
    const history = editor?.getModule?.("history");
    if (history?.undo) history.undo();
  }, []);

  const handleRedo = useCallback(() => {
    const editor = quillRef.current?.getEditor?.();
    const history = editor?.getModule?.("history");
    if (history?.redo) history.redo();
  }, []);

  /* ---- image handler ---- */
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await onImageUpload(file);
        const editor = quillRef.current?.getEditor?.();
        if (editor) {
          const range = editor.getSelection?.(true);
          const index = range?.index ?? editor.getLength?.() ?? 0;
          editor.insertEmbed?.(index, "image", url);
          const alt = window.prompt(
            "Alt text for SEO / accessibility (optional):"
          );
          if (alt?.trim()) {
            try {
              const [leaf] = editor.getLeaf?.(index) ?? [null];
              if (
                leaf &&
                typeof (leaf as { format?: (n: string, v: string) => void })
                  .format === "function"
              ) {
                (leaf as { format: (n: string, v: string) => void }).format(
                  "alt",
                  alt.trim()
                );
              }
            } catch {
              /* ok */
            }
          }
        }
      } catch {
        /* ignore */
      }
    };
  }, [onImageUpload]);

  /* ---- insert table ---- */
  const handleInsertTable = useCallback(
    (rows: number, cols: number, width: string) => {
      let done = false;
      try {
        const editor = quillRef.current?.getEditor?.();
        if (editor) {
          const tableModule = editor.getModule?.("table");
          if (tableModule && typeof tableModule.insertTable === "function") {
            editor.focus?.();
            if (!editor.getSelection?.()) {
              editor.setSelection?.(editor.getLength?.() ?? 0, 0);
            }
            tableModule.insertTable(rows, cols);
            done = true;
          }
        }
      } catch {
        /* fallback below */
      }

      if (!done) {
        const html = buildTableHtml(rows, cols, width);
        const current = (value || "").replace(/<p><br><\/p>$/i, "");
        onChange(current + html);
      }
    },
    [value, onChange]
  );

  /* ---- insert video ---- */
  const handleInsertVideo = useCallback(
    (embedUrl: string) => {
      const safe = embedUrl.replace(/"/g, "&quot;");
      const deleteBtn = `<button type="button" class="ql-video-delete-btn" contenteditable="false" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.8);color:#fff;border:none;border-radius:6px;padding:4px 12px;font-size:12px;font-weight:600;cursor:pointer;opacity:0;transition:opacity .15s;z-index:5">✕ Remove</button>`;
      const wrapper = `<div class="ql-video-wrapper" contenteditable="false" style="position:relative;margin:16px 0">${deleteBtn}<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${safe}" style="width:100%;aspect-ratio:16/9;border-radius:0.5rem;display:block"></iframe></div>`;
      const current = (value || "").replace(/<p><br><\/p>$/i, "");
      onChange(current + wrapper + "<p><br></p>");
    },
    [value, onChange]
  );

  /* ---- remove video: click × overlay ---- */
  useEffect(() => {
    const editorRoot = quillRef.current?.getEditor?.()?.root as
      | HTMLElement
      | undefined;
    if (!editorRoot) return;

    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList?.contains("ql-video-delete-btn")) {
        const wrapper = target.closest(".ql-video-wrapper");
        if (wrapper) {
          wrapper.remove();
          // sync value back
          onChange(editorRoot.innerHTML);
        }
      }
    };
    editorRoot.addEventListener("click", handler);
    return () => editorRoot.removeEventListener("click", handler);
  });

  /* ---- Quill config ---- */
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: ["1", "2", "3", false] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ align: ["", "center", "right", "justify"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["blockquote", "code-block"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      table: true,
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
    "table",
    "table-row",
    "table-body",
    "table-container",
  ];

  return (
    <div className="blog-editor-wrapper">
      <div className="rounded-lg border-2 border-[var(--border-strong)] bg-white overflow-hidden">
        {/* Extra toolbar row */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] bg-[#f1f5f9] px-3 py-2">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            title="Undo (Ctrl+Z)"
            className="flex items-center justify-center rounded border border-[var(--border-strong)] bg-white p-1.5 text-[var(--foreground)] hover:bg-[var(--card-hover)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7h7a3 3 0 0 1 0 6H8" />
              <path d="M6 4L3 7l3 3" />
            </svg>
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={handleRedo}
            title="Redo (Ctrl+Shift+Z)"
            className="flex items-center justify-center rounded border border-[var(--border-strong)] bg-white p-1.5 text-[var(--foreground)] hover:bg-[var(--card-hover)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 7H6a3 3 0 0 0 0 6h2" />
              <path d="M10 4l3 3-3 3" />
            </svg>
          </button>

          <div className="mx-1 h-6 w-px bg-[var(--border)]" />

          {/* Table button + visual grid picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowTablePicker((o) => !o);
                setShowVideoInput(false);
              }}
              className="flex items-center gap-1.5 rounded border border-[var(--border-strong)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="1" width="14" height="14" rx="1.5" />
                <line x1="1" y1="5.5" x2="15" y2="5.5" />
                <line x1="1" y1="10.5" x2="15" y2="10.5" />
                <line x1="5.5" y1="1" x2="5.5" y2="15" />
                <line x1="10.5" y1="1" x2="10.5" y2="15" />
              </svg>
              Table
              <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-60">
                <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {showTablePicker && (
              <TableGridPicker
                onSelect={handleInsertTable}
                onClose={() => setShowTablePicker(false)}
              />
            )}
          </div>

          {/* Video button + inline URL input */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowVideoInput((o) => !o);
                setShowTablePicker(false);
              }}
              className="flex items-center gap-1.5 rounded border border-[var(--border-strong)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--card-hover)]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="1" y="2.5" width="14" height="11" rx="1.5" />
                <polygon points="6.5,5.5 11,8 6.5,10.5" fill="currentColor" stroke="none" />
              </svg>
              Video
            </button>
            {showVideoInput && (
              <VideoInput
                onInsert={handleInsertVideo}
                onClose={() => setShowVideoInput(false)}
              />
            )}
          </div>
        </div>

        {/* Quill editor */}
        <div className="[&_.ql-toolbar]:border-t-0 [&_.ql-toolbar]:rounded-none [&_.ql-container]:border-0">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            className="[&_.ql-editor]:min-h-[320px]"
          />
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type QuillRefType = {
  getEditor?: () => any;
} | null;
