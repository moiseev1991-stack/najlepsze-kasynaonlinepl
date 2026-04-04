"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState({ top: 0, right: 0, width: 320 });

  useLayoutEffect(() => {
    if (!open) return;

    function position() {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const margin = 16;
      const maxW = 320;
      setPlace({
        top: rect.bottom + 8,
        right: Math.max(margin, window.innerWidth - rect.right),
        width: Math.min(window.innerWidth - margin * 2, maxW),
      });
    }

    position();
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-nk-border bg-nk-surface text-nk-muted transition hover:border-brand-300 hover:bg-nk-bg-alt hover:text-nk-text"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Szukaj na stronie"
        onClick={() => setOpen((v) => !v)}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[140] cursor-default bg-transparent"
            aria-label="Zamknij wyszukiwarkę"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Wyszukiwarka"
            className="fixed z-[150] rounded-2xl border border-nk-border/90 bg-nk-surface p-3 shadow-cardHover backdrop-blur-md"
            style={{ top: place.top, right: place.right, width: place.width }}
          >
            <p className="text-xs text-nk-muted">
              Wpisz frazę i użyj menu lub przejdź do{" "}
              <Link href="/blog/" className="font-medium text-brand-700 hover:underline">
                bloga
              </Link>{" "}
              oraz{" "}
              <Link href="/#przewodnik-recenzji" className="font-medium text-brand-700 hover:underline">
                recenzji
              </Link>
              . Pełna wyszukiwarka może zostać podłączona pod CMS.
            </p>
            <input
              type="search"
              placeholder="Szukaj…"
              className="mt-2 w-full rounded-xl border border-nk-border bg-nk-bg px-3 py-2 text-sm text-nk-text outline-none ring-brand-500/20 focus:border-brand-400 focus:ring-2"
              autoFocus
            />
          </div>
        </>
      ) : null}
    </div>
  );
}
