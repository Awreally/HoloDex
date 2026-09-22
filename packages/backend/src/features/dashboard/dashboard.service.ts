import { getCollectionSetsForUser } from "../collection/collection.service";
import { prisma } from "../../lib/prisma";

export async function getRarityVariantBreakdown(userId: string) {
  const rows = await prisma.userCard.findMany({
    where: { userId: userId },
    select: {
      variant: true,
      quantity: true,
      card: {
        select: { rarity: true },
      },
    },
  });

  const counts: Record<string, number> = {};

  for (const row of rows) {
    const key = `${row.card.rarity}|${row.variant}`;

    counts[key] = (counts[key] ?? 0) + row.quantity;
  }
  const result = Object.entries(counts).map(([key, count]) => {
    const [rarity, variant] = key.split("|");
    return { rarity, variant, count };
  });

  return result;
}

export async function getRecentCards(userId: string) {
  const recentCard = await prisma.userCard.findMany({
    where: { userId: userId },
    orderBy: {
      obtainedAt: "desc",
    },
    take: 5,
    select: {
      obtainedAt: true,
      variant: true,
      card: {
        select: {
          id: true,
          rarity: true,
          imageSmall: true,
          imageLarge: true,
        },
      },
    },
  });

  const recentCardShape = recentCard.map((c) => ({
    id: c.card.id,
    obtainedAt: c.obtainedAt,
    variant: c.variant,
    rarity: c.card.rarity,
    imageSmall: c.card.imageSmall,
    imageLarge: c.card.imageLarge,
  }));
  return recentCardShape;
}

export async function getTotalValue(userId: string) {
  const ownedCards = await prisma.userCard.findMany({
    where: {
      userId,
    },
    select: {
      variant: true,
      quantity: true,
      card: {
        select: {
          prices: {
            select: {
              variant: true,
              tcgplayerMarket: true,
              cardmarketTrend: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });

  const totals = ownedCards.reduce(
    (totals, ownedCard) => {
      const matchingPrice = ownedCard.card.prices.find(
        (price) => price.variant === ownedCard.variant,
      );

      if (matchingPrice) {
        totals.tcgplayer +=
          (matchingPrice.tcgplayerMarket ?? 0) * ownedCard.quantity;
        totals.cardmarket +=
          (matchingPrice.cardmarketTrend ?? 0) * ownedCard.quantity;
      }

      return totals;
    },
    { tcgplayer: 0, cardmarket: 0 },
  );

  return {
    tcgplayer: Math.floor(totals.tcgplayer),
    cardmarket: Math.floor(totals.cardmarket),
  };
}

export async function getDashboardForUser(userId: string) {
  const [sets, rarity, recent, totalValue] = await Promise.all([
    getCollectionSetsForUser(userId),
    getRarityVariantBreakdown(userId),
    getRecentCards(userId),
    getTotalValue(userId),
  ]);

  const totalOwned = sets.reduce((sum, set) => sum + set.owned, 0);
  const totalCards = sets.reduce((sum, set) => sum + set.total, 0);
  const percentComplete = totalCards
    ? Math.round((totalOwned / totalCards) * 100)
    : 0;

  const closestToComplete = [...sets]
    .filter((set) => set.percentComplete > 0 && set.percentComplete < 100)
    .sort((a, b) => b.percentComplete - a.percentComplete)
    .slice(0, 3);

  return {
    stats: {
      cards: { owned: totalOwned, total: totalCards, percentComplete,},
      value: totalValue,
    },
    closestToComplete,
    rarityVariantBreakdown: rarity,
    recent,
  };
}
