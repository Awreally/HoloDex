import { CardSummary } from "../../types/packs.types";
import { cardImageUrl } from "../../../../lib/images";
import PulledCard from "./PulledCard";

export default function OneByOneReveal({
  cards,
  index,
  onNext,
  onOpenAll,
}: {
  cards: CardSummary[];
  index: number;
  onNext: () => void;
  onOpenAll: () => void;
}) {
  const isLast = index + 1 >= cards.length;
  const card = cards[index];
  return (
    <div className="flex w-full flex-col items-center px-4 pt-2 sm:px-0">
      <div className="gap 3.5 mb-5.5 flex items-center">
        <span className="font-mono text-headline-lg-sm text-outline">
          {index + 1} / {cards.length}
        </span>
      </div>
      <div
        onClick={onNext}
        className="w-full max-w-68 cursor-pointer"
      >
        <PulledCard card={card} size="large" />
      </div>

      <div className="mt-4 mb-6 flex w-full max-w-68 flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
        <button
          onClick={onNext}
          className="w-full cursor-pointer rounded-lg border-none bg-linear-to-br from-violet-500 to-violet-700 px-7 py-3 text-[14.5px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98] sm:w-auto"
        >
          {isLast ? "Finish" : "Next Card"}
        </button>
        {!isLast && (
          <button
            onClick={onOpenAll}
            className="w-full cursor-pointer rounded-lg border border-zinc-200 bg-white px-7 py-3 text-[14.5px] font-bold text-zinc-600 transition hover:bg-zinc-50 sm:w-auto"
          >
            Open All
          </button>
        )}
      </div>

      <div className="flex w-full flex-wrap justify-center gap-2 overflow-x-auto border-t border-zinc-100 pt-2.5">
        {cards.slice(0, index + 1).map((c, i) => (
          <div
            key={c.id}
            className={`h-15.5 w-11 shrink-0 overflow-hidden rounded-md border-2 bg-linear-to-br from-violet-100 to-violet-200 ${
              i === index ? "border-violet-600" : "border-transparent"
            }`}
          >
            {c.imageSmall && (
              <img
                src={cardImageUrl(c.imageSmall)}
                alt={c.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
