export type CardSummary = {
  id: string;
  name: string;
  imageLarge: string;
  imageSmall: string | null;
  rarity: string;
  index: number;
};

export type Stage = "closed" | "one" | "done";