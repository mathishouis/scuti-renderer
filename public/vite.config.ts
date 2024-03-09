import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  clearScreen: false,
  build: { target: 'esnext' },
});
