// src/lib/market.js
// Sve što je specifično za COM market (jezik, domen, javni tekstovi).
// Ostatak koda je identičan RS kalendaru — pri sinhronizaciji sa RS-om ovaj fajl se ne dira.

export const LANG = "en";
export const LOCALE = "en_MT";
export const BASE_URL = "https://calendar.meridianbet.com";
// Kuda vodi klik na logo
export const MAIN_SITE_URL = "https://meridianbet.com";
export const DATE_LOCALE = "en-GB";
// "Danas" i zaključavanje budućih dana računaju se po ovoj zoni
export const TIME_ZONE = "Europe/Malta";

export const SITE_NAME = "Promotions Calendar";
export const SITE_TITLE = "Promotions Calendar | Meridianbet";
export const SITE_SHORT_NAME = "MB Calendar";
export const SITE_DESCRIPTION =
  "Stay up to date with daily offers, discover new promotions, and enjoy exclusive rewards through the Meridianbet Promotions Calendar.";

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Podrazumevani naslov kalendara dok se ne podesi u adminu
export const DEFAULT_CALENDAR_TITLE = "HOLIDAY MISSIONS";
export const DEFAULT_COUNTDOWN_LABEL = "Calendar opens in";

export const monthMetaTitle = (monthName, year) =>
  `Promotions Calendar ${monthName} ${year} | Meridianbet`;
export const monthMetaDescription = (monthName, year) =>
  `Discover daily promotions for ${monthName} ${year}. Enjoy exclusive rewards through the Meridianbet Promotions Calendar.`;
export const promoMetaTitle = (title) => `${title} | Meridianbet Promotions Calendar`;
export const promoMetaDescription = (title) =>
  `Discover the daily promotion "${title}" in the Meridianbet Promotions Calendar.`;

export const CATEGORY_LABELS = {
  GOLD: "Golden Ball",
  QUARTER_FINAL: "Quarter-final",
  SEMI_FINAL: "Semi-final",
  FINAL: "Final",
};
export const KNOCKOUT_FINAL_BADGE = "FINAL";

// Grebalica — ljubičasta kartica (kursor-novčić je u globals.css, #scratch-canvas)
export const SCRATCH_COVER = "/img/scratchCard.png";
// Konfete posle grebanja kod football teme (emoji oblici). Prazno = šareni papirići kao kod ostalih tema
export const SCRATCH_FOOTBALL_CONFETTI = [];
export const SCRATCH_FOOTBALL_CONFETTI_SCALE = 2;

export const UI = {
  day: "Day",
  close: "Close",
  promoDetails: "Promotion details",
  monthInactive: "⚠ Month deactivated — not visible to users",
  edit: "Edit",
  countdownDay: "day",
  countdownDays: "days",
  countdownHours: "hrs",
  countdownMinutes: "min",
  countdownSeconds: "sec",
};
