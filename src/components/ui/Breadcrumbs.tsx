import Link from "next/link";

export type Crumb = { label: string; href?: string };

type Props = { items: Crumb[] };

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 ? <span className="text-slate-300">/</span> : null}
              {item.href ? (
                <Link href={item.href} className="hover:text-brand-700">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "font-medium text-slate-900" : "text-nk-muted"
                  }
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
