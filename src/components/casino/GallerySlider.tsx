"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CasinoGalleryShot } from "@/lib/data";

type Props = {
  casinoName: string;
  shots: CasinoGalleryShot[];
};

export function GallerySlider({ casinoName, shots }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!shots.length) return null;

  return (
    <section aria-label={`Zrzuty ekranu ${casinoName}`}>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">
          {casinoName} — zrzuty ekranu serwisu
        </h2>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Poprzedni zrzut"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Następny zrzut"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-700"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
      >
        {shots.map((shot) => (
          <figure
            key={shot.src}
            data-slide
            className="w-[85%] flex-none snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <div className="relative aspect-[16/10] w-full bg-slate-100">
              <Image
                src={shot.src}
                alt={`${casinoName} — ${shot.label}`}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                unoptimized
              />
            </div>
            <figcaption className="border-t border-slate-100 bg-slate-50/60 px-4 py-2 text-xs font-medium text-slate-600">
              {shot.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
