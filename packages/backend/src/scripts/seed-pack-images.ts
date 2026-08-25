import { prisma } from "../lib/prisma";

const PACK_IMAGES: Record<string, string> = {
  base1: "https://res.cloudinary.com/dnqq8rkc3/image/upload/v1787660682/Baseset_tcumwx.png",
  base2: "https://res.cloudinary.com/dnqq8rkc3/image/upload/v1787660687/Jungle_aysq1q.png",
  "sv03.5": "https://res.cloudinary.com/dnqq8rkc3/image/upload/v1787659511/sv-151-mew_udlrks.jpg",
};

async function main() {
  let updated = 0;
  let skipped = 0;

  for (const [setId, packImageUrl] of Object.entries(PACK_IMAGES)) {
    if (!packImageUrl) {
      console.warn(`skip ${setId}: no packImageUrl set yet`);
      skipped++;
      continue;
    }

    await prisma.set.update({
      where: { id: setId },
      data: { packImageUrl },
    });

    console.log(`updated ${setId}`);
    updated++;
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
