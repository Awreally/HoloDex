export type Card = {
  id: string;
  name: string;
  rarity: string;
  holo: boolean;
  normal: boolean;
  reverse: boolean;
  category: string | null;
};

export type Variant = "normal" | "reverse" | "holo";

export type RollFn = (() => RollResult) & { options: Weighted[] };

export type Slot =
  | { kind: "fixed"; rarity: string; variant: Variant; amount: number }
  | { kind: "roll"; roll: RollFn; amount: number }
  | { kind: "reverseAny"; amount: number }
  | { kind: "energy"; amount: number };

export type PackRecipe = Slot[];

export type Weighted = { rarity: string; variant: Variant; weight: number };

export type PulledCard = Card & {
  pulledVariant: Variant;
};

export type RollResult = {
  rarity: string;
  variant: Variant;
};
