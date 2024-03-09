import { perf } from '.';

const benchmarks: Record<string, number> = {};

function benchmark(tag: string) {
  benchmarks[tag] = performance.now();

  return {
    perf: (): void => {
      const time = performance.now() - benchmarks[tag];
      const title = tag
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      delete benchmarks[tag];
      return perf('⏱️ BENCHMARK', `${title} initialized in ${time}ms`);
    },
  };
}

export { benchmark };
