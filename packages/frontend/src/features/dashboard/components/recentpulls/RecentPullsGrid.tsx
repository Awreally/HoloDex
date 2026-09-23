import { Recent } from "../../types/dashboard.types"
import { cardImageUrl } from "../../../../lib/images"
import { cardLabel, cardLabelColor } from "../../../../lib/cards"

type RecentPullsGridProp = {
    card: Recent;
}

export default function RecentPullsGrid({ card }: RecentPullsGridProp) {
    return ( 
          <div className="flex flex-col justify-center">
            {card.imageLarge ? (
              <img
                src={cardImageUrl(card.imageLarge)}
                alt={card.id}
                className="aspect-63/88 w-full rounded-xl object-cover"
              />
            ) : (
              <span>{card.id}</span>
            )}
            <div className={`flex items-center gap-2 rounded-xl ${cardLabelColor(card.rarity, card.variant)} px-4 py-1 font-headline-lg text-headline-lg-s text-on-secondary uppercase`}>
                      <span className="material-symbols-outlined">
                        star
                      </span>
                      <p>{cardLabel(card.rarity, card.variant)}</p>
                    </div>
          </div>
    )
}