"use client";

import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import type { TrustPageContent } from "@/lib/types";

type Props = { page: TrustPageContent; breadcrumbs: Crumb[] };

export function ContactPageTemplate({ page, breadcrumbs }: Props) {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Breadcrumbs items={breadcrumbs} />
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{page.h1}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{page.intro}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Dane kontaktowe</h2>
          {page.sections.map((s) => (
            <div key={s.heading} className="mt-4">
              <h3 className="font-medium text-slate-900">{s.heading}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.body}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Formularz (demo)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Poniżej statyczny formularz — podłącz backend lub usługę formularzy, by obsługiwać wiadomości.
          </p>
          <form className="mt-4 space-y-4" action="#" method="post" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder={`np. twoj@email.pl`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="msg">
                Wiadomość
              </label>
              <textarea
                id="msg"
                name="message"
                required
                rows={5}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Treść zgłoszenia…"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Wyślij (demo)
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-500">
            Alternatywnie napisz bezpośrednio na:{" "}
            <a className="font-medium text-brand-800" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
