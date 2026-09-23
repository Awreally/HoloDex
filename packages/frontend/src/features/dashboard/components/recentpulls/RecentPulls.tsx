import { Recent } from "../../types/dashboard.types";
import RecentPullsGrid from "./RecentPullsGrid";

type RecentPullsProps = {
  recent: Recent[];
};
export default function RecentPulls({ recent }: RecentPullsProps) {
  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3.5">
     {recent.map((r) => (
      <RecentPullsGrid key={r.id} card={r} />
     ))}
     
    </div>
  );
}
