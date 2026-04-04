"use client";

import { useId } from "react";

type Props = {
  className?: string;
  /** Bazowy rozmiar (px); viewBox skalowany 32×32 */
  size?: number;
  /** Jaśniejszy akcent na ciemnym tle (stopka) */
  variant?: "default" | "dark";
};

/**
 * Znak marki: czerwony „żeton” z białym diamentem (asocjacja z kartami / wygraną),
 * bez krzykliwej grafiki — spójny z nk-red.
 */
export function BrandMark({ className = "", size = 40, variant = "default" }: Props) {
  const uid = useId().replace(/:/g, "");
  const gid = `bm-${variant}-${uid}`;
  const g0 = variant === "dark" ? "#ff5c6e" : "#f43f5e";
  const g1 = variant === "dark" ? "#c9183a" : "#9f1239";
  const ring = variant === "dark" ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.38)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor={g0} />
          <stop offset="0.45" stopColor="#dc143c" />
          <stop offset="1" stopColor={g1} />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="8.5" fill={`url(#${gid})`} />
      <rect
        x="4.25"
        y="4.25"
        width="23.5"
        height="23.5"
        rx="6.5"
        fill="none"
        stroke={ring}
        strokeWidth="1.25"
      />
      <path
        d="M16 8.2 23.4 16 16 23.8 8.6 16Z"
        fill="#fff"
        fillOpacity={0.96}
      />
      <path
        d="M16 11.2 20.1 16 16 20.8 11.9 16Z"
        fill={g1}
        fillOpacity={0.22}
      />
    </svg>
  );
}
