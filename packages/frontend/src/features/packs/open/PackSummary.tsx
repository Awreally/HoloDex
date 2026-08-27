import CardFace from "./CardFace";
import type { CardSummary } from "../types/packs.types";

export default function PackSummary({ cards, onReset }: { cards: CardSummary[]; onReset: () => void }) {
  return (
    <div className="w-full animate-[fadeUp_0.4s_ease_both]">
      <div className="flex justify-between items-center mb-4">
        <div className="font-extrabold text-lg">You opened {cards.length} cards</div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
        {cards.map((c) => (
          <div key={c.id} className="shrink-0 w-32.5">
            <CardFace card={c} />
          </div>
        ))}
      </div>
        <button
          onClick={onReset}
          className="border-none bg-linear-to-br from-violet-500 to-violet-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg cursor-pointer"
        >
          Open Another
        </button>
    </div>
  );
}