import type { Application, ICanvas } from 'pixi.js';

declare global {
  var __PIXI_APP__: Application<ICanvas>;
}
