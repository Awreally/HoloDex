import { Card, Variant } from "../packs.types";

export function cardHasVariant(card: Card, variant: Variant): boolean {
  if (variant === "normal") return card.normal;
  if (variant === "reverse") return card.reverse;
  return card.holo;
}

export function sameRarity(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}