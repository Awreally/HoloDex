export type CardSummary = {
  id: string;
  name: string;
  imageLarge: string | null;
  imageSmall: string | null;
  rarity: string;
};

export type Stage = "closed" | "one" | "done";