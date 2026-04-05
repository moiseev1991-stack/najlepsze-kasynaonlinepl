"use client";

import { useState } from "react";
import { MegaMenu, MegaMenuMobile } from "@/components/layout/MegaMenu";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-nk-border/90 bg-nk-surface/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-nk-surface/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-3.5">
        <BrandLogo className="shrink-0" />

        <MegaMenu />

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-nk-border bg-nk-surface p-2 text-nk-text transition hover:border-brand-300 hover:bg-nk-bg-alt lg:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? <MegaMenuMobile onNavigate={() => setOpen(false)} /> : null}
    </header>
  );
}
