import Image from "next/image";
import type { Author } from "@/lib/types";

type Props = { author: Author };

export function AuthorBox({ author }: Props) {
  return (
    <aside className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100">
        <Image src={author.avatar} alt={author.name} width={64} height={64} className="object-cover" unoptimized />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{author.name}</p>
        <p className="text-xs text-brand-700">{author.role}</p>
        <p className="mt-2 text-sm text-slate-600">{author.bio}</p>
      </div>
    </aside>
  );
}
