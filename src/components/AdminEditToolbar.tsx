"use client";

/**
 * AdminEditToolbar
 *
 * Rendered client-side only. Checks Supabase session on mount.
 * When logged in as admin, adds floating "Edit" buttons to every
 * element with data-cms-block="pageSlug/blockKey" on the page.
 *
 * Zero effect on SSR HTML — the toolbar only mounts after hydration.
 * Does NOT affect SEO because Google sees the original server-rendered HTML.
 */

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";

type EditButton = {
  id: string; // pageSlug/blockKey
  rect: DOMRect;
};

export function AdminEditToolbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editButtons, setEditButtons] = useState<EditButton[]>([]);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return;

    const supabase = createBrowserClient(supabaseUrl, supabaseKey);

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAdmin(true);

      // Find all cms blocks on the page
      const scanBlocks = () => {
        const elements = document.querySelectorAll<HTMLElement>("[data-cms-block]");
        const buttons: EditButton[] = [];
        elements.forEach((el) => {
          const id = el.getAttribute("data-cms-block");
          if (!id) return;
          const rect = el.getBoundingClientRect();
          buttons.push({ id, rect: new DOMRect(rect.x + window.scrollX, rect.y + window.scrollY, rect.width, rect.height) });
        });
        setEditButtons(buttons);
      };

      scanBlocks();

      // Re-scan on scroll/resize so positions stay accurate
      const handler = () => scanBlocks();
      window.addEventListener("resize", handler);
      window.addEventListener("scroll", handler, { passive: true });
      return () => {
        window.removeEventListener("resize", handler);
        window.removeEventListener("scroll", handler);
      };
    });
  }, []);

  if (!isAdmin) return null;

  return (
    <>
      {/* Admin banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 rounded-full border border-[var(--accent)]/30 bg-[var(--surface-dark)] px-4 py-2 shadow-xl text-sm text-white">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" aria-hidden />
          <span>Admin mode — click any <strong className="text-[var(--accent)]">Edit</strong> button to edit a section</span>
          <Link
            href="/admin/pages"
            className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-[var(--surface-dark)] hover:bg-[var(--accent-hover)]"
          >
            Page editor
          </Link>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="ml-1 text-white/50 hover:text-white"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* Edit buttons overlaid on each cms block */}
      {editButtons.map((btn) => {
        const [pageSlug, blockKey] = btn.id.split("/");
        if (!pageSlug || !blockKey) return null;
        return (
          <Link
            key={btn.id}
            href={`/admin/pages/${pageSlug}#${blockKey}`}
            title={`Edit: ${blockKey}`}
            style={{
              position: "absolute",
              top: btn.rect.top + 10,
              right: Math.max(0, window.innerWidth - btn.rect.right) + 10,
              zIndex: 9990,
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--surface-dark)]/90 px-2.5 py-1 text-[11px] font-semibold text-[var(--accent)] shadow-lg backdrop-blur-sm transition hover:bg-[var(--accent)] hover:text-white"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </Link>
        );
      })}
    </>
  );
}
