import { prisma } from "../../lib/prisma";

export async function getAllSets() {
    return prisma.set.findMany({
        orderBy: { name: "asc" },
    });
}