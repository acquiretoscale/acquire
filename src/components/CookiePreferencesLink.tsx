"use client";

const STORAGE_KEY = "acquiretoscale_cookie_consent";

export function CookiePreferencesLink() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="transition hover:text-[var(--on-dark)] hover:underline"
    >
      Cookie Preferences
    </button>
  );
}
