"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { ProductHuntIcon } from "./ProductHuntIcon";

type NavChild = { href: string; label: string; prominent?: boolean };
type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const navItems = site.nav as unknown as NavItem[];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setExpandedItem(null);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setIsOpen(false); setExpandedItem(null); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const close = () => { setIsOpen(false); setExpandedItem(null); };

  return (
    <div ref={ref} className="relative md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {isOpen ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="4" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="19" y2="6" />
              <line x1="3" y1="11" x2="19" y2="11" />
              <line x1="3" y1="16" x2="19" y2="16" />
            </>
          )}
        </svg>
      </button>

      {/* Dropdown panel — positioned below the header, right-aligned */}
      {isOpen && (
        <div
          className="absolute right-0 top-[calc(100%+12px)] w-[min(300px,calc(100vw-24px))] rounded-2xl border border-white/10 bg-[#0d1f35] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
          role="dialog"
          aria-label="Mobile navigation"
        >
          {/* Nav links */}
          <nav className="px-2 py-2">
            <ul className="flex flex-col" role="list">
              {navItems.map((item) => {
                if (item.children && item.children.length > 0) {
                  const isExpanded = expandedItem === item.label;
                  return (
                    <li key={item.href}>
                      <div className="flex items-center rounded-xl">
                        <button
                          type="button"
                          onClick={() => setExpandedItem(isExpanded ? null : item.label)}
                          className="flex flex-1 items-center justify-between px-3 py-3 text-[15px] font-semibold text-white hover:text-[var(--accent)] transition-colors"
                          aria-expanded={isExpanded}
                        >
                          {item.label}
                          <svg className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      {isExpanded && (
                        <ul className="mx-3 mb-1 border-l-2 border-white/10 pl-3" role="list">
                          {item.children.map((child) => (
                            <li key={`${child.href}-${child.label}`}>
                              <Link
                                href={child.href}
                                onClick={close}
                                className={`block py-2.5 px-2 text-sm rounded-lg transition-colors hover:bg-white/5 ${
                                  child.prominent ? "font-semibold text-[var(--accent)]" : "text-white/65 hover:text-white"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block px-3 py-3 text-[15px] font-semibold text-white hover:text-[var(--accent)] rounded-xl hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Divider + Investor Portal CTA */}
          <div className="border-t border-white/10 p-3">
            <Link
              href="/investor-portal"
              onClick={close}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#f3e3ac] text-sm font-semibold text-[#5c4a1f] hover:bg-[#f5e8bd] transition-colors"
            >
              <ProductHuntIcon className="h-5 w-5" />
              Investor Portal
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
