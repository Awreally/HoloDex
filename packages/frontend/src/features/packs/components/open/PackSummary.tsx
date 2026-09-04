import type { CardSummary } from "../../types/packs.types";
import { Link } from "react-router";
import PulledCard from "./PulledCard";
import { useAuth } from "../../../../context/AuthContext";

export default function PackSummary({
  cards,
  onReset,
}: {
  cards: CardSummary[];
  onReset: () => void;
}) {
  const { user } = useAuth();
  return (
    <div className="w-full animate-[fadeUp_0.4s_ease_both] px-4 sm:px-0">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-headline-lg-s text-outline uppercase">
            Pack complete
          </p>
          <h1 className="font-headline-lg text-display-lg text-on-surface">
            Pack
          </h1>
          {user && (
            <p className="text-body-md text-outline">
              {cards.length} cards added to your collection
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {user && (
            <Link
              to={"/collection"}
              className="cursor-pointer rounded-xl border border-surface-container-highest bg-on-secondary px-9 py-3.5 text-center text-[15px] font-extrabold text-outline transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              View collection
            </Link>
          )}
          <button
            onClick={onReset}
            className="cursor-pointer rounded-xl border-none bg-linear-to-br from-violet-500 to-violet-700 px-9 py-3.5 text-[15px] font-extrabold text-white transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Open another
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3 sm:grid-cols-[repeat(auto-fill,minmax(158px,1fr))] sm:gap-4">
        {cards.map((c, i) => (
          <div key={`${c.id}-${c.pulledVariant}-${i}`}>
            <PulledCard card={c} size="summary" />
          </div>
        ))}
      </div>
    </div>
  );
}
