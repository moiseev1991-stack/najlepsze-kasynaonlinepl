import type { Article } from "@/lib/types";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ReviewEditorialBody } from "@/components/review/ReviewEditorialBody";
import { stripLeadingMarkdownH1 } from "@/lib/review-editorial-data";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { getAuthorBySlug } from "@/lib/data";
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

function authorToSchema(a: {
  name: string;
  slug: string;
  linkedin?: string;
}): SchemaAuthor {
  return {
    name: a.name,
    url: toAbsoluteSiteUrl(`/o-nas/#${a.slug}`),
    sameAs: a.linkedin ? [a.linkedin] : undefined,
  };
}

export function ArticleTemplate({ article, breadcrumbs }: Props) {
  const author = getAuthorBySlug("marta-kowalczyk");
  const coAuthor = getAuthorBySlug("anna-bielinska");
  const publishedIso = article.publishedAt;
  const updatedIso = article.updatedAt || article.publishedAt;
  const updatedLabel = formatPlDate(updatedIso);

  const url = toAbsoluteSiteUrl(`/${article.slug}/`);
  const schemaAuthors: SchemaAuthor[] = [];
  if (author) schemaAuthors.push(authorToSchema(author));
  if (coAuthor) schemaAuthors.push(authorToSchema(coAuthor));

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
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          {article.h1 || article.title}
        </h1>
        {updatedLabel ? (
          <p className="text-sm text-slate-500">
            <span>Aktualizacja: </span>
            <time dateTime={updatedIso}>{updatedLabel}</time>
            {author ? (
              <>
                <span className="mx-2">·</span>
                <span>Redakcja: {author.name}</span>
              </>
            ) : null}
            {coAuthor ? (
              <>
                <span className="mx-2">·</span>
                <span>Współautorka: {coAuthor.name}</span>
              </>
            ) : null}
          </p>
        ) : null}
        {article.metaDescription ? (
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">
            {article.metaDescription}
          </p>
        ) : null}
      </header>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <ReviewEditorialBody markdown={stripLeadingMarkdownH1(article.body)} />
      </section>
      {author ? (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Autorzy</h2>
          <div className="mt-4">
            <AuthorBox author={author} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
