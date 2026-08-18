import { CardSummary } from "../types/packs.types";
import { cardImageUrl } from "../../../lib/images";

export default function CardFace({ card }: { card: CardSummary }) {
  return (
    <div className="h-full w-full rounded-2xl border border-zinc-100">
      <div className="flex items-center justify-center">
        {card.imageSmall ? (
          <img src={cardImageUrl(card.imageLarge)} alt={card.name} className="" />
        ) : (
          <span>{card.name}</span>
        )}
        <div className="p-3.5">
        </div>
      </div>
    </div>
  );
}
