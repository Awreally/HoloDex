import { RarityVariantBreakdown } from "../types/dashboard.types"

type RarityVariantBreakdownProps = {
    rarityVariantBreakdown: RarityVariantBreakdown[];
}

export default function RarityVariant({ rarityVariantBreakdown}: RarityVariantBreakdownProps) {
    return (
        <div className="flex w-69 flex-col rounded-2xl border border-surface-container-highest bg-on-secondary p-5.5">
            <h2 className="text-headline-lg-s text-outline uppercase">Rarity breakdown</h2>
            <div>
            <div className="bg-surface-container-highest">

            {rarityVariantBreakdown.map((r) => (
                <div key={r.rarity}>
                    <div className="mt-2 mb-2 flex justify-between font-display-lg rounded-xl border bg-on-secondary">
                    <span>{r.rarity} {r.variant}:</span>
                    <span>{r.count}</span>
                    </div>
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}