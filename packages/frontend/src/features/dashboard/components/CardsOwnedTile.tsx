import type { Stats } from "../types/dashboard.types";

type HeadlineTileProps = {
  cards: Stats["cards"];
};

export default function CardsOwnedTile({ cards }: HeadlineTileProps) {
  const { owned, total, percentComplete } = cards;

  return (
    <div className="flex w-69 flex-col rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary">style</span>
        <h2 className="text-headline-lg-s text-outline uppercase">
          Cards owned
        </h2>
      </div>

      <div className="mt-2 mb-2 flex justify-between font-display-lg">
        <span>
          {owned} / {total}
        </span>
        <span>{percentComplete}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-outline-variant">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${percentComplete}%` }}
          />
      </div>
          </div>
  );
}
