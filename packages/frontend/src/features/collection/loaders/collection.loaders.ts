import { LoaderFunctionArgs } from "react-router";
import { fetchGetCollection, fetchGetCollectionSets } from "../api/collection.api";

export function collectionLoader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || undefined;
  const variant = url.searchParams.get("variant") as "normal" | "reverse" | "holo" | null;
  const sortDir = url.searchParams.get("sortDir") as "asc" | "desc" | null;

  const setId = params.setId;
  if (!setId) throw new Response("Missing setId", { status: 400 });

  return fetchGetCollection(setId, {
    page,
    variant: variant ?? undefined,
    sortDir: sortDir ?? undefined,
  });
}

export function collectionSetsLoader() {
  return fetchGetCollectionSets();
}
