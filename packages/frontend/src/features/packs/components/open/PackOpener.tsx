import { useEffect } from "react";
import { useFetcher } from "react-router";
import PackCard from "./ClosedPackCard";
import OneByOneReveal from "./OneByOneReveal";
import { usePackOpener } from "./usePackOpener";
import type { CardSummary, SetsPack } from "../../types/packs.types";
import PackSummary from "./PackSummary";

type PackOpenerProps = {
  selectedPack: SetsPack;
  packCost?: number;
  onComplete?: (cards: CardSummary[]) => void;
};

export default function PackOpener({
  selectedPack,
  packCost = 100,
  onComplete,
}: PackOpenerProps) {
  const fetcher = useFetcher<CardSummary[]>();
  const { stage, cards, index, startReveal, next, openAll, reset } =
    usePackOpener(onComplete);

  const isOpening = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data) {
      startReveal(fetcher.data);
    }
  }, [fetcher.data, startReveal]);

  function onOpen() {
    fetcher.submit(null, {
      method: "POST",
    });
  }

  return (
    <div className="flex w-full flex-col items-center">
      {stage === "closed" && (
        <PackCard
          setName={selectedPack.name}
          packImageUrl={selectedPack.packImageUrl}
          packSize={selectedPack.packSize}
          packCost={packCost}
          isLoading={isOpening}
          onOpen={onOpen}
        />
      )}
      {stage === "one" && cards.length > 0 && (
        <OneByOneReveal
          cards={cards}
          index={index}
          onNext={next}
          onOpenAll={openAll}
        />
      )}
      {stage === "done" && <PackSummary cards={cards} onReset={reset} />}
    </div>
  );
}
