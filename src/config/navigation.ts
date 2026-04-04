/** Struktura menu i stopki — zgodna z architekturą serwisu SEO/affiliate. */

export type NavLink = { href: string; label: string };

export type MegaMenuSection = {
  label: string;
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
    label: "Recenzje kasyn",
    href: "/#przewodnik-recenzji",
    children: reviewChildren,
  },
  {
    label: "Najlepsze kasyna",
    href: "/najlepsze-kasyna-online/",
    children: [
      { href: "/nowe-kasyna-online/", label: "Nowe kasyna online" },
      { href: "/legalne-kasyna/", label: "Legalne kasyna" },
      { href: "/platnosci/", label: "Metody płatności" },
      { href: "/platnosci/kasyna-z-astropay/", label: "Kasyna z AstroPay" },
      { href: "/platnosci/kasyno-online-blik/", label: "Kasyno online BLIK" },
      { href: "/platnosci/muchbetter/", label: "MuchBetter" },
      { href: "/platnosci/kasyno-przelewy24/", label: "Przelewy24" },
      { href: "/platnosci/paypal/", label: "PayPal" },
      { href: "/platnosci/paysafecard/", label: "Paysafecard" },
      { href: "/platnosci/kasyno-online-skrill/", label: "Skrill" },
      { href: "/wyplacalne-kasyna-internetowe/", label: "Wypłacalne kasyna internetowe" },
      { href: "/kasyna-na-zywo/", label: "Kasyna na żywo" },
      { href: "/kasyna-z-minimalnym-depozytem/", label: "Minimalny depozyt" },
      { href: "/kasyna-z-minimalnym-depozytem/kasyno-5-zl/", label: "Kasyno 5 zł" },
      { href: "/kasyna-z-minimalnym-depozytem/kasyna-z-depozytem-za-10-zl/", label: "Depozyt 10 zł" },
      { href: "/kasyna-z-minimalnym-depozytem/kasyno-20-zl/", label: "Kasyno 20 zł" },
      { href: "/kasyna-bez-weryfikacji/", label: "Kasyna bez weryfikacji" },
    ],
  },
  {
    label: "Gry Hazardowe Online",
    href: "/automaty-za-darmo/",
    children: [
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
    label: "Darmowe spiny",
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
    label: "Darmowa kasa",
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

/** Kolumna POPULARNE STRONY — zgodnie z architekturą referencyjną */
export const footerPopularLinks: NavLink[] = [
  { href: "/vox-casino/", label: "Vox Casino" },
  { href: "/automaty-za-darmo/", label: "Automaty za darmo" },
  { href: "/darmowa-kasa-bez-depozytu/", label: "Darmowa kasa bez depozytu" },
  { href: "/darmowe-spiny/", label: "Darmowe spiny" },
  { href: "/gry-hazardowe-za-darmo-77777/", label: "Gry 77777 za darmo" },
  { href: "/50-zl-bez-depozytu/", label: "50 zł bez depozytu" },
  { href: "/100-zl-za-rejestracje/", label: "100 zł za rejestrację" },
  { href: "/bonus-bez-depozytu/", label: "Bonus bez depozytu" },
  { href: "/lemon/", label: "Lemon" },
];
