import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePackOpener } from "./usePackOpener";
import type { CardSummary } from "../../types/packs.types";

function makeCards(count: number): CardSummary[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i}`,
    name: `Card ${i}`,
    imageLarge: null,
    imageSmall: null,
    rarity: "Common",
    pulledVariant: "normal",
  }));
}

describe("usePackOpener", () => {
  it("starts closed with no cards", () => {
    const { result } = renderHook(() => usePackOpener());

    expect(result.current.stage).toBe("closed");
    expect(result.current.cards).toEqual([]);
    expect(result.current.index).toBe(0);
  });

  it("moves into the one-by-one reveal stage on startReveal", () => {
    const cards = makeCards(3);
    const { result } = renderHook(() => usePackOpener());

    act(() => {
      result.current.startReveal(cards);
    });

    expect(result.current.stage).toBe("one");
    expect(result.current.cards).toEqual(cards);
    expect(result.current.index).toBe(0);
  });

  it("advances through cards with next() and finishes on the last one", () => {
    const cards = makeCards(3);
    const onComplete = vi.fn();
    const { result } = renderHook(() => usePackOpener(onComplete));

    act(() => result.current.startReveal(cards));

    act(() => result.current.next());
    expect(result.current.index).toBe(1);
    expect(result.current.stage).toBe("one");

    act(() => result.current.next());
    expect(result.current.index).toBe(2);
    expect(result.current.stage).toBe("one");

    act(() => result.current.next());
    expect(result.current.stage).toBe("done");
    expect(onComplete).toHaveBeenCalledWith(cards);
  });

  it("jumps straight to done with openAll", () => {
    const cards = makeCards(5);
    const onComplete = vi.fn();
    const { result } = renderHook(() => usePackOpener(onComplete));

    act(() => result.current.startReveal(cards));
    act(() => result.current.openAll());

    expect(result.current.stage).toBe("done");
    expect(result.current.index).toBe(cards.length - 1);
    expect(onComplete).toHaveBeenCalledWith(cards);
  });

  it("returns to the closed state on reset", () => {
    const cards = makeCards(2);
    const { result } = renderHook(() => usePackOpener());

    act(() => result.current.startReveal(cards));
    act(() => result.current.next());
    act(() => result.current.reset());

    expect(result.current.stage).toBe("closed");
    expect(result.current.cards).toEqual([]);
    expect(result.current.index).toBe(0);
  });
});
