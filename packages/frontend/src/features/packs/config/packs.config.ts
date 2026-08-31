import { Variant } from "../types/packs.types";

const variantLabels: Record<Variant, string> = {
  normal: "Normal",
  reverse: "Reverse Holo",
  holo: "Holo",
};

export function cardLabel(rarity: string, variant: Variant): string {
  return variant === "normal" ? rarity : `${rarity} ${variantLabels[variant]}`;
}