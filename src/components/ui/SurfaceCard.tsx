import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
};

/** Biała powierzchnia z głębią — karty redakcyjne / disclaimer */
export function SurfaceCard({ children, className = "", elevated = true }: Props) {
  return (
    <div
      className={`rounded-3xl border border-nk-border/90 bg-nk-surface/95 text-nk-text shadow-card backdrop-blur-sm transition-shadow duration-300 ${
        elevated ? "hover:shadow-cardHover" : ""
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}
