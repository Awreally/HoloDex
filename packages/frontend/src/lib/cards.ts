const variantLabels: Record<string, string> = {
  normal: "Normal",
  reverse: "Reverse Holo",
  holo: "Holo",
};

export function cardLabel(rarity: string, variant: string): string {
  return variant === "normal"
    ? rarity
    : `${rarity} ${variantLabels[variant] ?? variant}`;
}
