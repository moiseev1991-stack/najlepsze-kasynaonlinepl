import { readFileSync, writeFileSync } from "fs";

const path = "src/content/bonuses.json";
const data = JSON.parse(readFileSync(path, "utf8"));

const steps = [
  {
    title: "Załóż konto",
    body: "Uzupełnij formularz rejestracji prawdziwymi danymi — fałszywe informacje blokują wypłaty przy weryfikacji KYC.",
  },
  {
    title: "Potwierdź e-mail lub numer",
    body: "Wiele kampanii wymaga linku aktywacyjnego lub kodu SMS zanim spiny pojawią się na koncie.",
  },
  {
    title: "Aktywuj promocję w kasie",
    body: "Sprawdź zakładkę bonusów lub wpisz kod promocyjny, jeśli jest wymagany przez regulamin.",
  },
  {
    title: "Sprawdź przypisaną grę",
    body: "Spiny działają tylko na wskazanym automacie — inna gra może zużyć środki własne.",
  },
];

const quickNav = [
  { id: "co-to", label: "Czym jest oferta" },
  { id: "kroki", label: "Jak odebrać" },
  { id: "warunki", label: "Warunki i limity" },
  { id: "faq", label: "FAQ" },
];

const slugs = [
  "20-darmowych-spinow-bez-depozytu",
  "25-darmowych-spinow-za-rejestracje",
  "50-darmowych-spinow-bez-depozytu",
  "100-darmowych-spinow-bez-depozytu",
];

for (const slug of slugs) {
  const e = data.find((x) => x.slug === slug);
  if (!e) throw new Error(`missing ${slug}`);
  e.steps = steps;
  e.quickNav = quickNav;
}

writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
console.log("patched", slugs.length);
