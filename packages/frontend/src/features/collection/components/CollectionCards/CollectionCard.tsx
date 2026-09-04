import { useState, type PointerEvent } from "react";
import { cardImageUrl } from "../../../../lib/images";
import { cardLabel } from "../../../../lib/cards";
import type { CollectionEntry } from "../../types/collection.types";

type CollectionCardProps = {
  entry: CollectionEntry;
  expanded: boolean;
  highLoaded: boolean;
  onHighResLoad: () => void;
};

export default function CollectionCard({
  entry,
  expanded,
  highLoaded,
  onHighResLoad,
}: CollectionCardProps) {
  const base = entry.card.imageLarge ?? entry.card.imageSmall;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 20, y: (px - 0.5) * 20 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div
        onPointerMove={expanded ? handlePointerMove : undefined}
        onPointerLeave={expanded ? resetTilt : undefined}
        style={
          expanded
            ? {
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.5)`,
              }
            : undefined
        }
        className={`relative w-full overflow-hidden rounded-lg border border-surface-variant shadow-sm transition-transform duration-200 ease-out ${
          expanded ? "z-10 shadow-xl" : ""
        }`}
      >
        {base ? (
          <>
            <img
              src={cardImageUrl(base, "low")}
              alt={entry.card.name}
              className="block w-full"
            />
            {expanded && (
              <img
                src={cardImageUrl(base, "high")}
                alt=""
                onLoad={onHighResLoad}
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

      <div className="mt-1.5 flex flex-col items-center">
        <div className="flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 font-headline-lg text-label-sm text-on-secondary uppercase">
          <span className="material-symbols-outlined">auto_awesome</span>
          <p>{cardLabel(entry.card.rarity, entry.variant)}</p>
        </div>

        <p className="mt-2 text-center text-sm font-bold">{entry.card.name}</p>
      </div>
    </div>
  );
}
