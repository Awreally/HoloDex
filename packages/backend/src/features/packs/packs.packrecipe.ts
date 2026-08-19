import { PackRecipe } from "./packs.types";
import { Weighted } from "./packs.types";

function weightedRoll(options: Weighted[]): () => string {
  return () => {
    const total = options.reduce((sum, o) => sum + o.weight, 0);
    let roll = Math.random() * total;

    for (const option of options) {
      roll -= option.weight;
      if (roll < 0) return option.rarity;
    }
    return options[options.length - 1].rarity;
  };
}

const rollRare = weightedRoll([
  { rarity: "Rare", weight: 50 },
  { rarity: "Double rare", weight: 30},
  { rarity: "Ultra Rare", weight: 15},
  { rarity: "Hyper rare", weight: 5},
]);

const rollCommonUncommonRare = weightedRoll([
  { rarity: "Common", weight: 50},
  { rarity: "Uncommon", weight: 35},
  { rarity: "Rare", weight: 15 },
])

const rollCURI = weightedRoll([
  { rarity: "Uncommon", weight: 40},
  { rarity: "Rare", weight: 30},
  { rarity: "Illustration rare", weight: 20 },
  { rarity: "Special illustration rare", weight: 10 },
  
]);

const scarletRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", amount: 4 },
  { kind: "fixed", rarity: "Uncommon", amount: 3 },
  { kind: "roll", roll: rollCommonUncommonRare, amount: 1 },
  { kind: "roll", roll: rollCURI, amount: 1 },
  { kind: "roll", roll: rollRare, amount: 1 },
];

const baseSetRecipe: PackRecipe = [
  { kind: "energy", amount: 2 },
  { kind: "fixed", rarity: "Common", amount: 5 },
  { kind: "fixed", rarity: "Uncommon", amount: 3 },
  { kind: "fixed", rarity: "Rare", amount: 1 },
];

const jungleRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", amount: 7 },
  { kind: "fixed", rarity: "Uncommon", amount: 3 },
  { kind: "fixed", rarity: "Rare", amount: 1 },
];

const defaultRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", amount: 6 },
  { kind: "fixed", rarity: "Uncommon", amount: 3 },
  { kind: "fixed", rarity: "Rare", amount: 1 },
];

const recipesBySetId: Record<string, PackRecipe> = {
  base1: baseSetRecipe,
  base2: jungleRecipe,
  "sv03.5": scarletRecipe,
};

export function getRecipeForSet(setId: string): PackRecipe {
  return recipesBySetId[setId] ?? defaultRecipe;
}
