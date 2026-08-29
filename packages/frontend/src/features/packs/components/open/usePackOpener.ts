import { useCallback, useState } from "react";
import { CardSummary, Stage } from "../../types/packs.types";

export function usePackOpener(onComplete?: (cards: CardSummary[]) => void) {
  const [stage, setStage] = useState<Stage>("closed");
  const [cards, setCards] = useState<CardSummary[]>([]);
  const [index, setIndex] = useState<number>(0);

  const startReveal = useCallback((openedCards: CardSummary[]) => {
    setCards(openedCards);
    setIndex(0);
    setStage("one");
  }, []);

  const next = useCallback(() => {
    if (index + 1 >= cards.length) {
      setStage("done");
      onComplete?.(cards);
    } else {
      console.log(cards);
      setIndex((i) => i + 1);
    }
  }, [cards, index, onComplete]);

  const openAll = useCallback(() => {
    setIndex(cards.length - 1);
    setStage("done");
    onComplete?.(cards);
  }, [cards, onComplete]);

  const reset = useCallback(() => {
    setStage("closed");
    setCards([]);
    setIndex(0);
  }, []);

  return {
    stage,
    cards,
    index,
    startReveal,
    next,
    openAll,
    reset,
  };
}
