import type { CardSummary } from "../../types/packs.types";
import { cardLabel, cardLabelColor } from "../../../../lib/cards";
import CardFace from "./CardFace";

type PulledCardProps = {
  card: CardSummary;
  size?: "large" | "summary";
};

export default function PulledCard({ card, size = "large" }: PulledCardProps) {
  const rarityLabel = cardLabel(card.rarity, card.pulledVariant);
  const rootClass =
    size === "large"
      ? "flex w-full max-w-68 flex-col items-center animate-[fadeUp_0.25s_ease_both]"
      : "flex w-full flex-col items-center";

  const nameClass =
    size === "large"
      ? "hidden sm:block sm:mt-1 sm:text-center sm:font-headline-lg sm:text-xl sm:font-extrabold sm:text-2xl"
      : "hidden sm:block mt-1 text-center font-headline-lg text-sm font-bold";

  return (
    <div className={rootClass}>
      <CardFace card={card} />

      <div className="flex w-full flex-col items-center">
        <div
          className="mt-2 inline-flex max-w-full items-center justify-center gap-1.5 rounded-full bg-surface-container-low px-2 py-1 text-center font-headline-lg text-label-sm text-on-surface-variant"
          title={rarityLabel}
        >
          <span
            aria-hidden="true"
            className={`size-2.5 shrink-0 rounded-full ${cardLabelColor(card.rarity, card.pulledVariant)}`}
          />
          <span className="min-w-0 wrap-break-word text-center">
            {rarityLabel}
          </span>
        </div>
        <h1 className={nameClass}>{card.name}</h1>
        <div>
          <p className="mt-1">{card.cardmarketTrend} €</p>
        </div>
      </div>
    </div>
  );
}
