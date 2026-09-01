import { useSearchParams } from "react-router";

export function useCollectionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const variant = searchParams.get("variant");
  const sortDir = searchParams.get("sortDir");
  const page = Number(searchParams.get("page") ?? 1);

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
    variant,
    sortDir,
    page,
    setVariant,
    goToPage
  };
}
