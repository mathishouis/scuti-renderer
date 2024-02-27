import { Options, defineConfig } from 'tsup';

export default defineConfig(
  (options): Options => ({
    target: 'esnext',
    format: 'esm',
    clean: true,
    minify: !options.watch,
    noExternal: [/(.*)/],
    entry: ['src/**/index.ts'],
    dts: true,
  }),
);
