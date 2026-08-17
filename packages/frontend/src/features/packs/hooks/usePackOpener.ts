import { useState } from "react";
import { CardSummary, Stage } from "../types/packs.types";

export function usePackOpener(
  drawCards: () => Promise<CardSummary[]>,
  onComplete?: (cards: CardSummary[]) => void,
) {
  const [stage, setStage] = useState<Stage>("closed");
  const [cards, setCards] = useState<CardSummary[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const open = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const drawn = await drawCards();
      setCards(drawn);
      setIndex(0);
      setStage("one");
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    if (index + 1 >= cards.length) {
      setStage("done");
      onComplete?.(cards);
    } else {
      setIndex((i) => i + 1);
    }
  };

    const openAll = () => {
    setIndex(cards.length - 1);
    setStage("done");
    onComplete?.(cards);
  };


  const reset = () => {
    setStage("closed");
    setCards([]);
    setIndex(0);
  };
  return {
    stage,
    cards,
    index,
    isLoading,
    error,
    open,
    next,
    openAll,
    reset,
  };
}
