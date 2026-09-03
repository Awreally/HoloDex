import { CardSummary } from "../../types/packs.types";
import { cardImageUrl } from "../../../../lib/images";

export default function CardFace({ card }: { card: CardSummary }) {
  return (
    <div className="w-full rounded-2xl border border-zinc-100">
      <div className="flex flex-col justify-center">
        {card.imageLarge ? (
          <img
            src={cardImageUrl(card.imageLarge)}
            alt={card.name}
            className="aspect-63/88 w-full rounded-xl object-cover"
          />
        ) : (
          <span>{card.name}</span>
        )}
      </div>
    </div>
  );
}
