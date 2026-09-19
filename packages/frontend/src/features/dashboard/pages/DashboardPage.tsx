import { useAuth } from "../../../context/AuthContext";
import { useLoaderData } from "react-router";
import { Dashboard } from "../types/dashboard.types";
import HeadLineTile from "../components/HeadlineTile";
import ClosestToCompleteTile from "../components/ClosestToComplete";
import RarityVariant from "../components/RarityVariant";
import RecentPulls from "../components/RecentPulls";

export function DashBoardPage() {
  const { user } = useAuth();
  const { headline, closestToComplete, rarityVariantBreakdown, recent } =
    useLoaderData() as Dashboard;

  return (
    <div>
        <h1>Welcome Back, {user?.username} ! </h1>
      <div className="flex">
        <HeadLineTile headline={headline} />
        <ClosestToCompleteTile closestToComplete={closestToComplete} />
        <RarityVariant rarityVariantBreakdown={rarityVariantBreakdown}/>
        <div>
          <RecentPulls recent={recent}/>
        </div>
      </div>
    </div>
  );
}
