/// <reference types="vite/client" />

import { type Application, Ticker, UPDATE_PRIORITY, type ICanvas } from 'pixi.js';
import { addStats } from 'pixi-stats';

import('./test');

declare global {
  // eslint-disable-next-line no-var
  var __PIXI_APP__: Application<ICanvas>;
}

export function preload(app: Application): void {
  // pixi-stats
  const stats = addStats(document, app);
  const ticker = Ticker.shared;
  ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);

  // pixi dev-tools
  globalThis.__PIXI_APP__ = app;
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    const stats = document.getElementById('stats');
    stats?.remove();
  });
}
