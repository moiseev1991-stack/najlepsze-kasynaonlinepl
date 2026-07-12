/**
 * Zamienia placeholder-SVG (nasze gradient „<Brand>") na PRAWDZIWE logo brandu.
 * Źródło: apple-touch-icon / favicon PNG z domeny operatora.
 *
 * 1. Detekcja placeholder-a: SVG < 2 KB w public/images/casinos/<slug>.svg
 * 2. Fetch operator homepage, parse <link rel="apple-touch-icon"|"icon"> (największy)
 * 3. Download → public/images/casinos/<slug>-brand.<ext>
 * 4. Update casinos.json: entry.logo → nowy plik
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
const HEADERS = {
  "User-Agent": UA,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
};
const FETCH_TIMEOUT_MS = 12_000;
const CONCURRENCY = 6;
const PLACEHOLDER_SVG_MAX_BYTES = 2000;

/** Slug → domena operatora (kopia z fetch-casino-screenshots.mjs) */
const DOMAIN_OVERRIDES = {
  "vulkan-vegas": "vulkanvegas.com",
  "vulkanspiele-casino": "vulkanspiele.com",
  "bison-casino": "bisoncasino.com",
  "bruce-bet": "brucebet.com",
  "spin-city": "spincity.com",
  "vox-casino": "voxcasino.com",
  "nv-casino": "nvcasino.com",
  "mr-bet-casino": "mrbet.com",
  "energy-casino": "energycasino.com",
  "spinline-casino": "spinlinecasino.com",
  "verde-casino": "verdecasino.com",
  "candy-casino": "candycasino.com",
  "ice-casino": "icecasino.com",
  "22bet-casino": "22bet.com",
  ggbet: "ggbet.com",
  "national-casino": "nationalcasino.com",
  hellspin: "hellspin.com",
  slotoro: "slotoro.com",
  spellwin: "spellwin.com",
  larabet: "larabet.com",
  vavada: "vavada.com",
  "one-casino": "onecasino.com",
  mostbet: "mostbet.com",
  slottica: "slottica.com",
  "amunra-casino": "amunra.com",
  "trino-casino": "trino.casino",
  "malina-casino": "malinacasino.com",
  "marvel-casino": "marvelcasino.io",
  stake: "stake.com",
  "888starz": "888starz.bet",
  "gorilla-casino": "gorillacasino.com",
  "goldbet-casino": "goldbet.it",
  "irwin-casino": "irwincasino.com",
  ivibet: "ivibet.com",
  "nine-casino": "ninecasino.com",
  "pelican-casino": "pelicancasino.com",
  "pistolo-casino": "pistolo.casino",
  "starda-casino": "stardacasino.com",
  "total-casino": "totalcasino.pl",
  "yep-casino": "yepcasino.com",
  spinamba: "spinamba.com",
  "roman-casino": "romancasino.com",
  slotsgem: "slotsgem.com",
  stonevegas: "stonevegas.com",
  theslotz: "theslotz.com",
  "smokace-casino": "smokace.com",
  "beep-beep-casino": "beepbeep.casino",
  "betonred-casino": "betonred.com",
  "bizzo-casino": "bizzocasino.com",
  "f1-casino": "f1casino.com",
  "fireball-casino": "fireballcasino.com",
  "flagman-casino": "flagmancasino.com",
  "fontan-casino": "fontancasino.com",
  "gdf-casino": "gdfcasino.com",
  "janusz-casino": "januszcasino.com",
  "legiano-casino": "legiano.com",
  lemon: "lemoncasino.com",
  machance: "machance.com",
  "slotsvader-casino": "slotsvader.com",
  "winshark-casino": "winshark.com",
};

function candidateHomeUrls(slug) {
  const dom = DOMAIN_OVERRIDES[slug];
  const list = [];
  if (dom) {
    list.push(`https://${dom}/`);
    list.push(`https://${dom}/pl/`);
  }
  list.push(`https://${slug}.com/`);
  const flat = slug.replace(/-/g, "");
  if (flat !== slug) list.push(`https://${flat}.com/`);
  return [...new Set(list)];
}

async function fetchWithTimeout(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { headers: HEADERS, signal: ctrl.signal, redirect: "follow" });
  } finally {
    clearTimeout(t);
  }
}

/**
 * Parsuje HTML: zwraca listę kandydatów na logo w kolejności preferencji.
 * Preferujemy apple-touch-icon (zwykle 180×180 PNG brand-logo), potem
 * <link rel="icon" sizes="192x192">, potem inne <link rel="icon">, potem og:image (fallback).
 */
function extractLogoCandidates(html, baseUrl) {
  const candidates = [];
  const linkRe = /<link\b[^>]+>/gi;
  const attrRe = (name) => new RegExp(`${name}=["']([^"']+)["']`, "i");
  const matches = html.match(linkRe) ?? [];
  for (const tag of matches) {
    const rel = tag.match(attrRe("rel"))?.[1]?.toLowerCase() ?? "";
    const href = tag.match(attrRe("href"))?.[1];
    if (!href) continue;
    const sizes = tag.match(attrRe("sizes"))?.[1] ?? "";
    const sizeNum = (() => {
      const m = sizes.match(/(\d+)x\1/);
      return m ? parseInt(m[1], 10) : 0;
    })();
    let priority = 999;
    if (rel.includes("apple-touch-icon")) priority = 10 - sizeNum / 1000;
    else if (rel.includes("mask-icon")) priority = 200;
    else if (rel.includes("icon")) priority = 100 - sizeNum / 1000;
    else continue;
    try {
      candidates.push({ url: new URL(href, baseUrl).toString(), priority, sizeNum });
    } catch {
      /* ignore */
    }
  }
  // og:image jako last resort
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (og) {
    try {
      candidates.push({ url: new URL(og[1], baseUrl).toString(), priority: 500, sizeNum: 0 });
    } catch {
      /* ignore */
    }
  }
  candidates.sort((a, b) => a.priority - b.priority);
  return candidates;
}

function extFromContentType(ct, urlPath) {
  if (ct?.includes("svg")) return "svg";
  if (ct?.includes("webp")) return "webp";
  if (ct?.includes("png")) return "png";
  if (ct?.includes("jpeg") || ct?.includes("jpg")) return "jpg";
  if (ct?.includes("gif")) return "gif";
  if (ct?.includes("x-icon") || ct?.includes("vnd.microsoft.icon")) return "ico";
  const m = urlPath.match(/\.(webp|png|jpe?g|gif|avif|svg|ico)(?:\?|$)/i);
  if (m) return m[1].toLowerCase().replace("jpeg", "jpg");
  return "png";
}

async function tryFetchLogoFor(slug) {
  for (const url of candidateHomeUrls(slug)) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) continue;
      const html = await res.text();
      const candidates = extractLogoCandidates(html, url);
      for (const c of candidates) {
        try {
          const r = await fetchWithTimeout(c.url);
          if (!r.ok) continue;
          const ct = r.headers.get("content-type") ?? "";
          if (ct.includes("html")) continue; // 404 fallback do HTML
          const buf = Buffer.from(await r.arrayBuffer());
          if (buf.length < 500) continue;
          // odrzucamy .ico (najczęściej za mały)
          const ext = extFromContentType(ct, new URL(c.url).pathname);
          if (ext === "ico") continue;
          return { source: url, imgUrl: c.url, buf, ext };
        } catch {
          /* try next candidate */
        }
      }
    } catch {
      /* try next home url */
    }
  }
  return null;
}

function isPlaceholderSvg(logoPath) {
  if (!logoPath?.endsWith(".svg")) return false;
  const abs = path.join(root, "public", logoPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) return false;
  const stat = fs.statSync(abs);
  return stat.size < PLACEHOLDER_SVG_MAX_BYTES;
}

async function processOne(casino) {
  const { slug, logo } = casino;
  if (!isPlaceholderSvg(logo)) {
    return { slug, status: "skip-real-logo", currentLogo: logo };
  }
  // sprawdź czy już mamy pobrany brand-logo
  for (const ext of ["png", "webp", "jpg", "svg"]) {
    const p = path.join(casinosDir, `${slug}-brand.${ext}`);
    if (fs.existsSync(p)) {
      return { slug, status: "cached", ext, newLogo: `/images/casinos/${slug}-brand.${ext}` };
    }
  }
  const found = await tryFetchLogoFor(slug);
  if (!found) return { slug, status: "no-icon" };
  const target = path.join(casinosDir, `${slug}-brand.${found.ext}`);
  fs.writeFileSync(target, found.buf);
  return {
    slug,
    status: "ok",
    source: found.source,
    imgUrl: found.imgUrl,
    size: found.buf.length,
    ext: found.ext,
    newLogo: `/images/casinos/${slug}-brand.${found.ext}`,
  };
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let idx = 0;
  const workers = new Array(concurrency).fill(0).map(async () => {
    while (idx < items.length) {
      const i = idx++;
      const r = await worker(items[i]);
      results[i] = r;
      const tag =
        r.status === "ok"
          ? "✓"
          : r.status === "cached"
            ? "·"
            : r.status === "skip-real-logo"
              ? "→"
              : "✗";
      const info =
        r.status === "ok"
          ? `${r.ext} ${Math.round(r.size / 1024)} KB ← ${r.source}`
          : r.status === "cached"
            ? r.newLogo
            : r.status === "skip-real-logo"
              ? `(real: ${r.currentLogo})`
              : "";
      console.log(`${tag} ${r.slug}: ${r.status}${info ? " " + info : ""}`);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const casinos = JSON.parse(fs.readFileSync(casinosFile, "utf8"));
  console.log(
    `Scanning ${casinos.length} casinos for placeholder logos (concurrency=${CONCURRENCY})…\n`,
  );
  const results = await runPool(casinos, processOne, CONCURRENCY);
  // Update casinos.json entries where we got new logo
  const okAndCached = new Map();
  for (const r of results) {
    if ((r.status === "ok" || r.status === "cached") && r.newLogo) {
      okAndCached.set(r.slug, r.newLogo);
    }
  }
  let updated = 0;
  for (const c of casinos) {
    const newLogo = okAndCached.get(c.slug);
    if (newLogo && c.logo !== newLogo) {
      c.logo = newLogo;
      updated++;
    }
  }
  if (updated > 0) {
    fs.writeFileSync(casinosFile, JSON.stringify(casinos, null, 2) + "\n", "utf8");
    console.log(`\nZaktualizowano casinos.json — ${updated} nowych ścieżek logo.`);
  } else {
    console.log("\nBrak zmian w casinos.json.");
  }
  const ok = results.filter((r) => r.status === "ok").length;
  const cached = results.filter((r) => r.status === "cached").length;
  const skipped = results.filter((r) => r.status === "skip-real-logo").length;
  const failed = results.filter(
    (r) => r.status !== "ok" && r.status !== "cached" && r.status !== "skip-real-logo",
  );
  console.log(
    `=== summary === ok:${ok} cached:${cached} already-real:${skipped} failed:${failed.length}/${results.length}`,
  );
  if (failed.length) {
    console.log("failed slugs:", failed.map((r) => r.slug).join(", "));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
