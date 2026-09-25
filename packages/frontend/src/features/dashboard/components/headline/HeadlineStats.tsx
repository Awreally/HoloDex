import { Stats } from "../../types/dashboard.types";
import CardsOwnedTile from "./CardsOwnedTile";
import TotalValueTile from "./TotalValueTile";
import PacksOpenedTile from "./PacksOpenedTile";

type HeadlineStatsProps = {
  stats: Stats;
};

export default function HeadlineStats({ stats }: HeadlineStatsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <CardsOwnedTile cards={stats.cards} />
      <TotalValueTile value={stats.value} />
      <PacksOpenedTile
        packsOpened={stats.packsOpened}
        avgValuePerPack={stats.avgValuePerPack}
      />
    </div>
  );
}
