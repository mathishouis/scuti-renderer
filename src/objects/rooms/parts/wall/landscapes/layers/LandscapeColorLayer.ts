import { LandscapeLayer } from './LandscapeLayer';
import { Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';

interface Configuration {
  part: LandscapePart;
  color: number;
}

export class LandscapeColorLayer extends LandscapeLayer {
  public part: LandscapePart;
  public color: number;

  constructor({ part, color }: Configuration) {
    super();

    this.part = part;
    this.color = color;
  }

  public get texture(): Texture {
    return Texture.WHITE;
  }
}
