import { useAuth } from "../../../context/AuthContext";
import { useLoaderData } from "react-router";
import { Dashboard } from "../types/dashboard.types";
import HeadLineTile from "../components/HeadlineTile";
import ClosestToCompleteTile from "../components/ClosestToComplete";

export function DashBoardPage() {
  const { user } = useAuth();
  const { headline, closestToComplete, rarityVariantBreakdown, recent  } = useLoaderData() as Dashboard;


  return (
    <div className="flex flex-col">
      <h1>Welcome Back, {user?.username} ! </h1>
      <HeadLineTile headline={headline}/>
      <ClosestToCompleteTile closestToComplete={closestToComplete}/>
     
      <div>

      </div>
      </div>
  );
}
