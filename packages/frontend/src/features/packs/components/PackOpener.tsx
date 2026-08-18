import PackCard from "./PackCard";
import OneByOneReveal from "./OneByOneReveal";
import { usePackOpener } from "../hooks/usePackOpener";
import { CardSummary } from "../types/packs.types";
import PackSummary from "./PackSummary";

export default function PackOpener({
  setName,
  packCost = 100,
  drawCards,
  onComplete,
}: {
  setName: string;
  packCost?: number;
  drawCards: () => Promise<CardSummary[]>;
  onComplete?: (cards: CardSummary[]) => void;
}) {
  const { stage, cards, index, isLoading, error, open, next, openAll, reset } = usePackOpener(
    drawCards,
    onComplete
  );

  return (
    <div className="flex w-full flex-col items-center">
      {error != null && <p className="text-sm text-red-500 mb-3">Something went wrong opening this pack.</p>}
      {stage === "closed" && (
        <PackCard setName={setName} packCost={packCost} onOpen={open} isLoading={isLoading} />
      )}
      {stage === "one" && cards.length > 0 && (
        <OneByOneReveal cards={cards} index={index} onNext={next} onOpenAll={openAll} />
      )}
      {stage === "done" && <PackSummary cards={cards} onReset={reset} />}
    </div>
  );
}
