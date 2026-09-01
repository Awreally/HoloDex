import { LoaderFunctionArgs } from "react-router";
import { fetchGetCollection } from "../api/collection.api";

export function collectionLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || undefined;
  const setId = url.searchParams.get("setId") ?? undefined;
  const variant = url.searchParams.get("variant") as "normal" | "reverse" | "holo" | null;
  const sortDir = url.searchParams.get("sortDir") as "asc" | "desc" | null;

  return fetchGetCollection({
    page,
    setId,
    variant: variant ?? undefined,
    sortDir: sortDir ?? undefined,
  });
}
