import { prisma } from "../../lib/prisma";
import { getRecipeForSet } from "./recipes/recipes.index";
import { openPack } from "./engine/engine.index";

export async function openPackForSet(setId: string, userId: string | null) {
  const cards = await prisma.card.findMany({
    where: { setId },
    include: { prices: {
      select: {
        variant: true,
        tcgplayerMarket: true,
        cardmarketTrend: true,
      }
    } 
  },
  });

  if (cards.length === 0) {
    return null;
  }

  const recipe = getRecipeForSet(setId);
  const pulledCards = openPack(cards, recipe);

  if (userId) {
    await prisma.$transaction([
      ...pulledCards.map((card) =>
        prisma.userCard.upsert({
          where: {
            userId_cardId_variant: {
              userId,
              cardId: card.id,
              variant: card.pulledVariant,
            },
          },
          update: {
            quantity: {
              increment: 1,
            },
          },
          create: {
            userId,
            cardId: card.id,
            variant: card.pulledVariant,
          },
        }),
      ),
      prisma.packOpening.create({
        data: { userId, setId },
      }),
    ]);
  }

  return pulledCards.map(({ prices, ...card }) => {
    const price = prices.find((p) => p.variant === card.pulledVariant);
    return {
      ...card,
      tcgplayerMarket: price?.tcgplayerMarket ?? null,
      cardmarketTrend: price?.cardmarketTrend ?? null,
    };
  });
}
