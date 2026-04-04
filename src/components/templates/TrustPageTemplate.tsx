import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { TrustPageContent } from "@/lib/types";

type Props = {
  page: TrustPageContent;
  breadcrumbs: Crumb[];
};

export function TrustPageTemplate({ page, breadcrumbs }: Props) {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{page.intro}</p>
      </header>
      <div className="prose prose-slate max-w-none">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-bold text-slate-900">{s.heading}</h2>
            <p className="mt-3 text-slate-600">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
