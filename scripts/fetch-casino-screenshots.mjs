/**
 * Ściąga hero-screenshot (z og:image) dla każdego kasyna z casinos.json.
 * Próbuje kilku źródeł: bezpośrednia domena operatora, casino.guru, askgamblers.
 * Zapisuje do public/images/casinos/screenshots/<slug>/hero.<ext>.
 * Loguje sukcesy/porażki do stdout.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const casinosFile = path.join(root, "src", "content", "casinos.json");
const outDir = path.join(root, "public", "images", "casinos", "screenshots");
const manifestFile = path.join(root, "src", "content", "casino-screenshots.json");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const HEADERS = {
  "User-Agent": UA,
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
  "Accept-Encoding": "gzip, deflate, br",
};
const FETCH_TIMEOUT_MS = 12_000;
const CONCURRENCY = 6;

/** Ręczne overrides: slug → dokładna domena operatora (tam gdzie „<slug>.com" nie działa) */
const DOMAIN_OVERRIDES = {
  "vulkan-vegas": "vulkanvegas.com",
  "vulkanspiele-casino": "vulkanspiele.com",
  "bison-casino": "bisoncasino.com",
  "bruce-bet": "brucebet.com",
  "spin-city": "spincity.com",
  "vox-casino": "voxcasino.com",
  "nv-casino": "nvcasino.com",
  "mr-bet-casino": "mrbetcasino.com",
  "energy-casino": "energycasino.com",
  "spinline-casino": "spinlinecasino.com",
  "verde-casino": "verdecasino.com",
  "candy-casino": "candycasino.com",
  "ice-casino": "icecasino.com",
  "22bet-casino": "22bet.com",
  ggbet: "ggbet.com",
  "national-casino": "nationalcasino.com",
  "hellspin": "hellspin.com",
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
  goldbet: "goldbet.it",
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

function candidateUrls(slug) {
  const dom = DOMAIN_OVERRIDES[slug];
  const list = [];
  if (dom) {
    list.push(`https://${dom}/pl/`);
    list.push(`https://${dom}/en/`);
    list.push(`https://${dom}/`);
  }
  // fallback: {slug}.com/pl, {slug}.com, {slug-flat}.com
  list.push(`https://${slug}.com/pl/`);
  list.push(`https://${slug}.com/`);
  const flat = slug.replace(/-/g, "");
  if (flat !== slug) {
    list.push(`https://${flat}.com/pl/`);
    list.push(`https://${flat}.com/`);
  }
  // aggregators (mocno rate-limited, ale próbujemy jako fallback)
  list.push(`https://www.askgamblers.com/online-casinos/reviews/${slug}`);
  const slugStripped = slug.replace(/-casino$/, "");
  if (slugStripped !== slug) {
    list.push(`https://www.askgamblers.com/online-casinos/reviews/${slugStripped}`);
  }
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

function extractOgImage(html, baseUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) {
      try {
        return new URL(m[1], baseUrl).toString();
      } catch {
        /* ignore */
      }
    }
  }
  return null;
}

function extFromContentType(ct, urlPath) {
  if (ct?.includes("webp")) return "webp";
  if (ct?.includes("png")) return "png";
  if (ct?.includes("jpeg") || ct?.includes("jpg")) return "jpg";
  if (ct?.includes("gif")) return "gif";
  const m = urlPath.match(/\.(webp|png|jpe?g|gif|avif)(?:\?|$)/i);
  if (m) return m[1].toLowerCase().replace("jpeg", "jpg");
  return "jpg";
}

async function tryFetchOgImageForSlug(slug) {
  const urls = candidateUrls(slug);
  for (const url of urls) {
    try {
      const res = await fetchWithTimeout(url);
      if (!res.ok) continue;
      const html = await res.text();
      const og = extractOgImage(html, url);
      if (og) return { source: url, ogImage: og };
    } catch {
      /* try next */
    }
  }
  return null;
}

async function downloadTo(fileNoExt, imgUrl) {
  const res = await fetchWithTimeout(imgUrl);
  if (!res.ok) throw new Error(`img ${res.status}`);
  const ct = res.headers.get("content-type") ?? "";
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error(`img too small (${buf.length}B)`);
  const ext = extFromContentType(ct, new URL(imgUrl).pathname);
  const out = `${fileNoExt}.${ext}`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  return { path: out, size: buf.length, ext };
}

async function processOne(slug) {
  const dir = path.join(outDir, slug);
  const target = path.join(dir, "hero");
  // skip if already downloaded
  for (const ext of ["webp", "png", "jpg", "gif", "avif"]) {
    if (fs.existsSync(`${target}.${ext}`)) {
      return { slug, status: "cached", ext };
    }
  }
  const og = await tryFetchOgImageForSlug(slug);
  if (!og) return { slug, status: "no-og" };
  try {
    const dl = await downloadTo(target, og.ogImage);
    return { slug, status: "ok", source: og.source, size: dl.size, ext: dl.ext };
  } catch (e) {
    return { slug, status: "download-failed", source: og.source, error: String(e.message ?? e) };
  }
}

async function runPool(items, worker, concurrency) {
  const results = [];
  let idx = 0;
  const workers = new Array(concurrency).fill(0).map(async () => {
    while (idx < items.length) {
      const i = idx++;
      const r = await worker(items[i]);
      results[i] = r;
      const tag = r.status === "ok" ? "✓" : r.status === "cached" ? "·" : "✗";
      console.log(`${tag} ${r.slug}: ${r.status}${r.source ? " ← " + r.source : ""}${r.ext ? " [" + r.ext + " " + Math.round((r.size ?? 0) / 1024) + " KB]" : ""}${r.error ? " (" + r.error + ")" : ""}`);
    }
  });
  await Promise.all(workers);
  return results;
}

function buildManifest() {
  const manifest = {};
  if (!fs.existsSync(outDir)) return manifest;
  for (const slug of fs.readdirSync(outDir)) {
    const dir = path.join(outDir, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const ext of ["webp", "png", "jpg", "gif", "avif"]) {
      const p = path.join(dir, `hero.${ext}`);
      if (fs.existsSync(p)) {
        manifest[slug] = `/images/casinos/screenshots/${slug}/hero.${ext}`;
        break;
      }
    }
  }
  return manifest;
}

async function main() {
  const casinos = JSON.parse(fs.readFileSync(casinosFile, "utf8"));
  const slugs = casinos.map((c) => c.slug);
  console.log(`Scraping og:image for ${slugs.length} casino slugs (concurrency=${CONCURRENCY})…\n`);
  const results = await runPool(slugs, processOne, CONCURRENCY);
  const ok = results.filter((r) => r.status === "ok").length;
  const cached = results.filter((r) => r.status === "cached").length;
  const failed = results.filter((r) => r.status !== "ok" && r.status !== "cached");
  console.log(`\n=== summary === ok:${ok} cached:${cached} failed:${failed.length}/${results.length}`);
  if (failed.length) {
    console.log("failed slugs:", failed.map((r) => r.slug).join(", "));
  }
  // Generuj manifest z całej zawartości screenshots/ (uwzględnia też te z poprzednich uruchomień)
  const manifest = buildManifest();
  fs.mkdirSync(path.dirname(manifestFile), { recursive: true });
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 0), "utf8");
  console.log(`Zapisano manifest: ${Object.keys(manifest).length} slugów w ${manifestFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
