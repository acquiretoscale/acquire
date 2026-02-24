"use client";

import Image from "next/image";
import Link from "next/link";
import type { FounderBlock } from "@/lib/page-content";

type SocialPlatform = {
  key: keyof import("@/lib/page-content").SocialLinks;
  label: string;
  color: string;
  bgColor?: string;
  hoverBgColor?: string;
  icon: React.ReactNode;
};

const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    key: "instagram" as const,
    label: "Instagram",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "youtube" as const,
    label: "YouTube",
    color: "#ffffff",
    bgColor: "#FF0000",
    hoverBgColor: "#cc0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    key: "substack" as const,
    label: "Substack",
    color: "#FF6719",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "twitter" as const,
    label: "X / Twitter",
    color: "#ffffff",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "website" as const,
    label: "Website",
    color: "#4dd9e0",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

type Props = { founder: FounderBlock; dataCmsBlock?: string; showLabel?: boolean };

export function FounderSection({ founder, dataCmsBlock = "about/founder", showLabel = true }: Props) {
  const hasContent = founder.name || founder.bio || founder.image_src;
  if (!hasContent) return null;

  const activeSocials = SOCIAL_PLATFORMS.filter((p) => founder.social?.[p.key]?.trim());
  const name = founder.name;
  const title = founder.title;
  const bioParagraphs = founder.bio ? founder.bio.split(/\n+/).filter(Boolean) : [];

  return (
    <section
      data-cms-block={dataCmsBlock}
      className="relative overflow-hidden py-12 md:py-16"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f2744 100%)" }}
    >
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4">
        {showLabel && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
            About the founder
          </p>
        )}

        <div className={`flex flex-col gap-8 md:flex-row md:gap-12 md:items-start ${showLabel ? "mt-8" : ""}`}>
          {/* Photo */}
          <div className="flex shrink-0 flex-col items-center md:items-start">
            <div className="relative h-64 w-64 md:h-72 md:w-64 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
              {founder.image_src ? (
                <Image
                  src={founder.image_src}
                  alt={founder.image_alt || founder.name || "Founder"}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, 288px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5">
                  <svg className="h-24 w-24 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              {/* Photo overlay gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f172a]/60 to-transparent" aria-hidden />
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            {(name || title) && (
              <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                {name && <span>{name}</span>}
                {title && (
                  <span className="ml-2 text-base font-medium text-sky-200 md:text-lg">
                    — {title}
                  </span>
                )}
              </h2>
            )}
            <div className="mt-4 h-0.5 w-14 rounded-full bg-sky-400" aria-hidden />

            {bioParagraphs.length > 0 && (
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300 md:text-lg">
                {bioParagraphs.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: renderBioMarkdown(para) }} />
                ))}
              </div>
            )}

            {/* Social block below text */}
            {activeSocials.length > 0 && (
                <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Follow Adil
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeSocials.map((platform) => {
                    const url = founder.social?.[platform.key] ?? "";
                    const href = url.startsWith("http") ? url : `https://${url}`;
                    const stat = founder.social_stats?.[platform.key];
                    const hasBg = !!platform.bgColor;
                    return (
                      <Link
                        key={platform.key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.03]"
                        style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                      >
                        <span className="h-4 w-4 shrink-0" style={{ color: platform.bgColor ?? platform.color }}>
                          {platform.icon}
                        </span>
                        <span className="flex flex-col leading-tight text-slate-700">
                          <span className="font-semibold">{platform.label}</span>
                          {stat && (
                            <span className="text-[9px] font-normal text-slate-400 group-hover:text-slate-500">
                              {stat}
                            </span>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderBioMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="font-medium text-sky-400 underline-offset-2 hover:underline">$1</a>'
    );
}
