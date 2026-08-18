import { CardSummary } from "../types/packs.types";
import { apiFetch } from "../../../lib/api";

export function openPack(setId: string): Promise<CardSummary[]> {
  return apiFetch(`/sets/${setId}/open`, "POST");
}
