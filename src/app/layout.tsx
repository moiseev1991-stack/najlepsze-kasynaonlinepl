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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={inter.variable} data-scroll-behavior="smooth">
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
