import { Recent } from "../../types/dashboard.types";
import RecentPullsGrid from "./RecentPullsGrid";

type RecentPullsProps = {
  recent: Recent[];
};
export default function RecentPulls({ recent }: RecentPullsProps) {
  return (
    <section className="rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
      <div className="flex items-center gap-4">
        <span
          className="material-symbols-outlined text-primary"
          aria-hidden="true"
        >
          history
        </span>
        <h2 className="text-headline-lg-s text-outline uppercase">
          Recent pulls
        </h2>
      </div>

      <div className="mt-5.5 grid w-full grid-cols-[repeat(auto-fit,minmax(150px,180px))] justify-center gap-3.5">
        {recent.map((r) => (
          <RecentPullsGrid
            key={`${r.id}-${r.variant}-${r.obtainedAt}`}
            card={r}
          />
        ))}
      </div>
    </section>
  );
}
