import { describe, it, expect } from "vitest";
import { openPack, weightedRoll } from "./engine/engine.index";
import type { Card, PackRecipe } from "./packs.types";

function makeCard(overrides: Partial<Card> & { id: string }): Card {
  return {
    name: "Test Card",
    rarity: "Common",
    holo: false,
    normal: true,
    reverse: false,
    category: null,
    ...overrides,
  };
}

describe("openPack", () => {
  it("draws the requested amount from a fixed slot matching rarity and variant", () => {
    const cards: Card[] = [
      makeCard({ id: "1", rarity: "Common", normal: true }),
      makeCard({ id: "2", rarity: "Common", normal: true }),
      makeCard({ id: "3", rarity: "Rare", holo: true, normal: false }),
    ];
    const recipe: PackRecipe = [
      { kind: "fixed", rarity: "Common", variant: "normal", amount: 2 },
    ];

    const result = openPack(cards, recipe);

    expect(result).toHaveLength(2);
    expect(
      result.every(
        (c) => c.rarity === "Common" && c.pulledVariant === "normal",
      ),
    ).toBe(true);
    expect(new Set(result.map((c) => c.id)).size).toBe(2);
  });

  it("caps the draw at the available pool size instead of throwing", () => {
    const cards: Card[] = [makeCard({ id: "1", rarity: "Rare", holo: true })];
    const recipe: PackRecipe = [
      { kind: "fixed", rarity: "Rare", variant: "holo", amount: 5 },
    ];

    const result = openPack(cards, recipe);

    expect(result).toHaveLength(1);
  });

  it("only pulls Energy-category cards for an energy slot, tagged as normal", () => {
    const cards: Card[] = [
      makeCard({ id: "1", category: "Energy", rarity: "Common" }),
      makeCard({ id: "2", category: "Energy", rarity: "Common" }),
      makeCard({ id: "3", category: null, rarity: "Common" }),
    ];
    const recipe: PackRecipe = [{ kind: "energy", amount: 2 }];

    const result = openPack(cards, recipe);

    expect(result).toHaveLength(2);
    expect(
      result.every(
        (c) => c.category === "Energy" && c.pulledVariant === "normal",
      ),
    ).toBe(true);
  });

  it("uses the slot's roll() result to pick rarity and variant", () => {
    const cards: Card[] = [
      makeCard({ id: "1", rarity: "Ultra Rare", holo: true, normal: false }),
      makeCard({ id: "2", rarity: "Common", normal: true }),
    ];
    const recipe: PackRecipe = [
      {
        kind: "roll",
        amount: 1,
        roll: weightedRoll([
          { rarity: "Ultra Rare", variant: "holo", weight: 1 },
        ]),
      },
    ];

    const result = openPack(cards, recipe);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
    expect(result[0].pulledVariant).toBe("holo");
  });

  it("combines multiple slots into one pack", () => {
    const cards: Card[] = [
      makeCard({ id: "1", category: "Energy" }),
      makeCard({ id: "2", rarity: "Common", normal: true }),
      makeCard({ id: "3", rarity: "Rare", holo: true, normal: false }),
    ];
    const recipe: PackRecipe = [
      { kind: "energy", amount: 1 },
      { kind: "fixed", rarity: "Common", variant: "normal", amount: 1 },
      { kind: "fixed", rarity: "Rare", variant: "holo", amount: 1 },
    ];

    const result = openPack(cards, recipe);

    expect(result).toHaveLength(3);
  });
});
