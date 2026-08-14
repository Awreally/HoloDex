import { useState } from "react";
import { apiFetch } from "../lib/api";
import { cardImageUrl } from "../lib/images";

type CardSummary = {
  id: string;
  name: string;
  imageLarge: string | null;
  imageSmall: string | null;
  rarity: string;
};

export function OpenPackPage() {
  const [cards, setCards] = useState<CardSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleApiFetch = async () => {
    try {
      setIsLoading(true);

      const pack = await apiFetch<CardSummary[]>("/sets/base1/open", "POST");

      setCards(pack);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h1>Packs</h1>

      <button onClick={handleApiFetch} disabled={isLoading}>
        Open Pack
      </button>

      {cards.map((card) => (
        <div key={card.id}>
          {card.imageSmall ? (
            <img src={cardImageUrl(card.imageSmall)} alt={card.name} />
          ) : (
            <div>{card.name}</div>
          )}
          <p>{card.id}</p>
          <p>{card.rarity}</p>
        </div>
      ))}
    </div>
  );
}
