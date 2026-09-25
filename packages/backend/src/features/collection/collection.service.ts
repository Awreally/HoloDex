import { prisma } from "../../lib/prisma";
import type { CollectionQuery } from "./collection.validation";

export async function getCollectionForUser(
  userId: string,
  setId: string,
  query: CollectionQuery,
) {
  const { page, pageSize, variant, sortDir } = query;

  const where = {
    userId,
    card: { setId },
    ...(variant && { variant }),
  };

  const [entries, total, reverseCardCount] = await Promise.all([
    prisma.userCard.findMany({
      where,
      include: {
        card: {
          include: {
            prices: true,
          },
        },
      },
      orderBy: [
        { card: { setId: sortDir } },
        { cardId: sortDir },
        { variant: sortDir },
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.userCard.count({ where }),
    prisma.card.count({ where: { setId, reverse: true } }),
  ]);

  const entriesWithPrice = entries.map(({ card, ...entry }) => {
    const { prices, ...cardWithoutPrices } = card;

    const price = prices.find((price) => price.variant === entry.variant);

    return {
      ...entry,
      card: cardWithoutPrices,
      tcgplayerMarket: price?.tcgplayerMarket ?? null,
      cardmarketTrend: price?.cardmarketTrend ?? null,
    };
  });

  return {
    entriesWithPrice,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
    hasReverseVariant: reverseCardCount > 0,
  };
}

export async function getCollectionSetsForUser(userId: string) {
  const sets = await prisma.set.findMany({
    where: {
      playable: true,
    },
    select: {
      id: true,
      name: true,
      total: true,
      logoUrl: true,
      releaseDate: true,
      _count: {
        select: {
          cards: {
            where: {
              owners: {
                some: { userId: userId },
              },
            },
          },
        },
      },
    },
  });
  const shaped = sets.map((set) => ({
    setId: set.id,
    name: set.name,
    total: set.total,
    logoUrl: set.logoUrl,
    owned: set._count.cards,
    percentComplete: set.total
      ? Math.round((set._count.cards / set.total) * 100)
      : 0,
  }));

  return shaped;
}
