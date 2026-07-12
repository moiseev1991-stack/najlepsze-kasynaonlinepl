/**
 * Punktowe pobieranie logo brandów, których fetch-casino-logos.mjs nie dał rady
 * ściągnąć bezpośrednio z domeny operatora (Cloudflare / SPA / geo-block).
 * Źródła znalezione ręcznie (research przez WebFetch).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const casinosFile = path.join(root, "src", "content", "casinos.json");
const casinosDir = path.join(root, "public", "images", "casinos");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

/** slug → bezpośredni URL do logo (znaleziony przez ręczny research) */
const MANUAL_LOGO_URLS = {
  mostbet:
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/68/9c/05/a4c90a8bc29be75cd1f692c3484e702fc6/mostbet-casino-logo.png",
  ggbet:
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/d1/63/4d/1efb31cdbc23eef17c573b852755852c8c/ggbet-casino-logo-5.png",
  vavada:
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/3a/3b/b5/80dfb1b2bc0dcd4c38967ef42afde2c231/vavada-casino-logo-1.png",
  stake:
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/65/b8/d1/c459b243b33f21f88a5845b37d7f96ea5d/stake-casino-logo.png",
  hellspin:
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/90/a3/02/ed1a93f8f19506102cb09728f70269a104/hellspin-casino-logo.png",
  ivibet:
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/6c/3e/90/2027d35914359a328f0e9717659a31d703/ivibet-casino-logo.png",
  "gorilla-casino":
    "https://www.askgamblers.com/uploads/casino_logos/other/90/9d/04/3287a3e8cddf6804b1016bc82447ab4be7/gorilla-casino.png",
  "starda-casino":
    "https://www.askgamblers.com/uploads/casino_logos/casinoreview_logo/d3/1d/83/0b0952edaede5cb2bdce47e331abe4bd89/starda-casino-logo.png",
  "malina-casino":
    "https://www.askgamblers.com/uploads/casino_logos/other/47/c2/b5/4a5b425a1caf2179ef5fb4c32387b63931/malinacasino-logo-2.png",
};

function extFromUrl(url) {
  const m = url.match(/\.(webp|png|jpe?g|gif|avif|svg)(?:\?|$)/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "png";
}

async function tryFetchImage(url, headers) {
  const res = await fetch(url, { headers });
  if (!res.ok) return { ok: false, status: res.status };
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("text/html")) return { ok: false, status: "html" };
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) return { ok: false, status: `too-small-${buf.length}` };
  return { ok: true, buf };
}

async function downloadOne(slug, url) {
  const attempts = [
    // 1) referer + full browser accept headers
    {
      "User-Agent": UA,
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
      Referer: `https://www.askgamblers.com/online-casinos/reviews/${slug.replace("-casino", "") + "-casino"}`,
      "Sec-Fetch-Dest": "image",
      "Sec-Fetch-Mode": "no-cors",
      "Sec-Fetch-Site": "same-origin",
    },
    // 2) via Wayback Machine
    null, // sentinel — obsłużymy niżej
  ];
  for (const h of attempts) {
    if (h === null) break;
    const r = await tryFetchImage(url, h);
    if (r.ok) {
      const ext = extFromUrl(url);
      const target = path.join(casinosDir, `${slug}-brand.${ext}`);
      fs.writeFileSync(target, r.buf);
      return { path: `/images/casinos/${slug}-brand.${ext}`, size: r.buf.length, ext, via: "direct" };
    }
  }
  // Wayback Machine fallback
  const waybackUrl = `https://web.archive.org/web/2024im_/${url}`;
  const r = await tryFetchImage(waybackUrl, { "User-Agent": UA });
  if (r.ok) {
    const ext = extFromUrl(url);
    const target = path.join(casinosDir, `${slug}-brand.${ext}`);
    fs.writeFileSync(target, r.buf);
    return { path: `/images/casinos/${slug}-brand.${ext}`, size: r.buf.length, ext, via: "wayback" };
  }
  throw new Error(`all attempts failed`);
}

async function main() {
  const casinos = JSON.parse(fs.readFileSync(casinosFile, "utf8"));
  let updated = 0;
  for (const [slug, url] of Object.entries(MANUAL_LOGO_URLS)) {
    try {
      const dl = await downloadOne(slug, url);
      const entry = casinos.find((c) => c.slug === slug);
      if (entry) {
        entry.logo = dl.path;
        updated++;
      }
      console.log(`✓ ${slug}: ${dl.ext} ${Math.round(dl.size / 1024)} KB → ${dl.path}`);
    } catch (e) {
      console.log(`✗ ${slug}: ${e.message ?? e}`);
    }
  }
  if (updated > 0) {
    fs.writeFileSync(casinosFile, JSON.stringify(casinos, null, 2) + "\n", "utf8");
    console.log(`\nZaktualizowano casinos.json — ${updated} nowych ścieżek logo.`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
