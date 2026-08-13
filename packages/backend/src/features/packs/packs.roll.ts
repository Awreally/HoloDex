import type { Card } from "./packs.types";

function getRandomCards(cards: Card[], rarity: string, amount: number) {
  const filteredCards = cards.filter((card) => card.rarity === rarity);
  const selectedCards: Card[] = [];

  const drawCount = Math.min(amount, filteredCards.length);

  for (let i = 0; i < drawCount; i++) {
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    const randomCard = filteredCards.splice(randomIndex, 1)[0];
    selectedCards.push(randomCard);
  }

  return selectedCards;
}

export function openPack(cards: Card[]) {
  const pack: Card[] = [];

  const commons = getRandomCards(cards, "Common", 6);
  const uncommons = getRandomCards(cards, "Uncommon", 3);
  const rares = getRandomCards(cards, "Rare", 1);

  pack.push(...commons, ...uncommons, ...rares);

  return pack;
}
