export type Card = {
  id: string;
  name: string;
  rarity: string;
};

export type Slot =
  | { kind: "fixed"; rarity: string; amount: number }
  | { kind: "energy"; amount: number }
  | { kind: "roll"; roll: () => string; amount: number };

export type PackRecipe = Slot[];

export type Weighted = { rarity: string; weight: number };