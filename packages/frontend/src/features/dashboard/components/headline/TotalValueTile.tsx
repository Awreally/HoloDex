import type { Stats } from "../../types/dashboard.types";

type TotalValueTileProps = {
  value: Stats["value"];
};

export default function TotalValueTile({ value }: TotalValueTileProps) {
  const { tcgplayer, cardmarket } = value;

  return (
      <div className="flex flex-col rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">
            money_bag
          </span>
          <h2 className="text-headline-lg-s text-outline uppercase">
            Total estimated value
          </h2>
        </div>
        <div className="mt-2 mb-2 flex justify-center font-display-lg">
          <p className="font-display-lg text-headline-lg">{cardmarket} €</p>
        </div>
      </div>
  );
}
