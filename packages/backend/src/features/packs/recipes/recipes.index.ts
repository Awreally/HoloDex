import { baseSetRecipe, jungleRecipe } from "./recipes.vintage";
import { scarletRecipe } from "./recipes.scarlet";
import type { PackRecipe } from "../packs.types";
import { evolvingSkiesRecipe } from "./recipes.swsh7";
import { teamRocketRecipe } from "./recipes.base5";

const defaultRecipe: PackRecipe = [
  { kind: "fixed", rarity: "Common", variant: "normal", amount: 6 },
  { kind: "fixed", rarity: "Uncommon", variant: "normal", amount: 3 },
  { kind: "fixed", rarity: "Rare", variant: "holo", amount: 1 },
];

const recipesBySetId: Record<string, PackRecipe> = {
  base1: baseSetRecipe,
  base2: jungleRecipe,
  "sv03.5": scarletRecipe,
  swsh7: evolvingSkiesRecipe,
  base5: teamRocketRecipe,
};

export function getRecipeForSet(setId: string): PackRecipe {
  return recipesBySetId[setId] ?? defaultRecipe;
}
