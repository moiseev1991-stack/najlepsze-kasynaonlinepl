import Link from "next/link";
import { BrandMark } from "@/components/brand/BrandMark";
import { siteConfig } from "@/lib/site-config";

type Props = {
  className?: string;
  showWordmark?: boolean;
  compact?: boolean;
  tone?: "light" | "dark";
};

function splitTitle(full: string): { head: string; tail: string | null } {
  const m = full.match(/^(.*)\s+(Online)\s*$/i);
  if (m) return { head: m[1].trim(), tail: m[2] };
  return { head: full, tail: null };
}

/** Znak żeton + diament + wordmark z akcentem czerwieni na „Online” */
export function BrandLogo({
  className = "",
  showWordmark = true,
  compact = false,
  tone = "light",
}: Props) {
  const markSize = compact ? 34 : 40;
  const { head, tail } = splitTitle(siteConfig.name);
  const titleCls = tone === "dark" ? "text-white" : "text-nk-text";
  const subCls = tone === "dark" ? "text-slate-400" : "text-nk-muted";
  const tailCls =
    tone === "dark"
      ? "bg-gradient-to-r from-rose-300 to-red-400 bg-clip-text text-transparent"
      : "bg-gradient-to-r from-nk-red via-red-600 to-nk-red-deep bg-clip-text text-transparent";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 font-semibold outline-none ring-brand-500/40 focus-visible:ring-2 ${className}`}
    >
      <span
        className={`relative shrink-0 rounded-xl shadow-md ring-1 ring-nk-red/20 transition group-hover:shadow-lg group-hover:ring-nk-red/35 ${
          tone === "dark" ? "drop-shadow-[0_0_14px_rgba(220,20,60,0.35)]" : ""
        }`}
        aria-hidden
      >
        <BrandMark size={markSize} variant={tone === "dark" ? "dark" : "default"} />
      </span>
      {showWordmark ? (
        <span className="hidden min-w-0 flex-col leading-tight sm:flex">
          <span className={`truncate text-sm font-bold tracking-tight ${titleCls}`}>
            {head}
            {tail ? (
              <>
                {" "}
                <span className={tailCls}>{tail}</span>
              </>
            ) : null}
          </span>
          <span className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] ${subCls}`}>
            <span className="h-1 w-1 shrink-0 rounded-full bg-nk-red" aria-hidden />
            Polska · redakcja
          </span>
        </span>
      ) : null}
    </Link>
  );
}
