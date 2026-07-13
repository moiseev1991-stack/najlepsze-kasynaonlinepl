import Image from "next/image";
import type { Author } from "@/lib/types";

type Props = { author: Author };

export function AuthorBox({ author }: Props) {
  return (
    <aside className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
        <Image
          src={author.avatar}
          alt={author.name}
          width={64}
          height={64}
          className="object-cover"
          unoptimized
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{author.name}</p>
        <p className="text-xs text-brand-700">{author.role}</p>
        <p className="mt-2 text-sm text-slate-600">{author.bio}</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {author.linkedin ? (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block text-xs font-medium text-brand-700 hover:underline"
            >
              LinkedIn ↗
            </a>
          ) : null}
          {author.email ? (
            <a
              href={`mailto:${author.email}`}
              className="inline-block text-xs font-medium text-brand-700 hover:underline"
            >
              {author.email}
            </a>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
