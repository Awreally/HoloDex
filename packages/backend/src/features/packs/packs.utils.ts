import { Slot } from "./packs.types";
import { getRecipeForSet } from "./packs.packrecipe";

export function totalCardsPack(packRecipe: Slot[]) {
    const totalPack = packRecipe.reduce((sum, slot) => sum + slot.amount, 0);
    return totalPack;
}

export function getPackSizeForSet(setId: string) {
    const recipe = getRecipeForSet(setId);
    return totalCardsPack(recipe); 
};

