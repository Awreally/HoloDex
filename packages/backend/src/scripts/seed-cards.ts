import { prisma } from "../lib/prisma";

const SET_IDS = ["base5"];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type BriefCard = {
  id: string;
  localId?: string;
  name: string;
  image?: string;
};

type FullCard = {
  id: string;
  name: string;
  localId?: string;
  rarity?: string;
  image?: string;
  category?: string;
  variants?: {
    normal?: boolean;
    reverse?: boolean;
    holo?: boolean;
    firstEdition?: boolean;
    wPromo?: boolean;
  };
  pricing?: {
    cardmarket?: Record<string, number | string | null | undefined> | null;
    tcgplayer?: Record<string, { marketPrice?: number } | string | undefined> | null;
  };
};

// Our variant -> the price keys to try. TCGplayer: vintage sets use
// "unlimited" / "unlimited-holofoil". Cardmarket: "trend" is the regular price,
// "trend-holo" is the reverse holo price.
const PRICE_KEYS = {
  normal: { tcgplayer: ["normal", "unlimited"], cardmarket: "trend" },
  reverse: { tcgplayer: ["reverse-holofoil"], cardmarket: "trend-holo" },
  holo: { tcgplayer: ["holofoil", "unlimited-holofoil"], cardmarket: "trend" },
} as const;

const num = (v: unknown) => (typeof v === "number" ? v : null);

function extractPrices(card: FullCard) {
  return (Object.keys(PRICE_KEYS) as (keyof typeof PRICE_KEYS)[])
    .filter((variant) => card.variants?.[variant])
    .map((variant) => {
      const keys = PRICE_KEYS[variant];
      const entry = keys.tcgplayer
        .map((key) => card.pricing?.tcgplayer?.[key])
        .find((e) => typeof e === "object");
      return {
        variant,
        tcgplayerMarket:
          typeof entry === "object" ? num(entry.marketPrice) : null,
        cardmarketTrend: num(card.pricing?.cardmarket?.[keys.cardmarket]),
      };
    });
}

async function seedCardsForSet(setId: string) {
  const setRes = await fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`);
  if (!setRes.ok) {
    throw new Error(`Failed to fetch set ${setId}: ${setRes.status}`);
  }
  const set = await setRes.json();
  const briefCards: BriefCard[] = set.cards ?? [];
  console.log(
    `\nSet "${set.name}" (${setId}) has ${briefCards.length} cards. Fetching details...`,
  );

  let seeded = 0;
  let skipped = 0;

  for (const brief of briefCards) {
    try {
      const cardRes = await fetch(
        `https://api.tcgdex.net/v2/en/cards/${brief.id}`,
      );
      if (!cardRes.ok) {
        console.warn(`  skip ${brief.id}: fetch failed (${cardRes.status})`);
        skipped++;
        continue;
      }

      const card: FullCard = await cardRes.json();

      if (!card.rarity || card.rarity === "None") {
        skipped++;
        await sleep(80);
        continue;
      }

      await prisma.card.upsert({
        where: { id: card.id },
        update: {
          name: card.name,
          number: card.localId ?? "",
          rarity: card.rarity,
          imageSmall: card.image ?? null,
          imageLarge: card.image ?? null,
          setId,
          category: card.category ?? null,
          normal: card.variants?.normal ?? false,
          reverse: card.variants?.reverse ?? false,
          holo: card.variants?.holo ?? false,
        },
        create: {
          id: card.id,
          name: card.name,
          number: card.localId ?? "",
          rarity: card.rarity,
          imageSmall: card.image ?? null,
          imageLarge: card.image ?? null,
          setId,
          category: card.category ?? null,
          normal: card.variants?.normal ?? false,
          reverse: card.variants?.reverse ?? false,
          holo: card.variants?.holo ?? false,
        },
      });

      for (const price of extractPrices(card)) {
        await prisma.cardPrice.upsert({
          where: { cardId_variant: { cardId: card.id, variant: price.variant } },
          update: price,
          create: { cardId: card.id, ...price },
        });
      }

      seeded++;
      if (seeded % 20 === 0) console.log(`  ...${seeded} cards seeded`);

      await sleep(80);
    } catch (err) {
      console.warn(`  skip ${brief.id}: ${(err as Error).message}`);
      skipped++;
    }
  }

  console.log(`Done with ${setId}: ${seeded} seeded, ${skipped} skipped.`);
  return { seeded, skipped };
}

async function main() {
  for (const setId of SET_IDS) {
    await seedCardsForSet(setId);
  }
}

main()
  .then(() => {
    console.log("\nAll done.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
