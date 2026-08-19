import type { Card } from "./packs.types";
import { PackRecipe } from "./packs.types";

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

export function openPack(cards: Card[], recipe: PackRecipe): Card[] {
  const pack: Card[] = [];

  for (const slot of recipe) {
    const remaining = cards.filter((c) => !pack.some((p) => p.id === c.id));

    let pool: Card[];
    if (slot.kind === "energy") {
      pool = remaining.filter(
        (c) => c.rarity === "Common" && c.name.includes("Energy"),
      );
    } else {
      const rarity = slot.kind === "roll" ? slot.roll() : slot.rarity;
      pool = remaining.filter(
        (c) => c.rarity === rarity && !c.name.includes("Energy"),
      );
    }

    pack.push(...pickRandom(pool, slot.amount));
  }

  return pack;
}
