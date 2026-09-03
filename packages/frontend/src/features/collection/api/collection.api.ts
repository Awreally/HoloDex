import { apiFetch } from "../../../lib/api";
import {
  CollectionEntry,
  CollectionQueryParams,
  CollectionResult,
  PaginationMeta,
  CollectionSets,
} from "../types/collection.types";
import { ApiSuccess } from "../../auth/types/auth.types";

type CollectionResponse = ApiSuccess<CollectionEntry[]> & {
  pagination: PaginationMeta;
};

export async function fetchGetCollection(
  setId: string,
  params: CollectionQueryParams = {},
): Promise<CollectionResult> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.pageSize) searchParams.set("pageSize", String(params.pageSize));
  if (params.variant) searchParams.set("variant", params.variant);
  if (params.sortDir) searchParams.set("sortDir", params.sortDir);

  const query = searchParams.toString();
  const res = await apiFetch<CollectionResponse>(
    `/collection/sets/${setId}/cards${query ? `?${query}` : ""}`,
  );
  return { collection: res.data, pagination: res.pagination };
}

export async function fetchGetCollectionSets(): Promise<CollectionSets[]> {
  const res = await apiFetch<ApiSuccess<CollectionSets[]>>("/collection/sets");
  return res.data;
}
