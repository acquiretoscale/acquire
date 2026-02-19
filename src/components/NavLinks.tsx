"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import type { MegaMenuSection, MegaMenuLayout } from "@/lib/site";
import type { AssetSlug } from "@/lib/due-diligence";
import { AssetIcon } from "@/components/AssetIcon";

type NavChild = { href: string; label: string; prominent?: boolean };
type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
  megaMenu?: { sections: MegaMenuSection[]; layout?: MegaMenuLayout };
};

// Icon wrapper for white-background context (teal-700 for contrast)
function MenuAssetIcon({ slug }: { slug: AssetSlug }) {
  return (
    <span className="[&_svg]:text-[#0d9488]" aria-hidden>
      <AssetIcon slug={slug} />
    </span>
  );
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDropdown();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeDropdown]);

  return (
    <div ref={navContainerRef} className="contents">
      {items.map((item) => {
        if (item.megaMenu) {
          const isOpen = openDropdown === item.href;
          const panelId = `mega-menu-${item.href.replace(/\//g, "-")}`;
          return (
            <div
              key={item.href}
              className="relative flex items-center"
              onMouseEnter={() => setOpenDropdown(item.href)}
            >
              <Link
                href={item.href}
                className="text-[var(--on-dark-muted)] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)] rounded"
              >
                {item.label.toUpperCase()}
              </Link>
              <button
                ref={isOpen ? triggerRef : undefined}
                type="button"
                onClick={() => setOpenDropdown(isOpen ? null : item.href)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center p-1 text-[var(--on-dark-muted)] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)] rounded"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-controls={panelId}
                aria-label={`Toggle ${item.label} menu`}
              >
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 ${item.megaMenu.layout === "blocks" ? "w-[min(460px,calc(100vw-2rem))]" : "w-[min(480px,calc(100vw-2rem))]"}`}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-opacity duration-150">
                    {item.megaMenu.layout === "blocks" ? (
                      <div className="flex flex-col divide-y divide-slate-200">
                        {item.megaMenu.sections.map((section) => (
                          <div key={section.title} className="p-5 sm:p-6">
                            <Link
                              href={section.href}
                              onClick={closeDropdown}
                              className="text-sm font-bold text-slate-900 hover:text-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40 focus:ring-offset-2 focus:ring-offset-white rounded"
                            >
                              {section.title}
                            </Link>
                            {section.bullets ? (
                              <ul className="mt-3 space-y-3 text-[11px] leading-relaxed text-slate-600" role="list">
                                {section.bullets.map((bullet, i) => {
                                  const item = typeof bullet === "string" ? { label: bullet.split(": ")[0], desc: bullet.split(": ").slice(1).join(": ") } : bullet;
                                  return (
                                    <li key={i} className="flex gap-2.5">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d9488]/60" aria-hidden />
                                      <span className="min-w-0 flex-1">
                                        <span className="font-semibold text-slate-700">{item.label}:</span>{" "}
                                        <span className="text-slate-600">{item.desc}</span>
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : section.description ? (
                              <p className="mt-3 text-[11px] leading-relaxed text-slate-600">
                                {section.description}
                              </p>
                            ) : null}
                            <Link
                              href={section.href}
                              onClick={closeDropdown}
                              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d9488] hover:underline"
                            >
                              Learn more
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex divide-x divide-slate-200">
                        {item.megaMenu.sections.map((section, idx) => (
                        <div
                          key={section.title}
                          className={`flex flex-1 flex-col ${idx === 0 ? "min-w-0 bg-slate-50/70" : ""}`}
                        >
                          <div className="border-b border-slate-200 bg-white px-4 py-2.5">
                            <Link
                              href={section.href}
                              onClick={closeDropdown}
                              className="text-[11px] font-bold uppercase tracking-widest text-slate-900 hover:text-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/40 focus:ring-offset-2 focus:ring-offset-white rounded"
                            >
                              {section.title}
                            </Link>
                          </div>
                          <ul className="flex flex-col py-1" role="list">
                            {section.items.map((child) => (
                              <li key={`${child.href}-${child.label}`}>
                                <Link
                                  href={child.href}
                                  onClick={closeDropdown}
                                  className="flex min-h-[36px] items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-900 transition hover:bg-slate-100 focus:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0d9488]/40 rounded-lg"
                                >
                                  {child.slug ? (
                                    <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">
                                      <MenuAssetIcon slug={child.slug as AssetSlug} />
                                    </span>
                                  ) : (
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#0d9488]" aria-hidden>
                                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
                                      </svg>
                                    </span>
                                  )}
                                  <span className="min-w-0 truncate">{child.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        }
        if (item.children && item.children.length > 0) {
          const isOpen = openDropdown === item.href;
          return (
            <div
              key={item.href}
              className="relative flex items-center"
              onMouseEnter={() => setOpenDropdown(item.href)}
            >
              <Link
                href={item.href}
                className="text-[var(--on-dark-muted)] transition hover:text-white"
              >
                {item.label.toUpperCase()}
              </Link>
              <button
                type="button"
                onClick={() => setOpenDropdown((v) => (v === item.href ? null : item.href))}
                className="flex items-center p-1 text-[var(--on-dark-muted)] transition hover:text-white"
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label={`Toggle ${item.label} menu`}
              >
                <svg
                  className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div
                  className="absolute left-0 top-full pt-2"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <ul
                    className="min-w-[280px] rounded-xl border border-white/10 bg-[var(--surface-dark-2)] py-2 shadow-xl"
                    role="list"
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2.5 text-[13px] hover:bg-white/5 ${child.prominent ? "font-semibold text-[var(--accent)]" : "text-white"}`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className="text-[var(--on-dark-muted)] transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[var(--surface-dark)] rounded"
          >
            {item.label.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
