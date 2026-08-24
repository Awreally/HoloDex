import { prisma } from "../../lib/prisma";

export async function getCollectionForUser(userId: string) {
    return prisma.userCard.findMany({
        where: { userId },
        include: {
            card: true,
        },
        orderBy: [
            { card: { setId: "asc"} },
            { cardId: "asc" },
            { variant: "asc" }, 
        ],
    });
}