import { CardSummary, SetsPack } from "../types/packs.types";
import { apiFetch } from "../../../lib/api";

export function fetchOpenPack(setId: string): Promise<CardSummary[]> {
  return apiFetch(`/sets/${setId}/open`, "POST");
}

export async function fetchGetPacks(): Promise<SetsPack[]> {
  const res = await apiFetch<SetsPack[]>("/sets");
  return res;
}