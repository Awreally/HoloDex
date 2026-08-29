import { apiFetch } from "../../../lib/api";
import { SetSummary } from "../types/sets.types";

export async function fetchSets():Promise<SetSummary[]> {
    const res = await apiFetch<SetSummary[]>("/sets");
    return res;
};

