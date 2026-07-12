import Image from "next/image";
import type { Article } from "@/lib/types";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ReviewEditorialBody } from "@/components/review/ReviewEditorialBody";
import { stripLeadingMarkdownH1 } from "@/lib/review-editorial-data";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { findCasinoForArticleSlug, getAuthorBySlug, getCasinoScreenshot } from "@/lib/data";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, type SchemaAuthor } from "@/lib/seo";
import { toAbsoluteSiteUrl } from "@/lib/site-origin";

type Props = {
  article: Article;
  breadcrumbs: Crumb[];
};

const MONTHS_PL = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

function formatPlDate(iso?: string): string | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const [, y, mo, d] = m;
  const month = MONTHS_PL[parseInt(mo, 10) - 1];
  return `${parseInt(d, 10)} ${month} ${y}`;
}

export function ArticleTemplate({ article, breadcrumbs }: Props) {
  const author = getAuthorBySlug("marta-kowalczyk");
  const brandCasino = findCasinoForArticleSlug(article.slug);
  const publishedIso = article.publishedAt;
  const updatedIso = article.updatedAt || article.publishedAt;
  const updatedLabel = formatPlDate(updatedIso);

  const url = toAbsoluteSiteUrl(`/${article.slug}/`);
  const schemaAuthors: SchemaAuthor[] = [];
  if (author) {
    schemaAuthors.push({
      name: author.name,
      url: toAbsoluteSiteUrl(`/o-nas/#${author.slug}`),
    });
  }

  const brandScreenshot = brandCasino ? getCasinoScreenshot(brandCasino.slug) : undefined;
  const heroImageUrl = brandCasino?.logo ?? "/og-default.png";

  return (
    <article className="space-y-8">
      <JsonLd
        data={articleSchema({
          headline: (article.metaTitle || article.title).slice(0, 110),
          description: article.metaDescription,
          url,
          datePublished: publishedIso,
          dateModified: updatedIso,
          authors: schemaAuthors,
        })}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50/70 via-white to-slate-50 p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="min-w-0 flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {article.h1 || article.title}
            </h1>
            {updatedLabel ? (
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                {author ? (
                  <span className="inline-flex items-center gap-2">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full border border-slate-200 bg-white"
                      unoptimized
                    />
                    <span className="font-medium text-slate-700">{author.name}</span>
                  </span>
                ) : null}
                <span className="hidden text-slate-300 md:inline">·</span>
                <span>
                  Aktualizacja: <time dateTime={updatedIso}>{updatedLabel}</time>
                </span>
              </p>
            ) : null}
            {article.metaDescription ? (
              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                {article.metaDescription}
              </p>
            ) : null}
          </div>
          <div className="shrink-0">
            {brandScreenshot ? (
              <div className="relative h-36 w-56 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:h-44 md:w-64">
                <Image
                  src={brandScreenshot}
                  alt={`Screenshot serwisu ${brandCasino?.name ?? "kasyna"}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 256px, 224px"
                  unoptimized
                />
                {brandCasino ? (
                  <div className="absolute bottom-2 left-2 rounded-lg bg-white/90 p-1.5 shadow-sm ring-1 ring-slate-200 backdrop-blur">
                    <Image
                      src={brandCasino.logo}
                      alt={`Logo ${brandCasino.name}`}
                      width={72}
                      height={32}
                      className="h-6 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                ) : null}
              </div>
            ) : brandCasino ? (
              <div className="relative flex h-32 w-48 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:h-40 md:w-56">
                <Image
                  src={brandCasino.logo}
                  alt={`Logo ${brandCasino.name}`}
                  width={220}
                  height={140}
                  className="max-h-full max-w-full object-contain"
                  unoptimized
                />
              </div>
            ) : (
              <div className="relative h-32 w-48 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 md:h-40 md:w-56">
                <Image
                  src={heroImageUrl}
                  alt="Ilustracja artykułu"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 224px, 192px"
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {author ? (
        <section aria-label="Autor artykułu">
          <AuthorBox author={author} />
        </section>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <ReviewEditorialBody markdown={stripLeadingMarkdownH1(article.body)} />
      </section>

      {author ? (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Autor</h2>
          <div className="mt-4">
            <AuthorBox author={author} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
