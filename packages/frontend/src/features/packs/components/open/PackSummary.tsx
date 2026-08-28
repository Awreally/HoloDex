import CardFace from "./CardFace";
import type { CardSummary } from "../../types/packs.types";

export default function PackSummary({
  cards,
  onReset,
}: {
  cards: CardSummary[];
  onReset: () => void;
}) {
  return (
    <div className="w-full animate-[fadeUp_0.4s_ease_both]">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-extrabold">
          You opened {cards.length} cards
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
        {cards.map((c) => (
          <div key={c.id} className="w-32.5 shrink-0">
            <CardFace card={c} />
          </div>
        ))}
      </div>
      <button
        onClick={onReset}
        className="cursor-pointer rounded-lg border-none bg-linear-to-br from-violet-500 to-violet-700 px-4 py-2.5 text-xs font-bold text-white"
      >
        Open Another
      </button>
    </div>
  );
}
