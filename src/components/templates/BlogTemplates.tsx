import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { MarkdownLite } from "@/components/blog/MarkdownLite";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { AuthorBox } from "@/components/ui/AuthorBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo";
import { blogCategoryNameFromSlug } from "@/lib/routes";
import { blogPosts, getAuthorBySlug, getPostsByCategory } from "@/lib/data";
import type { BlogPost } from "@/lib/types";

export function BlogListTemplate() {
  const crumbs: Crumb[] = [{ label: "Strona główna", href: "/" }, { label: "Blog" }];
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={crumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Blog kasynowy</h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Poradniki, aktualności i komentarze redakcyjne. Artykuły publikowane są wyłącznie w celach informacyjnych.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}

type PostProps = { post: BlogPost; breadcrumbs: Crumb[] };

export function BlogPostTemplate({ post, breadcrumbs }: PostProps) {
  const author = getAuthorBySlug(post.author);
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      {post.faq?.length ? <JsonLd data={faqPageSchema(post.faq)} /> : null}
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <header className="space-y-3">
          <p className="text-sm text-slate-500">
            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("pl-PL")}</time>
            <span className="mx-2">·</span>
            <span>{post.category}</span>
          </p>
          <h1 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl">{post.title}</h1>
          <p className="text-lg text-slate-600">{post.excerpt}</p>
        </header>
        <div className="prose prose-slate mt-10 max-w-none">
          <MarkdownLite content={post.content} />
        </div>
      </article>

      {author ? (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Autor</h2>
          <div className="mt-4">
            <AuthorBox author={author} />
          </div>
        </section>
      ) : null}

      {post.faq?.length ? <FAQAccordion items={post.faq} /> : null}

      {related.length ? (
        <section>
          <h2 className="text-xl font-bold text-slate-900">Powiązane artykuły</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

type CatProps = { categorySlug: string; breadcrumbs: Crumb[] };

export function BlogCategoryTemplate({ categorySlug, breadcrumbs }: CatProps) {
  const name = blogCategoryNameFromSlug(categorySlug);
  const posts = name ? getPostsByCategory(name) : [];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Kategoria: {name ?? categorySlug}</h1>
        <p className="text-slate-600">Wpisy oznaczone tą kategorią w naszym serwisie.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
      {posts.length === 0 ? <p className="text-slate-600">Brak wpisów w tej kategorii.</p> : null}
    </div>
  );
}
