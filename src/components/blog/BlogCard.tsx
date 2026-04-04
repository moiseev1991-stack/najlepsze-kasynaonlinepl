import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { categorySlugFromName } from "@/lib/routes";

type Props = { post: BlogPost };

export function BlogCard({ post }: Props) {
  const catSlug = categorySlugFromName(post.category);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:shadow-cardHover">
      <Link href={`/blog/${post.slug}/`} className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={post.cover}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width:768px) 100vw, 33vw"
          unoptimized
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("pl-PL")}
          </time>
          <span>·</span>
          <Link href={`/blog/kategoria/${catSlug}/`} className="font-medium text-brand-700 hover:underline">
            {post.category}
          </Link>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          <Link href={`/blog/${post.slug}/`} className="hover:text-brand-800">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}/`}
          className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:underline"
        >
          Czytaj więcej
        </Link>
      </div>
    </article>
  );
}
