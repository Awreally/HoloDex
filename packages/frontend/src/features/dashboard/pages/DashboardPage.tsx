import { useAuth } from "../../../context/AuthContext";
import { useLoaderData } from "react-router";
import { Dashboard } from "../types/dashboard.types";
import ClosestToCompleteTile from "../components/ClosestToComplete";
import RarityVariant from "../components/RarityVariant";
import RecentPulls from "../components/RecentPulls";
import HeadlineStats from "../components/HeadlineStats";

export function DashBoardPage() {
  const { user } = useAuth();
  const { stats, closestToComplete, rarityVariantBreakdown, recent } =
    useLoaderData() as Dashboard;

  return (
    <div>
        <h1>Welcome Back, {user?.username} ! </h1>
      <div className="flex flex-col">
        <HeadlineStats stats={stats} />
        <div className="flex">
        <ClosestToCompleteTile closestToComplete={closestToComplete} />
        <RarityVariant rarityVariantBreakdown={rarityVariantBreakdown}/>
        </div>
        <div>
          <RecentPulls recent={recent}/>
        </div>
      </div>
    </div>
  );
}
