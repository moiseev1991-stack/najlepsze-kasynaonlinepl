import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Domyślnie `npm run dev` / `dev:fast` = Webpack (Turbopack na Windows potrafi psuć `.next` / PostCSS).
   * Turbopack: `npm run dev:turbo`. W dev wyłączony persistent cache — mniej „Cannot find module './NNN.js'”.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  /**
   * Dev: HMR / _next na 127.0.0.1. Podgląd w IDE (Simple Browser) bywa bez CSS — użyj Chrome:
   * http://localhost:3055 albo `.env.local`: NEXT_PUBLIC_DEV_ORIGIN=http://127.0.0.1:3055
   */
  allowedDevOrigins: ["127.0.0.1", "::1", "localhost"],
  /** Zgodne z linkami w treści (…/) — unika zbędnych przekierowań 308. */
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/online-kasyna", destination: "/", permanent: true },
      { source: "/online-kasyna/", destination: "/", permanent: true },
      { source: "/recenzje-kasyn", destination: "/", permanent: true },
      { source: "/recenzje-kasyn/", destination: "/", permanent: true },
      { source: "/recenzje", destination: "/", permanent: true },
      { source: "/recenzje/", destination: "/", permanent: true },
      { source: "/polityka-cookies", destination: "/polityka-plikow-cookies/", permanent: true },
      { source: "/polityka-cookies/", destination: "/polityka-plikow-cookies/", permanent: true },
      { source: "/kryteria-oceny-kasyn", destination: "/kryteria-oceny/", permanent: true },
      { source: "/kryteria-oceny-kasyn/", destination: "/kryteria-oceny/", permanent: true },
      { source: "/legalne-kasyna-online", destination: "/legalne-kasyna/", permanent: true },
      { source: "/legalne-kasyna-online/", destination: "/legalne-kasyna/", permanent: true },
      { source: "/wyplacalne-kasyna-online", destination: "/wyplacalne-kasyna-internetowe/", permanent: true },
      { source: "/wyplacalne-kasyna-online/", destination: "/wyplacalne-kasyna-internetowe/", permanent: true },
      { source: "/platnosci/blik", destination: "/platnosci/kasyno-online-blik/", permanent: true },
      { source: "/platnosci/blik/", destination: "/platnosci/kasyno-online-blik/", permanent: true },
      { source: "/platnosci/skrill", destination: "/platnosci/kasyno-online-skrill/", permanent: true },
      { source: "/platnosci/skrill/", destination: "/platnosci/kasyno-online-skrill/", permanent: true },
      { source: "/platnosci/przelewy24", destination: "/platnosci/kasyno-przelewy24/", permanent: true },
      { source: "/platnosci/przelewy24/", destination: "/platnosci/kasyno-przelewy24/", permanent: true },
      {
        source: "/kasyna-z-minimalnym-depozytem/5-zl",
        destination: "/kasyna-z-minimalnym-depozytem/kasyno-5-zl/",
        permanent: true,
      },
      {
        source: "/kasyna-z-minimalnym-depozytem/5-zl/",
        destination: "/kasyna-z-minimalnym-depozytem/kasyno-5-zl/",
        permanent: true,
      },
      {
        source: "/kasyna-z-minimalnym-depozytem/10-zl",
        destination: "/kasyna-z-minimalnym-depozytem/kasyna-z-depozytem-za-10-zl/",
        permanent: true,
      },
      {
        source: "/kasyna-z-minimalnym-depozytem/10-zl/",
        destination: "/kasyna-z-minimalnym-depozytem/kasyna-z-depozytem-za-10-zl/",
        permanent: true,
      },
      {
        source: "/kasyna-z-minimalnym-depozytem/20-zl",
        destination: "/kasyna-z-minimalnym-depozytem/kasyno-20-zl/",
        permanent: true,
      },
      {
        source: "/kasyna-z-minimalnym-depozytem/20-zl/",
        destination: "/kasyna-z-minimalnym-depozytem/kasyno-20-zl/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
