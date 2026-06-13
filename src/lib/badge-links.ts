/** Mapowanie etykiet (płatność / bonus / cecha) na wewnętrzny URL.
 *  Wykorzystywane przez BonusTags, CasinoQuickFacts i listy cech w karcie kasyna,
 *  żeby badge prowadziły do odpowiedniego huba zamiast być statycznym tekstem.
 */

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

const PAYMENT_HREF: Record<string, string> = {
  blik: "/kasyno-blik/",
  skrill: "/kasyno-skrill/",
  paysafecard: "/kasyno-paysafecard/",
  przelewy24: "/platnosci/kasyno-przelewy24/",
  paypal: "/platnosci/paypal/",
  muchbetter: "/platnosci/muchbetter/",
  astropay: "/platnosci/kasyna-z-astropay/",
  kryptowaluty: "/krypto-kasyno/",
  bitcoin: "/krypto-kasyno/",
  revolut: "/blog/kasyno-revolut/",
};

const BONUS_HREF: Record<string, string> = {
  powitalny: "/bonusy-powitalne/",
  "powitalny pakiet": "/bonusy-powitalne/",
  reload: "/bonusy-kasynowe/",
  cashback: "/bonusy-kasynowe/",
  "free spins": "/darmowe-spiny/",
  "darmowe spiny": "/darmowe-spiny/",
  "bez depozytu": "/bonus-bez-depozytu/",
  "no deposit": "/bonus-bez-depozytu/",
  vip: "/bonusy-kasynowe/",
  turnieje: "/bonusy-kasynowe/",
};

const FEATURE_HREF: Record<string, string> = {
  live: "/kasyna-na-zywo/",
  "na zywo": "/kasyna-na-zywo/",
  mobile: "/kasyno-na-telefon/",
  mobilne: "/kasyno-na-telefon/",
  aplikacja: "/kasyno-na-telefon/",
  "szybkie wyplaty": "/kasyno-szybkie-wyplaty/",
  blik: "/kasyno-blik/",
  krypto: "/krypto-kasyno/",
};

export function paymentHref(label: string): string | undefined {
  return PAYMENT_HREF[norm(label)];
}

export function bonusTypeHref(label: string): string | undefined {
  return BONUS_HREF[norm(label)];
}

export function featureHref(label: string): string | undefined {
  return FEATURE_HREF[norm(label)];
}
