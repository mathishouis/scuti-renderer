import { LandscapeLayer } from './LandscapeLayer';
import { Container, Texture } from 'pixi.js';
import { LandscapePart } from '../LandscapePart';

interface Configuration {
  part: LandscapePart;
  color: number;
}

export class LandscapeColorLayer extends LandscapeLayer {
  public container: Container = new Container();
  public part: LandscapePart;
  public color: number;
  public align: 'top' | 'bottom' | 'stretch' = 'stretch';

  constructor({ part, color }: Configuration) {
    super();

    this.part = part;
    this.color = color;
  }

  public get texture(): Texture {
    return Texture.WHITE;
  }
}
