import { useState } from "react";
import { useCollection } from "../hooks/collection.hooks";
import { cardImageUrl } from "../../../lib/images";
import type { CollectionEntry } from "../types/collection.types";

function CollectionCardTile({ entry }: { entry: CollectionEntry }) {
  const [hovered, setHovered] = useState(false);
  const [highLoaded, setHighLoaded] = useState(false);
  const base = entry.card.imageLarge ?? entry.card.imageSmall;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHighLoaded(false);
      }}
      className={`relative overflow-hidden rounded-lg border border-surface-variant shadow-sm transition-transform duration-200 ease-out ${
        hovered ? "z-10 scale-150 shadow-xl" : ""
      }`}
    >
      {base ? (
        <>
          <img
            src={cardImageUrl(base, "low")}
            alt={entry.card.name}
            className="block w-full"
          />
          {hovered && (
            <img
              src={cardImageUrl(base, "high")}
              alt=""
              onLoad={() => setHighLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
                highLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </>
      ) : (
        <div className="flex aspect-5/7 items-center justify-center bg-surface-container-low px-2 text-center text-sm text-on-surface-variant">
          {entry.card.name}
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  const { collection, isLoading, error } = useCollection();
  if (isLoading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;
  if (collection.length === 0)
    return <p>No cards yet — open a pack to get started!</p>;

  return (
    <div className="w-full">
      <p className="text-[11px] font-semibold tracking-[0.08em] text-outline uppercase">
        Binder
      </p>
      <h1 className="mt-1 text-[32px] font-extrabold text-on-surface">
        Collection
      </h1>
      <p className="mt-1 text-sm text-on-surface-variant">
        {collection.length} card{collection.length === 1 ? "" : "s"} collected
      </p>

      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-3.5">
        {collection.map((c) => (
          <CollectionCardTile key={c.id} entry={c} />
        ))}
      </div>
    </div>
  );
}
