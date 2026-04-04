/**
 * Globalny pasek oferty na każdej stronie — podmień logo (logoSrc) i linki partnerskie.
 * Jeśli download.href jest pusty, przycisk „Pobierz” się nie wyświetla.
 */
export const pageOfferConfig = {
  enabled: true,
  logoSrc: "/images/casinos/vox-casino.webp",
  brandName: "Vox Casino",
  tagline: "Bonus powitalny dla czytelników — szczegóły u operatora",
  register: {
    label: "Zarejestruj się",
    href: "https://example.com/rejestracja-partnerska",
  },
  download: {
    label: "Pobierz aplikację",
    href: "",
  },
} as const;
