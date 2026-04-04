import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const slugs = [
  "vox-casino",
  "vulkanspiele-casino",
  "spinline-casino",
  "bison-casino",
  "vulkan-vegas",
  "bruce-bet",
  "spin-city",
  "trino-casino",
  "energy-casino",
  "verde-casino",
  "roman-casino",
  "janusz-casino",
  "lemon",
  "yep-casino",
  "nv-casino",
  "slotoro",
  "larabet",
  "theslotz",
  "slotsgem",
  "spellwin",
  "stonevegas",
  "candy-casino",
  "machance",
];

function nameFromSlug(s) {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("Z ", "z ");
}

const casinos = slugs.map((slug, i) => {
  const name = nameFromSlug(slug).replace("Vox Casino", "Vox Casino").replace("Nv Casino", "NV Casino");
  const displayName =
    slug === "lemon"
      ? "Lemon"
      : slug === "theslotz"
        ? "TheSlotz"
        : slug === "slotsgem"
          ? "SlotsGem"
          : slug === "machance"
            ? "MaChance"
            : name;
  const r = 4.1 + (i % 7) * 0.1;
  return {
    id: `c-${slug}`,
    slug,
    name: displayName,
    logo: "/images/casinos/placeholder.svg",
    affiliateUrl: `https://example.com/go/${slug}`,
    reviewUrl: `/${slug}/`,
    ratingOverall: Math.round(r * 10) / 10,
    ratingUsers: Math.round((r - 0.1) * 10) / 10,
    votesCount: 200 + i * 137,
    trustIndex: 78 + (i % 12),
    welcomeBonus: "Pakiet powitalny — szczegóły w recenzji",
    bonusTypes: ["Powitalny", "Reload"],
    wager: "x35–x40",
    minDeposit: i % 3 === 0 ? "10 zł" : "20 zł",
    withdrawalTime: i % 2 === 0 ? "24–48 h" : "48–72 h",
    license: "Licencja — weryfikuj u operatora",
    foundedYear: 2016 + (i % 8),
    gameCount: 1800 + i * 120,
    paymentMethods: ["BLIK", "Skrill", "Visa"],
    features: ["Live", "Turnieje"],
    addedDate: "2025-01-15",
    pros: ["Przejrzysty regulamin bonusów", "Szeroki wybór slotów"],
    cons: ["Weryfikacja przy pierwszej wypłacie", "Warunki promocji wymagają uwagi"],
    isNew: i < 3,
    isPopular: i % 4 === 0,
    isTopRated: i % 5 === 0,
  };
});

const bonusSlugs = [
  ["bonus-bez-depozytu", "Bonus bez depozytu"],
  ["bonusy-powitalne", "Bonusy powitalne"],
  ["darmowe-kody-do-polskich-kasyn", "Darmowe kody do polskich kasyn"],
  ["bonus-bez-depozytu-vulkan-bet", "Bonus bez depozytu Vulkan Bet"],
  ["bonus-bez-depozytu-spin-city-50-zl", "Spin City — 50 zł bez depozytu"],
  ["mr-bet-bonus-bez-depozytu", "Mr Bet — bonus bez depozytu"],
  ["vulkan-vegas-25-euro-bez-depozytu", "Vulkan Vegas — 25 € bez depozytu"],
  ["bonus-bez-depozytu-icecasino", "IceCasino — bonus bez depozytu"],
  ["10-darmowych-spinow-bez-depozytu", "10 darmowych spinów bez depozytu"],
  ["20-darmowych-spinow-bez-depozytu", "20 darmowych spinów bez depozytu"],
  ["25-darmowych-spinow-za-rejestracje", "25 spinów za rejestrację"],
  ["50-darmowych-spinow-bez-depozytu", "50 darmowych spinów bez depozytu"],
  ["100-darmowych-spinow-bez-depozytu", "100 darmowych spinów bez depozytu"],
  ["20-zl-bez-depozytu", "20 zł bez depozytu"],
  ["25-zl-bez-depozytu", "25 zł bez depozytu"],
  ["30-zl-bez-depozytu", "30 zł bez depozytu"],
  ["50-zl-bez-depozytu", "50 zł bez depozytu"],
  ["60-zl-bez-depozytu", "60 zł bez depozytu"],
  ["100-zl-za-rejestracje", "100 zł za rejestrację"],
  ["5-euro-bez-depozytu", "5 € bez depozytu"],
  ["7-euro-bez-depozytu", "7 € bez depozytu"],
  ["10-euro-bez-depozytu", "10 € bez depozytu"],
  ["15-euro-bez-depozytu", "15 € bez depozytu"],
  ["25-euro-bez-depozytu", "25 € bez depozytu"],
  ["30-euro-bez-depozytu", "30 € bez depozytu"],
  ["40-euro-bez-depozytu", "40 € bez depozytu"],
  ["50-euro-bez-depozytu", "50 € bez depozytu"],
];

const bonuses = bonusSlugs.map(([slug, title]) => ({
  title,
  slug,
  intro: `Materiał informacyjny o promocji „${title}”. Zasady zawsze potwierdzaj w aktualnym regulaminie operatora — nasz opis nie zastępuje dokumentów prawnych kasyna.`,
  conditions:
    "Typowo: rejestracja, weryfikacja tożsamości przed wypłatą, obrót bonusem, limit stawki i lista wykluczonych gier.",
  examples: ["Sprawdź datę ważności oferty", "Porównaj z innymi promocjami w naszym poradniku"],
  faq: [
    {
      question: "Czy mogę połączyć tę promocję z inną?",
      answer: "Zależy od regulaminu — często promocje wykluczają się nawzajem.",
    },
  ],
}));

fs.writeFileSync(path.join(root, "src/content/casinos.json"), JSON.stringify(casinos, null, 2));
fs.writeFileSync(path.join(root, "src/content/bonuses.json"), JSON.stringify(bonuses, null, 2));
console.log("Wrote casinos.json + bonuses.json");
