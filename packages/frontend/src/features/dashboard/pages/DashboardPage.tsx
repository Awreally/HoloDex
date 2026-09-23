import { useAuth } from "../../../context/AuthContext";
import { useLoaderData } from "react-router";
import { Dashboard } from "../types/dashboard.types";
import ClosestToCompleteTile from "../components/ClosestToComplete";
import RarityVariant from "../components/RarityVariant";
import RecentPulls from "../components/recentpulls/RecentPulls";
import HeadlineStats from "../components/headline/HeadlineStats";

export function DashBoardPage() {
  const { user } = useAuth();
  const { stats, closestToComplete, rarityVariantBreakdown, recent } =
    useLoaderData() as Dashboard;

  return (
    <div className="mx-auto w-full max-w-300">
      <h1>Welcome Back, {user?.username} ! </h1>
      <div className="mt-6 flex flex-col gap-3">
        <HeadlineStats stats={stats} />
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <ClosestToCompleteTile closestToComplete={closestToComplete} />
          <RarityVariant rarityVariantBreakdown={rarityVariantBreakdown} />
        </div>
        <div>
          <RecentPulls recent={recent} />
        </div>
      </div>
    </div>
  );
}
