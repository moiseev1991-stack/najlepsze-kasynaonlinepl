/** Struktura menu i stopki — zgodna z architekturą serwisu SEO/affiliate. */

export type NavLink = { href: string; label: string };

export type MegaMenuSection = {
  /** Krótka etykieta w pasku menu */
  label: string;
  /** Pełna nazwa działu w nagłówku rozwijanego („Przegląd: …”); fallback = label */
  overviewLabel?: string;
  href: string;
  children: NavLink[];
};

const reviewChildren: NavLink[] = [
  { href: "/vox-casino/", label: "Vox Casino" },
  { href: "/vulkanspiele-casino/", label: "Vulkanspiele Casino" },
  { href: "/spinline-casino/", label: "Spinline Casino" },
  { href: "/bison-casino/", label: "Bison Casino" },
  { href: "/vulkan-vegas/", label: "Vulkan Vegas" },
  { href: "/bruce-bet/", label: "Bruce Bet" },
  { href: "/spin-city/", label: "Spin City" },
  { href: "/trino-casino/", label: "Trino Casino" },
  { href: "/energy-casino/", label: "Energy Casino" },
  { href: "/verde-casino/", label: "Verde Casino" },
  { href: "/roman-casino/", label: "Roman Casino" },
  { href: "/janusz-casino/", label: "Janusz Casino" },
  { href: "/lemon/", label: "Lemon" },
  { href: "/yep-casino/", label: "Yep Casino" },
  { href: "/nv-casino/", label: "NV Casino" },
  { href: "/slotoro/", label: "Slotoro" },
  { href: "/larabet/", label: "Larabet" },
  { href: "/theslotz/", label: "TheSlotz" },
  { href: "/slotsgem/", label: "SlotsGem" },
  { href: "/spellwin/", label: "Spellwin" },
  { href: "/stonevegas/", label: "StoneVegas" },
  { href: "/candy-casino/", label: "Candy Casino" },
  { href: "/machance/", label: "MaChance" },
];

export const megaMenuSections: MegaMenuSection[] = [
  {
    label: "Kasyno",
    overviewLabel: "Recenzje kasyn",
    href: "/#przewodnik-recenzji",
    children: reviewChildren,
  },
  {
    label: "Ranking",
    overviewLabel: "Najlepsze kasyna",
    href: "/najlepsze-kasyna-online/",
    children: [
      { href: "/wyplacalne-kasyna/", label: "Wypłacalne kasyna" },
      { href: "/nowe-kasyna/", label: "Nowe kasyna" },
      { href: "/legalne-kasyna/", label: "Legalne kasyna" },
      { href: "/kasyno-na-telefon/", label: "Kasyno na telefon" },
      { href: "/kasyno-bez-weryfikacji/", label: "Kasyno bez weryfikacji" },
      { href: "/kasyna-na-zywo/", label: "Kasyna na żywo" },
      { href: "/kasyno-blik/", label: "Kasyno BLIK" },
      { href: "/kasyno-skrill/", label: "Kasyno Skrill" },
      { href: "/kasyno-paysafecard/", label: "Kasyno Paysafecard" },
      { href: "/platnosci/", label: "Wszystkie metody płatności" },
      { href: "/kasyno-depozyt-5-zl/", label: "Kasyno depozyt 5 zł" },
      { href: "/kasyno-depozyt-10-zl/", label: "Kasyno depozyt 10 zł" },
      { href: "/kasyno-depozyt-20-zl/", label: "Kasyno depozyt 20 zł" },
      { href: "/minimalny-depozyt/", label: "Wszystkie progi depozytu" },
    ],
  },
  {
    label: "Gry",
    overviewLabel: "Gry hazardowe online",
    href: "/automaty-za-darmo/",
    children: [
      { href: "/automaty-online/", label: "Automaty online" },
      { href: "/ruletka-online/", label: "Ruletka online" },
      { href: "/blackjack-online/", label: "Blackjack online" },
      { href: "/automaty-za-darmo/", label: "Automaty za darmo" },
      { href: "/gry-automaty-owoce/", label: "Automaty owocówki" },
      { href: "/gry-hazardowe-za-darmo-77777/", label: "Gry 77777 za darmo" },
      { href: "/gry-hot-spot/", label: "Gry hot spot" },
      { href: "/gry-jackpot/", label: "Gry jackpot" },
      { href: "/gry-na-prawdziwe-pieniadze/", label: "Gry na prawdziwe pieniądze" },
    ],
  },
  {
    label: "Bonusy",
    href: "/bonusy-kasynowe/",
    children: [
      { href: "/bonusy-kasynowe/", label: "Bonusy kasynowe" },
      { href: "/bonus-bez-depozytu/", label: "Bonus bez depozytu" },
      { href: "/bonusy-powitalne/", label: "Bonusy powitalne" },
      { href: "/darmowe-kody-do-polskich-kasyn/", label: "Darmowe kody" },
      { href: "/bonus-bez-depozytu-vulkan-bet/", label: "Vulkan Bet bez depozytu" },
      { href: "/bonus-bez-depozytu-spin-city-50-zl/", label: "Spin City 50 zł" },
      { href: "/mr-bet-bonus-bez-depozytu/", label: "Mr Bet bez depozytu" },
      { href: "/vulkan-vegas-25-euro-bez-depozytu/", label: "Vulkan Vegas 25 €" },
      { href: "/bonus-bez-depozytu-icecasino/", label: "IceCasino bez depozytu" },
    ],
  },
  {
    label: "Spiny",
    overviewLabel: "Darmowe spiny",
    href: "/darmowe-spiny/",
    children: [
      { href: "/darmowe-spiny/", label: "Przegląd darmowych spinów" },
      { href: "/10-darmowych-spinow-bez-depozytu/", label: "10 spinów bez depozytu" },
      { href: "/20-darmowych-spinow-bez-depozytu/", label: "20 spinów bez depozytu" },
      { href: "/25-darmowych-spinow-za-rejestracje/", label: "25 spinów za rejestrację" },
      { href: "/50-darmowych-spinow-bez-depozytu/", label: "50 spinów bez depozytu" },
      { href: "/100-darmowych-spinow-bez-depozytu/", label: "100 spinów bez depozytu" },
    ],
  },
  {
    label: "Kasa",
    overviewLabel: "Darmowa kasa",
    href: "/darmowa-kasa-bez-depozytu/",
    children: [
      { href: "/darmowa-kasa-bez-depozytu/", label: "Darmowa kasa bez depozytu" },
      { href: "/20-zl-bez-depozytu/", label: "20 zł bez depozytu" },
      { href: "/25-zl-bez-depozytu/", label: "25 zł bez depozytu" },
      { href: "/30-zl-bez-depozytu/", label: "30 zł bez depozytu" },
      { href: "/50-zl-bez-depozytu/", label: "50 zł bez depozytu" },
      { href: "/60-zl-bez-depozytu/", label: "60 zł bez depozytu" },
      { href: "/100-zl-za-rejestracje/", label: "100 zł za rejestrację" },
      { href: "/5-euro-bez-depozytu/", label: "5 € bez depozytu" },
      { href: "/7-euro-bez-depozytu/", label: "7 € bez depozytu" },
      { href: "/10-euro-bez-depozytu/", label: "10 € bez depozytu" },
      { href: "/15-euro-bez-depozytu/", label: "15 € bez depozytu" },
      { href: "/25-euro-bez-depozytu/", label: "25 € bez depozytu" },
      { href: "/30-euro-bez-depozytu/", label: "30 € bez depozytu" },
      { href: "/40-euro-bez-depozytu/", label: "40 € bez depozytu" },
      { href: "/50-euro-bez-depozytu/", label: "50 € bez depozytu" },
    ],
  },
];

export const footerInfoLinks: NavLink[] = [
  { href: "/o-nas/", label: "O nas" },
  { href: "/kontakt/", label: "Kontakt" },
  { href: "/kryteria-oceny/", label: "Kryteria oceny" },
  { href: "/odpowiedzialna-gra/", label: "Odpowiedzialna gra" },
  { href: "/polityka-redakcyjna/", label: "Polityka redakcyjna" },
  { href: "/polityka-prywatnosci/", label: "Polityka prywatności" },
  { href: "/polityka-plikow-cookies/", label: "Polityka plików cookies" },
  { href: "/licencje-hazardowe/", label: "Licencje hazardowe" },
  { href: "/blog/", label: "Blog" },
];

/** Kolumna POPULARNE STRONY — top recenzje + nowe huby (TZ §6) */
export const footerPopularLinks: NavLink[] = [
  { href: "/nv-casino/", label: "NV Casino" },
  { href: "/vulkan-vegas/", label: "Vulkan Vegas" },
  { href: "/lemon/", label: "Lemon" },
  { href: "/bison-casino/", label: "Bison Casino" },
  { href: "/vox-casino/", label: "Vox Casino" },
  { href: "/verde-casino/", label: "Verde Casino" },
  { href: "/wyplacalne-kasyna/", label: "Wypłacalne kasyna" },
  { href: "/kasyno-blik/", label: "Kasyno BLIK" },
  { href: "/nowe-kasyna/", label: "Nowe kasyna" },
  { href: "/darmowe-spiny/", label: "Darmowe spiny" },
  { href: "/bonus-bez-depozytu/", label: "Bonus bez depozytu" },
];
