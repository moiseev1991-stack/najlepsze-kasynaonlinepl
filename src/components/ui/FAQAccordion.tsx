"use client";

import { useState } from "react";
import type { FAQItem } from "@/lib/types";

type Props = { items: FAQItem[]; title?: string };

export function FAQAccordion({ items, title = "Najczęściej zadawane pytania" }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-4xl border border-nk-border/70 bg-gradient-to-b from-nk-rose/25 via-nk-bg-alt/40 to-nk-blue-soft/20 p-6 shadow-card md:p-8">
      <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-brand-300/15 blur-3xl" />
      <h2 className="relative text-xl font-bold text-nk-text">{title}</h2>
      <div className="relative mt-5 space-y-3">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-2xl border border-nk-border/80 bg-nk-surface/95 shadow-sm transition hover:shadow-card"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-nk-text md:px-5"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="shrink-0 text-nk-muted" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? (
                <div className="border-t border-nk-border/60 px-4 pb-4 pt-2 md:px-5">
                  <p className="text-sm leading-relaxed text-nk-muted">{item.answer}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
