import { Variant } from "../features/packs/types/packs.types";

export function cardLabel(rarity: string, variant: Variant): string {
  if (variant === "normal") return rarity;
  if (variant === "reverse") {
    const base = rarity.replace(/holo/i, "").replace(/\s+/g, " ").trim();
    return `${base} Reverse Holo`.replace(/\s+/g, " ").trim();
  }
  return rarity.toLowerCase().includes("holo") ? rarity : `${rarity} Holo`;
}
