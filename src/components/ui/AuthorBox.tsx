import Image from "next/image";
import type { Author } from "@/lib/types";
import { getAuthorBySlug } from "@/lib/data";

type Props = { author: Author; showCoAuthor?: boolean };

const CO_AUTHOR_SLUG = "anna-bielinska";

function AuthorRow({ author, prefix }: { author: Author; prefix?: string }) {
  return (
    <div className="flex gap-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
        <Image src={author.avatar} alt={author.name} width={64} height={64} className="object-cover" unoptimized />
      </div>
      <div>
        {prefix ? (
          <p className="text-[11px] uppercase tracking-wide text-slate-500">{prefix}</p>
        ) : null}
        <p className="text-sm font-semibold text-slate-900">
          {author.linkedin ? (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="hover:text-brand-700 hover:underline"
            >
              {author.name}
            </a>
          ) : (
            author.name
          )}
        </p>
        <p className="text-xs text-brand-700">{author.role}</p>
        <p className="mt-2 text-sm text-slate-600">{author.bio}</p>
        {author.linkedin ? (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline"
          >
            LinkedIn ↗
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function AuthorBox({ author, showCoAuthor = true }: Props) {
  const coAuthor = showCoAuthor && author.slug !== CO_AUTHOR_SLUG ? getAuthorBySlug(CO_AUTHOR_SLUG) : undefined;

  return (
    <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5">
      <AuthorRow author={author} />
      {coAuthor ? (
        <div className="border-t border-slate-200 pt-5">
          <AuthorRow author={coAuthor} prefix="Współautorka" />
        </div>
      ) : null}
    </aside>
  );
}
