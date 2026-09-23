import { useState, type PointerEvent } from "react";
import { cardImageUrl } from "../../../../lib/images";
import { cardLabel, cardLabelColor } from "../../../../lib/cards";
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
  const rarityLabel = cardLabel(entry.card.rarity, entry.variant);
  const rarityLabelTextClass =
    rarityLabel.length > 22 ? "text-headline-lg-s" : "text-label-sm";
  const cardNameTextClass =
    entry.card.name.length > 22
      ? "text-headline-lg-s"
      : "text-headline-lg-sm";
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
    <div className="relative isolate flex h-full w-full flex-col items-center">
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
        className={`relative z-10 w-full overflow-hidden rounded-lg border border-surface-variant shadow-sm transition-transform duration-200 ease-out ${
          expanded ? "shadow-xl" : ""
        }`}
      >
        {base ? (
          <>
            <img
              src={cardImageUrl(base, "low")}
              alt={entry.card.name}
              className="block aspect-5/7 w-full object-cover"
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

      <div className="-mt-3 grid w-full min-w-0 grid-rows-[1.5rem_1.5rem_1rem] place-items-center gap-1.5 rounded-2xl border border-surface-container-highest bg-on-secondary px-3 pt-5 pb-3">
        <div
          className={`inline-flex max-w-full items-center justify-center gap-1.5 rounded-full bg-surface-container-low px-2 py-1 text-center font-body-lg text-on-surface-variant ${rarityLabelTextClass}`}
          title={rarityLabel}
        >
          <span
            aria-hidden="true"
            className={`size-2.5 shrink-0 rounded-full ${cardLabelColor(entry.card.rarity, entry.variant)}`}
          />
          <span className="min-w-0 wrap-break-word text-center">
            {rarityLabel}
          </span>
        </div>

        <p
          className={`flex h-full w-full items-center justify-center text-balance wrap-break-word text-center font-headline-lg text-on-surface ${cardNameTextClass}`}
        >
          {entry.card.name}
        </p>

        <p className="flex h-full items-center justify-center text-center text-body-md tabular-nums text-on-surface">
          {entry.cardmarketTrend === null
            ? "Price unavailable"
            : `${entry.cardmarketTrend.toFixed(2)} €`}
        </p>
      </div>
    </div>
  );
}
