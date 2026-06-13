import Link from "next/link";
import { bonusTypeHref } from "@/lib/badge-links";

type Props = { types: string[] };

const baseClass =
  "rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200";

export function BonusTags({ types }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {types.map((t) => {
        const href = bonusTypeHref(t);
        return href ? (
          <Link
            key={t}
            href={href}
            className={`${baseClass} transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-300`}
          >
            {t}
          </Link>
        ) : (
          <span key={t} className={baseClass}>
            {t}
          </span>
        );
      })}
    </div>
  );
}
