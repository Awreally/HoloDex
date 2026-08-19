import { prisma } from "../../lib/prisma";
import { getRecipeForSet } from "./packs.packrecipe";
import { openPack } from "./packs.roll";

export async function openPackForSet(setId: string) {
    const cards = await prisma.card.findMany({ where: { setId }});

    if (cards.length === 0) {
        return null;
    }

    const recipe = getRecipeForSet(setId)

    return openPack(cards, recipe);
}

