import { CardSummary } from "../types/packs.types";
import { apiFetch } from "../../../lib/api";

export function openPack(): Promise<CardSummary[]> {
  return apiFetch<CardSummary[]>("/sets/base2/open", "POST");
}