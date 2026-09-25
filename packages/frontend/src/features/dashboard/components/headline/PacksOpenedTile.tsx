import type { Stats } from "../../types/dashboard.types";

type PacksOpenedTileProps = {
  packsOpened: Stats["packsOpened"];
  avgValuePerPack: Stats["avgValuePerPack"];
};

export default function PacksOpenedTile({
  packsOpened,
  avgValuePerPack,
}: PacksOpenedTileProps) {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary">
          inventory_2
        </span>
        <h2 className="text-headline-lg-s text-outline uppercase">
          Packs opened
        </h2>
      </div>
      <div className="mt-2 mb-2 flex justify-center font-display-lg">
        <p className="font-display-lg text-body-lg">{packsOpened}</p>
      </div>
      <p className="text-center text-body-lg text-outline">
        avg {avgValuePerPack.cardmarket} € / pack
      </p>
    </div>
  );
}
