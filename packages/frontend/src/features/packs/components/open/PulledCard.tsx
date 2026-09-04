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
      ? "mt-5 text-center font-headline-lg text-xl font-extrabold sm:text-2xl"
      : "mt-2 text-center font-headline-lg text-sm font-bold";

  return (
    <div className={rootClass}>
      <CardFace card={card} />

      <div className="mt-1.5 flex flex-col items-center">
        <div className={`flex items-center gap-3 rounded-full ${cardLabelColor(card.rarity, card.pulledVariant)} px-4 py-1.5 font-headline-lg text-label-sm text-on-secondary uppercase`}>
          <span className="material-symbols-outlined">
            auto_awesome
          </span>
          <p>{cardLabel(card.rarity, card.pulledVariant)}</p>
        </div>

        <p className={nameClass}>{card.name}</p>
      </div>
    </div>
  );
}
