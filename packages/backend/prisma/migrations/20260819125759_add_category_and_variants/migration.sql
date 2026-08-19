-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "category" TEXT,
ADD COLUMN     "holo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "normal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reverse" BOOLEAN NOT NULL DEFAULT false;
