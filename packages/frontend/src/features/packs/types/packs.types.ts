export type CardSummary = {
  id: string;
  name: string;
  imageLarge: string | null;
  imageSmall: string | null;
  rarity: string;
};

export type Stage = "closed" | "one" | "done";

export type SetsPack = {
  id: string;
  name: string;
  series: string | null;
  total: number;
  releaseDate: string | null;
  logoUrl: string | null;
  packImageUrl: string | null;
  playable: boolean;
}

export type UseSetsResult = {
  sets: SetsPack[];
  isLoading: boolean;
  error: string | null;
}