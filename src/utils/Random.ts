import seedrandom from 'seedrandom';

function random(seed: number, min: number, max: number, fixed: number = 0): number {
  // @ts-ignore
  const generator = new seedrandom(String(seed));
  return parseFloat((generator() * max + min).toFixed(fixed));
}

function shuffle(seed: number, array: any[]): any[] {
  /*return array
    .map(value => ({ value, sort: seed }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);*/
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random(seed, -10000, 10000) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.filter(item => item);
}

export { random, shuffle };
