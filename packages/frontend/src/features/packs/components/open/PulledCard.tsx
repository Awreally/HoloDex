import type { CardSummary } from "../../types/packs.types";
import { cardLabel } from "../../config/packs.config";
import CardFace from "./CardFace";

type PulledCardProps = {
  card: CardSummary;
  size?: "large" | "summary";
};

export default function PulledCard({ card, size = "large" }: PulledCardProps) {
  const rootClass =
    size === "large"
      ? "flex w-68 flex-col items-center animate-[fadeUp_0.25s_ease_both]"
      : "flex w-full flex-col items-center";

  const nameClass =
    size === "large"
      ? "mt-5 font-['Montserrat',sans-serif] text-2xl font-extrabold"
      : "mt-2 text-center font-['Montserrat',sans-serif] text-sm font-bold";

  return (
    <div className={rootClass}>
      <CardFace card={card} />

      <div className="mt-1.5 flex flex-col items-center">
        <div className="flex items-center gap-3 rounded-full bg-[#a855f7] px-4 py-1.5 font-headline-lg text-label-sm text-on-secondary uppercase">
          <span className="material-symbols-outlined text-[17px]">
            auto_awesome
          </span>
          <p>{cardLabel(card.rarity, card.pulledVariant)}</p>
        </div>

        <p className={nameClass}>{card.name}</p>
      </div>
    </div>
  );
}
