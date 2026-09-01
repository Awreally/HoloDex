import { CollectionEntry, PaginationMeta } from "../../types/collection.types";
import { useCollectionFilters } from "../../hooks/collection.hooks";
import { CollectionCardTile } from "./CollectionCardTile";

type CollectionCardGridProps = {
  collection: CollectionEntry[];
  pagination: PaginationMeta;
};

export default function CollectionCardGrid({
  collection,
  pagination,
}: CollectionCardGridProps) {
    const { goToPage } = useCollectionFilters();
    
  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-headline-lg-s tracking-[0.08em] text-outline uppercase">
          Binder
        </p>

        <h1 className="font-headline-lg text-display-lg text-on-surface">
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

            className="text-label-sm tracking-widest text-on-surface-variant uppercase disabled:opacity-40"
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

            className="text-label-sm tracking-widest text-on-surface-variant uppercase disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
