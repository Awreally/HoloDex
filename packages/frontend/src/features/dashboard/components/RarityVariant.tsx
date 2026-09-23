import { RarityVariantBreakdown } from "../types/dashboard.types"

type RarityVariantBreakdownProps = {
    rarityVariantBreakdown: RarityVariantBreakdown[];
}

export default function RarityVariant({ rarityVariantBreakdown}: RarityVariantBreakdownProps) {
    return (
        <div className="flex flex-col rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
            <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">
                    diamond
                </span>
                <h2 className="text-headline-lg-s text-outline uppercase">Rarity breakdown</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            {rarityVariantBreakdown.map((r) => (
  <div
    key={`${r.rarity}-${r.variant}`}
    className="flex min-w-0 items-center justify-between gap-3 py-2"
  >
    <div className="flex min-w-0 items-center gap-2">
      <span className="truncate text-body-md font-semibold text-on-surface">
        {r.rarity}
      </span>

      <span className="rounded-full bg-surface-container px-2 py-1 text-label-sm text-outline capitalize">
        {r.variant}
      </span>
    </div>

    <span className="text-title-md tabular-nums text-primary">
      {r.count}
    </span>
  </div>
))}
            </div>
            </div>
    )
}
