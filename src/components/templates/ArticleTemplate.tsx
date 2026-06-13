import type { Article } from "@/lib/types";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ReviewEditorialBody } from "@/components/review/ReviewEditorialBody";
import { stripLeadingMarkdownH1 } from "@/lib/review-editorial-data";

type Props = {
  article: Article;
  breadcrumbs: Crumb[];
};

export function ArticleTemplate({ article, breadcrumbs }: Props) {
  return (
    <article className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{article.h1 || article.title}</h1>
        {article.metaDescription ? (
          <p className="max-w-3xl text-base leading-relaxed text-slate-600">{article.metaDescription}</p>
        ) : null}
      </header>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <ReviewEditorialBody markdown={stripLeadingMarkdownH1(article.body)} />
      </section>
    </article>
  );
}
