import { useAuth } from "../../../context/AuthContext";
import { Link, useLoaderData } from "react-router";
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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 flex items-center gap-1.5 font-body-lg text-label-sm text-primary uppercase">
            <span
              className="material-symbols-outlined text-[17px]"
              aria-hidden="true"
            >
              auto_awesome
            </span>
            Trainer dashboard
          </p>

          <h1 className="font-headline-lg text-headline-lg-mobile text-on-surface sm:text-headline-lg">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-primary to-primary-container bg-clip-text text-transparent">
              {user?.username}
            </span>
            !
          </h1>

          <p className="mt-1 font-body-lg text-body-md text-outline">
            Your next great pull could be one pack away.
          </p>
        </div>

        <Link
          to="/packs"
          className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 font-headline-lg text-label-sm text-on-primary shadow-[0_6px_16px_rgba(97,57,144,0.22)] transition hover:bg-primary-container active:scale-[0.98] sm:w-auto"
        >
          <span
            className="material-symbols-outlined text-[19px]"
            aria-hidden="true"
          >
            inventory_2
          </span>
          Open a pack
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </Link>
      </header>

      <div className="mt-6 flex flex-col gap-3">
        <HeadlineStats stats={stats} />
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <ClosestToCompleteTile closestToComplete={closestToComplete} />
          <RarityVariant rarityVariantBreakdown={rarityVariantBreakdown} />
        </div>
        <RecentPulls recent={recent} />
      </div>
    </div>
  );
}
