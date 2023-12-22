import seedrandom from 'seedrandom';

function random(seed: number, min: number, max: number): number {
  // @ts-ignore
  const generator = new seedrandom(String(seed));
  return Math.floor(generator() * (max + 1)) + min;
}

export { random };
