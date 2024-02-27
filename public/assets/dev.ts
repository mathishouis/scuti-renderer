// HMR
// https://stackoverflow.com/questions/71743027/how-to-use-vite-hmr-api-with-pixi-js
/* if (import.meta.hot) {
  import.meta.hot.accept((): void => {
    room.destroy();
  });
} */

import { StatsJSAdapter, addStats } from 'pixi-stats';
import { renderer } from './main';
import { Ticker, UPDATE_PRIORITY } from 'pixi.js';

setTimeout(() => {
  // Pixi stats
  const stats: StatsJSAdapter = addStats(document, renderer.application);
  const ticker: Ticker = Ticker.shared;

  ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

  // Pixi devtools
  globalThis.__PIXI_APP__ = renderer.application;
}, 1000);
