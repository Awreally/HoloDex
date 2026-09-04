import { Weighted, RollFn, RollResult, Card } from "../packs.types";

export function weightedRoll(options: Weighted[]): RollFn {
  const fn = (): RollResult => {
    const total = options.reduce((sum, o) => sum + o.weight, 0);
    let roll = Math.random() * total;
    for (const option of options) {
      roll -= option.weight;
      if (roll < 0) return { rarity: option.rarity, variant: option.variant };
    }
    const fallback = options[options.length - 1];
    return { rarity: fallback.rarity, variant: fallback.variant };
  };
  fn.options = options;
  return fn;
}

export function pickRandom(pool: Card[], amount: number): Card[] {
  const available = [...pool];
  const selected: Card[] = [];
  const drawCount = Math.min(amount, available.length);

  for (let i = 0; i < drawCount; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available.splice(randomIndex, 1)[0]);
  }
  return selected;
}
