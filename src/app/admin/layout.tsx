import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isDemoMode } from "@/lib/admin-demo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const demoMode = isDemoMode();

  if (demoMode) {
    return (
      <div data-theme="admin" className="min-h-dvh bg-[var(--background)]">
        <header className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <Link href="/admin" className="font-semibold text-[var(--foreground)]">
              Admin
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/admin/posts/new" className="text-[var(--accent)] hover:underline">
                New post
              </Link>
              <Link href="/admin/seo" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                SEO & tracking
              </Link>
              <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800 text-xs font-medium">
                Demo mode — no login, posts save to local files
              </span>
              <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                ← Back to site
              </Link>
            </div>
          </div>
        </header>
        {children}
      </div>
    );
  }

  let user: { email?: string } | null = null;
  try {
    const supabase = await createClient();
    const { data: { user: u } } = await supabase.auth.getUser();
    user = u;
  } catch {
    // env missing in createClient
  }

  return (
    <div data-theme="admin" className="min-h-dvh bg-[var(--background)]">
      {user && (
        <header className="border-b border-[var(--border)] bg-[var(--card)] px-4 py-3">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <Link href="/admin" className="font-semibold text-[var(--foreground)]">
              Admin
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/admin/posts/new" className="text-[var(--accent)] hover:underline">
                New post
              </Link>
              <Link href="/admin/seo" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                SEO & tracking
              </Link>
              <span className="text-[var(--muted)]">{user.email}</span>
              <form action="/admin/logout" method="post">
                <button type="submit" className="text-[var(--muted)] hover:text-[var(--foreground)]">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
