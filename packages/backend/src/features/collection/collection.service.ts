import { prisma } from "../../lib/prisma";
import type { CollectionQuery } from "./collection.validation";

export async function getCollectionForUser(userId: string, query: CollectionQuery) {
    const { page, pageSize, setId, variant, sortDir } = query;

    const where = {
        userId,
        ...(setId && { card: { setId } }),
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