import { useState } from "react";
import { cardImageUrl } from "../../../lib/images";
import type { CollectionEntry } from "../types/collection.types";

export function CollectionCardTile({ entry }: { entry: CollectionEntry }) {
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
