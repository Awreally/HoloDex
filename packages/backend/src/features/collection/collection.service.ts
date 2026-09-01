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

  const [entries, total] = await Promise.all([
    prisma.userCard.findMany({
      where,
      include: {
        card: true,
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
  ]);

  return {
    entries,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
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
