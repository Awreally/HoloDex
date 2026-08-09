import { prisma } from "../lib/prisma";

async function seedSets() {
  const res = await fetch("https://api.tcgdex.net/v2/en/sets");
  if (!res.ok) throw new Error(`TCGdex responded ${res.status}`);

  const sets = await res.json();
  console.log(`Fetched ${sets.length} sets from TCGdex`);

  let count = 0;
  for (const set of sets) {
    const total = set.cardCount?.total;
    if (total == null) continue;

    await prisma.set.upsert({
      where: { id: set.id },
      update: { name: set.name, total, logoUrl: set.logo ?? null },
      create: { id: set.id, name: set.name, total, logoUrl: set.logo ?? null },
    });
    count++;
  }

  console.log(`Seeded ${count} sets into the database`);
}

seedSets()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });