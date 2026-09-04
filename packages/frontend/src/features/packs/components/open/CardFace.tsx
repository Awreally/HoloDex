import { CardSummary } from "../../types/packs.types";
import { cardImageUrl } from "../../../../lib/images";

export default function CardFace({ card }: { card: CardSummary }) {
  const isRareHolo =
    card.pulledVariant === "holo";
  const effectClass =
    isRareHolo
      ? "pack-rare-holo-card"
      : card.pulledVariant === "holo"
      ? "pack-holo-card"
      : card.pulledVariant === "reverse"
        ? "pack-reverse-card"
        : "";

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-zinc-100 ${
        effectClass
      }`}
    >
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
