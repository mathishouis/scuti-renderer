import type { Options } from 'tsup';

export const tsup = {
  target: 'esnext',
  format: 'esm',
  clean: true,
  bundle: true,
  minify: true,
  entry: ['src/index.ts'],
  dts: true,
} satisfies Options;
