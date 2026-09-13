import { PackRecipe } from "../packs.types";
import { weightedRoll } from "../engine/engine.random";

const rollSwsh7Rare = weightedRoll([
  { rarity: "Secret Rare", variant: "holo", weight: 2.5 },
  { rarity: "Rainbow Rare", variant: "holo", weight: 2.5 },
  { rarity: "Ultra Rare", variant: "holo", weight: 8 },
  { rarity: "Holo Rare VMAX", variant: "holo", weight: 8 },
  { rarity: "Holo Rare V", variant: "holo", weight: 22 },
  { rarity: "Holo Rare", variant: "holo", weight: 22 },
  { rarity: "Rare", variant: "normal", weight: 35 },
]);

export const evolvingSkiesRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 5 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "reverseAny", amount: 1 },
  { kind: "roll", roll: rollSwsh7Rare, amount: 1 },
];
