import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const siteDir = path.join(root, "site");

if (!fs.existsSync(outDir)) {
  console.error("Brak folderu out/ — najpierw: npm run build");
  process.exit(1);
}

fs.rmSync(siteDir, { recursive: true, force: true });
fs.mkdirSync(siteDir, { recursive: true });

for (const name of fs.readdirSync(outDir)) {
  fs.cpSync(path.join(outDir, name), path.join(siteDir, name), { recursive: true });
}

console.log("Zsynchronizowano out/ → site/ (", fs.readdirSync(siteDir).length, "elementów na poziomie głównym)");
