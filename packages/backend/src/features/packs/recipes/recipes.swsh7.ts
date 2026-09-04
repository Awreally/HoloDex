import { PackRecipe } from "../packs.types";
import { weightedRoll } from "../engine/engine.random";

const rollSwsh7Rare = weightedRoll([
  { rarity: "Rare Secret", variant: "holo", weight: 2.5 },
  { rarity: "Rare Rainbow", variant: "holo", weight: 2.5 },
  { rarity: "Rare Ultra", variant: "holo", weight: 8 },
  { rarity: "Rare Holo VMAX", variant: "holo", weight: 8 },
  { rarity: "Rare Holo V", variant: "holo", weight: 22 },
  { rarity: "Rare Holo", variant: "holo", weight: 22 },
  { rarity: "Rare", variant: "normal", weight: 35 },
]);

export const evolvingSkiesRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 5 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "reverseAny", amount: 1 },
  { kind: "roll", roll: rollSwsh7Rare, amount: 1 },
];
