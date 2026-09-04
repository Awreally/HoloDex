import { Link } from "react-router";
import { CollectionEntry, PaginationMeta } from "../../types/collection.types";
import { useCollectionFilters } from "../../hooks/collection.hooks";
import { CollectionCardTile } from "./CollectionCardTile";
import { VARIANT_OPTIONS } from "../../utils/collection.constants";

type CollectionCardGridProps = {
  collection: CollectionEntry[];
  pagination: PaginationMeta;
  hasReverseVariant: boolean;
};

export default function CollectionCardGrid({
  collection,
  pagination,
  hasReverseVariant,
}: CollectionCardGridProps) {
    const { variant, sortDir, goToPage, setVariant, setSortDir } = useCollectionFilters();
    const variantOptions = VARIANT_OPTIONS.filter(
      (option) => option.value !== "reverse" || hasReverseVariant,
    );

  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-headline-lg-s text-outline uppercase">
          Binder
        </p>

        <h1 className="font-headline-lg text-display-lg text-on-surface">
          Collection
        </h1>

        <p className="text-body-md text-outline">
          {pagination.total} card{pagination.total === 1 ? "" : "s"} collected
        </p>
      </div>

      <div className="mt-5.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {variantOptions.map((option) => {
            const active = (variant ?? null) === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => setVariant(option.value)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-label-sm tracking-widest uppercase transition ${
                  active
                    ? "border-transparent bg-primary text-on-primary"
                    : "border-outline-variant text-outline hover:border-outline"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setSortDir(sortDir === "desc" ? "asc" : "desc")}
          className="flex cursor-pointer items-center gap-1 text-label-sm tracking-widest text-outline uppercase hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">
            {sortDir === "desc" ? "arrow_downward" : "arrow_upward"}
          </span>
          Sort
        </button>
      </div>

      {collection.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-surface-container-highest py-16 text-center">
          <span className="material-symbols-outlined text-4xl text-outline">
            style
          </span>
          <div>
            <p className="font-headline-lg text-title-md text-on-surface">
              No cards yet
            </p>
            <p className="mt-1 text-body-md text-outline">
              Open a pack to start building this set's collection.
            </p>
          </div>
          <Link
            to="/packs"
            className="cursor-pointer rounded-xl border-none bg-linear-to-br from-violet-500 to-violet-700 px-9 py-3.5 text-[15px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98]"
          >
            Open a pack
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3.5">
          {collection.map((c) => (
            <CollectionCardTile key={c.id} entry={c} />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"

            onClick={() => goToPage(pagination.page - 1)}

            disabled={pagination.page <= 1}

            className="text-label-sm tracking-widest text-on-surface-variant uppercase cursor-pointer disabled:opacity-40"
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

            className="text-label-sm tracking-widest text-on-surface-variant cursor-pointer uppercase disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
