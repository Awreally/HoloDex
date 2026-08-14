import type { Card } from "./packs.types";

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

export function openPack(cards: Card[]): Card[] {
  const energy = cards.filter((c) => c.rarity === "Common" && c.name.includes("Energy"));
  const commons = cards.filter(
    (c) => c.rarity === "Common" && !c.name.includes("Energy"),
  );
  const uncommons = cards.filter((c) => c.rarity === "Uncommon");
  const rares = cards.filter((c) => c.rarity === "Rare");

  return [
    ...pickRandom(energy, 2),
    ...pickRandom(commons, 5),
    ...pickRandom(uncommons, 3),
    ...pickRandom(rares, 1),
  ];
}
