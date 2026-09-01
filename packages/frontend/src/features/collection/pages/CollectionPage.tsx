import { useLoaderData, useSearchParams } from "react-router";
import { CollectionCardTile } from "../components/CollectionCardTile";
import { CollectionResult } from "../types/collection.types";

export default function CollectionPage() {
  const { collection, pagination } = useLoaderData() as CollectionResult;
  const [searchParams, setSearchParams] = useSearchParams();

  function goToPage(page: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(page));
    setSearchParams(next);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
      <p className="text-headline-lg-s tracking-[0.08em] text-outline uppercase">
        Binder
      </p>
      <h1 className="text-display-lg text-on-surface font-headline-lg">
        Collection
      </h1>
      <p className="text-body-md tracking-[0.08em] text-outline">
        {pagination.total} card{pagination.total === 1 ? "" : "s"} collected
      </p>
      </div>

      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3.5">
        {collection.map((c) => (
          <CollectionCardTile key={c.id} entry={c} />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goToPage(pagination.page - 1)}
            disabled={pagination.page <= 1}
            className="text-label-sm tracking-widest uppercase text-on-surface-variant disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-body-md text-outline">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() => goToPage(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
            className="text-label-sm tracking-widest uppercase text-on-surface-variant disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
