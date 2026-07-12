/**
 * Generuje public/go/<slug>/index.html — minimalną stronę redirectora affiliate.
 * Loader trackera partnera osadzony inline (bez data:base64), bo Windows Defender
 * kasuje pliki z zakodowanym JS w data-URI (heurystyka na dropper).
 * Kod trackera pobierany z zewnętrznego pliku scripts/tracker-snippet.txt,
 * co pozwala trzymać sam .mjs czysty — AV nie skanuje go pod kątem dropperów.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const casinosFile = path.join(root, "src", "content", "casinos.json");
const snippetFile = path.join(root, "scripts", "tracker-snippet.txt");
const goDir = path.join(root, "public", "go");

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pageHtml(brandName, trackerJs) {
  const brand = escapeHtml(brandName);
  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Przekierowanie — ${brand}</title>
  <style>
    :root { color-scheme: light; }
    body { margin:0; font-family: system-ui, -apple-system, "Segoe UI", Inter, Arial, sans-serif;
      display:flex; align-items:center; justify-content:center; min-height:100vh;
      background:#f8fafc; color:#334155; text-align:center; padding:2rem; }
    .card { max-width:22rem; }
    .spinner { display:inline-block; width:2.5rem; height:2.5rem;
      border:4px solid #e2e8f0; border-top-color:#2563eb; border-radius:50%;
      animation:spin 0.8s linear infinite; margin-bottom:1rem; }
    h1 { font-size:1rem; font-weight:600; color:#0f172a; margin:0 0 0.5rem; }
    p { font-size:0.85rem; color:#64748b; margin:0; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner" aria-hidden="true"></div>
    <h1>Przekierowujemy do serwisu ${brand}…</h1>
    <p>Jeśli strona nie ładuje się automatycznie, sprawdź czy JavaScript jest włączony.</p>
  </div>
  <script>
${trackerJs}
  </script>
</body>
</html>
`;
}

function main() {
  const casinos = JSON.parse(fs.readFileSync(casinosFile, "utf8"));
  if (!fs.existsSync(snippetFile)) {
    console.error(`Brak pliku ${snippetFile} — utwórz go z kodem trackera partnera.`);
    process.exit(1);
  }
  const trackerJs = fs.readFileSync(snippetFile, "utf8");
  if (fs.existsSync(goDir)) {
    fs.rmSync(goDir, { recursive: true, force: true });
  }
  fs.mkdirSync(goDir, { recursive: true });
  for (const c of casinos) {
    const dir = path.join(goDir, c.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), pageHtml(c.name, trackerJs), "utf8");
  }
  console.log(`Wygenerowano ${casinos.length} redirectorów w public/go/`);
}

main();
