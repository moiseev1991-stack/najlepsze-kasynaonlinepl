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
const outFile = path.join(root, "src", "content", "review-editorial.json");

/** Aliasy slug ze statyi → canonical casino-slug w casinos.json. */
const SLUG_ALIASES = {
  // literówka „bizon” w nazwie statyi → bison-casino
  "bizon-casino": "bison-casino",
  // statya nazywa się „lemon-casino”, w projekcie slug = „lemon”
  "lemon-casino": "lemon",
  // statya „spin-city-casino”, w projekcie slug = „spin-city”
  "spin-city-casino": "spin-city",
};

function stripOpinieSuffix(name) {
  // „bizon-casino-opinie” → „bizon-casino”;  „888starz-opinie” → „888starz”
  return name.replace(/-opinie$/u, "");
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
  // tylko -opinie / -casino-opinie traktujemy jako recenzje rdzeniowe
  if (!/-opinie$/u.test(raw)) return null;
  const stripped = stripOpinieSuffix(raw);
  return SLUG_ALIASES[stripped] ?? stripped;
}

function parseRecenzjaFile(raw) {
  const titleMatch = raw.match(/\*\*Title:\*\*\s*(.+)/);
  const descMatch = raw.match(/\*\*Description:\*\*\s*(.+)/);
  const metaTitle = (titleMatch?.[1] ?? "").trim();
  const metaDescription = (descMatch?.[1] ?? "").trim();
  const idx = raw.search(/^#/m);
  const body = idx >= 0 ? raw.slice(idx).trim() : "";
  return { metaTitle, metaDescription, body };
}

function main() {
  if (!fs.existsSync(textDir)) {
    console.error("Brak katalogu text/");
    process.exit(1);
  }
  const out = {};
  const stats = { legacy: 0, article: 0, skipped: 0 };

  for (const file of fs.readdirSync(textDir)) {
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
    const raw = fs.readFileSync(path.join(textDir, file), "utf8");
    out[slug] = parseRecenzjaFile(raw);
    stats[kind]++;
  }
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
    "skipped:",
    stats.skipped,
    ")",
  );
}

main();
