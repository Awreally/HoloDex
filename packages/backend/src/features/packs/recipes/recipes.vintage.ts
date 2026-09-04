import { weightedRoll } from "../engine/engine.random";
import type { PackRecipe } from "../packs.types";

const rollVintageRare = weightedRoll([
  { rarity: "Rare", variant: "holo", weight: 33 },
  { rarity: "Rare", variant: "normal", weight: 67 },
]);

export const baseSetRecipe: PackRecipe = [
  { kind: "energy", amount: 2 },
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 5 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "roll", roll: rollVintageRare, amount: 1 },
];

export const jungleRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 7 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "roll", roll: rollVintageRare, amount: 1 },
];
