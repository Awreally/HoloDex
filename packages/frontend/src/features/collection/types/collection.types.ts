import { Variant } from "../../packs/types/packs.types";

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
  variant: Variant;
  quantity: number;
  obtainedAt: string;
  card: CollectionCard;
};

export type UseCollectionResult = {
  collection: CollectionEntry[];
  isLoading: boolean;
  error: string | null;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type CollectionQueryParams = {
  page?: number;
  pageSize?: number;
  variant?: "normal" | "reverse" | "holo";
  sortDir?: "asc" | "desc";
};

export type CollectionResult = {
  collection: CollectionEntry[];
  pagination: PaginationMeta;
};

export type CollectionSets = {
  setId: string;
  name: string;
  total: number;
  logoUrl: string | null;
  releaseDate: string;
  owned: number;
  percentComplete: number;
}