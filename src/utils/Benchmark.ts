const benchmarks: Record<string, number> = {};

function benchmark(tag: string): undefined | string {
    if (!benchmarks[tag]) {
        benchmarks[tag] = performance.now()
    } else {
        const time = performance.now() - benchmarks[tag];
        delete benchmarks[tag];

        return time.toFixed(2);
    }
}

export {
    benchmark,
};
