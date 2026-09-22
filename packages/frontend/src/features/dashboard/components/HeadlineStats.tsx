import { Stats } from "../types/dashboard.types";
import CardsOwnedTile from "./CardsOwnedTile";
import TotalValueTile from "./TotalValueTile";

type HeadlineStatsProps = {
  stats: Stats;
};

export default function HeadlineStats({ stats }: HeadlineStatsProps) {
  return (
    <div className="flex">
      <CardsOwnedTile cards={stats.cards} />
      <TotalValueTile value={stats.value} />
    </div>
  );
}
