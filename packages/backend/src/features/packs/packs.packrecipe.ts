import { PackRecipe } from "./packs.types";
import { Weighted } from "./packs.types";
import { RollResult } from "./packs.types";

export function weightedRoll(options: Weighted[]): () => RollResult {
  return () => {
    const total = options.reduce((sum, option) => sum + option.weight, 0);

    let roll = Math.random() * total;

    for (const option of options) {
      roll -= option.weight;

      if (roll < 0) {
        return {
          rarity: option.rarity,
          variant: option.variant,
        };
      }
    }

    const fallback = options[options.length - 1];

    return {
      rarity: fallback.rarity,
      variant: fallback.variant,
    };
  };
}

const rollReverse = weightedRoll([
  {
    rarity: "Common",
    variant: "reverse",
    weight: 50,
  },
  {
    rarity: "Uncommon",
    variant: "reverse",
    weight: 35,
  },
  {
    rarity: "Rare",
    variant: "reverse",
    weight: 15,
  },
]);
const rollRare = weightedRoll([
  { rarity: "Rare", variant: "holo", weight: 81, },
  { rarity: "Double rare", variant: "holo", weight: 13, },
  { rarity: "Ultra Rare", variant: "holo", weight: 4, },
  { rarity: "Hyper rare", variant: "holo", weight: 2, },
]);

const scarletRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 4 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "roll", roll: rollReverse, amount: 1 },
  { kind: "roll", roll: rollRare, amount: 1 },
  { kind: "roll", roll: rollRare, amount: 1 },
];

const baseSetRecipe: PackRecipe = [
  { kind: "energy", amount: 2 },
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 5 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "fixed", rarity: "Rare", variant: "holo", amount: 1 },
];

const jungleRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 7 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "fixed", rarity: "Rare", variant: "holo", amount: 1 },
];

const defaultRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 6 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "fixed", rarity: "Rare", variant: "holo", amount: 1 },
];

const recipesBySetId: Record<string, PackRecipe> = {
  base1: baseSetRecipe,
  base2: jungleRecipe,
  "sv03.5": scarletRecipe,
};

export function getRecipeForSet(setId: string): PackRecipe {
  return recipesBySetId[setId] ?? defaultRecipe;
}
