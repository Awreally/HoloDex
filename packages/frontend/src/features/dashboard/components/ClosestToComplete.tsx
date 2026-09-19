import type { ClosestToComplete } from "../types/dashboard.types";

type ClosestToCompleteProps = {
  closestToComplete: ClosestToComplete[];
};

export default function ClosestToCompleteTile({
  closestToComplete,
}: ClosestToCompleteProps) {
  return (
    <div className="flex w-69 flex-col rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
      <div className="flex items-center gap-4">
        <h2 className="text-headline-lg-s text-outline uppercase">
          Set Completion
        </h2>
      </div>
      {closestToComplete.map((c) => (
        <div key={c.setId}>
            <h3 className="mt-2 text-body-lg">{c.name}</h3>
          <div className="mt-2 mb-2 flex justify-between font-display-lg">
            <span>
              {c.owned} / {c.total}
            </span>
            <span>{c.percentComplete}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-outline-variant">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${c.percentComplete}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
