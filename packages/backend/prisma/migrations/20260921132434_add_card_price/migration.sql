-- CreateTable
CREATE TABLE "CardPrice" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "tcgplayerMarket" DOUBLE PRECISION,
    "cardmarketTrend" DOUBLE PRECISION,
    "cardmarketTrendHolo" DOUBLE PRECISION,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardPrice_cardId_variant_key" ON "CardPrice"("cardId", "variant");

-- AddForeignKey
ALTER TABLE "CardPrice" ADD CONSTRAINT "CardPrice_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
