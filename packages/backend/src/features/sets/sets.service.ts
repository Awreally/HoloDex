import { prisma } from "../../lib/prisma";

export async function getAllSets() {
    return prisma.set.findMany({
        where: { playable: true },
        orderBy: { name: "asc" },
    });
}