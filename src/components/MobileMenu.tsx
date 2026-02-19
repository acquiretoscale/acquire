"use client";

import { useState } from "react";
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

  const navItems = site.nav as NavItem[];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 p-2 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`h-0.5 w-6 bg-white transition-all ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-all ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-all ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
          <nav
            className="fixed right-0 top-0 z-50 h-full w-64 overflow-y-auto border-l border-white/10 bg-[var(--surface-dark)] p-6 shadow-xl md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                if (item.children && item.children.length > 0) {
                  const isExpanded = expandedItem === item.href;
                  return (
                    <div key={item.href}>
                      <div className="flex w-full items-center justify-between gap-2">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-medium text-white hover:text-[var(--on-dark-muted)]"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setExpandedItem(isExpanded ? null : item.href)}
                          className="shrink-0 p-1 text-white"
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <svg
                            className={`h-5 w-5 transition ${isExpanded ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      {isExpanded && (
                        <ul className="mt-2 flex flex-col gap-1 border-l-2 border-white/20 pl-4" role="list">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`block py-1.5 text-base hover:text-white ${child.prominent ? "font-semibold text-[var(--accent)]" : "text-[var(--on-dark-muted)]"}`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-white hover:text-[var(--on-dark-muted)]"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/investor-portal"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#f3e3ac] px-5 font-semibold text-[#5c4a1f] transition hover:bg-[#f5e8bd]"
              >
                <ProductHuntIcon className="h-5 w-5" />
                Investor Portal
              </Link>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
