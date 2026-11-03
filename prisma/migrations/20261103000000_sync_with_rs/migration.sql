-- Usklađivanje COM baze sa RS šemom (ručno pisano — samo dodavanje, ništa se ne briše).
-- IF NOT EXISTS: bezbedno i ako je neka kolona/vrednost već dodata ručno.

-- Nove kategorije (Zlatna lopta + knockout faze)
ALTER TYPE "PromoCategory" ADD VALUE IF NOT EXISTS 'GOLD';
ALTER TYPE "PromoCategory" ADD VALUE IF NOT EXISTS 'QUARTER_FINAL';
ALTER TYPE "PromoCategory" ADD VALUE IF NOT EXISTS 'SEMI_FINAL';
ALTER TYPE "PromoCategory" ADD VALUE IF NOT EXISTS 'FINAL';

-- Podešavanja kalendara (pozadine, pozicija, naslov, logo, tema, odbrojavanje, leaderboard)
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "bgImageUrlMobile" TEXT;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "monthBackgrounds" JSONB;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "calendarPosition" TEXT;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "calendarTitle" JSONB;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "theme" TEXT;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "countdownTargetIso" TEXT;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "countdownLabel" TEXT;
ALTER TABLE "CalendarSettings" ADD COLUMN IF NOT EXISTS "leaderboard" JSONB;

-- Knockout faza za specijale
ALTER TABLE "SpecialPromotion" ADD COLUMN IF NOT EXISTS "knockoutPhase" TEXT;
