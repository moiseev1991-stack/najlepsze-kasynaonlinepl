export type FAQItem = {

  question: string;

  answer: string;

};



export type ProblemReportLink = {

  label: string;

  href: string;

};



export type Casino = {

  id: string;

  slug: string;

  name: string;

  logo: string;

  affiliateUrl: string;

  reviewUrl: string;

  ratingOverall: number;

  ratingUsers: number;

  votesCount: number;

  trustIndex: number;

  welcomeBonus: string;

  /** Kod promocyjny — pusty string jeśli brak */

  promoCode?: string;

  bonusTypes: string[];

  wager: string;

  /** Limit czasu bonusu / promocji (tekst redakcyjny) */

  timeLimit?: string;

  minDeposit: string;

  withdrawalTime: string;

  license: string;

  foundedYear: number;

  gameCount: number;

  paymentMethods: string[];

  features: string[];

  addedDate: string;

  pros: string[];

  cons: string[];

  isNew: boolean;

  isPopular: boolean;

  isTopRated: boolean;

  /** Opcje zgłoszenia problemu (np. link do formularza zewnętrznego) */

  problemsReportOptions?: ProblemReportLink[];

  /** Rozwijany blok „więcej informacji” w karcie rankingu */

  detailsMoreInfo?: string;

};



export type Author = {

  name: string;

  slug: string;

  avatar: string;

  role: string;

  bio: string;

  email?: string;

};



export type BlogPost = {

  title: string;

  slug: string;

  excerpt: string;

  content: string;

  cover: string;

  author: string;

  publishedAt: string;

  category: string;

  tags?: string[];

  faq?: FAQItem[];

};



export type PaymentMethodPage = {

  methodName: string;

  slug: string;

  intro: string;

  pros: string[];

  cons: string[];

  depositTime: string;

  withdrawalTime: string;

  fees: string;

  supportedCasinos: string[];

  howToDeposit?: string;

  limitsText?: string;

  withdrawalExplained?: string;

  comparisonNote?: string;

  alternativeMethod?: string;

  seoSections?: { heading: string; body: string }[];

};



export type BonusPage = {

  title: string;

  slug: string;

  intro: string;

  conditions: string;

  examples: string[];

  faq: FAQItem[];

  relatedLinks?: { href: string; label: string }[];

  quickNav?: { id: string; label: string }[];

  whatIsIt?: string;

  steps?: { title: string; body: string }[];

  recommendedIntro?: string;

  pros?: string[];

  maxCashoutNote?: string;

  summary?: string;

  expertTip?: string;

};



export type CategoryLayoutMode =

  | "ranking"

  | "hub"

  | "bonusList"

  | "spinsList"

  | "cashList";



export type CategoryPageContent = {

  slug: string;

  title: string;

  h1: string;

  intro: string;

  introSecondary?: string;

  metaDescription: string;

  filterTags?: string[];

  seoSections: { heading: string; body: string }[];

  comparisonIntro?: string;

  relatedLinks: { href: string; label: string }[];

  layoutMode?: CategoryLayoutMode;

  hubLinks?: { href: string; label: string; teaser?: string }[];

  /** Podstrony (spiny / kasa) — karty nad listą operatorów */

  subpageLinks?: { href: string; label: string; teaser?: string }[];

  categoryFaq?: FAQItem[];

  /** Rodzaj listy afiliacyjnej (filtry SEO) */

  listingKind?: "bonus" | "spins" | "cash";

};



export type GamePageContent = {

  slug: string;

  title: string;

  h1: string;

  intro: string;

  metaDescription: string;

  heroEyebrow?: string;

  /** Klucz ikony z mapy Lucide w game-hub (np. gamepad2, cherry) */

  heroIcon: string;

  heroAccent?: { label: string; value: string };

  quickFacts: string[];

  featureCards: { icon: string; title: string; description: string }[];

  seoSections: { heading: string; body: string }[];

  attentionPoints: { title: string; body: string }[];

  relatedPageCards: { href: string; title: string; description: string }[];

  faq: FAQItem[];

  legalNotice?: string;

  relatedLinks?: { href: string; label: string }[];

  /** Sekcja rankingu kasyn (jak na stronie głównej) */

  rankingHeading?: string;

  rankingIntro?: string;

  rankingFilterTags?: string[];

  /** Kolejność operatorów; jeśli puste, stosuje się heurystykę w getCasinosForGamePage */

  recommendedCasinoSlugs?: string[];

};



export type TrustPageContent = {

  slug: string;

  title: string;

  h1: string;

  intro: string;

  metaDescription: string;

  sections: { heading: string; body: string }[];

};



export type MinDepositPage = {

  slug: string;

  title: string;

  h1: string;

  intro: string;

  metaDescription: string;

  amountLabel: string;

  faq: FAQItem[];

  seoSections: { heading: string; body: string }[];

};



export type PageKind =

  | { type: "category"; slug: string }

  | { type: "payment-index" }

  | { type: "payment"; slug: string }

  | { type: "bonus"; slug: string }

  | { type: "game"; slug: string }

  | { type: "min-deposit-parent" }

  | { type: "min-deposit"; slug: string }

  | { type: "review"; slug: string }

  | { type: "blog-list" }

  | { type: "blog-post"; slug: string }

  | { type: "blog-category"; categorySlug: string }

  | { type: "trust"; slug: string };


