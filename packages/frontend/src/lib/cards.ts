import { Variant, RarityGroup } from "../features/packs/types/packs.types";

export function cardLabel(rarity: string, variant: Variant): string {
  if (variant === "normal") return rarity;
  if (variant === "reverse") {
    const base = rarity.replace(/holo/i, "").replace(/\s+/g, " ").trim();
    return `${base} Reverse Holo`.replace(/\s+/g, " ").trim();
  }
  return rarity.toLowerCase().includes("holo") ? rarity : `${rarity} Holo`;
}

const rarityGroups: Record<string, RarityGroup> = {
  Common: "common",
  Uncommon: "uncommon",
  Rare: "rare",

  "Holo Rare": "rare",

  "Double rare": "doubleRare",
  "Holo Rare V": "doubleRare",
  "Holo Rare VMAX": "doubleRare",

  "Illustration rare": "ultra",
  "Ultra Rare": "ultra",

  "Secret Rare": "special",
  "Special illustration rare": "special",
  "Hyper rare": "special",
};

const rarityColors: Record<RarityGroup, string> = {
  common: "bg-rarity-common",
  uncommon: "bg-rarity-uncommon",
  rare: "bg-rarity-rare",
  doubleRare: "bg-rarity-double",
  ultra: "bg-rarity-ultra",
  special: "bg-rarity-special",
};

const variantStyles: Record<Variant, string> = {
  normal: "",
  reverse: "brightness-125 ring-2 ring-white/40",
  holo: "brightness-110 saturate-150 ring-2 ring-white/60",
};

export function cardLabelColor(rarity: string, variant: Variant): string {
  const rarityGroup = rarityGroups[rarity] ?? "common";

  const rarityColor = rarityColors[rarityGroup];
  const variantStyle = variantStyles[variant];

  return `${rarityColor} ${variantStyle}`;
}
