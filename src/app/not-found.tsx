import Link from "next/link";

export default function NotFound() {
  return (
    <div data-theme="content" className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-2xl font-semibold">Page not found</h2>
          <p className="max-w-md text-[var(--muted)]">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 font-semibold text-[var(--surface-dark)] transition hover:bg-[var(--accent-hover)]"
            >
              Go home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[var(--border)] px-6 font-semibold text-[var(--foreground)] transition hover:bg-[var(--card-hover)]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
