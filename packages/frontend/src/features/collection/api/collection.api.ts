import { apiFetch } from "../../../lib/api";
import { CollectionEntry } from "../types/collection.types";
import { ApiSuccess } from "../../auth/types/auth.types";

export async function fetchGetCollection(): Promise<CollectionEntry[]>{
const res = await apiFetch<ApiSuccess<CollectionEntry[]>>("/collection");
return res.data;
}