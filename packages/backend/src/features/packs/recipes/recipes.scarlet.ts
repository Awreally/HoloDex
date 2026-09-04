import { weightedRoll } from "../engine/engine.random";
import type { PackRecipe } from "../packs.types";

const rollReverse = weightedRoll([
  { rarity: "Rare", variant: "reverse", weight: 10 },
  { rarity: "Uncommon", variant: "reverse", weight: 30 },
  { rarity: "Common", variant: "reverse", weight: 60 },
]);

const rollReverseOrSecret = weightedRoll([
  { rarity: "Special Illustration Rare", variant: "holo", weight: 3 },
  { rarity: "Illustration Rare", variant: "holo", weight: 8.5 },
  { rarity: "Rare", variant: "reverse", weight: 8.5 },
  { rarity: "Uncommon", variant: "reverse", weight: 22 },
  { rarity: "Common", variant: "reverse", weight: 58 },
]);

const rollHolo = weightedRoll([
  { rarity: "Hyper Rare", variant: "holo", weight: 2 },
  { rarity: "Ultra Rare", variant: "holo", weight: 5 },
  { rarity: "Double Rare", variant: "holo", weight: 15 },
  { rarity: "Rare", variant: "holo", weight: 78 },
]);

export const scarletRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 5 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "roll", roll: rollReverse, amount: 1 },
  { kind: "roll", roll: rollReverseOrSecret, amount: 1 },
  { kind: "roll", roll: rollHolo, amount: 1 },
];
