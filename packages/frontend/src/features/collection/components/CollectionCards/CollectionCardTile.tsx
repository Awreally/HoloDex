import { useState, type PointerEvent } from "react";
import type { CollectionEntry } from "../../types/collection.types";
import CollectionCard from "./CollectionCard";

export function CollectionCardTile({ entry }: { entry: CollectionEntry }) {
  const [expanded, setExpanded] = useState(false);
  const [highLoaded, setHighLoaded] = useState(false);

  function close() {
    setExpanded(false);
    setHighLoaded(false);
  }

  function handlePointerEnter(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") setExpanded(true);
  }

  function handlePointerLeave(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse") close();
  }

  return (
    <div
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative flex flex-col items-center ${expanded ? "z-10" : ""}`}
    >
      <CollectionCard
        entry={entry}
        expanded={expanded}
        highLoaded={highLoaded}
        onHighResLoad={() => setHighLoaded(true)}
      />
    </div>
  );
}
