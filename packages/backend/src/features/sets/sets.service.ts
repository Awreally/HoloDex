import { prisma } from "../../lib/prisma";
import { getPackSizeForSet } from "../packs/packs.utils";

export async function getAllSets() {
  const sets = await prisma.set.findMany({
    where: { playable: true },
    orderBy: { name: "asc" },
  });

  return sets.map((set) => ({
    ...set,
    packSize: getPackSizeForSet(set.id),
  }));
}
