import { weightedRoll } from "../engine/engine.random";
import { PackRecipe } from "../packs.types";

const rollTeamRocketRare = weightedRoll([
  { rarity: "Secret Rare", variant: "holo",   weight: 1 },
  { rarity: "Rare",        variant: "holo",   weight: 33 },
  { rarity: "Rare",        variant: "normal", weight: 66 },
]);

export const teamRocketRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common",   variant: "normal", amount: 7 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "roll",  roll: rollTeamRocketRare, amount: 1 },
];