import type { Spritesheet } from 'pixi.js';

export interface IRendererConfiguration {
  canvas: HTMLElement;
  width: number;
  height: number;
  resources: string;
}

export interface ScutiSpritesheet extends Omit<Spritesheet, 'data'> {
  data: {
    partsType: { [key: string]: { gestures: string[] } };
  };
}
