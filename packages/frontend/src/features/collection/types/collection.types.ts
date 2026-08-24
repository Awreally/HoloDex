export type CollectionCard = {
  id: string;
  name: string;
  number: string;
  setId: string;
  rarity: string;
  category: string | null;
  imageSmall: string | null;
  imageLarge: string | null;
  normal: boolean;
  holo: boolean;
  reverse: boolean;
};

export type CollectionEntry = {
  id: string;
  userId: string;
  cardId: string;
  variant: string;
  quantity: number;
  obtainedAt: string;
  card: CollectionCard;
};

export type UseCollectionResult = {
  collection: CollectionEntry[];
  isLoading: boolean;
  error: string | null;
};