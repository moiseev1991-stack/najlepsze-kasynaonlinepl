/**
 * Skanuje text/*-recenzja.txt i generuje src/content/review-editorial.json
 * (metaTitle, metaDescription, body markdown/HTML).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const textDir = path.join(root, "text");
const outFile = path.join(root, "src", "content", "review-editorial.json");

function filenameToSlug(name) {
  if (!name.endsWith("-recenzja.txt")) return null;
  return name.slice(0, -"-recenzja.txt".length);
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
  const files = fs.readdirSync(textDir).filter((f) => f.endsWith(".txt"));
  const out = {};
  for (const file of files) {
    const slug = filenameToSlug(file);
    if (!slug) continue;
    const raw = fs.readFileSync(path.join(textDir, file), "utf8");
    out[slug] = parseRecenzjaFile(raw);
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 0), "utf8");
  console.log("Zapisano", outFile, "—", Object.keys(out).length, "wpisów");
}

main();
