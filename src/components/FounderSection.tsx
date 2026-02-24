import Link from "next/link";
import type { FounderBlock } from "@/lib/page-content";

// Social platform config: icon SVG paths + colors
const SOCIAL_PLATFORMS = [
  {
    key: "instagram" as const,
    label: "Instagram",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "substack" as const,
    label: "Substack",
    color: "#FF6719",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "twitter" as const,
    label: "X (Twitter)",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "website" as const,
    label: "Website",
    color: "#0d9488",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

type Props = {
  founder: FounderBlock;
};

export function FounderSection({ founder }: Props) {
  // Don't render the section at all if name and bio are both empty (not yet filled)
  const hasContent = founder.name || founder.bio || founder.image_src;
  if (!hasContent) return null;

  const activeSocials = SOCIAL_PLATFORMS.filter(
    (p) => founder.social?.[p.key]?.trim()
  );

  // Split bio into paragraphs on newlines
  const bioParagraphs = founder.bio
    ? founder.bio.split(/\n+/).filter(Boolean)
    : [];

  return (
    <section
      data-cms-block="about/founder"
      className="border-t border-[var(--border)] py-16 md:py-20"
    >
      <div className="mx-auto max-w-4xl px-4">
        {/* Section label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
          Meet the founder
        </p>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:gap-14 md:items-start">
          {/* Photo column */}
          <div className="flex shrink-0 flex-col items-center gap-5 md:w-56">
            {founder.image_src ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={founder.image_src}
                alt={founder.image_alt || founder.name || "Founder"}
                className="h-52 w-52 rounded-2xl object-cover shadow-lg ring-2 ring-[var(--border)] md:h-56 md:w-56"
              />
            ) : (
              /* Placeholder avatar */
              <div className="flex h-52 w-52 items-center justify-center rounded-2xl bg-[var(--card)] ring-2 ring-[var(--border)] md:h-56 md:w-56">
                <svg className="h-24 w-24 text-[var(--muted)]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}

            {/* Social icons */}
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2.5">
                {activeSocials.map((platform) => {
                  const url = founder.social?.[platform.key] ?? "";
                  const href = url.startsWith("http") ? url : `https://${url}`;
                  return (
                    <Link
                      key={platform.key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform.label}
                      title={platform.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] shadow-sm transition hover:scale-110 hover:border-transparent hover:shadow-md"
                      style={{ "--hover-color": platform.color } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = platform.color;
                        (e.currentTarget as HTMLElement).style.borderColor = platform.color + "40";
                        (e.currentTarget as HTMLElement).style.background = platform.color + "10";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "";
                        (e.currentTarget as HTMLElement).style.borderColor = "";
                        (e.currentTarget as HTMLElement).style.background = "";
                      }}
                    >
                      {platform.icon}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bio column */}
          <div className="min-w-0 flex-1">
            {founder.name && (
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                {founder.name}
              </h2>
            )}
            {founder.title && (
              <p className="mt-1 text-base font-medium text-[var(--accent)]">
                {founder.title}
              </p>
            )}
            {(founder.name || founder.title) && (
              <div className="mt-4 h-0.5 w-12 rounded-full bg-[var(--accent)]" aria-hidden />
            )}
            {bioParagraphs.length > 0 && (
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--muted)]">
                {bioParagraphs.map((para, i) => {
                  // Support **bold** and [text](url) in the bio
                  return <p key={i} dangerouslySetInnerHTML={{ __html: renderBioMarkdown(para) }} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Very minimal markdown renderer for bio text:
 * - **bold** → <strong>
 * - [text](url) → <a target="_blank">
 * - _italic_ → <em>
 */
function renderBioMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-[var(--accent)] underline-offset-2 hover:underline">$1</a>'
    );
}
