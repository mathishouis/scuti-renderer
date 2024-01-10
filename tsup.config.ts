import { Options } from 'tsup';

export const tsup = {
  target: 'esnext',
  format: 'esm',
  clean: true,
  bundle: true,
  minify: true,
  noExternal: [/(.*)/],
  entry: ['src/index.ts'],
  dts: true,
} satisfies Options;
