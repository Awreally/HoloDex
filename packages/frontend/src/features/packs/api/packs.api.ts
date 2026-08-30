import { CardSummary, SetsPack } from "../types/packs.types";
import { apiFetch } from "../../../lib/api";
import { ApiSuccess } from "../../auth/types/auth.types";

export async function fetchOpenPack(setId: string): Promise<CardSummary[]> {
  const res = await apiFetch<ApiSuccess<CardSummary[]>>(`/sets/${setId}/open`, "POST");
  return res.data;
}

export async function fetchGetPacks(): Promise<SetsPack[]> {
  const res = await apiFetch<SetsPack[]>("/sets");
  return res;
}