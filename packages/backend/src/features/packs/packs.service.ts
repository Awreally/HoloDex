import { prisma } from "../../lib/prisma";
import { getRecipeForSet } from "./recipes/recipes.index";
import { openPack } from "./engine/engine.index";

export async function openPackForSet(setId: string, userId: string | null) {
  const cards = await prisma.card.findMany({ where: { setId } });

  if (cards.length === 0) {
    return null;
  }

  const recipe = getRecipeForSet(setId);
  const pulledCards = openPack(cards, recipe);

  if (userId) {
    await prisma.$transaction(
      pulledCards.map((card) =>
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
    );
  }

  return pulledCards;
}
