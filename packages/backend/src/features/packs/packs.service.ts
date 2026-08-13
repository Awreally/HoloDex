import { prisma } from "../../lib/prisma";
import { openPack } from "./packs.roll";

export async function openPackForSet(setId: string) {
    const cards = await prisma.card.findMany({ where: { setId }});

    if (cards.length === 0) {
        return null;
    }

    return openPack(cards);
}

