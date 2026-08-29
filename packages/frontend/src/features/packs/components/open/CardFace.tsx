import { CardSummary } from "../../types/packs.types";
import { cardImageUrl } from "../../../../lib/images";
import { variantLabels } from "../../config/packs.config";

export default function CardFace({ card }: { card: CardSummary }) {
  return (
    <div className="h-full w-full rounded-2xl border border-zinc-100">
      <div className="flex flex-col items-center justify-center">
        {card.imageLarge ? (
          <img
            src={cardImageUrl(card.imageLarge)}
            alt={card.name}
            className=""
          />
        ) : (
          <span>{card.name}</span>
        )}
        <p className="">{card.name}</p>
        <p>{card.rarity}</p>
        <p className="text-xs uppercase tracking-wide text-outline">
          {variantLabels[card.pulledVariant]}
        </p>
      </div>
    </div>
  );
}
