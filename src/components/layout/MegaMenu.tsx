"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { megaMenuSections } from "@/config/navigation";

function pathKey(path: string) {
  const base = path.split("#")[0]?.split("?")[0] || "/";
  if (base === "/") return "/";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

function isActivePath(pathname: string, href: string) {
  // Href z fragmentem (np. „/#przewodnik-recenzji") to link do sekcji tej samej strony —
  // Next.js `usePathname()` nie zwraca fragmentu, więc taki wpis nie może być „aktywny"
  // wg pathname. Traktujemy fragment-only linki jako nieaktywne, żeby uniknąć podwójnego
  // podświetlenia (np. „Kasyno" + „Ranking" na stronie głównej).
  if (href.includes("#")) return false;
  return pathKey(pathname) === pathKey(href);
}

/**
 * Wybiera JEDNĄ aktywną sekcję menu, żeby uniknąć wielokrotnego podświetlenia.
 * Priorytet: (1) sekcja z dokładnym overview-hrefem = pathname,
 * (2) pierwsza sekcja, której którekolwiek dziecko match'uje pathname.
 */
function findActiveSectionIndex(
  pathname: string,
  sections: typeof megaMenuSections,
): number {
  for (let i = 0; i < sections.length; i++) {
    if (isActivePath(pathname, sections[i].href)) return i;
  }
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].children.some((c) => isActivePath(pathname, c.href))) return i;
  }
  return -1;
}

const linkBase =
  "block px-4 py-2 text-sm transition";
const linkInactive = "text-nk-muted hover:bg-nk-bg-alt hover:text-nk-text";
const linkActive = "bg-brand-50 font-medium text-brand-800";

const overviewBase = "block px-4 py-2.5 text-sm font-semibold transition";
const overviewInactive = "text-brand-700 hover:bg-brand-50";
const overviewActive = "bg-brand-100 text-brand-800";

export function MegaMenu() {
  const pathname = usePathname() ?? "/";
  const activeIndex = findActiveSectionIndex(pathname, megaMenuSections);
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);

  return (
    <div ref={ref} className="hidden items-stretch gap-0 lg:flex">
      {megaMenuSections.map((section, i) => (
        <div key={section.label} className="relative">
          <button
            type="button"
            className={`flex h-full items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-nk-bg-alt hover:text-nk-text ${
              activeIndex === i ? "bg-brand-50 text-brand-800" : "text-nk-muted"
            }`}
            aria-expanded={open === i}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(open === i ? null : i);
            }}
          >
            {section.label}
            <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i ? (
            <div className="absolute left-0 top-full z-50 mt-1.5 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-nk-border/90 bg-nk-surface/95 py-2 shadow-cardHover backdrop-blur-md">
              <Link
                href={section.href}
                className={`${overviewBase} ${isActivePath(pathname, section.href) ? overviewActive : overviewInactive}`}
                onClick={() => setOpen(null)}
                aria-current={isActivePath(pathname, section.href) ? "page" : undefined}
              >
                Przegląd: {section.overviewLabel ?? section.label}
              </Link>
              <div className="mx-3 my-1 border-t border-nk-border/80" />
              <ul className="max-h-[min(70vh,24rem)] overflow-y-auto">
                {section.children.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className={`${linkBase} ${isActivePath(pathname, c.href) ? linkActive : linkInactive}`}
                      onClick={() => setOpen(null)}
                      aria-current={isActivePath(pathname, c.href) ? "page" : undefined}
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const mobileLinkBase = "block rounded-lg py-1.5 pl-2 pr-2 text-sm -ml-2 transition";
const mobileLinkInactive = "text-nk-muted hover:bg-brand-50/60 hover:text-nk-text";
const mobileLinkActive = "bg-brand-50 font-medium text-brand-800";

export function MegaMenuMobile({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";
  const activeIndex = findActiveSectionIndex(pathname, megaMenuSections);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1 border-t border-nk-border/80 bg-nk-surface/98 px-2 py-3 backdrop-blur-md lg:hidden">
      {megaMenuSections.map((section, i) => (
        <div key={section.label} className="rounded-xl">
          <button
            type="button"
            className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm font-semibold transition hover:bg-nk-bg-alt ${
              activeIndex === i ? "bg-brand-50 text-brand-800" : "text-nk-text"
            }`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            {section.label}
            <span className="text-nk-muted">{expanded === i ? "−" : "+"}</span>
          </button>
          {expanded === i ? (
            <ul className="ml-2 border-l-2 border-brand-200 pb-2 pl-3">
              <li>
                <Link
                  href={section.href}
                  className={`${mobileLinkBase} font-medium ${
                    isActivePath(pathname, section.href) ? mobileLinkActive : "text-brand-700 hover:bg-brand-50/80"
                  }`}
                  onClick={onNavigate}
                  aria-current={isActivePath(pathname, section.href) ? "page" : undefined}
                >
                  Przegląd sekcji
                </Link>
              </li>
              {section.children.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className={`${mobileLinkBase} ${isActivePath(pathname, c.href) ? mobileLinkActive : mobileLinkInactive}`}
                    onClick={onNavigate}
                    aria-current={isActivePath(pathname, c.href) ? "page" : undefined}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
