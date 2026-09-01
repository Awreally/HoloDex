import { useSearchParams } from "react-router";

export function useCollectionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setId = searchParams.get("setId");
  const variant = searchParams.get("variant");
  const sortDir = searchParams.get("sortDir");
  const page = Number(searchParams.get("page") ?? 1);

  function setSetId(setId: string) {
    const next = new URLSearchParams(searchParams);
    next.set("setId", setId);
    next.set("page", "1");

    setSearchParams(next);
  }

  function setVariant(variant: string) {
    const next = new URLSearchParams(searchParams);
    next.set("variant", variant);
    next.set("page", "1");

    setSearchParams(next);
  }

  function goToPage(page: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));

    setSearchParams(next);
  }
  return {
    setId,
    variant,
    sortDir,
    page,
    setSetId,
    setVariant,
    goToPage
  };
}
