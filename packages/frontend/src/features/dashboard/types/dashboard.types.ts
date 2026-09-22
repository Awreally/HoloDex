type MarketValue = {
  tcgplayer: number;
  cardmarket: number;
};

type Stats = {
  cards: {
    owned: number;
    total: number;
    percentComplete: number;
  };
  value: MarketValue;
};

export type ClosestToComplete = {
  setId: string;
  name: string;
  total: number;
  logoUrl: string | null;
  owned: number;
  percentComplete: number;
};

export type RarityVariantBreakdown = {
  rarity: string;
  variant: string;
  count: number;
};

export type Recent = {
  id: string;
  obtainedAt: string;
  variant: string;
  rarity: string;
  imageSmall: string | null;
  imageLarge: string | null;
};

export type Dashboard = {
  stats: Stats;
  closestToComplete: ClosestToComplete[];
  rarityVariantBreakdown: RarityVariantBreakdown[];
  recent: Recent[];
};