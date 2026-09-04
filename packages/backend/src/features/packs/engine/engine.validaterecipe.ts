import { sameRarity, cardHasVariant } from "./engine.variants";
import type { Variant, Card, PackRecipe } from "../packs.types";

export function validateRecipe(
  cards: Card[],
  recipe: PackRecipe,
  label = "",
): string[] {
  const problems: string[] = [];
  const tag = (i: number) => `${label ? `[${label}] ` : ""}slot ${i}`;

  const poolSize = (rarity: string, variant: Variant) =>
    cards.filter(
      (c) => sameRarity(c.rarity, rarity) && cardHasVariant(c, variant),
    ).length;

  recipe.forEach((slot, i) => {
    if (slot.kind === "fixed") {
      const size = poolSize(slot.rarity, slot.variant);
      if (size === 0)
        problems.push(`${tag(i)}: no ${slot.variant} ${slot.rarity} cards`);
      else if (size < slot.amount)
        problems.push(
          `${tag(i)}: wants ${slot.amount} ${slot.variant} ${slot.rarity}, pool has ${size}`,
        );
    } else if (slot.kind === "roll") {
      for (const opt of slot.roll.options) {
        if (poolSize(opt.rarity, opt.variant) === 0)
          problems.push(
            `${tag(i)}: roll can hit ${opt.variant} ${opt.rarity} but pool is empty`,
          );
      }
    } else if (slot.kind === "energy") {
      const size = cards.filter((c) => c.category === "Energy").length;
      if (size < slot.amount)
        problems.push(
          `${tag(i)}: wants ${slot.amount} energy, pool has ${size}`,
        );
    }
  });

  return problems;
}
