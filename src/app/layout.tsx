import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageOfferBar } from "@/components/layout/PageOfferBar";
import { Disclaimer18 } from "@/components/ui/Disclaimer18";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getAppMetadataBase, getPublicSiteOrigin } from "@/lib/site-origin";
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
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: siteConfig.name }],
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
    <html lang="pl" className={inter.variable}>
      <body className={`min-h-screen antialiased text-nk-text ${inter.className}`}>
        <div className="nk-site-bg" aria-hidden />
        <JsonLd data={organizationSchema()} />
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
