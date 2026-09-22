import type { CardSummary } from "../../types/packs.types";
import { cardLabel, cardLabelColor } from "../../../../lib/cards";
import CardFace from "./CardFace";

type PulledCardProps = {
  card: CardSummary;
  size?: "large" | "summary";
};

export default function PulledCard({ card, size = "large" }: PulledCardProps) {
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

      <div className="w-full flex flex-col items-center">
        <div className={`mt-2 flex items-center gap-2 rounded-xl ${cardLabelColor(card.rarity, card.pulledVariant)} px-2 py-1 font-headline-lg text-label-sm text-on-secondary uppercase`}>
          <span className="material-symbols-outlined" aria-hidden="true">
            star
          </span>
          <p>{cardLabel(card.rarity, card.pulledVariant)}</p>
        </div>
        <h1 className={nameClass}>{card.name}</h1>
        <div>
          <p className="mt-1">{card.cardmarketTrend} €</p>
        </div>
      </div>
    </div>
  );
}
