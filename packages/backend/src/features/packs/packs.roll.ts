import type { Card, Variant, RollResult, PackRecipe, PulledCard} from "./packs.types";

function cardHasVariant(card: Card, variant: Variant): boolean {
  if (variant === "normal") return card.normal;
  if (variant === "reverse") return card.reverse;
  return card.holo;
}

function pickRandom(pool: Card[], amount: number): Card[] {
  const available = [...pool];
  const selected: Card[] = [];
  const drawCount = Math.min(amount, available.length);

  for (let i = 0; i < drawCount; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available.splice(randomIndex, 1)[0]);
  }
  return selected;
}

export function openPack(cards: Card[], recipe: PackRecipe): PulledCard[] {
  const pack: PulledCard[] = [];

  for (const slot of recipe) {
    if (slot.kind === "fixed") {
      const pool = cards.filter(
        (card) =>
          card.rarity === slot.rarity && cardHasVariant(card, slot.variant),
      );
      const drawn = pickRandom(pool, slot.amount);
      const pulled = drawn.map((card) => ({
        ...card,
        pulledVariant: slot.variant,
      }));
      pack.push(...pulled);
    } else if (slot.kind === "roll") {
      const result = slot.roll();
      const pool = cards.filter(
        (card) =>
          card.rarity === result.rarity &&
          cardHasVariant(card, result.variant),
      );
      const drawn = pickRandom(pool, slot.amount);
      const pulled = drawn.map((card) => ({
        ...card,
        pulledVariant: result.variant,
      }));
      pack.push(...pulled);
    } else if (slot.kind === "energy") {
      const pool = cards.filter((card) => card.category === "Energy");
      const drawn = pickRandom(pool, slot.amount);
      const pulled = drawn.map((card) => ({
        ...card,
        pulledVariant: "normal" as const,
      }));
      pack.push(...pulled);
    }
  }

  return pack;
}