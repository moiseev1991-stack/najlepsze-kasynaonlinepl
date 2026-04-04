import type { ReactNode } from "react";

export type SectionVariant = "transparent" | "surface" | "tinted" | "rose" | "gradient" | "mesh";

const variantClass: Record<SectionVariant, string> = {
  transparent: "",
  surface: "rounded-4xl border border-nk-border/80 bg-nk-surface/90 p-6 shadow-card backdrop-blur-sm md:p-8",
  tinted:
    "rounded-4xl border border-nk-border/60 bg-nk-bg-alt/70 p-6 shadow-sm backdrop-blur-[2px] md:p-8",
  rose: "rounded-4xl border border-nk-red/10 bg-gradient-to-br from-nk-rose/50 via-nk-surface/80 to-nk-blue-soft/30 p-6 shadow-card md:p-8",
  gradient:
    "rounded-4xl border border-nk-border/50 bg-gradient-to-b from-nk-surface via-nk-bg-alt/50 to-nk-blue-soft/25 p-6 shadow-card md:p-8",
  mesh:
    "relative overflow-hidden rounded-4xl border border-nk-border/70 bg-nk-surface/85 p-6 shadow-card md:p-8 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_50%_at_90%_-10%,rgba(22,119,255,0.06),transparent_50%)] before:content-['']",
};

type Tag = "section" | "div";

type Props = {
  as?: Tag;
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
};

export function SectionBackground({
  as = "section",
  variant = "transparent",
  className = "",
  children,
  id,
  "aria-labelledby": ariaLabelledBy,
}: Props) {
  const Tag = as;
  const v = variantClass[variant];
  return (
    <Tag className={`${v} ${className}`.trim()} id={id} aria-labelledby={ariaLabelledBy}>
      {children}
    </Tag>
  );
}
