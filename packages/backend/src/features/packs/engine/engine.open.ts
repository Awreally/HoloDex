import type { Card, Variant, PackRecipe, PulledCard } from "../packs.types";
import { pickRandom } from "./engine.random";
import { sameRarity, cardHasVariant } from "./engine.variants";

export function openPack(cards: Card[], recipe: PackRecipe): PulledCard[] {
  const pack: PulledCard[] = [];
  const used = new Set<string>();

  const sig = (id: string, variant: Variant) => `${id}:${variant}`;

  const draw = (pool: Card[], amount: number, variant: Variant) => {
    const available = pool.filter((card) => !used.has(sig(card.id, variant)));
    const drawn = pickRandom(available, amount);
    for (const card of drawn) {
      used.add(sig(card.id, variant));
      pack.push({ ...card, pulledVariant: variant });
    }
  };

  for (const slot of recipe) {
    if (slot.kind === "fixed") {
      const pool = cards.filter(
        (card) =>
          sameRarity(card.rarity, slot.rarity) &&
          cardHasVariant(card, slot.variant),
      );
      draw(pool, slot.amount, slot.variant);
    } else if (slot.kind === "roll") {
      const result = slot.roll();
      const pool = cards.filter(
        (card) =>
          sameRarity(card.rarity, result.rarity) &&
          cardHasVariant(card, result.variant),
      );
      draw(pool, slot.amount, result.variant);
    } else if (slot.kind === "reverseAny") {
      const pool = cards.filter((card) => card.reverse);
      draw(pool, slot.amount, "reverse");
    } else if (slot.kind === "energy") {
      const pool = cards.filter((card) => card.category === "Energy");
      draw(pool, slot.amount, "normal");
    }
  }

  return pack;
}
