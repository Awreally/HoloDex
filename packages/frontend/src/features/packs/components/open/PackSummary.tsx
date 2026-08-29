import CardFace from "./CardFace";
import type { CardSummary } from "../../types/packs.types";
import { Link } from "react-router";

export default function PackSummary({
  cards,
  onReset,
}: {
  cards: CardSummary[];
  onReset: () => void;
}) {
  return (
    <div className="w-full animate-[fadeUp_0.4s_ease_both]">
      <div className="mb-6 flex items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-headline-lg-s tracking-[0.08em] text-outline uppercase">
            Pack complete
          </p>
          <h1 className="font-headline-lg text-display-lg text-on-surface">
            Pack
          </h1>
          <p className="text-body-md tracking-[0.08em] text-outline">
            {cards.length} cards added to your collection
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to={"/collection"}
            className="cursor-pointer rounded-xl border border-surface-container-highest bg-on-secondary px-9 py-3.5 text-[15px] font-extrabold text-outline transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            View collection
          </Link>
          <button
            onClick={onReset}
            className="cursor-pointer rounded-xl border-none bg-linear-to-br from-violet-500 to-violet-700 px-9 py-3.5 text-[15px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Open another
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(158px,1fr))] gap-4">
        {cards.map((c) => (
          <div key={c.id}>
            <CardFace card={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
