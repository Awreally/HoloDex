import { Recent } from "../../types/dashboard.types";
import { cardImageUrl } from "../../../../lib/images";
import { cardLabel, cardLabelColor } from "../../../../lib/cards";

type RecentPullsGridProp = {
  card: Recent;
};

export default function RecentPullsGrid({ card }: RecentPullsGridProp) {
  const image = card.imageLarge ?? card.imageSmall;
  const rarityLabel = cardLabel(card.rarity, card.variant);
  const rarityLabelTextClass =
    rarityLabel.length > 22 ? "text-headline-lg-s" : "text-label-sm";

  return (
    <div className="flex flex-col items-center justify-center">
      {image ? (
        <img
          src={cardImageUrl(image)}
          alt={card.id}
          className="aspect-63/88 w-full rounded-xl object-cover"
        />
      ) : (
        <span>{card.id}</span>
      )}

      <div
        className={`mt-2 inline-flex max-w-full items-center justify-center gap-1.5 rounded-full bg-surface-container-low px-2 py-1 text-center font-body-lg ${rarityLabelTextClass}`}
      >
        <span
          aria-hidden="true"
          className={`size-3 shrink-0 rounded-full ${cardLabelColor(card.rarity, card.variant)}`}
        />
        <span className="min-w-0 text-center wrap-break-word">
          {rarityLabel}
        </span>
      </div>
    </div>
  );
}
