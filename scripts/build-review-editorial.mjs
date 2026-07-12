/**
 * Skanuje text/ — buduje src/content/review-editorial.json (metaTitle, metaDescription, body).
 *
 * Obsługiwane formaty plików:
 *   1) Stary:  <slug>-recenzja.txt
 *   2) Nowy:   "статья <slug>-opinie_pl_pl_warsaw_<timestamp>"   (bez rozszerzenia)
 *
 * Slug ze starego formatu — bez zmian.
 * Slug z nowego formatu:
 *   - usuwane sufiksy „-opinie”, „-casino-opinie”
 *   - aliasy doprowadzające do canonical casino-slug (zgodnie z casinos.json)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const textDir = path.join(root, "text");
const text2Dir = path.join(root, "text", "text2");
const outFile = path.join(root, "src", "content", "review-editorial.json");
const textBlocksFile = path.join(root, "src", "content", "text-blocks.json");

/** Aliasy slug plików non-review z text2/ → kanoniczny slug strony. */
const TEXT_BLOCK_ALIASES = {
  "paysafecard-kasyno": "paysafecard",
  "kasyno-przelewy24": "kasyno-przelewy24",
  "kasyna-online-opinie": "kasyna-online-opinie",
  "legalne-kasyno-online-opinie": "legalne-kasyno-online-opinie",
  "porownanie-kasyn-online": "porownanie-kasyn-online",
  "ranking-kasyn-bez-depozytu": "ranking-kasyn-bez-depozytu",
  // text2/ mówi „25 € na casino bez depozytu" — więc kanoniczny slug 25-euro-bez-depozytu (istnieje w bonuses)
  "25-na-casino-bez-depozytu": "25-euro-bez-depozytu",
  // GSC: /7-euro-bez-depozytu/ 17 imp @ 30; nowy /7-bez-depozytu/ 0 imp — sklejamy w bonus
  "7-bez-depozytu": "7-euro-bez-depozytu",
  "bukmacherzy-paysafecard": "bukmacherzy-paysafecard",
  "vulkanspiele-erfahrung": "vulkanspiele-casino",
  "jak-kasyno-zarabia-na-pokerze": "jak-kasyno-zarabia-na-pokerze",
  "главныи-ключ": "kasyno-online",
  "kasyna-online-opinie": "kasyna-online-opinie",
  "legalne-kasyno-online-opinie": "legalne-kasyno-online-opinie",
  "vulkan-vegas-wypłaty-opinie": "vulkan-vegas-wyplaty-opinie",
  // istniejący bonus ma slug „bonus-bez-depozytu-vulkan-bet"
  "vulkan-bet-bonus-bez-depozytu": "bonus-bez-depozytu-vulkan-bet",
  "mr-bet-bonus-bez-depozytu": "mr-bet-bonus-bez-depozytu",
  "mr-bet-70-za-rejestracje-bez-depozytu": "mr-bet-70-za-rejestracje-bez-depozytu",
  "a-big-candy-casino-kod-promocyjny-bez-depozytu-2026": "candy-casino-kod-promocyjny",
  "energy-casino-36-darmowe-spiny": "energy-casino-36-darmowe-spiny",
  "bruce-bet-czy-jest-bezpieczny": "bruce-bet-czy-jest-bezpieczny",
  "nv-casino-czy-jest-bezpieczne": "nv-casino-czy-jest-bezpieczne",
  "spin-city-opinie-forum": "spin-city-opinie-forum",
  "vox-casino-forum": "vox-casino-forum",
  "vulkan-vegas-wypłaty-opinie": "vulkan-vegas-wyplaty-opinie",
};

/** Aliasy slug ze statyi → canonical casino-slug w casinos.json. */
const SLUG_ALIASES = {
  // literówka „bizon” w nazwie statyi → bison-casino
  "bizon-casino": "bison-casino",
  // statya nazywa się „lemon-casino”, w projekcie slug = „lemon”
  "lemon-casino": "lemon",
  // statya „spin-city-casino”, w projekcie slug = „spin-city”
  "spin-city-casino": "spin-city",
  // text2/: brand review „nv-kasyno-opinie-главныи” → nv-casino
  "nv-kasyno": "nv-casino",
};

function stripOpinieSuffix(name) {
  // „bizon-casino-opinie” → „bizon-casino”;  „888starz-opinie” → „888starz”
  // dopuszczamy też sufix „-opinie-главныи” (marker text2/: „main opinie article”)
  return name.replace(/-opinie(-главныи)?$/u, "");
}

function parseLegacyFilename(file) {
  if (!file.endsWith("-recenzja.txt")) return null;
  return file.slice(0, -"-recenzja.txt".length);
}

function parseArticleFilename(file) {
  // Format: статья <slug>_pl_pl_warsaw_<ISO>
  const m = file.match(/^статья\s+(.+?)_pl_pl_warsaw_/u);
  if (!m) return null;
  const raw = m[1];
  // jeśli plik jest zmapowany jawnie jako text-block (np. „kasyna-online-opinie" jako SEO landing) — nie jest recenzją
  if (TEXT_BLOCK_ALIASES[raw]) return null;
  // tylko -opinie / -casino-opinie (opcjonalnie -главныи) traktujemy jako recenzje rdzeniowe
  if (!/-opinie(-главныи)?$/u.test(raw)) return null;
  const stripped = stripOpinieSuffix(raw);
  return SLUG_ALIASES[stripped] ?? stripped;
}

function stripCyrillicMarkers(s) {
  // Redakcyjne markery po rosyjsku wewnątrz tytułu/description (np. „(Главный)", „главныи") — usuwamy.
  return s
    .replace(/\s*\(Главный\)/gu, "")
    .replace(/\s*главныи/giu, "")
    .replace(/\s{2,}/gu, " ")
    .trim();
}

function parseRecenzjaFile(raw) {
  const titleMatch = raw.match(/\*\*Title:\*\*\s*(.+)/);
  const descMatch = raw.match(/\*\*Description:\*\*\s*(.+)/);
  const metaTitle = stripCyrillicMarkers((titleMatch?.[1] ?? "").trim());
  const metaDescription = stripCyrillicMarkers((descMatch?.[1] ?? "").trim());
  const idx = raw.search(/^#/m);
  const body = idx >= 0 ? stripCyrillicMarkers(raw.slice(idx).trim()) : "";
  return { metaTitle, metaDescription, body };
}

function scanDir(dir, out, stats, overridesLabel) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    // pomijamy podkatalogi (np. text/text2 — obsługiwany osobnym wywołaniem)
    if (fs.statSync(full).isDirectory()) continue;
    let slug = parseLegacyFilename(file);
    let kind = "legacy";
    if (!slug) {
      slug = parseArticleFilename(file);
      kind = "article";
    }
    if (!slug) {
      stats.skipped++;
      continue;
    }
    const raw = fs.readFileSync(full, "utf8");
    const wasOverride = Boolean(out[slug]);
    out[slug] = parseRecenzjaFile(raw);
    stats[kind]++;
    if (wasOverride) stats.overrides++;
    if (overridesLabel && wasOverride) {
      console.log(`  ↳ ${overridesLabel}: ${slug} zastąpiono z ${file}`);
    }
  }
}

function parseText2NonReviewFilename(file) {
  // Format: статья <slug>_pl_pl_warsaw_<ISO>
  const m = file.match(/^статья\s+(.+?)_pl_pl_warsaw_/u);
  if (!m) return null;
  const raw = m[1];
  // jawne mapowania mają pierwszeństwo — nawet jeśli plik ma sufiks -opinie
  if (TEXT_BLOCK_ALIASES[raw]) return TEXT_BLOCK_ALIASES[raw];
  // pozostałe -opinie / -главныи kierujemy do review-editorial
  if (/-opinie(-главныи)?$/u.test(raw)) return null;
  return raw;
}

function extractSourceDate(file) {
  // z „статья ..._pl_pl_warsaw_2026-07-12T11_45_02.784+03_00" wyciągamy YYYY-MM-DD
  const m = file.match(/_pl_pl_warsaw_(\d{4}-\d{2}-\d{2})T/u);
  return m ? m[1] : null;
}

function buildTextBlocks() {
  if (!fs.existsSync(text2Dir)) return { count: 0, skipped: 0 };
  const blocks = {};
  let count = 0;
  let skipped = 0;
  for (const file of fs.readdirSync(text2Dir)) {
    const full = path.join(text2Dir, file);
    if (fs.statSync(full).isDirectory()) continue;
    const slug = parseText2NonReviewFilename(file);
    if (!slug) {
      skipped++;
      continue;
    }
    const raw = fs.readFileSync(full, "utf8");
    const parsed = parseRecenzjaFile(raw);
    const sourceDate = extractSourceDate(file);
    blocks[slug] = { ...parsed, sourceDate };
    count++;
  }
  fs.mkdirSync(path.dirname(textBlocksFile), { recursive: true });
  fs.writeFileSync(textBlocksFile, JSON.stringify(blocks, null, 0), "utf8");
  return { count, skipped };
}

function main() {
  if (!fs.existsSync(textDir)) {
    console.error("Brak katalogu text/");
    process.exit(1);
  }
  const out = {};
  const stats = { legacy: 0, article: 0, skipped: 0, overrides: 0 };

  // 1) baza: text/*
  scanDir(textDir, out, stats);
  // 2) override: text/text2/* (świeższe teksty mają priorytet)
  scanDir(text2Dir, out, stats, "text2");

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 0), "utf8");
  console.log(
    "Zapisano",
    outFile,
    "—",
    Object.keys(out).length,
    "wpisów (legacy:",
    stats.legacy,
    "article:",
    stats.article,
    "overrides z text2:",
    stats.overrides,
    "skipped:",
    stats.skipped,
    ")",
  );

  const blocks = buildTextBlocks();
  console.log(
    "Zapisano",
    textBlocksFile,
    "—",
    blocks.count,
    "bloków text2 (skipped:",
    blocks.skipped,
    ")",
  );
}

main();
